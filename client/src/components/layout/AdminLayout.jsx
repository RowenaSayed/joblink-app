import { Outlet } from "react-router-dom";
import NavbarMain from "../shared/NavbarMain";
import FooterAuth from "../shared/FooterAuth";

export default function AuthLayout() {
  return (
    <>
      <NavbarMain />
      <Outlet />
      <FooterAuth />
    </>
  );
}
