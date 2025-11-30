import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="py-3 shadow-sm border-top bg-light mt-auto sticky-bottom">
      <div className="container d-flex flex-wrap align-items-center justify-content-between gap-2">
        <div className="footer-links d-flex gap-3 small mx-auto mx-md-0">
          <Link to="/" className="text-decoration-none text-muted fw-bold">
            JobLink
          </Link>

          <Link
            to="/jobseeker-dashboard"
            className="text-decoration-none text-muted fw-bold"
          >
            For Job Seekers
          </Link>

          <Link
            to="/employer-dashboard"
            className="text-decoration-none text-muted fw-bold"
          >
            For Employers
          </Link>

          <Link
            to="/admin-dashboard"
            className="text-decoration-none text-muted fw-bold"
          >
            For Admins
          </Link>

          <Link
            to="/resources"
            className="text-decoration-none text-muted fw-bold"
          >
            Resources
          </Link>
        </div>

        <div className="d-flex align-items-center gap-3 mx-auto mx-md-0">
          <i className="bi bi-facebook"></i>
          <i className="bi bi-twitter"></i>
          <i className="bi bi-github"></i>
          <i className="bi bi-instagram"></i>
          <i className="bi bi-youtube"></i>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
