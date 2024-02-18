import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MapIcon from "@mui/icons-material/Map";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import AddIcon from "@mui/icons-material/Add";
import { Link as MuiLink } from "@mui/material";
import Add from "@/pages/add";
import { PlantEncounter } from "@/common/types";
import React from "react";
import { LinkOffTwoTone } from "@mui/icons-material";
import Link from "next/link";

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
            LinkComponent={Link}
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
            LinkComponent={Link}
            sx={{ mr: 2 }}
          >
            <GridViewRoundedIcon />
          </IconButton>
          <MuiLink
            href="/"
            variant="h5"
            flexGrow={1}
            color={"inherit"}
            underline={"none"}
            component={Link}
          >
            Flower Watch
          </MuiLink>
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
