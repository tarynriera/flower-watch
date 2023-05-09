import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./layout";
import { PlantEncounter } from "./types";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [data, setData] = useState<Array<PlantEncounter>>([]);

  const handleAddEncounter = (newEncounter: PlantEncounter) => {
    setData([newEncounter, ...data]);
  };

  const handleSetData = (data: PlantEncounter[]) => {
    setData(data);
  };

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
      <Component data={data} handleSetData={handleSetData} {...pageProps} />
    </Layout>
  );
}
