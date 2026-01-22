import { useEffect, useMemo, useState } from "react";
import Topbar from "../../components/Topbar";
import { getSession } from "../../utils/auth";
import { loadReports, saveReports } from "../../utils/reports";

const demoPatients = [
  { id: 1, name: "Robiul Islam", email: "robiulislam@gmail.com" },
  { id: 2, name: "Ayesha Rahman", email: "ayesha@gmail.com" },
  { id: 3, name: "Tanvir Hossain", email: "tanvir@gmail.com" },
];

export default function DoctorReports() {
  const session = getSession();

  const [patientEmail, setPatientEmail] = useState(demoPatients[0].email);
  const [type, setType] = useState("Prescription");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setReports(loadReports());
  }, []);

  const selectedPatient = useMemo(
    () => demoPatients.find((p) => p.email === patientEmail) || demoPatients[0],
    [patientEmail]
  );

  const patientReports = useMemo(() => {
    return reports.filter((r) => r.patientEmail === patientEmail);
  }, [reports, patientEmail]);

  const addReport = (e) => {
    e.preventDefault();
    const t = title.trim();
    const d = details.trim();
    if (!t || !d) return;

    const newItem = {
      id: Date.now(),
      patientEmail,
      patientName: selectedPatient.name,
      doctorEmail: session?.email,
      doctorName: session?.name || "Doctor",
      type, // Prescription / Test Report / Medical Report
      title: t,
      details: d,
      createdAt: new Date().toISOString(),
    };

    const next = [newItem, ...reports];
    setReports(next);
    saveReports(next);

    setTitle("");
    setDetails("");
  };

  const removeReport = (id) => {
    const next = reports.filter((r) => r.id !== id);
    setReports(next);
    saveReports(next);
  };

  return (
    <div className="container">
      <Topbar
        title={<>Doctor Reports</>}
        subtitle="Add medical reports, test reports and prescriptions after consultation"
        searchPlaceholder="Search reports..."
      />

      <div className="reportsTop">
        {/* Create */}
        <div className="card reportUpload">
          <div className="reportUploadTitle">Add Report / Prescription</div>
          <div className="reportUploadSub">
            Select patient and add report details.
          </div>

          <form className="authForm" onSubmit={addReport} style={{ gap: 10 }}>
            <div>
              <div className="label">Patient</div>
              <select
                className="select"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
              >
                {demoPatients.map((p) => (
                  <option key={p.email} value={p.email}>
                    {p.name} ({p.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="label">Type</div>
              <select className="select" value={type} onChange={(e) => setType(e.target.value)}>
                <option>Prescription</option>
                <option>Test Report</option>
                <option>Medical Report</option>
              </select>
            </div>

            <div>
              <div className="label">Title</div>
              <input
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Blood Sugar Test / Prescription for Fever"
              />
            </div>

            <div>
              <div className="label">Details</div>
              <textarea
                className="input"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Write report details / medicines / instructions..."
                style={{ minHeight: 110, resize: "vertical" }}
              />
            </div>

            <button className="btn" type="submit" style={{ width: "fit-content" }}>
              Save
            </button>
          </form>
        </div>

        {/* Summary */}
        <div className="card reportStats">
          <div className="panelTitle">Selected Patient</div>
          <div className="panelMain">{selectedPatient.name}</div>
          <div className="panelSub">{selectedPatient.email}</div>

          <div className="summary" style={{ marginTop: 12 }}>
            <div className="summaryItem">
              <div className="k">Total Items</div>
              <div className="v">{patientReports.length}</div>
            </div>
            <div className="summaryItem">
              <div className="k">Prescriptions</div>
              <div className="v">
                {patientReports.filter((r) => r.type === "Prescription").length}
              </div>
            </div>
            <div className="summaryItem">
              <div className="k">Reports</div>
              <div className="v">
                {patientReports.filter((r) => r.type !== "Prescription").length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sectionHeader mt">
        <div className="sectionTitle">Patient Records</div>
        <button className="seeAll" onClick={() => setReports(loadReports())}>
          Refresh ↻
        </button>
      </div>

      <div className="list">
        {patientReports.length === 0 ? (
          <div className="card">
            <div className="panelTitle">No records found</div>
            <div className="panelSub">Add a report/prescription for this patient.</div>
          </div>
        ) : (
          patientReports.map((r) => (
            <div key={r.id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div>
                  <div className="apptTitle">
                    {r.title}{" "}
                    <span style={{ color: "#6b7a99", fontWeight: 800, fontSize: 12 }}>
                      ({r.type})
                    </span>
                  </div>
                  <div className="apptMeta">
                    👨‍⚕️ {r.doctorName} • 📅 {new Date(r.createdAt).toLocaleString()}
                  </div>
                </div>

                <button className="btn ghost" onClick={() => removeReport(r.id)}>
                  Delete
                </button>
              </div>

              <div className="panelSub" style={{ marginTop: 10 }}>
                {r.details}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
