import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./layout";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [data, setData] = useState<
    Array<{
      id: number;
      genus: string;
      species: string;
      commonName: string;
      lat: number;
      long: number;
    }>
  >([]);

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
    <Layout>
      <Component data={data} {...pageProps} />
    </Layout>
  );
}
