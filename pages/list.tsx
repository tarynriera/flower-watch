import { Box } from "@mui/material";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
} from "@mui/x-data-grid";
import { PlantEncounter, emptyPlantData } from "../common/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

export interface ListProps {
  data: Map<GridRowId, PlantEncounter>;
  handleSetData: (data: Map<GridRowId, PlantEncounter>) => void;
  handleEditOpen: (entryToEdit: PlantEncounter) => void;
  deletePlant: (id: GridRowId) => void;
}

export default function List({
  data,
  handleSetData,
  handleEditOpen,
  deletePlant,
}: ListProps) {
  const rows: GridRowsProp = Array.from(data.values());

  const handleDeleteClick = (id: GridRowId) => () => {
    data.delete(id);
    handleSetData(data);
    deletePlant(id);
  };

  const handleEditClick = (id: GridRowId) => () => {
    const entryToEdit = data.get(id);
    entryToEdit ? handleEditOpen(entryToEdit) : null;
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
            key={id}
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      display="flex"
      height={600}
      width={700}
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
