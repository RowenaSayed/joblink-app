import "../assets/CSS/LandingPage.css";
import { useState,useEffect } from "react";
import{Link} from 'react-router-dom'

export default function LandingPage() {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [activeGuide, setActiveGuide] = useState("jobseeker");

  useEffect(() => {
    const fetchRecentJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs/");
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();

        const recentJobs = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);

        setFeaturedJobs(recentJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchRecentJobs(); 
  }, []);

  return (
    <>
      {/* (token&&user.role=='jobseeker'&&)
      (token&&user.role=='jobseeker'&&)
      (token&&user.role=admin)
    (!token&&) */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 sticky-top">
        <div className="container">
          <Link
            className="navbar-brand fw-bold d-flex align-items-center"
            to="#"
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
              <li className="nav-item active">
                <Link className="nav-link fw-semibold text-dark" to="./">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-semibold text-muted" to="jobs">
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link fw-semibold text-muted"
                  to="/candidates"
                >
                  Candidates
                </Link>
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
                to="/signup"
                className="btn btn-primary-custom rounded-3 fw-bold px-4"
              >
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="min-vh-100 container-fluid">
        <section className="hero row justify-content-center d-flex align-items-center pt-5">
          <section className="container text-center py-5">
            <h1 className="display-4 fw-bold mb-4 text-white">
              Find Your Dream Job Today
            </h1>
            <p className="lead mb-5 text-white">
              Search through thousands of job listings to find the perfect match
              for your skills and career goals
            </p>
            <div className="row justify-content-center">
              <div className="col-11 col-lg-8 bg-light rounded-3 py-4 px-4 mx-auto">
                <form className="row g-2 align-items-center">
                  <div className="col-md-5 mb-2 mb-md-0">
                    <div className="input-group">
                      <span className="input-group-text bg-transparent border-end-0">
                        <i className="fas fa-search text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Job title, keywords, or company"
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mb-2 mb-md-0">
                    <div className="input-group">
                      <span className="input-group-text bg-transparent border-end-0">
                        <i className="fas fa-map-marker-alt text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="City, state, or remote"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <button className="btn btn-primary-custom w-100">
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </section>

        {/* <section className="stats-section py-5 bg-light">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-3 col-sm-6 mb-4 mb-md-0">
              <h2 className="fw-bold text-primary">50,000+</h2>
              <p className="text-muted">Job Listings</p>
            </div>
            <div className="col-md-3 col-sm-6 mb-4 mb-md-0">
              <h2 className="fw-bold text-primary">12,000+</h2>
              <p className="text-muted">Companies</p>
            </div>
            <div className="col-md-3 col-sm-6 mb-4 mb-md-0">
              <h2 className="fw-bold text-primary">8M+</h2>
              <p className="text-muted">Job Seekers</p>
            </div>
            <div className="col-md-3 col-sm-6">
              <h2 className="fw-bold text-primary">95%</h2>
              <p className="text-muted">Success Rate</p>
            </div>
          </div>
        </div>
      </section> */}

        <section className="jobs bg-white py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold text-dark">How JobLink Works</h2>
              <p className="text-muted">Get your dream job in 4 simple steps</p>
            </div>

            <div className="d-flex justify-content-center align-items-center gap-2 my-5">
              <button
                className={`guide-btn btn btn-outline-primary-custom ${
                  activeGuide === "jobseeker" ? "active" : ""
                }`}
                onClick={() => setActiveGuide("jobseeker")}
              >
                Jobseeker
              </button>
              <button
                className={`guide-btn btn btn-outline-primary-custom ${
                  activeGuide === "employer" ? "active" : ""
                }`}
                onClick={() => setActiveGuide("employer")}
              >
                Employer
              </button>
            </div>

            {activeGuide === "jobseeker" && (
              <div
                id="jobseekerCarousel"
                className="carousel slide guide-content active"
                data-bs-ride="false"
              >
                <div className="carousel-inner text-center">
                  <div className="carousel-item active">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                      className="d-block mx-auto mb-4 img-fluid"
                      alt="Create Account"
                      style={{ maxWidth: "100px", height: "auto" }}
                    />
                    <h5 className="fw-semibold">1. Create Your Account</h5>
                    <p
                      className="text-muted mx-auto"
                      style={{ maxWidth: "400px" }}
                    >
                      Sign up as jobseeker and set up your professional profile.
                    </p>
                  </div>

                  <div className="carousel-item">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3039/3039381.png"
                      className="d-block mx-auto mb-4 img-fluid"
                      alt="Browse Jobs"
                      style={{ maxWidth: "100px", height: "auto" }}
                    />
                    <h5 className="fw-semibold">2. Browse Jobs</h5>
                    <p
                      className="text-muted mx-auto"
                      style={{ maxWidth: "400px" }}
                    >
                      Explore thousands of opportunities from top companies.
                    </p>
                  </div>

                  <div className="carousel-item">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/942/942748.png"
                      className="d-block mx-auto mb-4 img-fluid"
                      alt="Apply Easily"
                      style={{ maxWidth: "100px", height: "auto" }}
                    />
                    <h5 className="fw-semibold">3. Apply Easily</h5>
                    <p
                      className="text-muted mx-auto"
                      style={{ maxWidth: "400px" }}
                    >
                      Submit your application in just a few clicks.
                    </p>
                  </div>

                  <div className="carousel-item">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3271/3271314.png"
                      className="d-block mx-auto mb-4 img-fluid"
                      alt="Get Hired"
                      style={{ maxWidth: "100px", height: "auto" }}
                    />
                    <h5 className="fw-semibold">4. Get Hired</h5>
                    <p
                      className="text-muted mx-auto"
                      style={{ maxWidth: "400px" }}
                    >
                      Connect with employers and start your new career journey.
                    </p>
                  </div>
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#jobseekerCarousel"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#jobseekerCarousel"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            )}

            {activeGuide === "employer" && (
              <div
                id="employerCarousel"
                className="carousel slide guide-content"
                data-bs-ride="false"
              >
                <div className="carousel-inner text-center">
                  <div className="carousel-item active">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3176/3176366.png"
                      className="d-block mx-auto mb-4 img-fluid"
                      alt="Create Company Account"
                      style={{ maxWidth: "100px", height: "auto" }}
                    />
                    <h5 className="fw-semibold">1. Create Company Account</h5>
                    <p
                      className="text-muted mx-auto"
                      style={{ maxWidth: "400px" }}
                    >
                      Register your company and set up your employer profile.
                    </p>
                  </div>

                  <div className="carousel-item">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
                      className="d-block mx-auto mb-4 img-fluid"
                      alt="Post Jobs"
                      style={{ maxWidth: "100px", height: "auto" }}
                    />
                    <h5 className="fw-semibold">2. Post Job Listings</h5>
                    <p
                      className="text-muted mx-auto"
                      style={{ maxWidth: "400px" }}
                    >
                      Create detailed job posts to attract qualified candidates.
                    </p>
                  </div>

                  <div className="carousel-item">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                      className="d-block mx-auto mb-4 img-fluid"
                      alt="Review Applications"
                      style={{ maxWidth: "100px", height: "auto" }}
                    />
                    <h5 className="fw-semibold">3. Review Applications</h5>
                    <p
                      className="text-muted mx-auto"
                      style={{ maxWidth: "400px" }}
                    >
                      Screen and filter applications from talented
                      professionals.
                    </p>
                  </div>

                  <div className="carousel-item">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/942/942748.png"
                      className="d-block mx-auto mb-4 img-fluid"
                      alt="Hire Talent"
                      style={{ maxWidth: "100px", height: "auto" }}
                    />
                    <h5 className="fw-semibold">4. Hire Top Talent</h5>
                    <p
                      className="text-muted mx-auto"
                      style={{ maxWidth: "400px" }}
                    >
                      Connect with the best candidates and grow your team.
                    </p>
                  </div>
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#employerCarousel"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#employerCarousel"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="jobs bg-light py-5">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
              <h2 className="fw-bold text-dark mb-2">Featured Jobs</h2>
              <Link to="/jobs" className="btn btn-outline-primary-custom mb-2">
                View All Jobs
              </Link>
            </div>
            <p className="text-muted mb-4">
              Browse through our most recent job openings
            </p>
            <div className="job-cards row align-items-stretch gy-4 gx-4">
              {featuredJobs.map((job) => (
                <div key={job._id} className="col-12 col-md-6 col-lg-6">
                  <div className="job-card card p-4 shadow rounded-3 border-0 h-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div className="company-logo me-3">
                          <img
                            src={
                              job.company.logo ||
                              "https://via.placeholder.com/60"
                            }
                            alt={`${job.company.name} Logo`}
                            style={{ height: "60px", width: "60px" }}
                            className="rounded"
                          />
                        </div>
                        <div>
                          <h5 className="mb-0">{job.title}</h5>
                          <div className="text-muted">
                            {job.company.name} · {job.location}
                          </div>
                        </div>
                      </div>
                      <div className="text-success">
                        <i className="fas fa-bookmark"></i>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div>
                        <span className="badge bg-light text-dark p-2">
                          {job.jobType}
                        </span>
                      </div>
                      <div className="text-success fw-bold">
                        {job.salary.currency || "USD"}{" "}
                        {job.salary.amount || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="pt-5 pb-3 bg-dark">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <h5 className="text-white mb-4">
                <i className="fas fa-link me-2 text-primary"></i>JobLink
              </h5>
              <p className="text-light">
                JobLink connects talented job seekers with top employers
                worldwide. Our mission is to make the job search process
                simpler, faster, and more effective.
              </p>
              <div className="d-flex mt-4">
                <a href="#" className="social-icon me-2 text-white">
                  <i className="fab fa-facebook-f text-white"></i>
                </a>
                <a href="#" className="social-icon me-2 text-white">
                  <i className="fab fa-twitter text-white"></i>
                </a>
                <a href="#" className="social-icon me-2">
                  <i className="fab fa-linkedin-in text-white"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-instagram text-white"></i>
                </a>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <h5 className="text-white mb-4">For Job Seekers</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-white-50 text-decoration-none">
                    Browse Jobs
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white-50 text-decoration-none">
                    Customize Jobs Alert
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white-50 text-decoration-none">
                    Submit Resume
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-4 mb-4">
              <h5 className="text-white mb-4">For Employers</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-white-50 text-decoration-none">
                    Post a Job
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white-50 text-decoration-none">
                    Browse Resumes
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white-50 text-decoration-none">
                    Recruitment Solutions
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white-50 text-decoration-none">
                    Schedule interviews
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr className="my-4 bg-white-50" />
        </div>
      </footer>
    </>
  );
}
