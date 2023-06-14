import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { PlantEncounter } from "@/pages/types";

export interface PlantMapProps {
  data: Map<number, PlantEncounter>;
}

export default function PlantMap({ data }: PlantMapProps) {
  return (
    <MapContainer
      center={[39.953483394223255, -75.16256915174992]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "80vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[39.95, -75.21]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
