import * as React from "react";
import { Box } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import ViewListIcon from "@mui/icons-material/ViewList";
import MapIcon from "@mui/icons-material/Map";
import Link from "next/link";
import List from "./list";
import { styled } from "@mui/material/styles";

export default function BottomNav() {
  const [value, setValue] = React.useState(0);

  return (
    <Box display="flex" justifyContent="center">
      <BottomNavigation
        showLabels
        value={value}
        sx={{
          bgcolor: "antiquewhite",
          borderRadius: 12,
          "& .Mui-selected": {
            color: "#869386",
          },
        }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Map"
          icon={<MapIcon />}
          href="/"
          LinkComponent={Link}
        />
        <BottomNavigationAction
          label="List"
          icon={<ViewListIcon />}
          href="/list"
          LinkComponent={Link}
        />
        <BottomNavigationAction label="Add" icon={<LocalFloristIcon />} />
      </BottomNavigation>
    </Box>
  );
}
