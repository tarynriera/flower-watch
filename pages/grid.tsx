import Grid from "@mui/material/Unstable_Grid2";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import { PlantEncounter } from "@/common/types";
import CardMedia from "@mui/material/CardMedia";

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  //padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  margin: "auto",
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
    <Grid
      container
      padding={3}
      spacing={{ xs: 2, md: 3, lg: 3 }}
      columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
      maxWidth={1140}
      margin={"auto"}
    >
      {gridData.map((entry, index) => (
        <Grid xs={4} sm={4} md={3} lg={3} key={index}>
          <Item
            sx={{
              maxWidth: 260,
              maxHeight: 350,
              minHeight: 240,
              minWidth: 215,
              flexShrink: 1,
            }}
          >
            <CardMedia sx={{ height: 260 }} image={entry.imgURL} />
            <CardContent>
              <Typography variant="h6">{entry.commonName}</Typography>
              <Typography variant="body2" fontStyle={"italic"}>
                {entry.genus} {entry.species}
              </Typography>
            </CardContent>
          </Item>
        </Grid>
      ))}
    </Grid>
  );
}
