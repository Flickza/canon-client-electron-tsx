import { seriesObject } from "@/render/types";
export interface Creator {
  id?: string;
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
  last_image_index: number;
}

export interface seriesObject {
  fullPath?: string;
  folderPath?: string;
  last_image_index: number;
}

export interface prefixData {
  currentSeries: seriesObject;
  currentArkivskaper: number | undefined;
  currentProject: string | undefined;
}

export interface Arkivskaper {
  id: string;
  name: string;
}