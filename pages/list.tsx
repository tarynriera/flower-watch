import { Box } from "@mui/material";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { PlantEncounter } from "./types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

export interface ListProps {
  data: Array<PlantEncounter>;
}

function placeholderClick() {
  return;
}

export default function List({ data }: ListProps) {
  const rows: GridRowsProp = data;

  const columns: GridColDef[] = [
    { field: "genus", headerName: "Genus" },
    { field: "species", headerName: "Species" },
    { field: "commonName", headerName: "Common Name", flex: 1 },
    { field: "lat", headerName: "Latitude" },
    { field: "long", headerName: "Longitude" },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={placeholderClick}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={placeholderClick}
            color="inherit"
          />,
        ];
      },
    },
  ];

  //const handleDeleteClick = (id: GridRowId) => () => {
  //setRows(rows.filter((row) => row.id !== id));
  //};

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
