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
import magnolia from "../public/starMagnolia.jpg";
import andromeda from "../public/japaneseAdromeda.jpg";
import starflower from "../public/starflower.jpg";
import bleedingheart from "../public/bleedingheart.jpg";
import scotchbroom from "../public/scotchbroom.jpg";
import astilbe from "../public/astilbe.jpg";
import lilac from "../public/lilac.jpg";
import cat from "../public/cat.jpg";

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

const demoData = [
  {
    id: 69420323,
    genus: "Magnolia",
    species: "stellata",
    commonName: "star magnolia",
    notes: "Early spring blooms, come in pink or white",
    lat: 39.946864,
    long: -75.209865,
    imgURL: magnolia.src,
  },
  {
    id: 694203231,
    genus: "Pieris",
    species: "japonica",
    commonName: "japanese andromeda",
    notes:
      "Evergreen shrub native to east Asia, produces bell-shaped blooms in early spring",
    lat: 39.9471,
    long: -75.20117,
    imgURL: andromeda.src,
  },
  {
    id: 694203232,
    genus: "Ipheion",
    species: "uniflorum",
    commonName: "spring starflower",
    notes:
      "Perennial bulb related to aliums, foliage has an onion-like scene when crushed",
    lat: 39.95168,
    long: -75.2156,
    imgURL: starflower.src,
  },
  {
    id: 694203233,
    genus: "Lamprocapnos",
    species: "spectabilis",
    commonName: "bleeding heart",
    notes:
      "Rhizomatous perennial with heart shaped flowers, formerly categorized under the genus Dicentra",
    lat: 39.94637,
    long: -75.20326,
    imgURL: bleedingheart.src,
  },
  {
    id: 694203234,
    genus: "Cytisus",
    species: "scoparius",
    commonName: "scotch broom",
    notes:
      "Considered invasive in some parts of North America, ornamental cultivars like this are sometimes used in gardens",
    lat: 39.95904,
    long: -75.20337,
    imgURL: scotchbroom.src,
  },
  {
    id: 694203235,
    genus: "Astilbe",
    species: "sp.",
    commonName: "astilbe",
    notes:
      "A summer bloom with unique feathery flowers, exact species and cultivar not known",
    lat: 39.95151,
    long: -75.20884,
    imgURL: astilbe.src,
  },
  {
    id: 694203236,
    genus: "Syringa",
    species: "vulgaris",
    commonName: "lilac",
    notes: "Spring bloom known for its scented flowers",
    lat: 39.95178,
    long: -75.21148,
    imgURL: lilac.src,
  },
  {
    id: 694203237,
    genus: "Felis",
    species: "catus",
    commonName: "cat",
    notes: "A friendly street cat photographed in front of a Datura shrub",
    lat: 39.95096,
    long: -75.2111,
    imgURL: cat.src,
  },
];

export default function App({ Component, pageProps }: AppProps) {
  // a map state that stores all entries
  const [data, setData] = useState<Map<number, PlantEncounter>>(new Map());
  // open state for the edit form
  const [open, setOpen] = useState(false);
  // state that holds the entry currently being edited
  const [entryToEdit, setEntryToEdit] =
    useState<PlantEncounter>(emptyPlantData);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // query for existing data, if none add demo entries
  const existingData = useLiveQuery(() => db.plants.toArray());

  useEffect(() => {
    if (existingData && existingData.length === 0) {
      demoData.forEach((demoEncounter) => addPlant(demoEncounter));
    }
  }, [existingData]);

  // fetch data from indexedDB
  const plants_array = useLiveQuery(() => db.plants.toArray());

  const router = useRouter();

  useEffect(() => {
    // generate new URLs for saved images
    if (!isDataLoaded && plants_array && plants_array.length > 0) {
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

  // handlers for opening and closing edit form
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

  // handlers for adding to data state
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
    } catch (error) {
      console.log(error);
    }
  }

  // handler for deleting items from indexedDB
  async function deletePlant(id: number) {
    router.push("/grid");
    await db.plants.delete(id);
  }

  // handler for editing items in indexedDB
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
