import Topbar from "../../components/Topbar";
import { getSession } from "../../utils/auth";

export default function DoctorDashboard() {
  const session = getSession();

  return (
    <div className="container">
      <Topbar
        title={<>Doctor Dashboard</>}
        subtitle="Manage appointments, posts, reports and chat"
        searchPlaceholder="Search doctor tools..."
      />

      <div className="grid" style={{ gridTemplateColumns: "1fr 360px" }}>
        <div className="col">
          <div className="sectionHeader">
            <div className="sectionTitle">Quick Overview</div>
          </div>

          <div className="list">
            <div className="card">
              <div className="panelTitle">Account Status</div>
              <div className="panelSub">
                Logged in as: <b>{session?.email}</b>
              </div>
              <div className="panelSub" style={{ marginTop: 6 }}>
                Role: <b>{session?.role}</b>
              </div>
              <div className="panelSub" style={{ marginTop: 6 }}>
                Status: <b>{session?.status || "Approved"}</b>
              </div>
            </div>

            <div className="card">
              <div className="panelTitle">Doctor Actions</div>
              <div className="panelSub">
                • View appointment requests from patients<br/>
                • Accept & schedule time<br/>
                • Create awareness posts (Admin approval required)<br/>
                • Chat with patients<br/>
                • Add reports/prescriptions after consultation
              </div>
            </div>
          </div>
        </div>

        <aside className="panel">
          <div className="card panelCard">
            <div className="panelTitle">Today</div>
            <div className="summary">
              <div className="summaryItem">
                <div className="k">Pending Requests</div>
                <div className="v">3</div>
              </div>
              <div className="summaryItem">
                <div className="k">Scheduled</div>
                <div className="v">2</div>
              </div>
              <div className="summaryItem">
                <div className="k">Chats</div>
                <div className="v">5</div>
              </div>
            </div>
          </div>

          <div className="card panelCard">
            <div className="panelTitle">Shortcuts</div>
            <div className="quickGrid">
              <button className="quick">📅 Appointments</button>
              <button className="quick">💬 Chat</button>
              <button className="quick">📝 New Post</button>
              <button className="quick">📄 Add Report</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
