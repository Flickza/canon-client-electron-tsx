import { dirObject, seriesObject } from "@/render/types";
import axios, { AxiosResponse } from "axios";
import { app, BrowserWindow, ipcMain, dialog } from "electron";
import fs, { createWriteStream } from "fs";
import path from "path";
import * as stream from "stream";
import { promisify } from "util";

ipcMain.on("quit-app", () => {
  app.quit();
});

ipcMain.on("minimize-app", () => {
  if (process.platform === "darwin") {
    app.hide();
    return;
  }
  BrowserWindow.getFocusedWindow()?.minimize();
});

ipcMain.on("maximize-app", () => {
  BrowserWindow.getFocusedWindow()?.maximize();
});

ipcMain.on("maximize-ap", () => {
  BrowserWindow.getFocusedWindow()?.maximize();
});

ipcMain.on("relaunch-app", () => {
  app.relaunch();
  app.exit(0);
});

const getIndex = (path: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) reject(err);
      if (files.length < 1) {
        resolve(0);
      } else {
        // get all files from dir
        const f = files;
        // find temp.jpg and remove
        const index_temp = f.indexOf("temp.jpg");
        // check if found and remove
        if (index_temp !== -1) {
          f.splice(index_temp, 1);
        }
        if (f.length > 0) {
          const lastFile = f[f.length - 1].split("_");
          const number = lastFile[lastFile.length - 1].split(".")[0];
          resolve(parseInt(number));
        } else {
          resolve(0);
        }
      }
    });
  });
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
ipcMain.handle("browse-directory", async (): Promise<dirObject> => {
  return new Promise(async (resolve) => {
    const dir = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });
    const index = await getIndex(dir.filePaths[0]);
    resolve({
      canceled: dir.canceled,
      filePaths: dir.filePaths,
      last_image_index: index,
    });
  });
});

const TEMP_FILE = "temp.jpg";

ipcMain.handle("capture-image", async (_e, p: string): Promise<string> => {
  const temp = path.join(p, TEMP_FILE);
  const finished = promisify(stream.finished);
  const writer = createWriteStream(temp);
  return axios({
    method: "get",
    url: "http://10.170.8.154:7373/camera/capture",
    responseType: "stream",
  }).then(async (response: AxiosResponse) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    response.data.pipe(writer);
    return finished(writer).then(() => {
      return temp;
    }); //this is a Promise
  });
});

ipcMain.handle(
  "save-image",
  (_e, p: seriesObject, prefix: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      if (p.fullPath) {
        const index = await getIndex(p?.fullPath);
        let newIndex = 0;
        if (index === 0) {
          newIndex = 1;
        } else {
          newIndex = index + 1;
        }
        fs.rename(
          path.join(p?.fullPath, TEMP_FILE),
          path.join(p?.fullPath, `${prefix}_${newIndex}.jpg`),
          (err) => {
            if (err) reject(err.toString());
            resolve(`Ok. ${newIndex}`);
          }
        );
      } else {
        reject("Could not find dir path.");
      }
    });
  }
);
ipcMain.handle("delete-temp", (_e, p: seriesObject): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (p.fullPath) {
      const temp = path.join(p.fullPath, TEMP_FILE);
      fs.unlink(temp, (err) => {
        if (err) reject(err.toString());
        resolve("Ok.");
      });
    } else {
      reject("Could not find dir path.");
    }
  });
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them in main.ts.
