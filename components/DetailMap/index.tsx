import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { PlantEncounter } from "@/common/types";

export interface DetailMapProps {
  entry: PlantEncounter;
}

export default function DetailMap({ entry }: DetailMapProps) {
  return (
    <MapContainer
      center={[entry.lat, entry.long]}
      zoom={16}
      scrollWheelZoom={false}
      style={{
        height: "500px",
        width: "500px",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "2rem",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[entry.lat, entry.long]}></Marker>
    </MapContainer>
  );
}
