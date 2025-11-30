import React, { useState, useEffect } from "react";


function Analytics() {
  const [filter, setFilter] = useState("all");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/apps", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Session expired. Please log in again.");
          }
          throw new Error(`Failed to fetch applications: ${response.status}`);
        }

        const data = await response.json();
        setApplications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const filteredApps = applications.filter(
    (app) => filter === "all" || app.status === filter
  );

  if (loading)
    return (
      <div className="page2">
        <div className="container text-center mt-5">
          <div className="spinner-border" role="status"></div>
          <p className="mt-2">Loading applications...</p>
        </div>
    
      </div>
    );

  if (error)
    return (
      <div className="page2">
        <div className="container text-center mt-5">
          <div className="alert alert-danger">Error: {error}</div>
          <button
            className="btn btn-primary mt-2"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
        <Footer />
      </div>
    );

  return (
    <div className="page2">

      <div className="applications-section">
        <h1>My Applications</h1>

        <div className="container mb-5 pb-5 extra-margin mt-4">
          <h2>Application History</h2>
          <p className="subtitle">Track the status of your applications.</p>

          <nav className="nav nav-pills flex-column flex-sm-row my-0 py-1 px-1 applications-filter">
            {["all", "pending", "interviewing", "offered", "rejected"].map(
              (status) => (
                <a
                  key={status}
                  href="#"
                  className={`flex-sm-fill text-sm-center nav-link filter-btn ${
                    filter === status ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setFilter(status);
                  }}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </a>
              )
            )}
          </nav>

          <div className="table-responsive mt-3">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Date Applied</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.length > 0 ? (
                  filteredApps.map((app, idx) => (
                    <tr key={app._id || idx}>
                      <td>{app.jobId?.title || app.title || "N/A"}</td>
                      <td>
                        {app.jobId?.company?.name || app.company || "N/A"}
                      </td>
                      <td>
                        {new Date(
                          app.createdAt || app.date
                        ).toLocaleDateString()}
                      </td>
                      <td>
                        <span className={`badge ${app.status || "pending"}`}>
                          {(app.status || "pending").charAt(0).toUpperCase() +
                            (app.status || "pending").slice(1)}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No applications found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Analytics;
