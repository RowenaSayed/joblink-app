import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../assets/CSS/job_seeker_details.css";
import inc from "../../assets/images/job_seeker_details_images/inc.svg";
import site from "../../assets/images/job_seeker_details_images/site.svg";
import time from "../../assets/images/job_seeker_details_images/time.svg";
import visit from "../../assets/images/job_seeker_details_images/visit.svg";

const ApplicationModal = ({ show, onClose, jobId, jobTitle }) => {
  const [formData, setFormData] = useState({
    coverLetter: "",
    resume: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "" });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please log in to apply for jobs");
      }

      if (!formData.resume.trim()) {
        throw new Error("Resume URL is required");
      }

      const applicationData = {
        jobId: jobId,
        coverLetter: formData.coverLetter,
        resume: formData.resume,
      };

      const response = await fetch("http://localhost:5000/api/apps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(applicationData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      showAlert("Application submitted successfully!", "success");
      setFormData({ coverLetter: "", resume: "" });

      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error submitting application:", error);
      showAlert(`Error: ${error.message}`, "danger");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setFormData({ coverLetter: "", resume: "" });
    setAlert({ show: false, message: "", type: "" });
    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={handleClose}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "500px",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ margin: 0 }}>Apply for {jobTitle}</h3>
          <button
            onClick={handleClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        {alert.show && (
          <div
            className={`alert alert-${alert.type} alert-dismissible fade show`}
            role="alert"
          >
            {alert.message}
            <button
              type="button"
              className="btn-close"
              onClick={() => setAlert({ show: false, message: "", type: "" })}
            ></button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="coverLetter"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Cover Letter
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              rows="6"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                resize: "vertical",
              }}
              placeholder="Write your cover letter here..."
            />
          </div>

          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="resume"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Resume URL *
            </label>
            <input
              type="url"
              id="resume"
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
              placeholder="Paste your resume URL here"
            />
            <small style={{ color: "#666", fontSize: "12px" }}>
              Please provide a valid URL to your resume (Google Drive, LinkedIn,
              etc.)
            </small>
          </div>

          <div
            className="modal-actions"
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="button"
              onClick={handleClose}
              style={{
                padding: "10px 20px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                background: "white",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                background: "#007bff",
                color: "white",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function Job_Seeker_Job_Details() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageAlert, setPageAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  const showPageAlert = (message, type) => {
    setPageAlert({ show: true, message, type });
    setTimeout(() => {
      setPageAlert({ show: false, message: "", type: "" });
    }, 5000);
  };

  const checkApplicationStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        `http://localhost:5000/api/apps/check?jobId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setHasApplied(data.hasApplied);
      }
    } catch (error) {
      console.error("Error checking application status:", error);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/jobs/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Job not found");
          }
          throw new Error("Failed to fetch job");
        }

        const data = await response.json();
        setJob(data.job || data);
        await checkApplicationStatus();
      } catch (error) {
        console.error("Error fetching job data:", error);
        showPageAlert(`Error: ${error.message}`, "danger");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  const handleApplyClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showPageAlert("Please log in to apply for jobs", "warning");
      return;
    }

    if (hasApplied) {
      showPageAlert("You have already applied for this job", "info");
      return;
    }

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formatSalary = (salary) => {
    if (!salary) return "Salary not specified";
    if (typeof salary === "string") return salary;
    if (salary.min === 0 && salary.max === 0) {
      return "Salary not specified";
    }
    return `${salary.min} - ${salary.max} ${salary.currency || "USD"}`;
  };

  const getCompanyName = (job) => {
    if (job.companyName) return job.companyName;
    if (job.company && job.company.name) return job.company.name;
    return "Company not specified";
  };

  const getCompanyDescription = (job) => {
    if (job.companyDescription) return job.companyDescription;
    if (job.company && job.company.description) return job.company.description;
    return "No company description available";
  };

  const getIndustry = (job) => {
    if (job.industry) return job.industry;
    if (job.company && job.company.industry) return job.company.industry;
    return "Not specified";
  };

  const getCompanyLocation = (job) => {
    if (job.companyLocation) return job.companyLocation;
    if (job.company && job.company.location) return job.company.location;
    return "Location not specified";
  };

  const renderApplyButton = () => {
    if (hasApplied) {
      return (
        <button
          disabled
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "not-allowed",
            marginBottom: "20px",
          }}
        >
          ✓ Already Applied
        </button>
      );
    }

    return (
      <button
        onClick={handleApplyClick}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "20px",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Apply Now
      </button>
    );
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          <h4>Job Not Found</h4>
          <p>The job you're looking for doesn't exist or has been removed.</p>
          <button
            className="btn btn-primary"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-5 mb-5 pb-4">
        {pageAlert.show && (
          <div
            className={`alert alert-${pageAlert.type} alert-dismissible fade show mt-3`}
            role="alert"
          >
            {pageAlert.message}
            <button
              type="button"
              className="btn-close"
              onClick={() =>
                setPageAlert({ show: false, message: "", type: "" })
              }
            ></button>
          </div>
        )}

        <div className="row gx-5">
          <div className="col-12 col-md-8 left">
            <div className="con" style={{ padding: "10px 30px" }}>
              <h1
                style={{
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {job.title} <br />
                {job.stack && `(${job.stack})`}
                {!job.stack && job.jobType && `(${job.jobType})`}
              </h1>
              <p
                className="Inc"
                style={{
                  fontFamily: "sans-serif",
                  fontSize: "1.2rem",
                  color: "#666",
                }}
              >
                {getCompanyName(job)}
              </p>

              {hasApplied && (
                <div className="alert alert-info mt-3" role="alert">
                  <i className="fas fa-check-circle me-2"></i>
                  You have already applied for this position
                </div>
              )}

              <div className="row gx-2 section-site">
                <div className="col-6 col-md-4 sec mt-0 mb-0">
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <span>
                      <img src={site} alt="Location" />
                    </span>
                    <p>{job.location || "Location not specified"}</p>
                  </div>
                </div>

                <div className="col-6 col-md-4 sec mt-0 mb-0">
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <span>
                      <img src={time} alt="Time Type" />
                    </span>
                    <p>{job.timeType || job.jobType || "Type not specified"}</p>
                  </div>
                </div>

                <div className="col-12 col-md-4 sec mt-3 mt-md-0">
                  <div className="last">
                    <p
                      className="tag"
                      style={{ margin: "auto", textAlign: "center" }}
                    >
                      {formatSalary(job.salary)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="line" />

            <div className="content">
              <h2
                style={{
                  fontFamily: "sans-serif",
                  color: "#333",
                  marginBottom: "1rem",
                }}
              >
                Job Description
              </h2>
              <p className="p2" style={{ lineHeight: "1.6", color: "#555" }}>
                {job.description || "No description available"}
              </p>

              {job.skillsRequired && job.skillsRequired.length > 0 && (
                <>
                  <h2
                    style={{
                      fontFamily: "sans-serif",
                      color: "#333",
                      marginTop: "2rem",
                    }}
                  >
                    Skills Required
                  </h2>
                  <div className="texts">
                    {job.skillsRequired.map((skill, index) => (
                      <p key={index} style={{ marginBottom: "0.5rem" }}>
                        • {skill}
                      </p>
                    ))}
                  </div>
                </>
              )}

              {job.additionalRequirements && (
                <>
                  <h2
                    style={{
                      fontFamily: "sans-serif",
                      color: "#333",
                      marginTop: "2rem",
                    }}
                  >
                    Additional Requirements
                  </h2>
                  <div className="texts">
                    <p style={{ lineHeight: "1.6", color: "#555" }}>
                      {job.additionalRequirements}
                    </p>
                  </div>
                </>
              )}

              {job.experienceLevel && (
                <>
                  <h2
                    style={{
                      fontFamily: "sans-serif",
                      color: "#333",
                      marginTop: "2rem",
                    }}
                  >
                    Experience Level
                  </h2>
                  <div className="texts">
                    <p style={{ color: "#555" }}>{job.experienceLevel}</p>
                  </div>
                </>
              )}

              {job.educationLevel && (
                <>
                  <h2
                    style={{
                      fontFamily: "sans-serif",
                      color: "#333",
                      marginTop: "2rem",
                    }}
                  >
                    Education Level
                  </h2>
                  <div className="texts">
                    <p style={{ color: "#555" }}>{job.educationLevel}</p>
                  </div>
                </>
              )}

              {job.benefits && job.benefits.length > 0 && (
                <>
                  <h2
                    style={{
                      fontFamily: "sans-serif",
                      color: "#333",
                      marginTop: "2rem",
                    }}
                  >
                    Benefits
                  </h2>
                  <div className="texts">
                    {job.benefits.map((benefit, index) => (
                      <p key={index} style={{ marginBottom: "0.5rem" }}>
                        • {benefit}
                      </p>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="col-12 col-md-4 right" style={{ margin: "30px 0px" }}>
            {renderApplyButton()}

            <div
              className="aside"
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "#f8f9fa",
              }}
            >
              <div className="image text-center mb-3">
                <img src={inc} alt="Company" style={{ maxWidth: "80px" }} />
              </div>
              <p
                className="title"
                style={{
                  fontFamily: "sans-serif",
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#333",
                }}
              >
                {getCompanyName(job)}
              </p>
              <p
                className="text"
                style={{
                  lineHeight: "1.5",
                  color: "#666",
                  textAlign: "center",
                  marginBottom: "1rem",
                }}
              >
                {getCompanyDescription(job)}
              </p>
              <p className="bold" style={{ marginBottom: "0.5rem" }}>
                <b>Industry:</b> {getIndustry(job)}
              </p>
              <p className="bold" style={{ marginBottom: "1rem" }}>
                <b>Location:</b> {getCompanyLocation(job)}
              </p>
              <div
                className="visit text-center"
                style={{
                  padding: "10px",
                  border: "1px solid #007bff",
                  borderRadius: "5px",
                  cursor: "pointer",
                  color: "#007bff",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#007bff";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#007bff";
                }}
              >
                <img src={visit} alt="Visit" style={{ marginRight: "8px" }} />
                Visit Website
              </div>
            </div>
          </div>
        </div>
      </div>

      <ApplicationModal
        show={showModal}
        onClose={handleCloseModal}
        jobId={id}
        jobTitle={job.title}
      />
    </>
  );
}

export default Job_Seeker_Job_Details;
