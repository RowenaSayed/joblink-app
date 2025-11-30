import React, { useState, useEffect } from "react";

import "../../assets/CSS/Employer Company Profile.css";

import logo from "../../assets/images/Employer Company Profile_images/logo2.svg";

function Employer_Company_Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    website: "",
    location: "",
    description: "",
    logo: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setMessage({
            type: "error",
            text: "Please login to access this page",
          });
          setLoading(false);
          return;
        }

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const userResponse = await fetch(
          "http://localhost:5000/api/users/profile",
          {
            method: "GET",
            headers,
          }
        );

        if (!userResponse.ok) {
          throw new Error(
            `Failed to fetch user profile: ${userResponse.status}`
          );
        }

        const userData = await userResponse.json();
        setUserProfile(userData.user || null);

        const companyResponse = await fetch(
          "http://localhost:5000/api/company/",
          {
            method: "GET",
            headers,
          }
        );

        if (!companyResponse.ok) {
          throw new Error(
            `Failed to fetch company details: ${companyResponse.status}`
          );
        }

        const companyData = await companyResponse.json();
        setCompanyInfo(companyData.company || null);

        if (companyData.company) {
          setFormData({
            name: companyData.company.name || "",
            industry: companyData.company.industry || "",
            website: companyData.company.website || "",
            location: companyData.company.location || "",
            description: companyData.company.description || "",
            logo: companyData.company.logo || "",
          });
        }
      } catch (err) {
        setMessage({
          type: "error",
          text: err.message || "Failed to load data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Please select an image file" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "Image size should be less than 5MB" });
      return;
    }

    try {
      setUploading(true);

      // Convert image to base64 for direct storage
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;

        // Update form data with base64 image
        setFormData((prev) => ({
          ...prev,
          logo: base64String,
        }));

        setMessage({ type: "success", text: "Logo ready to save!" });
        setUploading(false);
      };

      reader.onerror = () => {
        setMessage({ type: "error", text: "Failed to read image file" });
        setUploading(false);
      };

      reader.readAsDataURL(file);
    } catch {
      setMessage({ type: "error", text: "Failed to process logo" });
      setUploading(false);
    }
  };

  const handleSaveCompanyDetails = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage({
          type: "error",
          text: "Please login to update company details",
        });
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const companyResponse = await fetch("http://localhost:5000/api/company", {
        method: "PATCH",
        headers,
        body: JSON.stringify(formData),
      });

      if (!companyResponse.ok) {
        throw new Error(`Failed to update company: ${companyResponse.status}`);
      }

      const companyData = await companyResponse.json();

      setCompanyInfo(companyData.company || companyData);
      setEditing(false);
      setMessage({
        type: "success",
        text: "Company details updated successfully!",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Failed to update company details",
      });
    } finally {
      setSaving(false);
    }
  };

  const calculateProfileCompletion = () => {
    const fields = [
      "name",
      "industry",
      "website",
      "location",
      "description",
      "logo",
    ];
    const completedFields = fields.filter(
      (field) => formData[field] && formData[field].trim() !== ""
    );
    return Math.round((completedFields.length / fields.length) * 100);
  };

  if (loading) {
    return (
      <>
        <div className="container text-center mt-5">
          <div className="spinner-border text-primary"></div>
          <p className="mt-2">Loading company profile...</p>
        </div>
      </>
    );
  }

  return (
    <>

      <div className="container py-5 px-3 px-md-4 mb-5">
        {message.text && (
          <div
            className={`alert alert-${
              message.type === "success" ? "success" : "danger"
            } alert-dismissible fade show`}
          >
            {message.text}
            <button
              type="button"
              className="btn-close"
              onClick={() => setMessage({ type: "", text: "" })}
            ></button>
          </div>
        )}

        <div className="card cardContent w-100 mb-4">
          <div className="card-body">
            <div className="content d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
              <div className="mb-3 mb-md-0">
                <h5 className="card-title fw-bold">Company Information</h5>
                <p className="card-text text-muted">
                  Manage your public company profile details
                </p>
              </div>
              <button
                className={`btn ${editing ? "btn-secondary" : "btn-primary"}`}
                onClick={() => setEditing(!editing)}
                disabled={saving || uploading}
              >
                {editing ? "Cancel" : "Edit Details"}
              </button>
            </div>

            <hr />

            <div className="content">
              <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start mb-4">
                <div className="position-relative">
                  <img
                    className="logo rounded shadow-sm"
                    src={formData.logo || companyInfo?.logo || logo}
                    alt="company logo"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  {uploading && (
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-light bg-opacity-75 rounded">
                      <div className="spinner-border spinner-border-sm text-primary"></div>
                    </div>
                  )}
                </div>
                <div className="mt-3 mt-sm-0 ms-0 ms-sm-3">
                  <input
                    type="file"
                    id="logoUpload"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    style={{ display: "none" }}
                    disabled={!editing || uploading}
                  />
                  <label
                    htmlFor="logoUpload"
                    className={`btn ${
                      editing ? "btn-primary" : "btn-outline-secondary"
                    }`}
                    style={{
                      cursor: editing ? "pointer" : "not-allowed",
                      opacity: editing ? 1 : 0.6,
                    }}
                  >
                    {uploading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Processing...
                      </>
                    ) : (
                      "Upload Logo"
                    )}
                  </label>
                  <p className="text-muted small mt-1">
                    Recommended: 100x100px PNG or JPG (max 5MB)
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveCompanyDetails}>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      readOnly={!editing}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Industry *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      readOnly={!editing}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Website</label>
                    <input
                      type="url"
                      className="form-control"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      readOnly={!editing}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Location *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      readOnly={!editing}
                      placeholder="City, Country"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Company Description *
                    </label>
                    <textarea
                      className="form-control"
                      style={{ height: "150px", resize: "vertical" }}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      readOnly={!editing}
                      placeholder="Describe your company culture, mission, and values..."
                      required
                    ></textarea>
                  </div>

                  {editing && (
                    <div className="col-12">
                      <div className="d-flex gap-2 flex-column flex-sm-row">
                        <button
                          type="submit"
                          className="btn btn-success"
                          disabled={saving || uploading}
                        >
                          {saving ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Saving...
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            setEditing(false);
                            setFormData({
                              name: companyInfo?.name || "",
                              industry: companyInfo?.industry || "",
                              website: companyInfo?.website || "",
                              location: companyInfo?.location || "",
                              description: companyInfo?.description || "",
                              logo: companyInfo?.logo || "",
                            });
                          }}
                          disabled={saving || uploading}
                        >
                          Discard Changes
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h6 className="card-title fw-bold">Profile Status</h6>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Profile Completion</span>
                  <span className="fw-bold text-primary">
                    {calculateProfileCompletion()}%
                  </span>
                </div>
                <div className="progress mb-3" style={{ height: "8px" }}>
                  <div
                    className="progress-bar"
                    style={{ width: `${calculateProfileCompletion()}%` }}
                  ></div>
                </div>
                <small className="text-muted">
                  Complete your profile to attract more candidates
                </small>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h6 className="card-title fw-bold">Account Information</h6>
                <div className="mb-2">
                  <small className="text-muted">Account Email</small>
                  <div className="fw-semibold">{userProfile?.email}</div>
                </div>
                <div className="mb-2">
                  <small className="text-muted">Account Role</small>
                  <div className="fw-semibold">{userProfile?.role}</div>
                </div>
                <div>
                  <small className="text-muted">Member Since</small>
                  <div className="fw-semibold">
                    {userProfile?.createdAt
                      ? new Date(userProfile.createdAt).toLocaleDateString()
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Employer_Company_Profile;
