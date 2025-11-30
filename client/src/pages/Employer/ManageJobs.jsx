import { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editForm, setEditForm] = useState({
    title: "",
    location: "",
    jobType: "Full-time",
    educationLevel: "Bachelor's Degree",
    experienceLevel: "Entry-level",
    description: "",
    skillsRequired: "",
    additionalRequirements: "",
    applicationMethod: "Apply on JobLink",
    deadline: "",
    salaryMin: "",
    salaryMax: "",
    salaryCurrency: "USD ($)",
    benefitsOffered: "",
  });

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/jobs/my-jobs", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [jobs]);

  const handleDeleteClick = (job) => {
    setSelectedJob(job);
    setShowDeleteModal(true);
  };

  const handleEditClick = (job) => {
    setSelectedJob(job);
    setEditForm({
      title: job.title || "",
      location: job.location || "",
      jobType: job.jobType || "Full-time",
      educationLevel: job.educationLevel || "Bachelor's Degree",
      experienceLevel: job.experienceLevel || "Entry-level",
      description: job.description || "",
      skillsRequired: job.skillsRequired?.join(", ") || "",
      additionalRequirements: job.additionalRequirements || "",
      applicationMethod: job.applicationMethod || "Apply on JobLink",
      deadline: job.deadline?.split("T")[0] || "",
      salaryMin: job.salary?.min || "",
      salaryMax: job.salary?.max || "",
      salaryCurrency: job.salary?.currency || "USD ($)",
      benefitsOffered: job.salary?.benefitsOffered || "",
    });
    setShowEditModal(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/jobs/${selectedJob._id}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setJobs(jobs.filter((job) => job._id !== selectedJob._id));
      setShowDeleteModal(false);
    } catch {}
  };

  const saveEdit = async () => {
    const payload = {
      title: editForm.title,
      location: editForm.location,
      jobType: editForm.jobType,
      educationLevel: editForm.educationLevel,
      experienceLevel: editForm.experienceLevel,
      description: editForm.description,
      skillsRequired: editForm.skillsRequired
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      additionalRequirements: editForm.additionalRequirements,
      applicationMethod: editForm.applicationMethod,
      deadline: editForm.deadline,
      salary: {
        min: Number(editForm.salaryMin),
        max: Number(editForm.salaryMax),
        currency: editForm.salaryCurrency,
        benefitsOffered: editForm.benefitsOffered,
      },
    };

    try {
      const res = await fetch(
        `http://localhost:5000/api/jobs/${selectedJob._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const updatedJob = await res.json();
      setJobs(
        jobs.map((job) => (job._id === updatedJob._id ? updatedJob : job))
      );
      setShowEditModal(false);
    } catch {}
  };

  if (loading) return <p className="text-center mt-5">Loading jobs...</p>;

  return (
    <section className="container-fluid bg-light py-3 mb-5">
      <h5 className="fw-bold mb-3 container text-dark">Manage Job Listings</h5>

      <div className="row">
        <div className="col-12 col-md-11 mx-auto bg-white rounded-3 shadow-sm p-0">
          <div className="table-responsive rounded-3">
            <table className="table table-hover mb-0 align-middle">
              <thead>
                <tr>
                  <th className="px-4 py-3">Job Title</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Applicants</th>
                  <th className="px-4 py-3">Date Posted</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id}>
                    <td className="px-4 py-3">
                      <h6 className="fw-semibold mb-0">{job.title}</h6>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`badge rounded-pill bg-light text-${
                          job.status === "pending"
                            ? "warning"
                            : job.status === "approved"
                            ? "success"
                            : "danger"
                        } px-3 py-2`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 fw-semibold">
                      {job.applicants || 0}
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {new Date(job.createdAt).toISOString().split("T")[0]}
                    </td>
                    <td className="px-4 py-3">
                      <div className="d-flex flex-wrap gap-2">
                        <button
                          className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                          onClick={() => handleEditClick(job)}
                        >
                          <FaPen className="me-1" /> Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm rounded-pill px-3"
                          onClick={() => handleDeleteClick(job)}
                        >
                          <FaTrash className="me-1" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
            <h5>Confirm Delete</h5>
            <p>Are you sure you want to delete "{selectedJob?.title}"?</p>
            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-backdrop" onClick={() => setShowEditModal(false)}>
          <div
            className="custom-modal"
            style={{ height: "500px", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h5>Edit Job Details</h5>

            <input
              type="text"
              className="form-control mt-2"
              placeholder="Job Title"
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
            />

            <input
              type="text"
              className="form-control mt-2"
              placeholder="Location"
              value={editForm.location}
              onChange={(e) =>
                setEditForm({ ...editForm, location: e.target.value })
              }
            />

            <select
              className="form-select mt-2"
              value={editForm.jobType}
              onChange={(e) =>
                setEditForm({ ...editForm, jobType: e.target.value })
              }
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>

            <select
              className="form-select mt-2"
              value={editForm.educationLevel}
              onChange={(e) =>
                setEditForm({ ...editForm, educationLevel: e.target.value })
              }
            >
              <option>Student</option>
              <option>Bachelor's Degree</option>
              <option>Master's Degree</option>
              <option>PhD</option>
              <option>Other</option>
            </select>

            <select
              className="form-select mt-2"
              value={editForm.experienceLevel}
              onChange={(e) =>
                setEditForm({ ...editForm, experienceLevel: e.target.value })
              }
            >
              <option>Internship</option>
              <option>Entry-level</option>
              <option>Mid-level</option>
              <option>Senior</option>
            </select>

            <textarea
              className="form-control mt-2"
              rows="3"
              placeholder="Description"
              value={editForm.description}
              onChange={(e) =>
                setEditForm({ ...editForm, description: e.target.value })
              }
            />

            <input
              type="text"
              className="form-control mt-2"
              placeholder="Skills (comma separated)"
              value={editForm.skillsRequired}
              onChange={(e) =>
                setEditForm({ ...editForm, skillsRequired: e.target.value })
              }
            />

            <textarea
              className="form-control mt-2"
              rows="2"
              placeholder="Additional Requirements"
              value={editForm.additionalRequirements}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  additionalRequirements: e.target.value,
                })
              }
            />

            <select
              className="form-select mt-2"
              value={editForm.applicationMethod}
              onChange={(e) =>
                setEditForm({ ...editForm, applicationMethod: e.target.value })
              }
            >
              <option>Apply on JobLink</option>
              <option>External Link</option>
              <option>Email</option>
            </select>

            <input
              type="date"
              className="form-control mt-2"
              value={editForm.deadline}
              onChange={(e) =>
                setEditForm({ ...editForm, deadline: e.target.value })
              }
            />

            <input
              type="number"
              className="form-control mt-2"
              placeholder="Salary Min"
              value={editForm.salaryMin}
              onChange={(e) =>
                setEditForm({ ...editForm, salaryMin: e.target.value })
              }
            />

            <input
              type="number"
              className="form-control mt-2"
              placeholder="Salary Max"
              value={editForm.salaryMax}
              onChange={(e) =>
                setEditForm({ ...editForm, salaryMax: e.target.value })
              }
            />

            <select
              className="form-select mt-2"
              value={editForm.salaryCurrency}
              onChange={(e) =>
                setEditForm({ ...editForm, salaryCurrency: e.target.value })
              }
            >
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>EGP (£)</option>
            </select>

            <input
              type="text"
              className="form-control mt-2"
              placeholder="Benefits Offered"
              value={editForm.benefitsOffered}
              onChange={(e) =>
                setEditForm({ ...editForm, benefitsOffered: e.target.value })
              }
            />

            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                className="btn btn-secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={saveEdit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .custom-modal {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 420px;
          max-width: 95%;
        }
      `}</style>
    </section>
  );
}
