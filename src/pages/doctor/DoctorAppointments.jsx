import { useMemo, useState } from "react";
import Topbar from "../../components/Topbar";
import { getSession } from "../../utils/auth";

export default function DoctorAppointments() {
  const session = getSession();

  const [requests, setRequests] = useState(() => [
    {
      id: 1,
      patientName: "Robiul Islam",
      problem: "Chest discomfort",
      requestedDate: "Jan 23, 2026",
      status: "Pending",
      scheduledTime: "",
    },
    {
      id: 2,
      patientName: "Ayesha Rahman",
      problem: "Skin allergy",
      requestedDate: "Jan 24, 2026",
      status: "Pending",
      scheduledTime: "",
    },
    {
      id: 3,
      patientName: "Tanvir Hossain",
      problem: "Knee pain",
      requestedDate: "Jan 25, 2026",
      status: "Accepted",
      scheduledTime: "5:30 PM",
    },
  ]);

  const pending = useMemo(
    () => requests.filter((r) => r.status === "Pending"),
    [requests]
  );
  const accepted = useMemo(
    () => requests.filter((r) => r.status === "Accepted"),
    [requests]
  );
  const rejected = useMemo(
    () => requests.filter((r) => r.status === "Rejected"),
    [requests]
  );

  const updateReq = (id, patch) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  return (
    <div className="container">
      <Topbar
        title={<>Doctor Appointments</>}
        subtitle={`Manage patient requests • ${session?.email || ""}`}
        searchPlaceholder="Search patient requests..."
      />

      <div className="apptStats">
        <div className="card statCard">
          <div className="statK">Pending</div>
          <div className="statV">{pending.length}</div>
        </div>
        <div className="card statCard">
          <div className="statK">Accepted</div>
          <div className="statV">{accepted.length}</div>
        </div>
        <div className="card statCard">
          <div className="statK">Rejected</div>
          <div className="statV">{rejected.length}</div>
        </div>
        <div className="card statCard">
          <div className="statK">Doctor</div>
          <div className="statV">{session?.name || "Doctor"}</div>
        </div>
      </div>

      <div className="list">
        {requests.map((r) => (
          <div key={r.id} className="card apptCard">
            <div className="apptLeft">
              <div className="apptDate">
                <div className="apptDay">{String(r.id).padStart(2, "0")}</div>
                <div className="apptMon">REQ</div>
              </div>

              <div className="apptInfo">
                <div className="apptTitle">{r.patientName}</div>
                <div className="apptSub">{r.problem}</div>
                <div className="apptMeta">📅 Requested: {r.requestedDate}</div>

                {r.status === "Accepted" ? (
                  <div className="apptMeta">🕒 Scheduled: {r.scheduledTime}</div>
                ) : null}
              </div>
            </div>

            <div className="apptRight">
              <div className={`apptStatus ${r.status.toLowerCase()}`}>{r.status}</div>

              {r.status === "Pending" ? (
                <div className="apptBtns" style={{ flexWrap: "wrap" }}>
                  <input
                    className="input"
                    style={{ width: 160, padding: 10 }}
                    placeholder="Time (e.g. 6:00 PM)"
                    value={r.scheduledTime}
                    onChange={(e) =>
                      updateReq(r.id, { scheduledTime: e.target.value })
                    }
                  />
                  <button
                    className="btn"
                    onClick={() => {
                      if (!r.scheduledTime.trim()) return;
                      updateReq(r.id, { status: "Accepted" });
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="btn ghost"
                    onClick={() => updateReq(r.id, { status: "Rejected" })}
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <div className="apptBtns">
                  <button className="btn ghost">View</button>
                  <button className="btn">Details</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <div className="panelTitle">How it works (Doctor)</div>
        <div className="panelSub">
          • Patients send appointment requests<br />
          • Doctor accepts + sets appointment time<br />
          • After consultation, doctor can add reports/prescriptions<br />
          • Patients can view reports in Reports section
        </div>
      </div>
    </div>
  );
}
