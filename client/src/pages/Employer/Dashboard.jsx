import React from "react";
import { Link } from "react-router-dom";
import '../../assets/CSS/EmployerDashboard.css'
import {
  BsBriefcaseFill,
  BsPeopleFill,
  BsCalendarEventFill,
  BsBarChartLineFill,
  BsArrowRightCircleFill,
  BsPlusCircle,
  BsPeople,
} from "react-icons/bs";

function EmployerDashboard() {
  return (
    <div className="dashboard d-flex flex-column min-vh-100">
      <main className="container-fluid flex-grow-1">
        {/* Welcome Section */}
        <section className="row py-5" height="100vh">
          <div className="welcome shadow-sm py-3 col-md-8 col-11 mx-auto text-center">
            <h1 className="fw-bold">
              <span className="fw-normal">Welcome, JobLink</span>{" "}
              <strong style={{ color: "#2b5091" }}>Employer!</strong>
            </h1>
            <p className="fs-6 text-secondary fw-normal">
              Here's a snapshot of your hiring activity.
            </p>
          </div>
        </section>

        {/* Cards Section */}
        <section className="cards row p-5 bg-light g-2">
          <div className="col-md-3">
            <div className="card shadow-sm border-0 rounded-3 p-3">
              <div className="card-body text-center">
                <div className="d-flex align-items-center gap-2 mb-2 justify-content-center">
                  <BsBriefcaseFill className="fs-5 text-dark" />
                  <span className="fw-semibold">Jobs Posted</span>
                </div>
                <h2 className="fw-bold mb-0">12</h2>
                <small className="text-success">+2 since last month</small>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 rounded-3 p-3">
              <div className="card-body text-center">
                <div className="d-flex align-items-center gap-2 mb-2 justify-content-center">
                  <BsPeopleFill className="fs-5 text-dark" />
                  <span className="fw-semibold">New Applicants</span>
                </div>
                <h2 className="fw-bold mb-0">78</h2>
                <small className="text-success">+5 Today</small>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 rounded-3 p-3">
              <div className="card-body text-center">
                <div className="d-flex align-items-center gap-2 mb-2 justify-content-center">
                  <BsCalendarEventFill className="fs-5 text-dark" />
                  <span className="fw-semibold">Pending Interviews</span>
                </div>
                <h2 className="fw-bold mb-0">5</h2>
                <small className="text-warning">Next one tomorrow</small>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 rounded-3 p-3">
              <div className="card-body text-center">
                <div className="d-flex align-items-center gap-2 mb-2 justify-content-center">
                  <BsBarChartLineFill className="fs-5 text-dark" />
                  <span className="fw-semibold">Hiring Progress</span>
                </div>

                <div>
                  <span className="fw-normal mb-0 fs-5 text-secondary">
                    75%
                  </span>
                  <progress
                    min="0"
                    max="1"
                    value=".75"
                    className="ms-2"
                  ></progress>
                </div>

                <small className="text-success">
                  Avg. Time to Hire: 25 days
                </small>
              </div>
            </div>
          </div>

          <div className="col-12 py-3 mt-3 text-center">
            <Link
              to="/analytics"
              className="btn btn-lg px-4 px-md-5 py-2 rounded-5 d-inline-flex align-items-center gap-2 text-white fs-md-3"
              style={{ backgroundColor: "#284c8a" }}
            >
              Get more <strong className="fw-bold">Insights!</strong>
              <BsArrowRightCircleFill className="fs-4" />
            </Link>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="container my-5">
          <h5 className="fw-bold mb-4 text-light">Quick Actions</h5>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="card shadow-sm border-0 h-100 text-center p-4">
                <div className="mb-3">
                  <BsPlusCircle className="fs-1 text-primary" />
                </div>
                <h5 className="fw-semibold">Post a New Job</h5>
                <p className="text-muted small mb-4">
                  Attract top talent with a new job listing.
                </p>
                <Link to="/post-job" className="btn btn-outline-primary px-4">
                  Post Job
                </Link>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm border-0 h-100 text-center p-4">
                <div className="mb-3">
                  <BsPeople className="fs-1 text-success" />
                </div>
                <h5 className="fw-semibold">Review Applicants</h5>
                <p className="text-muted small mb-4">
                  View and manage all applications received.
                </p>
                <Link className="btn btn-outline-secondary px-4">
                  View Applicants
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="container-fluid mt-5 bg-light py-3 px-md-0 px-4 py-md-5 rounded-top-2">
          <h5 className="fw-bold mb-4 container text-dark">
            Your Recent Job Postings
          </h5>

          <div className="row">
            <div className="col-12 col-md-11 mx-auto bg-white rounded-3 shadow-sm p-4">
              {/* Job Item */}
              {[
                {
                  title: "Senior Software Engineer",
                  count: 34,
                  status: "Active",
                  color: "text-primary",
                },
                {
                  title: "UX/UI Designer",
                  count: 18,
                  status: "Paused",
                  color: "text-secondary",
                },
                {
                  title: "Product Manager",
                  count: 52,
                  status: "Closed",
                  color: "text-danger",
                },
                {
                  title: "Data Analyst Intern",
                  count: 12,
                  status: "Active",
                  color: "text-primary",
                },
                {
                  title: "Marketing Specialist",
                  count: 0,
                  status: "Draft",
                  color: "text-dark",
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center border-bottom pb-3 mb-3 px-md-3"
                >
                  <div>
                    <h6 className="fw-semibold mb-1">{job.title}</h6>
                    <small className="text-muted">{job.count} Applicants</small>
                  </div>

                  <div className="d-flex flex-wrap align-items-center gap-2 mt-2 mt-md-0">
                    <span
                      className={`badge rounded-pill bg-light ${job.color} px-3 py-2`}
                    >
                      {job.status}
                    </span>

                    <Link className="btn btn-outline-primary btn-sm rounded-pill px-3">
                      View Applicants
                    </Link>

                    <Link className="btn btn-outline-secondary btn-sm rounded-pill px-3">
                      Edit Job
                    </Link>
                  </div>
                </div>
              ))}

              <div className="px-3 mt-3">
                <Link to="/manage-jobs" className="text-primary">
                  Show more...
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default EmployerDashboard;
