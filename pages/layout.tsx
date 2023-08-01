import Header from "./header";
import BottomNav from "./bottomNav";
import { PropsWithChildren } from "react";
import { PlantEncounter } from "../common/types";

type LayoutPropsWithChildren = PropsWithChildren<{
  handleAddEncounter: (newEncounter: PlantEncounter) => void;
}>;

export default function Layout({
  children,
  handleAddEncounter,
}: LayoutPropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <BottomNav handleAddEncounter={handleAddEncounter} />
    </>
  );
}
