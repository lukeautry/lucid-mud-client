import chalk from "chalk";
import { spawn } from "child_process";
import electron from "electron";
import path from "path";
import webpack from "webpack";
import rendererConfig from "./webpack.renderer.config";

const c = console;
const log = c.log;

let initialRendererBuilt = false;
const webpackRenderer = () => {
  return new Promise((resolve, reject) => {
    log(chalk.grey(("[Renderer] Starting Webpack")));
    webpack(rendererConfig)
      .watch({}, (err, data) => {
        if (err) {
          log(chalk.red(`[Renderer] Error: ${err.message}`));

          if (!initialRendererBuilt) {
            return reject(err);
          }
        }

        if (!initialRendererBuilt) {
          log(chalk.greenBright("[Renderer] Initial Compilation Successful"));
          log(data.toString());
          initialRendererBuilt = true;
          return resolve();
        }

        log(chalk.greenBright("[Renderer] Recompilation Successful"));
        log(data.toString());
      });
  });
};

const launchElectron = () => {
  log(chalk.green("[Main] Launching Electron"));

  const electronProcess = spawn(electron as any, [path.join(__dirname, "../dist/main/index.js")]);
  electronProcess.stdout.on("data", (chunk) => {
    const out = chunk.toString("utf8").trim();
    if (out) {
      log(`[Electron Process] ${out}`);
    }
  });

  electronProcess.stderr.on("data", (chunk) => {
    log(`${chalk.red("[Electron Process - Error]")} ${chunk.toString()}`);
  });
};

(async () => {
  try {
    await webpackRenderer();
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.error(err.message);
    process.exit(1);
    return;
  }

  launchElectron();
})();
