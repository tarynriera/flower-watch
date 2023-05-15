import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { PlantEncounter } from "./types";
import { useState } from "react";

export interface EditProps {
  handleEditOpen: () => void;
  handleEditClose: () => void;
  editOpen: boolean;
}

export default function Edit(props: EditProps) {
  const { editOpen, handleEditClose, handleEditOpen } = props;
  function placeholderClick() {
    return;
  }
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
          //value={formData.genus ?? ""}
          //onChange={(e) => setFormData({ ...formData, genus: e.target.value })}
          //error={genusError}
        />
        <TextField
          autoFocus
          margin="dense"
          id="species"
          label="Species"
          type="text"
          fullWidth
          variant="standard"
          //value={formData.species ?? ""}
          //onChange={(e) =>
          //setFormData({ ...formData, species: e.target.value })
          //}
        />
        <TextField
          autoFocus
          margin="dense"
          id="commonName"
          label="Common Name"
          type="text"
          fullWidth
          variant="standard"
          //value={formData.commonName ?? ""}
          //onChange={(e) =>
          //setFormData({ ...formData, commonName: e.target.value })
          //}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditClose}>Cancel</Button>
        <Button onClick={placeholderClick}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
