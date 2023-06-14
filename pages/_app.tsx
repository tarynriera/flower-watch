import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./layout";
import { PlantEncounter, emptyPlantData } from "./types";
import { useState, useEffect } from "react";
import Edit from "./edit";

export default function App({ Component, pageProps }: AppProps) {
  //a map state that stores all entries
  const [data, setData] = useState<Map<number, PlantEncounter>>(new Map());
  //open state for the edit form
  const [open, setOpen] = useState(false);
  //state that holds the entry currently being edited
  const [entryToEdit, setEntryToEdit] =
    useState<PlantEncounter>(emptyPlantData);

  //handlers for opening and closing edit form
  const handleEditOpen = (entry: PlantEncounter) => {
    setEntryToEdit(entry);
    setOpen(true);
  };

  const handleEdit = (updatedEntry: PlantEncounter) => {
    const newEntry = { ...entryToEdit, ...updatedEntry };
    data.set(newEntry.id, newEntry);
    handleSetData(data);
  };

  const handleEditClose = () => {
    setOpen(false);
  };

  //handlers for adding to data state
  const handleAddEncounter = (newEncounter: PlantEncounter) => {
    data.set(newEncounter.id, newEncounter);
    handleSetData(data);
  };

  const handleSetData = (data: Map<number, PlantEncounter>) => {
    const newData = new Map(data);
    setData(newData);
  };

  //starter data
  useEffect(
    () =>
      setData(
        new Map([
          [
            1,
            {
              id: 1,
              genus: "Galanthus",
              species: "nivalis",
              commonName: "snowdrop",
              lat: 39.95,
              long: -75.21,
            },
          ],
          [
            2,
            {
              id: 2,
              genus: "Crocus",
              species: "sativus",
              commonName: "crocus",
              lat: 39.94997326755575,
              long: -75.21728259021677,
            },
          ],
        ])
      ),
    []
  );

  return (
    <Layout handleAddEncounter={handleAddEncounter}>
      <Component
        data={data}
        handleSetData={handleSetData}
        editOpen={open}
        handleEditOpen={handleEditOpen}
        {...pageProps}
      />
      <Edit
        editOpen={open}
        entryToEdit={entryToEdit}
        handleEditClose={handleEditClose}
        handleEdit={handleEdit}
      />
    </Layout>
  );
}
