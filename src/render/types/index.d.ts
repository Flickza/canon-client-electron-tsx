import { seriesObject } from "@/render/types";
import { NoInfer } from "@reduxjs/toolkit/dist/tsHelpers";
export interface Creator {
  id?: number;
  navn?: string;
}

export interface Project {
  id?: number;
  navn?: string;
  arkivskaper_id?: number;
}

export interface dirObject {
  canceled: boolean;
  filePaths: Array<string>;
}

export interface seriesObject {
  fullPath: string;
  folderPath: string;
}

export interface prefixData {
  currentSeries: seriesObject;
  currentArkivskaper: number | undefined;
  currentProject: string | undefined;
}
