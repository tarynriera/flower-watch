import { Box } from "@mui/material";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
} from "@mui/x-data-grid";
import { PlantEncounter } from "./types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

export interface ListProps {
  data: Array<PlantEncounter>;
  handleSetData: (data: Array<PlantEncounter>) => void;
}

function placeholderClick() {
  return;
}

export default function List({ data, handleSetData }: ListProps) {
  const rows: GridRowsProp = data;

  const handleDeleteClick = (id: GridRowId) => () => {
    handleSetData(data.filter((row) => row.id !== id));
  };

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
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
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
