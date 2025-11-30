import { Outlet } from "react-router-dom";
import NavbarJobseeker from "../shared/NavbarJobseeker";
import Footer from "../shared/Footer";

export default function AuthLayout() {
  return (
    <>
      <NavbarJobseeker />
      <Outlet />
      <Footer />
    </>
  );
}
