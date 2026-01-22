import Topbar from "../../components/Topbar";

export default function Reports() {
  const reports = [
    {
      id: 1,
      title: "Blood Test Report",
      hospital: "Popular Diagnostic Centre, Dhanmondi",
      date: "10 Jan 2026",
      status: "Verified",
      type: "PDF",
    },
    {
      id: 2,
      title: "ECG Report",
      hospital: "Square Hospitals Ltd., Panthapath",
      date: "03 Jan 2026",
      status: "Verified",
      type: "Image",
    },
    {
      id: 3,
      title: "X-Ray (Knee)",
      hospital: "Evercare Hospital Dhaka",
      date: "20 Dec 2025",
      status: "Pending",
      type: "DICOM",
    },
  ];

  return (
    <div className="container">
      <Topbar
        title={<>Reports</>}
        subtitle="View, download and upload medical reports"
        searchPlaceholder="Search reports..."
      />

      <div className="reportsTop">
        <div className="card reportUpload">
          <div className="reportUploadTitle">Upload New Report</div>
          <div className="reportUploadSub">
            Upload PDF/Image. Keep your reports organized.
          </div>
          <button className="btn" style={{ width: "fit-content" }}>
            Upload
          </button>
        </div>

        <div className="card reportStats">
          <div className="panelTitle">Summary</div>
          <div className="summary">
            <div className="summaryItem">
              <div className="k">Total Reports</div>
              <div className="v">{reports.length}</div>
            </div>
            <div className="summaryItem">
              <div className="k">Verified</div>
              <div className="v">
                {reports.filter((r) => r.status === "Verified").length}
              </div>
            </div>
            <div className="summaryItem">
              <div className="k">Pending</div>
              <div className="v">
                {reports.filter((r) => r.status === "Pending").length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sectionHeader mt">
        <div className="sectionTitle">Recent Reports</div>
        <button className="seeAll">See All →</button>
      </div>

      <div className="list">
        {reports.map((r) => (
          <div key={r.id} className="card reportRow">
            <div className="reportLeft">
              <div className="reportIcon">📄</div>
              <div>
                <div className="apptTitle">{r.title}</div>
                <div className="apptSub">{r.hospital}</div>
                <div className="apptMeta">
                  📅 {r.date} • Type: {r.type}
                </div>
              </div>
            </div>

            <div className="reportRight">
              <div className={`tag ${r.status === "Verified" ? "ok" : "warn"}`}>
                {r.status}
              </div>
              <div className="apptBtns">
                <button className="btn ghost">Download</button>
                <button className="btn">View</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
