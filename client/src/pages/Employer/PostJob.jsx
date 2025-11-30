import React, { useState } from "react";
import "../../assets/CSS/PostJob.css";

export default function PostJob() {
  const [postJob, setPostJob] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full-time",
    remote: false,
    description: "",
    skillsRequired: [],
    skillInput: "",
    experienceLevel: "Entry-level",
    educationLevel: "Bachelor's Degree",
    additionalRequirements: "",
    salary: { min: "", max: "", currency: "USD ($)", benefitsOffered: "" },
    applicationMethod: "Apply on JobLink",
    deadline: "",
  });

  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setPostJob({ ...postJob, [name]: checked });
    } else if (name.startsWith("salary.")) {
      const key = name.split(".")[1];
      setPostJob({
        ...postJob,
        salary: { ...postJob.salary, [key]: value },
      });
    } else {
      setPostJob({ ...postJob, [name]: value });
    }
  };

  const handleAddSkill = () => {
    const skill = postJob.skillInput.trim();
    if (skill && !postJob.skillsRequired.includes(skill)) {
      setPostJob({
        ...postJob,
        skillsRequired: [...postJob.skillsRequired, skill],
        skillInput: "",
      });
    }
  };

  const handleRemoveSkill = (skill) => {
    setPostJob({
      ...postJob,
      skillsRequired: postJob.skillsRequired.filter((s) => s !== skill),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...postJob,
          salary: { ...postJob.salary },
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMsg("Job posted successfully!");
        setMsgType("success");
      } else {
        setMsg(data.message || "Failed to post job");
        setMsgType("danger");
      }
    } catch {
      setMsg("Server error, please try again");
      setMsgType("danger");
    }
  };

  return (
    <div className="Postjob d-flex flex-column min-vh-100">
      <main className="container-fluid flex-grow-1">
        <div className="container my-5">
          <h3 className="mb-4">
            <i className="bi bi-briefcase me-2"></i> Post a New Job
          </h3>

          <form onSubmit={handleSubmit}>
            {/* Job Details */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">
                  <i className="bi bi-info-circle me-2"></i> Job Details
                </h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Job Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={postJob.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="company"
                      value={postJob.company}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={postJob.location}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Job Type</label>
                    <select
                      className="form-select"
                      name="jobType"
                      value={postJob.jobType}
                      onChange={handleChange}
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>
                </div>
                <div className="form-check mt-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="remoteJob"
                    name="remote"
                    checked={postJob.remote}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="remoteJob">
                    This is a remote job
                  </label>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">
                  <i className="bi bi-file-earmark-text me-2"></i> Job
                  Description
                </h5>
                <textarea
                  className="form-control"
                  rows="4"
                  name="description"
                  value={postJob.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>

            {/* Skills */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">
                  <i className="bi bi-list-check me-2"></i> Requirements &
                  Qualifications
                </h5>
                <div className="mb-3">
                  <label className="form-label">Key Skills</label>
                  <div className="mb-2">
                    {postJob.skillsRequired.map((skill) => (
                      <span
                        key={skill}
                        className="py-1 px-3 rounded-5 btn btn-light d-inline-flex align-items-center me-1"
                      >
                        {skill}{" "}
                        <i
                          className="bi bi-x ms-2"
                          onClick={() => handleRemoveSkill(skill)}
                        ></i>
                      </span>
                    ))}
                  </div>
                  <div className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control"
                      name="skillInput"
                      placeholder="Add a skill"
                      value={postJob.skillInput}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={handleAddSkill}
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Experience Level</label>
                    <select
                      className="form-select"
                      name="experienceLevel"
                      value={postJob.experienceLevel}
                      onChange={handleChange}
                    >
                      <option>Entry-level</option>
                      <option>Mid-level</option>
                      <option>Senior-level</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Education Level</label>
                    <select
                      className="form-select"
                      name="educationLevel"
                      value={postJob.educationLevel}
                      onChange={handleChange}
                    >
                      <option>Bachelor's Degree</option>
                      <option>Master's Degree</option>
                      <option>PhD</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="form-label">Additional Requirements</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    name="additionalRequirements"
                    value={postJob.additionalRequirements}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Salary & Application */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Minimum Salary</label>
                    <input
                      type="number"
                      className="form-control"
                      name="salary.min"
                      value={postJob.salary.min}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Maximum Salary</label>
                    <input
                      type="number"
                      className="form-control"
                      name="salary.max"
                      value={postJob.salary.max}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Currency</label>
                    <select
                      className="form-select"
                      name="salary.currency"
                      value={postJob.salary.currency}
                      onChange={handleChange}
                    >
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>EGP (£)</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="form-label">Benefits Offered</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    name="salary.benefitsOffered"
                    value={postJob.salary.benefitsOffered}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <div className="row g-3">
                  <div  className="visually-hidden col-md-6">
                    <label className="form-label">Application Method</label>
                    <select
                      className="form-select"
                      name="applicationMethod"
                      value={postJob.applicationMethod}
                      onChange={handleChange}
                    >
                      <option>Apply on JobLink</option>
                      <option>Email Application</option>
                      <option>External Link</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Application Deadline</label>
                    <input
                      type="date"
                      className="form-control"
                      name="deadline"
                      value={postJob.deadline}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex mb-4 justify-content-end gap-2">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-check-circle me-1"></i> Post Job
              </button>
            </div>

            {msg && <div className={`alert alert-${msgType} mt-3`}>{msg}</div>}
          </form>
        </div>
      </main>
    </div>
  );
}
