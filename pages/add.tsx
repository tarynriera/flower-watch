import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { PlantEncounter, emptyPlantData } from "../common/types";
import { useState } from "react";
import hash from "hash-it";
import { ExpandedTags } from "exifreader";
import dynamic from "next/dynamic";

// server side rendering is disabled for components using libraries that need a browser context (heic2any, exif reader)
const FilePicker = dynamic(() => import("../components/FilePicker/index"), {
  ssr: false,
});

type Location = {
  lat: number;
  long: number;
};

export interface AddProps {
  handleClose: () => void;
  open: boolean;
  handleAdd: (newEncounter: PlantEncounter) => void;
}

export default function Add(props: AddProps) {
  const { handleClose, open, handleAdd } = props;
  const [formData, setFormData] = useState<PlantEncounter>(emptyPlantData);
  const [genusError, setGenusError] = useState(false);
  const [commonNameError, setCommonNameError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [imageData, setImageData] = useState({});
  const [locationData, setLocationData] = useState<Location | null>(null);

  function clearErrors() {
    setGenusError(false);
    setCommonNameError(false);
    setLocationError(false);
  }

  function handleSubmit() {
    // check for required fields
    if (formData.genus === "") {
      setGenusError(true);
    } else if (formData.commonName === "") {
      setCommonNameError(true);
    } else if (
      // check for location data either from image or form if not present
      locationData === null &&
      (formData.lat === null || formData.long === null)
    ) {
      setLocationError(true);
    } else {
      const id = hash(formData);
      const location = locationData ?? {
        lat: formData.lat,
        long: formData.long,
      };
      // add the data and reset the form
      handleAdd({ ...formData, ...imageData, ...location, id });
      setFormData(emptyPlantData);
      setLocationData(null);
      setImageData({});
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
      setLocationData({
        lat: tags.gps.Latitude,
        long: tags.gps.Longitude,
      });
    }
    setImageData({
      imgURL: previewImageURL,
      imgBlob: imgBlob,
    });
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
        {/* lat and long fields are conditionally rendered if uploaded image has no gps data */}
        {locationError && (
          <>
            <DialogContentText>
              No location data found. Please add latitude and longitude.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="latitude"
              label="Latitude"
              type="number"
              fullWidth
              variant="standard"
              value={formData.lat ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, lat: Number(e.target.value) })
              }
              required
              error={locationError}
            />
            <TextField
              autoFocus
              margin="dense"
              id="longitude"
              label="Longitude"
              type="number"
              fullWidth
              variant="standard"
              value={formData.long ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, long: Number(e.target.value) })
              }
              required
              error={locationError}
            />
          </>
        )}
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
