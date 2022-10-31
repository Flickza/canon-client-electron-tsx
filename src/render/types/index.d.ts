export {};
declare global {
  export interface Creator {
    id?: string;
    navn?: string;
  }

  export interface Project {
    id?: number;
    navn?: string;
    arkivskaper_id?: Creator["id"];
  }
  export interface Series {
    id?: number;
    navn?: string;
    prosjekt_id?: Project["id"];
    arkivskaper_id?: Creator["id"];
  }

  export interface dirObject {
    canceled: boolean;
    filePaths: Array<string>;
    last_image_index: number;
  }

  export interface folderObject {
    fullPath?: string;
    folderPath?: string;
    last_image_index: number;
  }

  export interface prefixData {
    currentSeries: Series;
    currentArkivskaper: number | undefined;
    currentProject: string | undefined;
  }

  export interface Arkivskaper {
    id: string;
    name: string;
  }
}
