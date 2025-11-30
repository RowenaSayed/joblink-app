import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/CSS/Jobs.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    type: [],
    location: "",
    salaryMin: "",
    salaryMax: "",
    experience: "",
    company: "",
    keyword: "",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/jobs");
        const data = await res.json();
        setJobs(data);

        if (
          location.state &&
          (location.state.keyword || location.state.location)
        ) {
          const { keyword = "", location: searchLocation = "" } =
            location.state;
          setFilters((prev) => ({
            ...prev,
            keyword: keyword.trim(),
            location: searchLocation.trim(),
          }));
        } else {
          setFilteredJobs(data);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [location.state]);

  useEffect(() => {
    let tempJobs = [...jobs];

    if (filters.keyword && filters.keyword.trim()) {
      const keywordLower = filters.keyword.toLowerCase().trim();
      tempJobs = tempJobs.filter((job) => {
        const searchableText = [
          job.title,
          job.description,
          job.company?.name,
          job.company,
          job.type,
          job.category,
          job.industry,
          job.requirements,
          job.responsibilities,
          job.skills
            ? Array.isArray(job.skills)
              ? job.skills.join(" ")
              : job.skills.toString()
            : "",
          job.tags
            ? Array.isArray(job.tags)
              ? job.tags.join(" ")
              : job.tags.toString()
            : "",
        ]
          .filter((field) => field && field.toString().trim())
          .map((field) => field.toString().toLowerCase())
          .join(" ");

        return searchableText.includes(keywordLower);
      });
    }

    if (filters.type.length > 0) {
      tempJobs = tempJobs.filter((job) => filters.type.includes(job.type));
    }

    if (filters.location && filters.location.trim()) {
      const locationLower = filters.location.toLowerCase().trim();
      tempJobs = tempJobs.filter((job) =>
        job.location?.toLowerCase().includes(locationLower)
      );
    }

    if (filters.salaryMin) {
      tempJobs = tempJobs.filter(
        (job) => job.salary?.min >= Number(filters.salaryMin)
      );
    }
    if (filters.salaryMax) {
      tempJobs = tempJobs.filter(
        (job) => job.salary?.max <= Number(filters.salaryMax)
      );
    }

    if (filters.experience && filters.experience.trim()) {
      const experienceLower = filters.experience.toLowerCase().trim();
      tempJobs = tempJobs.filter((job) =>
        job.experience?.toLowerCase().includes(experienceLower)
      );
    }

    if (filters.company && filters.company.trim()) {
      const companyLower = filters.company.toLowerCase().trim();
      tempJobs = tempJobs.filter(
        (job) =>
          job.company?.name?.toLowerCase().includes(companyLower) ||
          job.company?.toLowerCase().includes(companyLower)
      );
    }

    setFilteredJobs(tempJobs);
  }, [filters, jobs]);

  const toggleJobType = (type) => {
    setFilters((prev) => ({
      ...prev,
      type: prev.type.includes(type)
        ? prev.type.filter((t) => t !== type)
        : [...prev.type, type],
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: [],
      location: "",
      salaryMin: "",
      salaryMax: "",
      experience: "",
      company: "",
      keyword: "",
    });
  };

  const clearKeyword = () => {
    setFilters((prev) => ({
      ...prev,
      keyword: "",
    }));
  };

  const hasActiveFilters = () => {
    return (
      filters.type.length > 0 ||
      filters.location ||
      filters.salaryMin ||
      filters.salaryMax ||
      filters.experience ||
      filters.company ||
      filters.keyword
    );
  };

  if (loading) return <p className="text-center mt-5">Loading jobs...</p>;

  return (
    <main className="flex-grow-1">
      <div className="container-fluid my-4">
        <div className="row">
          <div className="col-lg-3 col-md-4 mb-3">
            <div
              className="card shadow-sm rounded-4 p-3 sticky-top"
              style={{ top: "80px" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Filters</h5>
                {hasActiveFilters() && (
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={clearFilters}
                  >
                    Clear All
                  </button>
                )}
              </div>

              {(filters.keyword || location.state?.keyword) && (
                <div className="mb-3 p-2 bg-light rounded">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="fw-semibold mb-1">Search Results for:</h6>
                      <p className="mb-1 text-primary">
                        "{filters.keyword || location.state?.keyword}"
                      </p>
                      {filters.location && (
                        <p className="mb-0 text-muted small">
                          in {filters.location}
                        </p>
                      )}
                    </div>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={clearKeyword}
                      title="Clear search"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}

              <div className="mb-3">
                <h6 className="fw-semibold">Keyword Search</h6>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Job title, type, skills, company..."
                  value={filters.keyword}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      keyword: e.target.value,
                    }))
                  }
                />
                <small className="text-muted">
                  Search in job titles, types, companies, skills
                </small>
              </div>

              <div className="mb-3">
                <h6 className="fw-semibold">Job Type</h6>
                {[
                  "Full-time",
                  "Part-time",
                  "Remote",
                  "Internship",
                  "Contract",
                ].map((type) => (
                  <div className="form-check" key={type}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={filters.type.includes(type)}
                      onChange={() => toggleJobType(type)}
                    />
                    <label className="form-check-label">{type}</label>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <h6 className="fw-semibold">Location</h6>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., USA, Remote"
                  value={filters.location}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mb-3">
                <h6 className="fw-semibold">Salary Range</h6>
                <div className="d-flex gap-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Min"
                    value={filters.salaryMin}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        salaryMin: e.target.value,
                      }))
                    }
                  />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Max"
                    value={filters.salaryMax}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        salaryMax: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="mb-3">
                <h6 className="fw-semibold">Experience</h6>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., 0-2 years, Senior"
                  value={filters.experience}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      experience: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mb-3">
                <h6 className="fw-semibold">Company</h6>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Company name"
                  value={filters.company}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      company: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-8 mt-3 mt-lg-0 px-lg-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="mb-0 fw-semibold">
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1 ? "Job" : "Jobs"} Found
                {hasActiveFilters() && " (Filtered)"}
              </p>

              {(filters.keyword || location.state?.keyword) && (
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted">
                    Search: "{filters.keyword || location.state?.keyword}"
                    {filters.location && ` in ${filters.location}`}
                  </span>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={clearKeyword}
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>

            <div className="row g-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div className="col-12" key={job._id}>
                    <div className="card rounded-4 h-100 shadow-sm">
                      <div className="card-body">
                        <div className="d-flex align-items-start justify-content-between">
                          <div className="d-flex align-items-center gap-3">
                            <div
                              className="rounded-circle bg-light overflow-hidden d-grid place-items-center"
                              style={{ width: 42, height: 42 }}
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
                              <div className="fw-bold">{job.title}</div>
                              <div className="text-muted small">
                                {job.company?.name || job.company} • {job.type}
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 mb-3 text-secondary">
                          {job.description}
                        </p>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="text-muted small">
                            ${job.salary?.min} – ${job.salary?.max}{" "}
                            {job.salary?.currency || "USD"}
                            {job.location && ` • ${job.location}`}
                          </div>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() =>
                            {
                               if (!localStorage.getItem('token')) {
                                 navigate(`/jobs/${job._id}`);
                               } else {
                                 navigate(`/jobseeker/jobs/${job._id}`);
                               }
                            }
                            }
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <div className="text-muted mb-3">
                    <i className="bi bi-search display-4"></i>
                    <h4 className="mt-3">No jobs found</h4>
                    <p className="mb-3">
                      {hasActiveFilters()
                        ? "Try adjusting your filters or search criteria"
                        : "No jobs available at the moment"}
                    </p>
                  </div>
                  {hasActiveFilters() && (
                    <button className="btn btn-primary" onClick={clearFilters}>
                      Clear All Filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Jobs;
