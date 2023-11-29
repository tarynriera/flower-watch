import { PropsWithChildren } from "react";
import { PlantEncounter } from "../common/types";
import HeaderAppBar from "@/components/AppBar";

type LayoutPropsWithChildren = PropsWithChildren<{
  handleAddEncounter: (newEncounter: PlantEncounter) => void;
}>;

export default function Layout({
  children,
  handleAddEncounter,
}: LayoutPropsWithChildren) {
  return (
    <>
      <HeaderAppBar handleAddEncounter={handleAddEncounter} />
      <main>{children}</main>
    </>
  );
}
