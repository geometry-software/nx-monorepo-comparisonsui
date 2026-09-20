import { spawn, execFile } from 'node:child_process';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const appUrl = 'http://localhost:4201';
const requiredUrls = [
  appUrl,
  'http://localhost:3010/api/observations?page=1&limit=1',
  'http://localhost:3012/api/observations?page=1&limit=1',
  'http://localhost:3017/api/comparisons',
];
let activeProcess;

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
    try {
      const response = await fetch(url);
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
  console.log('Starting frontend and 3 analysis services...');
  const devProcess = spawn(npmCommand, ['run', 'dev'], {
    stdio: 'inherit',
    shell: false,
  });
  activeProcess = devProcess;
  console.log('Waiting for service readiness...');
  await Promise.all(requiredUrls.map((url) => waitForApp(url, 60000)));
  console.log(`Application is ready: ${appUrl}`);
  openBrowser();
  await new Promise((resolve, reject) => {
    devProcess.once('error', reject);
    devProcess.once('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`npm run dev exited with code ${code ?? 'unknown'}`));
    });
  });
}

process.on('SIGINT', () => activeProcess?.kill('SIGINT'));
process.on('SIGTERM', () => activeProcess?.kill('SIGTERM'));
start().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
