import { PlantEncounter } from "@/common/types";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useRouter } from "next/router";
import { NoSsr } from "@mui/material";
import DetailMap from "@/components/DetailMap";

export interface DetailProps {
  data: Map<number, PlantEncounter>;
}

export default function Detail({ data }: DetailProps) {
  const router = useRouter();
  const id = Number(router.query.id);
  const entry = data.get(id);
  if (entry != undefined) {
    return (
      <Grid
        container
        padding={3}
        spacing={{ xs: 2, md: 3, lg: 3 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}
        maxWidth={1140}
        margin={"auto"}
      >
        <Grid xs={4} sm={4} md={6} lg={6}>
          <Card
            sx={{
              //maxWidth: 500,
              //maxHeight: 500,
              minHeight: 240,
              minWidth: 215,
              flexShrink: 1,
              textAlign: "center",
              //margin: "auto",
            }}
          >
            <CardMedia sx={{ height: 260 }} image={entry?.imgURL} />
            <CardContent>
              <Typography variant="h6">{entry.commonName}</Typography>
              <Typography variant="body2" fontStyle={"italic"}>
                {entry.genus} {entry.species}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={4} sm={4} md={6} lg={6}>
          <NoSsr>
            <DetailMap entry={entry} />
          </NoSsr>
        </Grid>
        <Grid xs={8} sm={8} md={12} lg={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Notes: </Typography>
              <Typography variant="body1">{entry.notes}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
