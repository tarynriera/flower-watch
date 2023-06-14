import { Box } from "@mui/material";
import { PlantEncounter } from "./types";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import dynamic from "next/dynamic";

export interface MapProps {
  data: Map<number, PlantEncounter>;
}

const PlantMap = dynamic(() => import("../components/Map/index"), {
  ssr: false,
});

export default function Map({ data }: MapProps) {
  return <PlantMap data={data} />;
}
