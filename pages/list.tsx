import { Box } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

export default function List({ data }: any) {
  const rows: GridRowsProp = data;

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
