import { Outlet } from "react-router-dom";
import { Topbar, NavMenu } from "~/components";

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
