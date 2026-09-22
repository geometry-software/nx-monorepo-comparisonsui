import { spawn, execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const workspaceRoot = fileURLToPath(new URL("../", import.meta.url));
const nxExecutable = new URL(
  process.platform === "win32"
    ? "../node_modules/.bin/nx.cmd"
    : "../node_modules/.bin/nx",
  import.meta.url,
);
const appUrl = "http://localhost:4201";
const requiredUrls = [
  appUrl,
  "http://localhost:3010/api/observations?page=1&limit=1",
  "http://localhost:3012/api/observations?page=1&limit=1",
  "http://localhost:3015/api/auth/sessions/providers",
  "http://localhost:3017/api/comparisons",
];
const requiredPorts = [
  ...new Set(requiredUrls.map((url) => new URL(url).port)),
];
let activeProcess;
let activeProcessGroup = false;
const readinessController = new AbortController();

function stopActiveProcess(signal) {
  if (!activeProcess?.pid || activeProcess.exitCode !== null) return;
  try {
    if (activeProcessGroup && process.platform !== "win32") {
      process.kill(-activeProcess.pid, signal);
    } else {
      activeProcess.kill(signal);
    }
  } catch (error) {
    if (error.code !== "ESRCH") throw error;
  }
}

function ensureEnvironment() {
  const envFile = new URL("../.env", import.meta.url);
  if (existsSync(envFile)) return;

  throw new Error("A .env file is required. Add .env to the workspace root.");
}

function findProcessesOnRequiredPorts() {
  if (process.platform === "win32") {
    throw new Error(
      "Automatic port cleanup requires lsof and is not supported on Windows.",
    );
  }

  const args = [
    "-nP",
    "-t",
    "-sTCP:LISTEN",
    ...requiredPorts.map((port) => `-iTCP:${port}`),
  ];

  return new Promise((resolve, reject) => {
    execFile("lsof", args, (error, stdout) => {
      if (error?.code === 1) {
        resolve([]);
        return;
      }
      if (error) {
        reject(error);
        return;
      }

      resolve(
        [
          ...new Set(
            (stdout.match(/\d+/g) ?? [])
              .map(Number)
              .filter(
                (processId) => Number.isInteger(processId) && processId > 0,
              ),
          ),
        ],
      );
    });
  });
}

async function waitForRequiredPortsToBeReleased(timeoutMs = 3000) {
  const deadline = Date.now() + timeoutMs;
  let remainingProcessIds = [];

  while (Date.now() < deadline) {
    remainingProcessIds = await findProcessesOnRequiredPorts();
    if (remainingProcessIds.length === 0) return;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  throw new Error(
    `Failed to release application ports. Remaining process IDs: ${remainingProcessIds.join(", ")}`,
  );
}

async function stopProcessesOnRequiredPorts() {
  const processIds = await findProcessesOnRequiredPorts();
  if (processIds.length === 0) {
    console.log(`Ports are available: ${requiredPorts.join(", ")}`);
    return;
  }

  console.log(
    `Stopping processes on ports ${requiredPorts.join(", ")}: ${processIds.join(", ")}`,
  );
  for (const processId of processIds) {
    try {
      process.kill(processId, "SIGKILL");
    } catch (error) {
      if (error.code !== "ESRCH") throw error;
    }
  }

  await waitForRequiredPortsToBeReleased();
}

async function ensureDependencies() {
  if (existsSync(nxExecutable)) return;
  console.log(
    "Local Nx executable is missing. Installing workspace dependencies with npm ci...",
  );
  await new Promise((resolve, reject) => {
    const installProcess = spawn(npmCommand, ["ci"], {
      cwd: workspaceRoot,
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    activeProcess = installProcess;
    activeProcessGroup = false;
    installProcess.once("error", reject);
    installProcess.once("exit", (code, signal) => {
      activeProcess = undefined;
      if (code === 0) resolve();
      else
        reject(
          new Error(
            `npm ci failed with ${signal ? `signal ${signal}` : `code ${code ?? "unknown"}`}. Development servers were not started.`,
          ),
        );
    });
  });
  if (!existsSync(nxExecutable)) {
    throw new Error(
      "Nx is still missing after npm ci. Ensure devDependencies are included in the installation.",
    );
  }
}

function openBrowser() {
  const command =
    process.platform === "darwin"
      ? "open"
      : process.platform === "win32"
        ? "cmd"
        : "xdg-open";
  const args =
    process.platform === "win32" ? ["/c", "start", "", appUrl] : [appUrl];
  execFile(command, args, () => {});
}

async function waitForApp(url, timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    readinessController.signal.throwIfAborted();
    try {
      const response = await fetch(url, {
        signal: AbortSignal.any([
          readinessController.signal,
          AbortSignal.timeout(5000),
        ]),
      });
      if (response.ok) {
        console.log(`Ready: ${url}`);
        return;
      }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Service did not become ready at ${url}`);
}

function startDevelopmentProcess() {
  console.log("Starting frontend and 4 services...");
  const devProcess = spawn(npmCommand, ["run", "dev"], {
    cwd: workspaceRoot,
    stdio: "inherit",
    shell: process.platform === "win32",
    detached: process.platform !== "win32",
    env: { ...process.env, NX_TUI: "false" },
  });
  activeProcess = devProcess;
  activeProcessGroup = process.platform !== "win32";

  return devProcess;
}

function waitForDevelopmentProcess(devProcess) {
  return new Promise((resolve, reject) => {
    devProcess.once("error", reject);
    devProcess.once("exit", (code, signal) => {
      readinessController.abort(new Error("Development process stopped."));
      if (code === 0) resolve();
      else
        reject(
          new Error(
            `npm run dev exited with ${signal ? `signal ${signal}` : `code ${code ?? "unknown"}`}`,
          ),
        );
    });
  });
}

async function waitForServices(exited) {
  console.log("Waiting for service readiness...");
  await Promise.race([
    Promise.all(requiredUrls.map((url) => waitForApp(url, 60000))),
    exited.then(() => {
      throw new Error(
        "Development process exited before services became ready.",
      );
    }),
  ]);
}

function registerShutdownHandlers() {
  process.on("SIGINT", () => stopActiveProcess("SIGINT"));
  process.on("SIGTERM", () => stopActiveProcess("SIGTERM"));
}

function announceApplicationReady() {
  console.log(`Application is ready: ${appUrl}`);
  openBrowser();
}

function handleStartError(error) {
  readinessController.abort(error);
  stopActiveProcess("SIGTERM");
  console.error(error);
  process.exitCode = 1;
}

async function start() {
  registerShutdownHandlers();
  ensureEnvironment();
  await ensureDependencies();
  await stopProcessesOnRequiredPorts();

  const devProcess = startDevelopmentProcess();
  const exited = waitForDevelopmentProcess(devProcess);

  await waitForServices(exited);
  announceApplicationReady();
  await exited;
}

start().catch(handleStartError);
