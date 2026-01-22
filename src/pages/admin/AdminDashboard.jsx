import Topbar from "../../components/Topbar";
import { loadUsers } from "../../utils/auth";
import { loadPosts } from "../../utils/posts";

export default function AdminDashboard() {
  const users = loadUsers();
  const posts = loadPosts();

  const doctors = users.filter((u) => u.role === "Doctor");
  const pendingDoctors = doctors.filter((d) => d.status === "Pending");
  const approvedDoctors = doctors.filter((d) => d.status === "Approved");

  const pendingPosts = posts.filter((p) => p.status === "Pending");

  return (
    <div className="container">
      <Topbar
        title={<>Admin Dashboard</>}
        subtitle="Manage doctors, posts and platform quality"
        searchPlaceholder="Search admin tools..."
      />

      <div className="apptStats">
        <div className="card statCard">
          <div className="statK">Total Doctors</div>
          <div className="statV">{doctors.length}</div>
        </div>

        <div className="card statCard">
          <div className="statK">Pending Doctors</div>
          <div className="statV">{pendingDoctors.length}</div>
        </div>

        <div className="card statCard">
          <div className="statK">Approved Doctors</div>
          <div className="statV">{approvedDoctors.length}</div>
        </div>

        <div className="card statCard">
          <div className="statK">Pending Posts</div>
          <div className="statV">{pendingPosts.length}</div>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <div className="panelTitle">Admin Capabilities</div>
          <div className="panelSub">
            • Review & approve doctor registrations<br />
            • Arrange doctor interviews when required<br />
            • Approve / reject awareness posts<br />
            • Maintain platform authenticity & quality
          </div>
        </div>

        <aside className="panel">
          <div className="card panelCard">
            <div className="panelTitle">Quick Actions</div>
            <div className="quickGrid">
              <button className="quick">👨‍⚕️ Review Doctors</button>
              <button className="quick">📝 Review Posts</button>
              <button className="quick">🎥 Arrange Interview</button>
              <button className="quick">⚙️ Settings</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
