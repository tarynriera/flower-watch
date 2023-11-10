import { PlantEncounter } from "../common/types";
import dynamic from "next/dynamic";

const PlantMap = dynamic(() => import("../components/Map/index"), {
  ssr: false,
});

export interface MapProps {
  data: Map<number, PlantEncounter>;
}

export default function Map({ data }: MapProps) {
  return <PlantMap data={data} />;
}
