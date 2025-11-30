import "../../assets/CSS/job-seeker-dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  // Fetch Jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/jobs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      }
    };

    fetchJobs();
  }, []);

  // Search Function - FIXED
  const handleSearch = (e) => {
    e.preventDefault();

    const searchData = {
      keyword: keyword.trim(),
      location: location.trim(),
    };

    // Only navigate with search data if we have actual search terms
    if (searchData.keyword || searchData.location) {
      navigate("/job-seeker/jobs", {
        state: searchData,
      });
    } else {
      // If no search criteria, navigate without state (empty search)
      navigate("/job-seeker/jobs");
    }
  };

  // Clear search and go to all jobs
  const viewAllJobs = () => {
    setKeyword("");
    setLocation("");
    navigate("/jobs");
  };

  return (
    <main className="container-xl px-5 py-md-5">
      {/* Hero */}
      <section className="hero jobseeker p-4 p-md-5 mb-4 d-flex align-items-center justify-content-between">
        <div>
          <div className="text-muted small">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <h1 className="fw-bold mt-1 mb-0" style={{ letterSpacing: "-0.3px" }}>
            Good Morning, <strong className="text-primary">Jobseeker!</strong>
          </h1>
        </div>

        <div
          className="d-none d-md-flex align-items-center justify-content-center bg-white rounded-4 overflow-hidden"
          style={{
            width: "120px",
            height: "80px",
            border: "1px dashed #e5e7eb",
          }}
        ></div>
      </section>

      {/* Search Bar */}
      <section className="searchbar my-3 my-md-4 d-flex justify-content-center">
        <form
          className="input-group search-box shadow-sm"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            className="form-control border-end-0"
            placeholder="Job title, type, or company..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <input
            type="text"
            className="form-control border-start-0 border-end-0"
            placeholder="Location (e.g., Remote, NY)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button className="btn btn-primary px-4" type="submit">
            <i className="bi bi-search text-light me-2"></i>
          </button>
        </form>
      </section>

      {/* Recommended Jobs */}
      <section className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Recommended Jobs</h5>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={viewAllJobs}
          >
            View All Jobs
          </button>
        </div>

        <div className="row g-3 g-md-4">
          {jobs.length === 0 ? (
            <div className="col-12 text-center py-4">
              <p className="text-muted">No jobs available at the moment.</p>
            </div>
          ) : (
            jobs.slice(0, 4).map((job) => (
              <div className="col-12 col-md-6" key={job._id}>
                <div className="card job-card h-100 rounded-4 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-start justify-content-between">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="rounded-circle bg-light overflow-hidden d-grid place-items-center"
                          style={{ width: "42px", height: "42px" }}
                        >
                          <img
                            src={
                              job.company?.logo ||
                              job.img ||
                              "/default-company.jpg"
                            }
                            alt="Company Logo"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>

                        <div>
                          <div className="job-title fw-bold">{job.title}</div>
                          <div className="job-meta text-muted small">
                            {job.company?.name || job.company} • {job.type} •{" "}
                            {job.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 mb-3 text-secondary">
                      {job.description?.slice(0, 120)}...
                    </p>

                    <div className="d-flex align-items-center justify-content-between">
                      <div className="salary text-muted small">
                        <i className="bi bi-cash-coin me-1"></i>$
                        {job.salary?.min} - ${job.salary?.max}{" "}
                        {job.salary?.currency || "USD"}
                      </div>

                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => navigate(`/job/${job._id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
