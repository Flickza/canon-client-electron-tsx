/* eslint-disable @typescript-eslint/no-unsafe-call */
import { dirObject } from "@/render/types";
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
  saveFile: async (buffer: string, path: string): Promise<string> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result: string = await ipcRenderer.invoke("save-file", buffer, path);
    console.log(result);
    return result;
  },
  captureImage: async (p: string): Promise<string> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result: string = await ipcRenderer.invoke("capture-image", p);
    return result;
  },
};

contextBridge.exposeInMainWorld("electron", electronBridge);
