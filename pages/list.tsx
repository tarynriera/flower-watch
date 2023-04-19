import { Box } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

export default function List() {
  const rows: GridRowsProp = [
    {
      id: 1,
      genus: "Galanthus",
      species: "nivalis",
      commonName: "snowdrop",
      lat: 39.95,
      long: -75.21,
    },
    {
      id: 2,
      genus: "Crocus",
      species: "sativus",
      commonName: "crocus",
      lat: 39.95,
      long: -75.21,
    },
    {
      id: 3,
      genus: "Helleborus",
      species: null,
      commonName: "lenten rose",
      lat: 39.95,
      long: -75.21,
    },
    {
      id: 4,
      genus: "Pieris",
      species: "japonica",
      commonName: "Japanese andromeda",
      lat: 39.95,
      long: -75.21,
    },
  ];

  const columns: GridColDef[] = [
    { field: "genus", headerName: "Genus" },
    { field: "species", headerName: "Species" },
    { field: "commonName", headerName: "Common Name", flex: 1 },
    { field: "lat", headerName: "Latitude" },
    { field: "long", headerName: "Longitude" },
  ];

  return (
    <Box
      display="flex"
      height={500}
      width={600}
      margin="auto"
      color="antiquewhite"
      padding={2}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{ borderColor: "antiquewhite" }}
      />
    </Box>
  );
}
