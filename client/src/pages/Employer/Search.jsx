import { useEffect, useState } from "react";

import "../../assets/CSS/Search.css";

function CandidateCard({ candidate }) {
  const {
    name,
    email,
    role,
    skills = [],
    location,
    experience = [],
    education = [],
    profileImage,
    title,
    bio,
    available,
  } = candidate;

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">
      <div className="card p-3 rounded-4 shadow-sm flex-fill d-flex flex-column candidate-card h-100">
        <div className="text-center mb-3">
          <div className="position-relative d-inline-block">
            <img
              src={
                profileImage ||
                "https://via.placeholder.com/100/007bff/ffffff?text=" +
                  name?.charAt(0)
              }
              className="rounded-circle mb-2 border"
              width="100"
              height="100"
              style={{ objectFit: "cover" }}
              alt={`${name}'s profile`}
            />
            {available && (
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle">
                <span className="visually-hidden">Available</span>
              </span>
            )}
          </div>
          <h6 className="mb-1 fw-bold text-dark">
            {name || "Unknown Candidate"}
          </h6>
          <p className="text-primary small fw-medium mb-1">
            {title || role || "Job Seeker"}
          </p>
          <div className="d-flex align-items-center justify-content-center text-muted small mb-2">
            <i className="bi bi-geo-alt me-1"></i>
            <span>{location || "Location not specified"}</span>
          </div>
        </div>

        {bio && (
          <p
            className="text-muted small mb-3 text-center"
            style={{ fontSize: "0.85rem" }}
          >
            {bio.length > 100 ? `${bio.substring(0, 100)}...` : bio}
          </p>
        )}

        {/* Skills Section */}
        <div className="mb-3">
          <h6 className="fw-semibold small mb-2">Skills</h6>
          <div className="d-flex flex-wrap gap-1">
            {skills.length > 0 ? (
              skills.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="badge rounded-pill bg-primary bg-opacity-10 text-primary border-0 px-2 py-1"
                  style={{ fontSize: "0.75rem" }}
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-muted small">No skills listed</span>
            )}
            {skills.length > 4 && (
              <span
                className="badge rounded-pill bg-light text-muted border px-2 py-1"
                style={{ fontSize: "0.75rem" }}
              >
                +{skills.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Experience & Education */}
        <div className="mb-3">
          {experience.length > 0 && (
            <div className="mb-2">
              <h6 className="fw-semibold small mb-1">
                <i className="bi bi-briefcase me-1"></i>
                Experience
              </h6>
              <p className="text-muted small mb-0">{experience[0]}</p>
              {experience.length > 1 && (
                <p className="text-muted small">
                  +{experience.length - 1} more
                </p>
              )}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h6 className="fw-semibold small mb-1">
                <i className="bi bi-mortarboard me-1"></i>
                Education
              </h6>
              <p className="text-muted small mb-0">{education[0]}</p>
              {education.length > 1 && (
                <p className="text-muted small">+{education.length - 1} more</p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto d-flex justify-content-center gap-2 pt-3">
          <button className="btn btn-outline-primary btn-sm flex-fill">
            <i className="bi bi-eye me-1"></i>
            Profile
          </button>
         
        </div>
      </div>
    </div>
  );
}

function EmployerSearchResults() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [filters, setFilters] = useState({
    skills: [],
    location: "",
    experience: "",
    education: "",
    availability: false,
    searchQuery: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Common skills for filter
  const commonSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "HTML/CSS",
    "MongoDB",
    "SQL",
    "AWS",
    "Git",
    "TypeScript",
    "Vue.js",
    "Angular",
    "PHP",
    "Docker",
  ];

  // Fetch candidates using fetch API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        

        const response = await fetch(
          "http://localhost:5000/api/users/all-candidates",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized. Please login again.");
          }
          throw new Error(`Failed to fetch candidates: ${response.status}`);
        }

        const data = await response.json();
        const candidatesData = data.jobSeekers || data.candidates || [];

        setCandidates(candidatesData);
        setFilteredCandidates(candidatesData);
      } catch (error) {
        console.error("Fetch error:", error);
        setErrorMessage(error.message || "Failed to load candidates");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...candidates];

    // Search Query (searches in name, title, bio, email)
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (candidate) =>
          candidate.name?.toLowerCase().includes(query) ||
          candidate.title?.toLowerCase().includes(query) ||
          candidate.bio?.toLowerCase().includes(query) ||
          candidate.email?.toLowerCase().includes(query) ||
          candidate.skills?.some((skill) => skill.toLowerCase().includes(query))
      );
    }

    // Skills (all selected skills must be present)
    if (filters.skills.length > 0) {
      filtered = filtered.filter((candidate) =>
        filters.skills.every((skill) =>
          candidate.skills?.some((candidateSkill) =>
            candidateSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    // Location
    if (filters.location) {
      filtered = filtered.filter((candidate) =>
        candidate.location
          ?.toLowerCase()
          .includes(filters.location.toLowerCase())
      );
    }

    // Experience
    if (filters.experience) {
      filtered = filtered.filter((candidate) =>
        candidate.experience?.some((exp) =>
          exp.toLowerCase().includes(filters.experience.toLowerCase())
        )
      );
    }

    // Education
    if (filters.education) {
      filtered = filtered.filter((candidate) =>
        candidate.education?.some((edu) =>
          edu.toLowerCase().includes(filters.education.toLowerCase())
        )
      );
    }

    // Availability
    if (filters.availability) {
      filtered = filtered.filter((candidate) => candidate.available === true);
    }

    setFilteredCandidates(filtered);
  }, [filters, candidates]);

  const toggleSkill = (skill) => {
    setFilters((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const clearFilters = () => {
    setFilters({
      skills: [],
      location: "",
      experience: "",
      education: "",
      availability: false,
      searchQuery: "",
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.skills.length > 0 ||
      filters.location ||
      filters.experience ||
      filters.education ||
      filters.availability ||
      filters.searchQuery
    );
  };

  if (loading) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-fill d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading candidates...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-fill bg-light">
        <div className="container-fluid py-4">
          <div className="row">
            {/* Sidebar Filters */}
            <div className="col-lg-3 col-md-4 mb-4">
              <div
                className="card shadow-sm rounded-4 p-4 sticky-top"
                style={{ top: "100px" }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0">Filters</h5>
                  {hasActiveFilters() && (
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={clearFilters}
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Search Query */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Search Candidates
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name, title, skills..."
                    value={filters.searchQuery}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        searchQuery: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Skills</label>
                  <div
                    className="skills-filter"
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {commonSkills.map((skill) => (
                      <div className="form-check" key={skill}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`skill-${skill}`}
                          checked={filters.skills.includes(skill)}
                          onChange={() => toggleSkill(skill)}
                        />
                        <label
                          className="form-check-label small"
                          htmlFor={`skill-${skill}`}
                        >
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Cairo, Remote"
                    value={filters.location}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Experience */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Experience</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Senior, 2 years"
                    value={filters.experience}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        experience: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Education */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Education</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Bachelor, Master"
                    value={filters.education}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        education: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Availability */}
                <div className="mb-4 form-check form-switch">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="availability"
                    checked={filters.availability}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        availability: e.target.checked,
                      }))
                    }
                  />
                  <label
                    className="form-check-label fw-semibold"
                    htmlFor="availability"
                  >
                    Immediately Available
                  </label>
                </div>
              </div>
            </div>

            {/* Candidates Grid */}
            <div className="col-lg-9 col-md-8">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="fw-bold mb-1">Candidate Search</h4>
                  <p className="text-muted mb-0">
                    {filteredCandidates.length}{" "}
                    {filteredCandidates.length === 1
                      ? "candidate"
                      : "candidates"}{" "}
                    found
                    {hasActiveFilters() && " (filtered)"}
                  </p>
                </div>

                {hasActiveFilters() && (
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={clearFilters}
                  >
                    <i className="bi bi-x-circle me-1"></i>
                    Clear Filters
                  </button>
                )}
              </div>

              {errorMessage && (
                <div
                  className="alert alert-danger d-flex align-items-center"
                  role="alert"
                >
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {errorMessage}
                </div>
              )}

              {filteredCandidates.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-people display-1 text-muted mb-3"></i>
                  <h5 className="text-muted">No candidates found</h5>
                  <p className="text-muted mb-3">
                    {hasActiveFilters()
                      ? "Try adjusting your filters or search criteria"
                      : "No candidates available at the moment"}
                  </p>
                  {hasActiveFilters() && (
                    <button className="btn btn-primary" onClick={clearFilters}>
                      Clear All Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="row g-3">
                  {filteredCandidates.map((candidate) => (
                    <CandidateCard key={candidate._id} candidate={candidate} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EmployerSearchResults;
