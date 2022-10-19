import axios, { AxiosResponse } from "axios";
import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { createWriteStream } from "fs";
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

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
ipcMain.handle(
  "browse-directory",
  async (): Promise<Electron.OpenDialogReturnValue> => {
    const dir = await dialog.showOpenDialog({ properties: ["openDirectory"] });
    return dir;
  }
);

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
// ipcMain.handle(
//   "save-file",
//   (_event: Electron.IpcMainInvokeEvent, buffer: Buffer, p: string) => {
//     const writeStream = fs.createWriteStream(p);
//     buffer()
//     return p;
//   }
// );
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
ipcMain.handle("capture-image", async (_e, p: string) => {
  const temp = path.join(p, "temp.jpg");
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
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them in main.ts.
