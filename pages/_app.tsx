import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./layout";
import { PlantEncounter } from "./types";
import { useState, useEffect } from "react";
import Edit from "./edit";

export default function App({ Component, pageProps }: AppProps) {
  const [data, setData] = useState<Array<PlantEncounter>>([]);
  //open state for the edit form
  const [open, setOpen] = useState(false);

  //handlers for opening and closing edit form
  const handleEditOpen = () => {
    setOpen(true);
  };

  const handleEditClose = () => {
    setOpen(false);
  };

  //handlers for adding to data state
  const handleAddEncounter = (newEncounter: PlantEncounter) => {
    setData([newEncounter, ...data]);
  };

  const handleSetData = (data: PlantEncounter[]) => {
    setData(data);
  };

  //starter data
  useEffect(
    () =>
      setData([
        {
          id: 1,
          genus: "Galanthus",
          species: "nivalis",
          commonName: "snowdrop",
          lat: 39.95,
          long: -75.21,
        },
      ]),
    []
  );

  return (
    <Layout handleAddEncounter={handleAddEncounter}>
      <Component
        data={data}
        handleSetData={handleSetData}
        editOpen={open}
        handleEditOpen={handleEditOpen}
        handleEditClose={handleEditClose}
        {...pageProps}
      />
      <Edit
        editOpen={open}
        handleEditOpen={handleEditOpen}
        handleEditClose={handleEditClose}
      />
    </Layout>
  );
}
