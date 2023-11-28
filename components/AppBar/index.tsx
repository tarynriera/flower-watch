import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MapIcon from "@mui/icons-material/Map";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "@mui/material";

export default function HeaderAppBar() {
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
          <IconButton color="inherit" aria-label="add">
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
