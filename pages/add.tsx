import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { PlantEncounter } from "./types";
import { useState } from "react";
import hash from 'hash-it';

export interface MyProps {
  handleClose: () => void;
  open: boolean;
  handleAdd: (newEncounter: PlantEncounter) => void;
}

export default function Add(props: MyProps) {
  const { handleClose, open, handleAdd } = props;
  const [formData, setFormData] = useState<PlantEncounter>({});

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": { bgcolor: "antiquewhite" },
      }}
    >
      <DialogTitle>Add entry</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This is a form for adding an entry.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="genus"
          label="Genus"
          type="text"
          fullWidth
          variant="standard"
          value={formData.genus ?? ""}
          onChange={(e) => setFormData({ ...formData, genus: e.target.value })}
          required
        />
        <TextField
          autoFocus
          margin="dense"
          id="species"
          label="Species"
          type="text"
          fullWidth
          variant="standard"
          value={formData.species ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, species: e.target.value })
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
          value={formData.commonName ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, commonName: e.target.value })
          }
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
             const id = hash(formData);
            handleAdd({...formData, id});
            handleClose();
          }}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}
