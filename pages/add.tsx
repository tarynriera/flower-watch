import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import { PlantEncounter, emptyPlantData } from "../common/types";
import { useState } from "react";
import hash from "hash-it";
import { ExpandedTags } from "exifreader";
import dynamic from "next/dynamic";

//server side rendering is disabled for components using libraries that need a browser context (heic2any, exif reader)
const FilePicker = dynamic(() => import("../components/FilePicker/index"), {
  ssr: false,
});

export interface MyProps {
  handleClose: () => void;
  open: boolean;
  handleAdd: (newEncounter: PlantEncounter) => void;
}

export default function Add(props: MyProps) {
  const { handleClose, open, handleAdd } = props;
  const [formData, setFormData] = useState<PlantEncounter>(emptyPlantData);
  const [genusError, setGenusError] = useState(false);
  const [commonNameError, setCommonNameError] = useState(false);
  const [imageData, setImageData] = useState({});

  function clearErrors() {
    setGenusError(false);
    setCommonNameError(false);
  }

  function handleSubmit() {
    if (formData.genus === "") {
      setGenusError(true);
    } else if (formData.commonName === "") {
      setCommonNameError(true);
    } else {
      const id = hash(formData);
      handleAdd({ ...formData, ...imageData, id });
      setFormData(emptyPlantData);
      clearErrors();
      handleClose();
    }
  }

  function handleImageUpload(
    tags: ExpandedTags,
    previewImageURL: string,
    imgBlob: Blob
  ) {
    if (tags.gps && tags.gps.Longitude && tags.gps.Latitude) {
      const newImageData = {
        lat: tags.gps.Latitude,
        long: tags.gps.Longitude,
        imgURL: previewImageURL,
        imgBlob: imgBlob,
      };
      setImageData(newImageData);
    }
  }

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
        <FilePicker accept={["*"]} onUpload={handleImageUpload}></FilePicker>
        <br />
        <DialogContentText>
          Upload a photo and record the Genus, species (if known), and common
          name.
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
          error={commonNameError}
          FormHelperTextProps={{
            children: "If common name unknown, use Genus",
            error: commonNameError,
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="notes"
          label="Notes"
          type="text"
          fullWidth
          variant="standard"
          multiline
          rows={4}
          value={formData.notes ?? ""}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setFormData(emptyPlantData);
            clearErrors();
            handleClose();
          }}
        >
          Cancel
        </Button>
        <Button onClick={() => handleSubmit()}>Upload</Button>
      </DialogActions>
    </Dialog>
  );
}
