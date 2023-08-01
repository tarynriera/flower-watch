import Dexie, { Table } from "dexie";
import { PlantEncounter } from "./types";

export class Database extends Dexie {
  plants!: Table<PlantEncounter>;

  constructor() {
    super("database");
    this.version(1).stores({
      plants: "++id, genus, species, commonName",
    });
  }
}

export const db = new Database();
