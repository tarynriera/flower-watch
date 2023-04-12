import Header from "./header";
import BottomNav from "./bottomNav";

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <BottomNav />
    </>
  );
}
