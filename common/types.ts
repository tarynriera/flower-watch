export interface PlantEncounter {
  id: number;
  genus: string;
  species?: string;
  commonName: string;
  notes?: string;
  lat: number;
  long: number;
  imgURL?: string;
  imgBlob?: Blob;
}

const EMPTY_DATA_ID = 0;
export const DEFAULT_LAT = 0;
export const DEFAULT_LONG = 0;

export const emptyPlantData = {
  id: EMPTY_DATA_ID,
  genus: "",
  species: "",
  commonName: "",
  notes: "",
  lat: DEFAULT_LAT,
  long: DEFAULT_LONG,
  imgURL: "",
};
