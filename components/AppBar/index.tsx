import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MapIcon from "@mui/icons-material/Map";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "@mui/material";
import Add from "@/pages/add";
import { PlantEncounter } from "@/common/types";
import React from "react";

export interface AppBarProps {
  handleAddEncounter: (newEncounter: PlantEncounter) => void;
}

export default function HeaderAppBar({ handleAddEncounter }: AppBarProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 1140, margin: "auto" }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="map"
            href="/"
            sx={{ mr: 2 }}
          >
            <MapIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="grid"
            href="/grid"
            sx={{ mr: 2 }}
          >
            <GridViewRoundedIcon />
          </IconButton>
          <Link
            href={"/"}
            variant="h5"
            flexGrow={1}
            color={"inherit"}
            underline={"none"}
          >
            Flower Watch
          </Link>
          <IconButton
            color="inherit"
            aria-label="add"
            onClick={handleClickOpen}
          >
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Add
        handleClose={handleClose}
        handleAdd={handleAddEncounter}
        open={open}
      />
    </Box>
  );
}
