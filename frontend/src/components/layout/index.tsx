import { Outlet } from "react-router-dom";
import { NavMenu, Topbar } from "~/components";

function Layout() {
  return (
    <>
      <Topbar />
      <NavMenu />
      <Outlet />
    </>
  );
}

export default Layout;
