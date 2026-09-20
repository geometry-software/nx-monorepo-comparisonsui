import { spawn, execFile } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const workspaceRoot = fileURLToPath(new URL('../', import.meta.url));
const nxExecutable = new URL(
  process.platform === 'win32' ? '../node_modules/.bin/nx.cmd' : '../node_modules/.bin/nx',
  import.meta.url,
);
const appUrl = 'http://localhost:4201';
const requiredUrls = [
  appUrl,
  'http://localhost:3010/api/observations?page=1&limit=1',
  'http://localhost:3012/api/observations?page=1&limit=1',
  'http://localhost:3017/api/comparisons',
];
let activeProcess;
const readinessController = new AbortController();

function ensureEnvironment() {
  const envFile = new URL('../.env', import.meta.url);
  let contents;
  try {
    contents = readFileSync(envFile, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error('The .env file was not found. Create it and fill in the required configuration.');
    }
    throw error;
  }
  if (!contents.split(/\r?\n/).some((line) => line.trim() && !line.trim().startsWith('#'))) {
    throw new Error('The .env file is empty. Fill in the required configuration.');
  }
}

async function ensureDependencies() {
  if (existsSync(nxExecutable)) return;
  console.log('Local Nx executable is missing. Installing workspace dependencies with npm ci...');
  await new Promise((resolve, reject) => {
    const installProcess = spawn(npmCommand, ['ci'], {
      cwd: workspaceRoot,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });
    activeProcess = installProcess;
    installProcess.once('error', reject);
    installProcess.once('exit', (code, signal) => {
      activeProcess = undefined;
      if (code === 0) resolve();
      else reject(new Error(`npm ci failed with ${signal ? `signal ${signal}` : `code ${code ?? 'unknown'}`}. Development servers were not started.`));
    });
  });
  if (!existsSync(nxExecutable)) {
    throw new Error('Nx is still missing after npm ci. Ensure devDependencies are included in the installation.');
  }
}

function openBrowser() {
  const command =
    process.platform === 'darwin'
      ? 'open'
      : process.platform === 'win32'
        ? 'cmd'
        : 'xdg-open';
  const args = process.platform === 'win32' ? ['/c', 'start', '', appUrl] : [appUrl];
  execFile(command, args, () => {});
}

async function waitForApp(url, timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    readinessController.signal.throwIfAborted();
    try {
      const response = await fetch(url, {
        signal: AbortSignal.any([readinessController.signal, AbortSignal.timeout(5000)]),
      });
      if (response.ok) {
        console.log(`Ready: ${url}`);
        return;
      }
    } catch {
      // The dev server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Service did not become ready at ${url}`);
}

async function start() {
  ensureEnvironment();
  await ensureDependencies();
  console.log('Starting frontend and 3 analysis services...');
  const devProcess = spawn(npmCommand, ['run', 'dev'], {
    cwd: workspaceRoot,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  activeProcess = devProcess;
  const exited = new Promise((resolve, reject) => {
    devProcess.once('error', reject);
    devProcess.once('exit', (code, signal) => {
      readinessController.abort(new Error('Development process stopped.'));
      if (code === 0) resolve();
      else reject(new Error(`npm run dev exited with ${signal ? `signal ${signal}` : `code ${code ?? 'unknown'}`}`));
    });
  });
  console.log('Waiting for service readiness...');
  await Promise.race([
    Promise.all(requiredUrls.map((url) => waitForApp(url, 60000))),
    exited.then(() => { throw new Error('Development process exited before services became ready.'); }),
  ]);
  console.log(`Application is ready: ${appUrl}`);
  openBrowser();
  await exited;
}

process.on('SIGINT', () => activeProcess?.kill('SIGINT'));
process.on('SIGTERM', () => activeProcess?.kill('SIGTERM'));
start().catch((error) => {
  readinessController.abort(error);
  activeProcess?.kill('SIGTERM');
  console.error(error.message);
  process.exitCode = 1;
});
