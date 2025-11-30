import './../../assets/CSS/Navbar.css'
import {Link} from 'react-router-dom'

export default function NavbarJobseeker() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-white border-bottom">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Logo */}
        <Link
          className="navbar-brand fw-bold d-flex align-items-center"
          to="/jobseeker/dashboard"
        >
          <i
            className="fa-solid fa-link ms-md-5"
            style={{ color: "#284C99" }}
          ></i>
          <span>JobLink</span>
        </Link>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav mx-auto gap-md-2">
            <li className="nav-item">
              <Link className="nav-link" to="/jobseeker/dashboard">
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/jobseeker/jobs">
                Jobs
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/jobseeker/apps">
                Applications
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/jobseeker/saved-jobs">
                Saved-Jobs
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/jobseeker/alerts">
                Job Alerts
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/jobseeker/profile">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Icons */}
        <div className="d-flex align-items-center gap-3 ms-2">
          <Link className="position-relative" to="/jobseeker/notifications">
            <i className="bi bi-bell fs-5"></i>
          </Link>

          <img
            src="https://i.pravatar.cc/40?img=12"
            className="rounded-circle"
            width="36"
            height="36"
            alt="avatar"
          />
        </div>
      </div>
    </nav>
  );
}
