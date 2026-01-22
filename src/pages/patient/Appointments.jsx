import Topbar from "../../components/Topbar";
import { patient } from "../../data/demoData";

function AppointmentCard({ a }) {
  return (
    <div className="card apptCard">
      <div className="apptLeft">
        <div className="apptDate">
          <div className="apptDay">{a.day}</div>
          <div className="apptMon">{a.month}</div>
        </div>

        <div className="apptInfo">
          <div className="apptTitle">{a.doctor}</div>
          <div className="apptSub">
            {a.specialty} • {a.hospital}
          </div>
          <div className="apptMeta">
            🕒 {a.time} • 📍 {a.location}
          </div>
        </div>
      </div>

      <div className="apptRight">
        <div className={`apptStatus ${a.status.toLowerCase()}`}>{a.status}</div>
        <div className="apptBtns">
          <button className="btn ghost">Reschedule</button>
          <button className="btn">View</button>
        </div>
      </div>
    </div>
  );
}

export default function Appointments() {
  const upcoming = [
    {
      id: 1,
      day: "12",
      month: "JAN",
      doctor: "Dr. Mahmud Hasan",
      specialty: "Cardiology",
      hospital: "Square Hospitals Ltd.",
      time: "7:30 PM",
      location: "Panthapath, Dhaka",
      status: "Upcoming",
    },
    {
      id: 2,
      day: "15",
      month: "JAN",
      doctor: "Dr. Nusrat Jahan",
      specialty: "Dermatology",
      hospital: "Popular Diagnostic Centre",
      time: "6:00 PM",
      location: "Dhanmondi, Dhaka",
      status: "Upcoming",
    },
  ];

  const past = [
    {
      id: 3,
      day: "03",
      month: "JAN",
      doctor: "Dr. Fahim Ahmed",
      specialty: "Orthopedics",
      hospital: "Evercare Hospital Dhaka",
      time: "5:00 PM",
      location: "Bashundhara, Dhaka",
      status: "Completed",
    },
    {
      id: 4,
      day: "20",
      month: "DEC",
      doctor: "Dr. Samia Chowdhury",
      specialty: "Pediatrics",
      hospital: "United Hospital Limited",
      time: "4:30 PM",
      location: "Gulshan, Dhaka",
      status: "Cancelled",
    },
  ];

  return (
    <div className="container">
      <Topbar
        title={<>Appointments</>}
        subtitle={`Manage your visits • ${patient.city}, Bangladesh`}
        searchPlaceholder="Search appointments..."
      />

      <div className="apptStats">
        <div className="card statCard">
          <div className="statK">Upcoming</div>
          <div className="statV">{upcoming.length}</div>
        </div>

        <div className="card statCard">
          <div className="statK">Completed</div>
          <div className="statV">
            {past.filter((p) => p.status === "Completed").length}
          </div>
        </div>

        <div className="card statCard">
          <div className="statK">Cancelled</div>
          <div className="statV">
            {past.filter((p) => p.status === "Cancelled").length}
          </div>
        </div>

        <div className="card statCard">
          <div className="statK">Patient</div>
          <div className="statV">{patient.name}</div>
        </div>
      </div>

      <div className="apptGrid">
        <div>
          <div className="sectionHeader">
            <div className="sectionTitle">Upcoming Appointments</div>
            <button className="seeAll">New →</button>
          </div>

          <div className="list">
            {upcoming.map((a) => (
              <AppointmentCard key={a.id} a={a} />
            ))}
          </div>

          <div className="sectionHeader mt">
            <div className="sectionTitle">Past Appointments</div>
            <button className="seeAll">See All →</button>
          </div>

          <div className="list">
            {past.map((a) => (
              <AppointmentCard key={a.id} a={a} />
            ))}
          </div>
        </div>

        <aside className="panel">
          <div className="card panelCard">
            <div className="panelTitle">Quick Actions</div>
            <div className="quickGrid">
              <button className="quick">➕ New Appointment</button>
              <button className="quick">📞 Call Hospital</button>
              <button className="quick">📍 Get Directions</button>
              <button className="quick">🧾 Download Slip</button>
            </div>
          </div>

          <div className="card panelCard">
            <div className="panelTitle">Tips</div>
            <div className="panelSub">
              • Arrive 10 minutes early
              <br />
              • Carry previous reports
              <br />
              • Keep your NID / ID handy
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
