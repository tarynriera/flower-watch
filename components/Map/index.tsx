import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { PlantEncounter } from "@/common/types";
import Link from "next/link";
import L from "leaflet";

export interface PlantMapProps {
  data: Map<number, PlantEncounter>;
}

export default function PlantMap({ data }: PlantMapProps) {
  const markerData = Array.from(data.values());
  const markers = markerData.map((marker) => {
    return (
      <Marker key={marker.id} position={[marker.lat, marker.long]}>
        <Popup>
          <img
            src={marker.imgURL}
            style={{ width: "100px", height: "auto" }}
          ></img>
          <br />
          {marker.genus}, {marker.species}
          <br />
          {marker.commonName}
          <br />
          <Link href={`/detail/${marker.id}`}>See more</Link>
        </Popup>
      </Marker>
    );
  });

  const bounds = L.latLngBounds(markerData.map((x) => [x.lat, x.long]));

  return (
    <MapContainer
      center={
        bounds.isValid() ? undefined : [39.953483394223255, -75.16256915174992]
      }
      bounds={bounds.isValid() ? bounds : undefined}
      boundsOptions={{ padding: [20, 20] }}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        height: "600px",
        width: "1140px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "24px",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
    </MapContainer>
  );
}
