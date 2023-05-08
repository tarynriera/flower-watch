import * as React from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import Map from "./map";
import { PlantEncounter } from "./types";

const inter = Inter({ subsets: ["latin"] });

export interface HomeProps {
  data: Array<PlantEncounter>;
}

export default function Home({ data }: HomeProps) {
  return (
    <>
      <Head>
        <title>Flower Watch</title>
        <meta name="description" content="An app to track plants" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico\" />
      </Head>
      <Map data={data} />
    </>
  );
}
