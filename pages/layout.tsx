import Header from "./header";
import BottomNav from "./bottomNav";
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
      <HeaderAppBar />
      <main>{children}</main>
      <BottomNav handleAddEncounter={handleAddEncounter} />
    </>
  );
}
