import Header from "./header";
import BottomNav from "./bottomNav";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <BottomNav />
    </>
  );
}
