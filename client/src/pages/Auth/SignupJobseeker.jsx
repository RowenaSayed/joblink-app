import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../assets/CSS/LandingPage.css";
import "../../assets/CSS/Signup.css";

export default function SignupJobseeker() {
  const [user, setUser] = useState({
    role: "JobSeeker",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
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
    if (user.password !== user.confirmPassword) {
      setMsg("Passwords do not match");
      setMsgType("danger");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();

     if (res.ok) {
       setMsg(data.message);
       setMsgType("success");
       setTimeout(() => {
         navigate("/login");
       }, 1500);
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
    <div>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="card shadow border-0 rounded-4">
                <div className="card-body p-5">
                  <h3 className="text-center fw-bold mb-4 text-primary">Create Your Account</h3>
                  <p className="text-center text-muted mb-4">Pick a role and start setting up your profile.</p>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Select Role</label>
                      <select
                        className="form-control rounded-3"
                        value={user.role}
                        onChange={(e) => setUser({ ...user, role: e.target.value })}
                      >
                        <option value="JobSeeker">Jobseeker</option>
                        <option value="Employer">Employer</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Full Name</label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        placeholder="Enter your full name"
                        required
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Email Address</label>
                      <input
                        type="email"
                        className="form-control rounded-3"
                        placeholder="Enter your email"
                        required
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                      />
                    </div>

                    <div className="mb-3 password-wrapper">
                      <label className="form-label fw-semibold">Password</label>
                      <input
                        type={passwordVisible ? "text" : "password"}
                        className="form-control rounded-3"
                        placeholder="Create a password"
                        required
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                      />
                      <i
                        className={`fa-solid password-toggle ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      ></i>
                    </div>

                    <div className="mb-3 password-wrapper">
                      <label className="form-label fw-semibold">Confirm Password</label>
                      <input
                        type={confirmVisible ? "text" : "password"}
                        className="form-control rounded-3"
                        placeholder="Re-enter your password"
                        required
                        value={user.confirmPassword}
                        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                      />
                      <i
                        className={`fa-solid password-toggle ${confirmVisible ? "fa-eye-slash" : "fa-eye"}`}
                        onClick={() => setConfirmVisible(!confirmVisible)}
                      ></i>
                    </div>

                    <div className="form-check mb-4">
                      <input className="form-check-input" type="checkbox" required />
                      <label className="form-check-label text-muted">
                        I agree to the <a className="text-primary text-decoration-none">Terms & Conditions</a>
                      </label>
                    </div>

                    {msg && <div className={`alert alert-${msgType}`} role="alert">{msg}</div>}

                    <button className="btn btn-primary-custom w-100 rounded-3 fw-bold py-2">Sign Up</button>

                    <div className="text-center mt-4">
                      <p className="text-muted mb-0">
                        Already have an account?
                        <Link to="/login" className="text-primary fw-semibold text-decoration-none"> Sign In</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
