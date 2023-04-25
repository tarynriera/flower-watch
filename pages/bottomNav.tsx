import * as React from "react";
import { Box } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import ViewListIcon from "@mui/icons-material/ViewList";
import MapIcon from "@mui/icons-material/Map";
import Link from "next/link";
import Add from "./add";

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box display="flex" justifyContent="center">
      <BottomNavigation
        showLabels
        value={value}
        sx={{
          bgcolor: "antiquewhite",
          borderRadius: 12,
          "& .Mui-selected, .Mui-selected > svg": {
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
        <BottomNavigationAction
          label="Add"
          icon={<LocalFloristIcon />}
          onClick={handleClickOpen}
        />
      </BottomNavigation>
      <Add handleClose={handleClose} open={open} />
    </Box>
  );
}
