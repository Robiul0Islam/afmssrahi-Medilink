import { useEffect, useState } from "react";
import Topbar from "../../components/Topbar";
import { loadUsers, saveUsers } from "../../utils/auth";

export default function DoctorApprovals() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(loadUsers());
  }, []);

  const doctors = users.filter((u) => u.role === "Doctor");

  const updateStatus = (id, status) => {
    const next = users.map((u) =>
      u.id === id ? { ...u, status } : u
    );
    setUsers(next);
    saveUsers(next);
  };

  return (
    <div className="container">
      <Topbar
        title={<>Doctor Verification</>}
        subtitle="Approve, reject or arrange interview for doctors"
        searchPlaceholder="Search doctors..."
      />

      <div className="list">
        {doctors.length === 0 ? (
          <div className="card">
            <div className="panelTitle">No doctors found</div>
          </div>
        ) : (
          doctors.map((d) => (
            <div key={d.id} className="card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div>
                  <div className="panelMain">{d.name}</div>
                  <div className="panelSub">
                    {d.email} • {d.specialization}
                  </div>
                  <div className="panelSub">
                    Status: <b>{d.status}</b>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {d.status !== "Approved" && (
                    <button
                      className="btn"
                      onClick={() => updateStatus(d.id, "Approved")}
                    >
                      Approve
                    </button>
                  )}

                  {d.status !== "Rejected" && (
                    <button
                      className="btn ghost"
                      onClick={() => updateStatus(d.id, "Rejected")}
                    >
                      Reject
                    </button>
                  )}

                  <button
                    className="btn ghost"
                    onClick={() =>
                      alert(
                        `Interview scheduled for Dr. ${d.name} (demo)`
                      )
                    }
                  >
                    Arrange Interview
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
