import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { getSession } from "./utils/auth";

// shared
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

// auth
import { Login, Register } from "./pages";

// patient pages
import Home from "./pages/patient/Home.jsx";
import Appointments from "./pages/patient/Appointments.jsx";
import Doctors from "./pages/patient/Doctors.jsx";
import Reports from "./pages/patient/Reports.jsx";
import Chat from "./pages/patient/Chat.jsx";
import Settings from "./pages/patient/Settings.jsx";

// admin pages
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import DoctorApprovals from "./pages/admin/DoctorApprovals.jsx";
import PostApprovals from "./pages/admin/PostApprovals.jsx";
import Interviews from "./pages/admin/Interviews.jsx";

// doctor pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard.jsx";
import DoctorAppointments from "./pages/doctor/DoctorAppointments.jsx";
import DoctorChat from "./pages/doctor/DoctorChat.jsx";
import DoctorPosts from "./pages/doctor/DoctorPosts.jsx";
import DoctorReports from "./pages/doctor/DoctorReports.jsx";

function DefaultRedirect() {
  const session = getSession();

  if (!session) return <Navigate to="/login" replace />;

  if (session.role === "Admin") return <Navigate to="/admin" replace />;
  if (session.role === "Doctor") return <Navigate to="/doctor/dashboard" replace />;

  return <Navigate to="/p/home" replace />;
}

export default function App() {
  const location = useLocation();
  const session = getSession();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className={isAuthPage ? "authShell" : "app"}>
      {!isAuthPage ? <Sidebar session={session} /> : null}

      <main className={isAuthPage ? "authMain" : "main"}>
        <Routes>
          {/* Root */}
          <Route path="/" element={<DefaultRedirect />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* =====================
              PATIENT ROUTES (/p)
          ===================== */}
          <Route
            path="/p/home"
            element={
              <ProtectedRoute session={session} allowRoles={["Patient"]}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/p/appointments"
            element={
              <ProtectedRoute session={session} allowRoles={["Patient"]}>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/p/doctors"
            element={
              <ProtectedRoute session={session} allowRoles={["Patient"]}>
                <Doctors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/p/chat"
            element={
              <ProtectedRoute session={session} allowRoles={["Patient"]}>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/p/reports"
            element={
              <ProtectedRoute session={session} allowRoles={["Patient"]}>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/p/settings"
            element={
              <ProtectedRoute session={session} allowRoles={["Patient", "Doctor", "Admin"]}>
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* =====================
              ADMIN ROUTES
          ===================== */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute session={session} allowRoles={["Admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/doctor-approvals"
            element={
              <ProtectedRoute session={session} allowRoles={["Admin"]}>
                <DoctorApprovals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/post-approvals"
            element={
              <ProtectedRoute session={session} allowRoles={["Admin"]}>
                <PostApprovals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/interviews"
            element={
              <ProtectedRoute session={session} allowRoles={["Admin"]}>
                <Interviews />
              </ProtectedRoute>
            }
          />

          {/* =====================
              DOCTOR ROUTES
          ===================== */}
          <Route
            path="/doctor/dashboard"
            element={
              <ProtectedRoute session={session} allowRoles={["Doctor"]}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/appointments"
            element={
              <ProtectedRoute session={session} allowRoles={["Doctor"]}>
                <DoctorAppointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/chat"
            element={
              <ProtectedRoute session={session} allowRoles={["Doctor"]}>
                <DoctorChat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/posts"
            element={
              <ProtectedRoute session={session} allowRoles={["Doctor"]}>
                <DoctorPosts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/reports"
            element={
              <ProtectedRoute session={session} allowRoles={["Doctor"]}>
                <DoctorReports />
              </ProtectedRoute>
            }
          />

          {/* fallback */}
          <Route path="*" element={<DefaultRedirect />} />
        </Routes>
      </main>
    </div>
  );
}
