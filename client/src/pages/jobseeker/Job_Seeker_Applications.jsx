import React, { useState, useEffect } from "react";
import "../../assets/CSS/job_seeker_applications.css";

function Job_Seeker_Applications() {
  const [filter, setFilter] = useState("all");
  const [applications, setApplications] = useState([]);
 
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
            localStorage.removeItem("token");
            throw new Error("Session expired. Please log in again.");
          }
          throw new Error(`Failed to fetch applications: ${response.status}`);
        }

        const data = await response.json();
        setApplications(data.applications || []);
      } catch (err) {
        console.log(err.message);
      } finally {
        console.log( false);
      }
    };

    fetchApplications();
  }, []);

  // فلترة التطبيقات بناءً على الحالة
  const filteredApps = applications.filter((app) => {
    if (filter === "all") return true;
    return app.status?.toLowerCase() === filter.toLowerCase();
  });

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "applied":
        return "status-applied";
      case "pending":
        return "status-pending";
      case "approved":
        return "status-approved";
      case "rejected":
        return "status-rejected";
      default:
        return "status-pending";
    }
  };

  
  

  return (
    

      <div className="applications-section">
        <h1>My Applications</h1>

        <div className="container mb-5 pb-5 extra-margin mt-4">
          <h2>Application History</h2>
          <p className="subtitle">Track the status of your applications.</p>

          <nav className="nav nav-pills flex-column flex-sm-row my-0 py-1 px-1 applications-filter">
            {["all", "applied", "pending", "approved", "rejected"].map(
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
                      <td>{app.job?.title || "N/A"}</td>
                      <td>
                        {app.job?.company?.name || app.job?.company || "N/A"}
                      </td>
                      <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`status-badge ${getStatusClass(
                            app.status
                          )}`}
                        >
                          {app.status || "Applied"}
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

   
   
  );
}

export default Job_Seeker_Applications;
