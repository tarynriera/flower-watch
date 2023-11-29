import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./layout";
import { PlantEncounter, emptyPlantData } from "../common/types";
import { useState, useEffect } from "react";
import Edit from "./edit";
import { db } from "@/common/db";
import { useLiveQuery } from "dexie-react-hooks";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRouter } from "next/router";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#a091a0",
    },
    secondary: {
      main: "#faebd7",
    },
    background: {
      paper: "antiquewhite",
      default: "#91A091",
    },
    error: {
      main: "rgb(112, 101, 112)",
    },
  },
  typography: {
    fontFamily: "Baskerville",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  //a map state that stores all entries
  const [data, setData] = useState<Map<number, PlantEncounter>>(new Map());
  //open state for the edit form
  const [open, setOpen] = useState(false);
  //state that holds the entry currently being edited
  const [entryToEdit, setEntryToEdit] =
    useState<PlantEncounter>(emptyPlantData);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  //fetch data from indexedDB
  const plants_array = useLiveQuery(() => db.plants.toArray());

  const router = useRouter();

  useEffect(() => {
    //generate new URLs for saved images
    if (!isDataLoaded && plants_array) {
      const plants_array_with_URLs = plants_array?.map((encounter) => {
        if (encounter.imgBlob) {
          const imgURL = URL.createObjectURL(encounter.imgBlob);
          return { ...encounter, imgURL };
        }
        return encounter;
      });
      setData(
        new Map(
          plants_array_with_URLs?.map((encounter) => [encounter.id, encounter])
        )
      );
      setIsDataLoaded(true);
    }
  }, [plants_array]);

  //handlers for opening and closing edit form
  const handleEditOpen = (entry: PlantEncounter) => {
    setEntryToEdit(entry);
    setOpen(true);
  };

  const handleEdit = (updatedEntry: PlantEncounter) => {
    const newEntry = { ...entryToEdit, ...updatedEntry };
    data.set(newEntry.id, newEntry);
    handleSetData(data);
    editPlant(updatedEntry);
  };

  const handleEditClose = () => {
    setOpen(false);
  };

  //handlers for adding to data state
  const handleAddEncounter = (newEncounter: PlantEncounter) => {
    data.set(newEncounter.id, newEncounter);
    handleSetData(data);
    addPlant(newEncounter);
  };

  const handleSetData = (data: Map<number, PlantEncounter>) => {
    const newData = new Map(data);
    setData(newData);
  };

  //handler for adding data to indexedDB
  async function addPlant(encounter: PlantEncounter) {
    try {
      const id = await db.plants.add(encounter);
      console.log("Added plant");
    } catch (error) {
      console.log(error);
    }
  }

  //handler for deleting items from indexedDB
  async function deletePlant(id: number) {
    router.push("/grid");
    await db.plants.delete(id);
  }

  //handler for editing items in indexedDB
  async function editPlant(encounter: PlantEncounter) {
    await db.plants.put(encounter);
  }

  return (
    <ThemeProvider theme={theme}>
      <Layout handleAddEncounter={handleAddEncounter}>
        <Component
          data={data}
          handleSetData={handleSetData}
          editOpen={open}
          handleEditOpen={handleEditOpen}
          deletePlant={deletePlant}
          editPlant={editPlant}
          {...pageProps}
        />
        <Edit
          editOpen={open}
          entryToEdit={entryToEdit}
          handleEditClose={handleEditClose}
          handleEdit={handleEdit}
        />
      </Layout>
    </ThemeProvider>
  );
}
