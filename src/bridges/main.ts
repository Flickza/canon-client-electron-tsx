/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  ipcRenderer,
  contextBridge,
  shell,
  OpenExternalOptions,
} from "electron";

export const electronBridge = {
  quit: (): void => {
    ipcRenderer.send("quit-app");
  },

  minimize: (): void => {
    ipcRenderer.send("minimize-app");
  },

  maximize: (): void => {
    ipcRenderer.send("maximize-app");
  },

  relaunch: (): void => {
    ipcRenderer.send("relaunch-app");
  },

  openUrl: async (
    url: string,
    options?: OpenExternalOptions
  ): Promise<void> => {
    return await shell.openExternal(url, options);
  },

  openPath: async (path: string): Promise<string> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await shell.openPath(path);
  },
  choosePath: async (): Promise<dirObject> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dir: dirObject = await ipcRenderer.invoke("browse-directory");
    return dir;
  },
  captureImage: async (p: string): Promise<string> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result: string = await ipcRenderer.invoke("capture-image", p);
    return result;
  },
  saveImage: async (path: folderObject, prefix: string): Promise<string> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result: string = await ipcRenderer.invoke("save-image", path, prefix);
    return result;
  },
  deleteImage: async (path: folderObject): Promise<string> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result: string = await ipcRenderer.invoke("delete-temp", path);
    return result;
  },
};

contextBridge.exposeInMainWorld("electron", electronBridge);
