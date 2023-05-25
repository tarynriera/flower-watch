export interface PlantEncounter {
  id: number;
  genus?: string;
  species?: string;
  commonName?: string;
  lat?: number;
  long?: number;
}

const EMPTY_DATA_ID = 0;

export const emptyPlantData = {
  id: EMPTY_DATA_ID,
  genus: "",
  species: "",
  commonName: "",
  lat: undefined,
  long: undefined,
};
