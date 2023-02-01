import { electronBridge, storeBridge } from "../main";

declare global {
  interface Window {
    electron: typeof electronBridge;
    store: typeof storeBridge;
  }
  interface response {
    statusCode: number;
    file?: string;
    message: string | unknown;
  }
}
