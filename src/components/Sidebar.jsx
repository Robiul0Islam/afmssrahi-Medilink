import { NavLink, useNavigate } from "react-router-dom";
import { clearSession } from "../utils/auth";

export default function Sidebar({ session }) {
  const nav = useNavigate();

  const role = session?.role || "Guest";
  const name = session?.name || session?.email || "User";

  const patientLinks = [
    { to: "/p/home", label: "Home", icon: "🏠" },
    { to: "/p/appointments", label: "Appointments", icon: "📅" },
    { to: "/p/doctors", label: "Doctors", icon: "🩺" },
    { to: "/p/chat", label: "Chat", icon: "💬" },
    { to: "/p/reports", label: "Reports", icon: "📄" },
    { to: "/p/settings", label: "Settings", icon: "⚙️" },
  ];

  const doctorLinks = [
    { to: "/doctor/dashboard", label: "Dashboard", icon: "🏥" },
    { to: "/doctor/appointments", label: "Appointments", icon: "📅" },
    { to: "/doctor/chat", label: "Chat", icon: "💬" },
    { to: "/doctor/posts", label: "Awareness Posts", icon: "📝" },
    { to: "/doctor/reports", label: "Patient Reports", icon: "📄" },
    { to: "/p/settings", label: "Settings", icon: "⚙️" },
  ];

  const adminLinks = [
    { to: "/admin", label: "Dashboard", icon: "🛡️" },
    { to: "/admin/doctor-approvals", label: "Doctor Approvals", icon: "✅" },
    { to: "/admin/post-approvals", label: "Post Approvals", icon: "📰" },
    { to: "/admin/interviews", label: "Interviews", icon: "🎙️" },
    { to: "/p/settings", label: "Settings", icon: "⚙️" },
  ];

  const links =
    role === "Admin" ? adminLinks : role === "Doctor" ? doctorLinks : patientLinks;

  const onLogout = () => {
    clearSession();
    nav("/login", { replace: true });
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">+</div>
        <div className="brandText">
          Medi<span>Link</span>
        </div>
      </div>

      <nav className="nav">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => `navLink ${isActive ? "active" : ""}`}
          >
            {l.icon} <span>{l.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebarFooter">
        <div className="userChip">
          <div>
            <div className="userName">{name}</div>
            <div className="userEmail">{role}</div>
          </div>
        </div>

        <button
          className="btn ghost"
          style={{ width: "100%", marginTop: 10 }}
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
