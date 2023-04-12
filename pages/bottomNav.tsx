import * as React from "react";
import { Box } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import ViewListIcon from "@mui/icons-material/ViewList";
import MapIcon from "@mui/icons-material/Map";
import Link from "next/link";
import List from "./list";

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  return (
    <Box display="flex" justifyContent="center">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Map" icon={<MapIcon />} />
        <BottomNavigationAction label="List" icon={<ViewListIcon />} />
        <BottomNavigationAction label="Add" icon={<LocalFloristIcon />} />
      </BottomNavigation>
    </Box>
  );
}
