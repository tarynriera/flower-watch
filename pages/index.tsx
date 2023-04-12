import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Item from "@mui/material/Stack";
import Container from "@mui/material/Container";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import ViewListIcon from "@mui/icons-material/ViewList";
import MapIcon from "@mui/icons-material/Map";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import Map from "./map";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Flower Watch</title>
        <meta name="description" content="An app to track plants" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico\" />
      </Head>
      <Map />
    </>
  );
}
