import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export interface MyProps {
  handleClose: () => void;
  open: boolean;
}

export default function Add(props: MyProps) {
  const { handleClose, open } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": { background: "antiquewhite" },
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
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Upload</Button>
      </DialogActions>
    </Dialog>
  );
}
