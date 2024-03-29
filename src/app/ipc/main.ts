import { AxiosError } from "axios";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios, { AxiosResponse } from "axios";
import { app, BrowserWindow, ipcMain, dialog } from "electron";
import fs, { createWriteStream } from "fs";
import path from "path";
import * as stream from "stream";
import { promisify } from "util";

const baseURL = `http://10.170.8.130:7373`;

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
          const highestIndex = f
            .map((x) => {
              const jpgnumber: Array<string> = x.match(/(_\d+.jpg)/g)!;
              if (jpgnumber.length > 0) {
                return jpgnumber[0].replace(/_/g, "").replace(/.jpg/g, "");
              } else {
                return undefined;
              }
            })
            .filter((x) => x !== undefined)
            .reduce((a, b) => Math.max(Number(a), Number(b)).toString());
          resolve(Number(highestIndex) + 1);
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
    if (dir.canceled) return;
    const index = await getIndex(dir.filePaths[0]);
    resolve({
      canceled: dir.canceled,
      filePaths: dir.filePaths,
      last_image_index: index,
    });
  });
});

const TEMP_FILE = "temp.jpg";
const checkExists = (path: string): boolean => {
  return fs.existsSync(path);
};

const removeFile = (path: string): void => {
  return fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

const handleError = (
  statusCode: number,
  message: string | unknown,
  file?: string
): response => {
  return { statusCode: statusCode, message: message, file: file };
};

ipcMain.handle(
  "capture-image",
  async (_e, p: string, protocol: Protocol): Promise<response> => {
    const temp = path.join(p, TEMP_FILE);
    if (checkExists(temp)) removeFile(temp);
    const finished = promisify(stream.finished);
    const writer = createWriteStream(temp);
    if (protocol.id) {
      try {
        return await axios({
          method: "get",
          url: `${baseURL}/camera/capture/`,
          responseType: "stream",
        })
          .then(async (response: AxiosResponse) => {
            if (response.status !== 200)
              handleError(
                response.status,
                response.statusText || "Could not capture image."
              );
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            response.data.pipe(writer);
            return finished(writer).then(() => {
              return { statusCode: 200, file: temp, message: "OK" };
            }); //this is a Promise
          })
          .catch((reason: AxiosError) => {
            writer.end();
            if (checkExists(temp)) removeFile(temp);
            return handleError(
              reason.status || 500,
              `Could not capture image. \n ${reason.message}`
            );
          });
      } catch (err) {
        writer.end();
        if (checkExists(temp)) removeFile(temp);
        return err;
      }
    } else {
      return {
        statusCode: 400,
        message: "Could not capture image. Protocol ID not found.",
      };
    }
  }
);

ipcMain.handle(
  "save-image",
  (_e, p: folderObject, prefix: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      if (p.fullPath) {
        const index = await getIndex(p?.fullPath);
        fs.rename(
          path.join(p?.fullPath, TEMP_FILE),
          path.join(p?.fullPath, `${prefix}_${index}.jpg`),
          (err) => {
            if (err) {
              reject(err.toString());
            }
            resolve(`Ok. ${index}`);
          }
        );
      } else {
        reject("Could not find dir path.");
      }
    });
  }
);
ipcMain.handle("delete-temp", (_e, p: folderObject): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (p.fullPath) {
      const temp: string = path.join(p.fullPath, TEMP_FILE);
      if (checkExists(temp)) removeFile(temp);
      resolve("Ok");
    } else {
      reject("Could not find dir path.");
    }
  });
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them in main.ts.
