import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/CSS/LandingPage.css";
import "../../assets/CSS/Signup.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        setMsg("");
        setMsgType("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json(); 

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      let role=localStorage.getItem('role')
      setMsg(data.message);
      setMsgType("success");
      role=role.toLowerCase().trim()
      if (role == 'jobseeker') {
        setTimeout(() => navigate("/jobseeker/dashboard"), 1500);
      } else if (role == 'employer') {
        setTimeout(() => navigate("/employer/dashboard"), 1500);
      } else {
        setTimeout(() => navigate("/"), 1500);
      }
    } else {
      setMsg(data.message || data.error);
      setMsgType("danger");
    }
  } catch {
    setMsg("Server error, please try again");
    setMsgType("danger");
  }
};


  return (
    <main className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow border-0 rounded-4">
              <div className="card-body p-5">
                <h3 className="text-center fw-bold mb-4 text-primary">
                  Welcome Back!
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control rounded-3"
                      id="email"
                      placeholder="Enter your email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div
                    className="mb-3 password-wrapper"
                    style={{ position: "relative" }}
                  >
                    <label
                      htmlFor="password"
                      className="form-label fw-semibold"
                    >
                      Password
                    </label>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className="form-control rounded-3"
                      id="password"
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <i
                      className={`fa-solid password-toggle ${
                        passwordVisible ? "fa-eye-slash" : "fa-eye"
                      }`}
                      style={{
                        position: "absolute",
                        right: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    ></i>
                  </div>

                  

                  {msg && (
                    <div className={`alert alert-${msgType}`} role="alert">
                      {msg}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary-custom w-100 rounded-3 fw-bold py-2"
                  >
                    Login
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-muted mb-0">
                      Don’t have an account?
                      <Link
                        to="/signup"
                        className="text-primary fw-semibold text-decoration-none ms-1"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
