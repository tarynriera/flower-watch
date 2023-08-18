import Grid from "@mui/material/Unstable_Grid2";
import { Box, Card, CardContent } from "@mui/material";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import { PlantEncounter } from "@/common/types";

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export interface GridProps {
  data: Map<number, PlantEncounter>;
  handleSetData: (data: Map<number, PlantEncounter>) => void;
  handleEditOpen: (entryToEdit: PlantEncounter) => void;
  deletePlant: (id: number) => void;
}

export default function GridView({ data }: GridProps) {
  const gridData = Array.from(data.values());
  return (
    <Box padding={2} sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {gridData.map((entry, index) => (
          <Grid xs={2} sm={4} md={4} key={index}>
            <Item sx={{ maxWidth: 345 }}>
              <CardContent>
                <img
                  src={entry.imgURL}
                  style={{ width: "100px", height: "auto" }}
                ></img>
                <br />
                {entry.genus}, {entry.species} <br /> {entry.commonName} <br />
                {entry.notes}
              </CardContent>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
