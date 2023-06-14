export interface PlantEncounter {
  id: number;
  genus: string;
  species?: string;
  commonName: string;
  lat: number;
  long: number;
}

const EMPTY_DATA_ID = 0;
const DEFAULT_LAT = 0;
const DEFAULT_LONG = 0;

export const emptyPlantData = {
  id: EMPTY_DATA_ID,
  genus: "",
  species: "",
  commonName: "",
  lat: DEFAULT_LAT,
  long: DEFAULT_LONG,
};
