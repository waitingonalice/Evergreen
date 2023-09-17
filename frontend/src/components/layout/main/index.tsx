import { Outlet } from "react-router-dom";
import { SideBar } from "./Sidebar";

function Layout() {
  return (
    <main className="w-full min-w-fit">
      <SideBar />
      <Outlet />
    </main>
  );
}

export default Layout;
