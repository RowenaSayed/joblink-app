import { Routes, Route } from 'react-router-dom'
// ============================================================
import JobLinkLanding from "./pages/LandingPage"
import Login from "./pages/Auth/Login"
import SignupJobseeker from "./pages/Auth/SignupJobseeker"
// ============================================================
import EmployerDashboard from './pages/Employer/Dashboard'
import ManageJobs from './pages/Employer/ManageJobs'
import Analytics from './pages/Employer/Analytics'
import PostJob from './pages/Employer/PostJob'
import Search from './pages/Employer/Search'
import Employer_Company_Profile from './pages/Employer/Employer_Company_Profile'
// ============================================================
import Dashboard from './pages/jobseeker/Dashboard'
import Jobs from './pages/jobseeker/Jobs'
import Job_Seeker_Applications from './pages/jobseeker/Job_Seeker_Applications'
import Job_Seeker_Job_Details from './pages/jobseeker/Job_Seeker_Job_Details'
// --------------------------------------------------------
import AuthLayout from './components/layout/Authlayout'
import EmployerLayout from './components/layout/EmployerLayout'
import JobseekerLayout from './components/layout/JobseekerLayout'
// --------------------------------------------------------
function App() {
  return (
    <Routes>
      <Route element={<JobLinkLanding />} path="/"></Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignupJobseeker />}></Route>
        <Route path="/jobs" element={<Jobs />}></Route>
        <Route path="jobs/:id" element={<Job_Seeker_Job_Details />} />
        <Route path="/candidates" element={<Search />}></Route>
      </Route>
      {/* ===================================== */}
      <Route path="/employer" element={<EmployerLayout />}>
        <Route path="dashboard" element={<EmployerDashboard />}></Route>
        <Route path="dashboard/analytics" element={<Analytics />}></Route>
        <Route path="manage-jobs" element={<ManageJobs />}></Route>
        <Route path="post-job" element={<PostJob />}></Route>
        <Route path="candidates" element={<Search />}></Route>
        <Route path="profile" element={<Employer_Company_Profile />}></Route>
      </Route>

      {/* ===================================== */}

      <Route path="/jobseeker" element={<JobseekerLayout />}>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="jobs" element={<Jobs />}></Route>
        <Route path="jobs/:id" element={<Job_Seeker_Job_Details />} />
        <Route path="apps" element={<Job_Seeker_Applications />}></Route>
      </Route>
    </Routes>
  );
}

export default App
