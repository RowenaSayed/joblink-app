import { Outlet } from "react-router-dom";
import NavbarEmployer from "../shared/NavbarEmployer";
import Footer from "../shared/Footer";

export default function EmployerLayout() {
  return (
    <>
      <NavbarEmployer />
      <Outlet />
      <Footer />
    </>
  );
}
