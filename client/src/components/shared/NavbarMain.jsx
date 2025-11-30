import React from 'react'
import {Link} from 'react-router-dom'

function NavbarMain() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 sticky-top">
      <div className="container">
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

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto me-auto">
            <li className="nav-item">
              <a className="nav-link fw-semibold text-muted" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold text-muted" href="/jobs">
                Jobs
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-semibold text-muted" href="/candidates">
                Candidates
              </a>
            </li>
          </ul>

          <div className="d-flex gap-3">
            <Link
              to="/login"
              className="btn btn-outline-primary-custom rounded-3 fw-bold px-4"
            >
              Sign In
            </Link>
            <Link
              to="/signup-employer"
              className="btn btn-primary-custom rounded-3 fw-bold px-4"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarMain
