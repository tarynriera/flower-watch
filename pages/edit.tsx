import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { PlantEncounter, emptyPlantData } from "./types";
import { useState, useEffect } from "react";

export interface EditProps {
  handleEditClose: () => void;
  entryToEdit: PlantEncounter;
  editOpen: boolean;
  handleEdit: (updatedEncounter: PlantEncounter) => void;
}

const emptyFormData = {
  id: undefined,
  genus: "",
  species: "",
  commonName: "",
  lat: undefined,
  long: undefined,
};

export default function Edit(props: EditProps) {
  const { editOpen, handleEditClose } = props;
  const [editFormData, setEditFormData] =
    useState<PlantEncounter>(emptyPlantData);
  const [genusError, setGenusError] = useState(false);
  const [commonNameError, setCommonNameError] = useState(false);
  useEffect(() => setEditFormData(props.entryToEdit), [props.entryToEdit]);

  function clearErrors() {
    setGenusError(false);
    setCommonNameError(false);
  }

  const handleEditSave = () => {
    // 1.1 Get updated form state & validate.
    if (editFormData.genus === "") {
      setGenusError(true);
    } else if (editFormData.commonName === "") {
      setCommonNameError(true);
    } else {
      // 1.2 Update the data state with the updated entry.
      props.handleEdit(editFormData);

      // 2. Clear errors & close the edit form .
      clearErrors();
      handleEditClose();
    }
  };

  return (
    <Dialog
      open={editOpen}
      onClose={handleEditClose}
      sx={{
        "& .MuiDialog-paper": { bgcolor: "antiquewhite" },
      }}
    >
      <DialogTitle>Edit entry</DialogTitle>
      <DialogContent>
        <DialogContentText>Edit your entry and click save.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="genus"
          label="Genus"
          type="text"
          fullWidth
          variant="standard"
          required
          value={editFormData.genus}
          onChange={(e) =>
            setEditFormData({ ...editFormData, genus: e.target.value })
          }
          error={genusError}
          FormHelperTextProps={{
            children: "Genus required",
            error: genusError,
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="species"
          label="Species"
          type="text"
          fullWidth
          variant="standard"
          value={editFormData.species ?? ""}
          onChange={(e) =>
            setEditFormData({ ...editFormData, species: e.target.value })
          }
        />
        <TextField
          autoFocus
          margin="dense"
          id="commonName"
          label="Common Name"
          type="text"
          fullWidth
          variant="standard"
          required
          value={editFormData.commonName}
          onChange={(e) =>
            setEditFormData({ ...editFormData, commonName: e.target.value })
          }
          error={commonNameError}
          FormHelperTextProps={{
            children: "If common name unknown, use Genus",
            error: commonNameError,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditClose}>Cancel</Button>
        <Button onClick={handleEditSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
