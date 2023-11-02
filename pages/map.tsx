import { PlantEncounter } from "../common/types";
import { NoSsr } from "@mui/material";
import PlantMap from "../components/Map/index";

export interface MapProps {
  data: Map<number, PlantEncounter>;
}

export default function Map({ data }: MapProps) {
  return (
    <NoSsr>
      <PlantMap data={data} />
    </NoSsr>
  );
}
