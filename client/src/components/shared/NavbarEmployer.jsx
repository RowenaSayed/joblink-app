import { Link, useNavigate } from "react-router-dom";
import "../../assets/CSS/Navbar.css";

function NavbarEmployer() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-white border-bottom">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Link
          className="navbar-brand fw-bold d-flex align-items-center"
          to="/employer/dashboard"
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
              <Link className="nav-link active" to="/employer/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/employer/post-job">
                Post Job
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/employer/manage-jobs">
                Manage Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/employer/candidates">
                Find Candidates
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/employer/profile">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-link dropdown-toggle d-flex align-items-center text-decoration-none"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://i.pravatar.cc/40?img=12"
              className="rounded-circle me-2"
              width="36"
              height="36"
              alt="avatar"
            />
          </button>
          <ul className="dropdown-menu dropdown-menu-end" style={{maxWidth:'200px'}}>
            <li>
              <Link className="dropdown-item" to="/employer/profile">
                <i className="fas fa-user me-2"></i>Profile
              </Link>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button
                className="dropdown-item text-danger"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt me-2"></i>Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarEmployer;
