import { Box } from "@mui/material";
import { PlantEncounter } from "./types";

export interface MapProps {
  data: Array<PlantEncounter>
}

export default function Map({ data }: MapProps) {
  return (
    <Box
      justifyContent="center"
      display="flex"
      minHeight="50vh"
      alignItems="center"
    >
      <p>MAP</p>
    </Box>
  );
}
