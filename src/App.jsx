import "./App.css";
import {
  NavLink,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

/* =========================
   AUTH (LOCAL DEMO)
========================= */
const LS_USERS = "medilink_users";
const LS_SESSION = "medilink_session";

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(LS_USERS)) || [];
  } catch {
    return [];
  }
}
function saveUsers(users) {
  localStorage.setItem(LS_USERS, JSON.stringify(users));
}
function setSession(session) {
  localStorage.setItem(LS_SESSION, JSON.stringify(session));
}
function getSession() {
  try {
    return JSON.parse(localStorage.getItem(LS_SESSION)) || null;
  } catch {
    return null;
  }
}
function clearSession() {
  localStorage.removeItem(LS_SESSION);
}

const ADMIN_DEMO = { email: "admin@medilink.com", password: "admin123" };

/* =========================
   BANGLADESH DEMO DATA
========================= */
const patient = {
  name: "Robiul Islam",
  city: "Dhaka",
  email: "robiulislam@gmail.com",
  avatar:
    "https://scontent.fdac207-1.fna.fbcdn.net/v/t39.30808-6/462165363_1768680817291622_7524753487152687250_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFP1qYiOZDevYzLgriSUnUl1OGZx3wdElnU4ZnHfB0SWa4AWpN3bvzZ15WOza_e7h4VbLUZNRdRKJFmIkTfXT1q&_nc_ohc=RqCLLc2uICUQ7kNvwE9vJ_q&_nc_oc=Adl0th49IRw8LGzbK5P-Xb8fgp0N-PCZKtemHoHDt8k9iNJZPJP7D90Cr1ojuLtYvVaoZvV4jFQznP-qtnd3TeG1&_nc_zt=23&_nc_ht=scontent.fdac207-1.fna&_nc_gid=Fw4qr9agIBh3MoeHCZhz2w&oh=00_AfrwFkT-welGNwmKbN9FxRMTe7TIQajYQP2CH8gmHdttjw&oe=696ADBAC",
  vitals: {
    heartRate: "76 bpm",
    bloodPressure: "118/78",
    glucose: "92 mg/dL",
    weight: "62 kg",
    height: "160 cm",
    bmi: "24.2",
  },
};

const doctors = [
  {
    id: 1,
    name: "Dr. Mahmud Hasan",
    specialty: "Cardiologist",
    rating: 4.8,
    reviews: 310,
    clinic: "Square Hospitals Ltd.",
    distance: "Panthapath, Dhaka • 2.4 km",
    status: "Available Today",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Dr. Nusrat Jahan",
    specialty: "Dermatologist",
    rating: 4.7,
    reviews: 205,
    clinic: "Popular Diagnostic Centre",
    distance: "Dhanmondi, Dhaka • 1.6 km",
    status: "Available Now",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 3,
    name: "Dr. Fahim Ahmed",
    specialty: "Orthopedic Surgeon",
    rating: 4.9,
    reviews: 268,
    clinic: "Evercare Hospital Dhaka",
    distance: "Bashundhara, Dhaka • 7.8 km",
    status: "Available Tomorrow",
    avatar: "https://randomuser.me/api/portraits/men/68.jpg",
  },
  {
    id: 4,
    name: "Dr. Samia Chowdhury",
    specialty: "Pediatrician",
    rating: 4.6,
    reviews: 184,
    clinic: "United Hospital Limited",
    distance: "Gulshan, Dhaka • 5.1 km",
    status: "Available Today",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
  },
];

const shows = [
  {
    id: 1,
    title: "Heart Health Basics (Bangla)",
    by: "By Dr. Rafiq Uddin, Cardiologist",
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 2,
    title: "Diabetes Care & Diet Tips",
    by: "By Dr. Sharmeen Akter, Endocrinologist",
    img: "https://images.unsplash.com/photo-1580281658628-8f29e6d6b83a?auto=format&fit=crop&w=1200&q=60",
  },
];

/* =========================
   HELPERS
========================= */
function Stars({ value }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;

  return (
    <div className="stars" aria-label={`Rating ${value}`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const isFull = i < full;
        const isHalf = i === full && half;
        return (
          <span
            key={i}
            className={`star ${isFull ? "full" : isHalf ? "half" : ""}`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

function RoleTabs({ role, setRole }) {
  const roles = ["Patient", "Doctor", "Admin"];
  return (
    <div className="roleTabs">
      {roles.map((r) => (
        <button
          key={r}
          className={`roleTab ${role === r ? "active" : ""}`}
          onClick={() => setRole(r)}
          type="button"
        >
          {r}
        </button>
      ))}
    </div>
  );
}

/* =========================
   AUTH PAGES
========================= */
function LoginPage() {
  const [role, setRole] = useState("Patient");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const s = getSession();
    if (s) nav("/home", { replace: true });
  }, [nav]);

  function handleLogin(e) {
    e.preventDefault();
    setMsg("");

    if (role === "Admin") {
      if (email === ADMIN_DEMO.email && pass === ADMIN_DEMO.password) {
        setSession({ role: "Admin", email });
        nav("/home", { replace: true });
      } else {
        setMsg(
          "Invalid admin credentials. (Try admin@medilink.com / admin123)"
        );
      }
      return;
    }

    const users = loadUsers();
    const u = users.find((x) => x.email === email && x.role === role);

    if (!u) {
      setMsg("Account not found for this role/email.");
      return;
    }
    if (u.password !== pass) {
      setMsg("Wrong password.");
      return;
    }
    if (u.role === "Doctor" && u.status !== "Approved") {
      setMsg("Doctor account is not approved yet (Pending/Rejected).");
      return;
    }

    setSession({
      role: u.role,
      email: u.email,
      name: u.name,
      status: u.status,
    });
    nav("/home", { replace: true });
  }

  return (
    <div className="authWrap">
      <div className="authCard">
        <div className="authHeader">
          <div className="authLogo">+</div>
          <div>
            <div className="authBrand">MediLink+</div>
            <div className="authTag">Secure healthcare, faster.</div>
          </div>
        </div>

        <div className="authTitle">MediLink+ Login</div>
        <div className="authSub">Login as Patient / Doctor / Admin</div>

        <RoleTabs role={role} setRole={setRole} />

        <form className="authForm" onSubmit={handleLogin}>
          <div>
            <div className="label">Email</div>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              required
            />
          </div>

          <div>
            <div className="label">Password</div>
            <input
              className="input"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          {msg ? <div className="authMsg">{msg}</div> : null}

          <button className="btn" type="submit" style={{ width: "100%" }}>
            Login
          </button>

          <div className="authHint">
            Don’t have an account?{" "}
            <button
              type="button"
              className="linkBtn"
              onClick={() => nav("/register")}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function RegisterPage() {
  const [role, setRole] = useState("Patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [spec, setSpec] = useState("Cardiology");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const s = getSession();
    if (s) nav("/home", { replace: true });
  }, [nav]);

  function handleRegister(e) {
    e.preventDefault();
    setMsg("");

    if (role === "Admin") {
      setMsg(
        "Admin registration is disabled in demo. Use admin@medilink.com / admin123"
      );
      return;
    }

    const users = loadUsers();
    const exists = users.some((u) => u.email === email && u.role === role);
    if (exists) {
      setMsg("Account already exists for this role & email.");
      return;
    }

    const newUser = {
      id: Date.now(),
      role,
      name,
      email,
      password: pass,
      status: role === "Doctor" ? "Pending" : "Approved",
      specialization: role === "Doctor" ? spec : null,
      createdAt: new Date().toISOString(),
    };

    saveUsers([newUser, ...users]);

    if (role === "Doctor") {
      setMsg(
        "Doctor account created! Status: Pending (Admin verification needed)."
      );
    } else {
      setMsg("Patient account created! You can login now.");
    }
  }

  return (
    <div className="authWrap">
      <div className="authCard">
        <div className="authHeader">
          <div className="authLogo">+</div>
          <div>
            <div className="authBrand">MediLink+</div>
            <div className="authTag">Secure healthcare, faster.</div>
          </div>
        </div>
        <div className="authTitle">Create Account</div>
        <div className="authSub">Register as Patient or Doctor</div>

        <RoleTabs role={role} setRole={setRole} />

        <form className="authForm" onSubmit={handleRegister}>
          <div>
            <div className="label">Full Name</div>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              disabled={role === "Admin"}
            />
          </div>

          <div>
            <div className="label">Email</div>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              required
              disabled={role === "Admin"}
            />
          </div>

          {role === "Doctor" ? (
            <div>
              <div className="label">Specialization</div>
              <select
                className="select"
                value={spec}
                onChange={(e) => setSpec(e.target.value)}
              >
                <option>Cardiology</option>
                <option>Dermatology</option>
                <option>Orthopedics</option>
                <option>ENT</option>
                <option>Neurology</option>
                <option>Pediatrics</option>
              </select>
            </div>
          ) : null}

          <div>
            <div className="label">Password</div>
            <input
              className="input"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="********"
              required
              disabled={role === "Admin"}
            />
          </div>

          {msg ? <div className="authMsg">{msg}</div> : null}

          <button
            className="btn"
            type="submit"
            style={{ width: "100%" }}
            disabled={role === "Admin"}
          >
            Register
          </button>

          <div className="authHint">
            Already have an account?{" "}
            <button
              type="button"
              className="linkBtn"
              onClick={() => nav("/login")}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================
   SHARED UI
========================= */
function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">+</div>
        <div className="brandText">
          Medi<span>Link</span>
        </div>
      </div>

      <nav className="nav">
        <NavLink
          to="/home"
          className={({ isActive }) => `navLink ${isActive ? "active" : ""}`}
        >
          🏠 <span>Home</span>
        </NavLink>

        <NavLink
          to="/appointments"
          className={({ isActive }) => `navLink ${isActive ? "active" : ""}`}
        >
          📅 <span>Appointments</span>
        </NavLink>

        <NavLink
          to="/doctors"
          className={({ isActive }) => `navLink ${isActive ? "active" : ""}`}
        >
          🩺 <span>Doctors</span>
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) => `navLink ${isActive ? "active" : ""}`}
        >
          📄 <span>Reports</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) => `navLink ${isActive ? "active" : ""}`}
        >
          ⚙️ <span>Settings</span>
        </NavLink>
      </nav>

      <div className="sidebarFooter">
        <div className="userChip">
          <img className="userAvatar" src={patient.avatar} alt={patient.name} />
          <div>
            <div className="userName">{patient.name}</div>
            <div className="userEmail">{patient.email}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ title, subtitle, searchPlaceholder = "Search..." }) {
  return (
    <header className="topbar">
      <div>
        <div className="hello">{title}</div>
        <div className="sub">{subtitle}</div>
      </div>

      <div className="topbarRight">
        <div className="searchBox">
          <span className="searchIcon">🔎</span>
          <input className="searchInput" placeholder={searchPlaceholder} />
        </div>
        <button className="iconBtn" aria-label="Notifications">
          🔔
        </button>
        <button className="iconBtn" aria-label="Messages">
          💬
        </button>
      </div>
    </header>
  );
}

/* =========================
   HOME PAGE
========================= */
function HomePage() {
  return (
    <div className="container">
      <Topbar
        title={
          <>
            Welcome back, <b>{patient.name}</b> 👋
          </>
        }
        subtitle={`📍 ${patient.city}, Bangladesh • Find doctors, book appointments, view reports`}
        searchPlaceholder="Search doctors, departments..."
      />

      <section className="grid">
        <div className="col">
          <div className="sectionHeader">
            <div className="sectionTitle">Recommended Doctors (Bangladesh)</div>
            <button className="seeAll">See All →</button>
          </div>

          <div className="list">
            {doctors.map((d) => (
              <div key={d.id} className="card doctorCard">
                <img className="avatar" src={d.avatar} alt={d.name} />
                <div className="docInfo">
                  <div className="docName">{d.name}</div>
                  <div className="docSpec">{d.specialty}</div>

                  <div className="ratingRow">
                    <Stars value={d.rating} />
                    <div className="ratingText">
                      <b>{d.rating.toFixed(1)}</b> ({d.reviews} Reviews)
                    </div>
                  </div>

                  <div className="metaRow">
                    📍 {d.clinic} · {d.distance}
                  </div>
                </div>

                <div className="rightCol">
                  <div className="pill">{d.status}</div>
                  <button className="bookBtn">Book</button>
                </div>
              </div>
            ))}
          </div>

          <div className="sectionHeader mt">
            <div className="sectionTitle">Health Awareness Shows</div>
            <button className="seeAll">See All →</button>
          </div>

          <div className="shows">
            {shows.map((s) => (
              <div key={s.id} className="card showCard">
                <div
                  className="showImg"
                  style={{ backgroundImage: `url(${s.img})` }}
                />
                <div className="showBody">
                  <div className="showTitle">{s.title}</div>
                  <div className="showBy">{s.by}</div>
                  <button className="watchBtn">Watch Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="panel">
          <div className="card panelCard">
            <div className="panelTitle">Next Appointment</div>
            <div className="panelRow">
              <div className="dot" />
              <div>
                <div className="panelMain">Dr. Mahmud Hasan</div>
                <div className="panelSub">
                  Today • 7:30 PM • Square Hospitals Ltd., Dhaka
                </div>
              </div>
            </div>
            <div className="panelActions">
              <button className="btn">View Details</button>
              <button className="btn ghost">Reschedule</button>
            </div>
          </div>

          <div className="card panelCard">
            <div className="panelTitle">Quick Actions</div>
            <div className="quickGrid">
              <button className="quick">➕ New Appointment</button>
              <button className="quick">📄 Upload Report</button>
              <button className="quick">💬 Chat Support</button>
              <button className="quick">🧾 Billing</button>
            </div>
          </div>

          <div className="card panelCard">
            <div className="panelTitle">Health Summary</div>
            <div className="summary">
              <div className="summaryItem">
                <div className="k">Heart Rate</div>
                <div className="v">{patient.vitals.heartRate}</div>
              </div>
              <div className="summaryItem">
                <div className="k">Blood Pressure</div>
                <div className="v">{patient.vitals.bloodPressure}</div>
              </div>
              <div className="summaryItem">
                <div className="k">Glucose</div>
                <div className="v">{patient.vitals.glucose}</div>
              </div>
              <div className="summaryItem">
                <div className="k">Weight</div>
                <div className="v">{patient.vitals.weight}</div>
              </div>
              <div className="summaryItem">
                <div className="k">Height</div>
                <div className="v">{patient.vitals.height}</div>
              </div>
              <div className="summaryItem">
                <div className="k">BMI</div>
                <div className="v">{patient.vitals.bmi}</div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

/* =========================
   APPOINTMENTS PAGE
========================= */
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

function AppointmentsPage() {
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

/* =========================
   DOCTORS PAGE
========================= */
function DoctorsPage() {
  const allDoctors = [
    ...doctors,
    {
      id: 5,
      name: "Dr. Rashedul Karim",
      specialty: "ENT Specialist",
      rating: 4.6,
      reviews: 142,
      clinic: "Labaid Specialized Hospital",
      distance: "Dhanmondi, Dhaka • 2.1 km",
      status: "Available Today",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    {
      id: 6,
      name: "Dr. Farzana Islam",
      specialty: "Neurologist",
      rating: 4.7,
      reviews: 198,
      clinic: "National Institute of Neurosciences",
      distance: "Agargaon, Dhaka • 6.9 km",
      status: "Available Tomorrow",
      avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    },
  ];

  return (
    <div className="container">
      <Topbar
        title={<>Doctors</>}
        subtitle={`Find specialists in ${patient.city}, Bangladesh`}
        searchPlaceholder="Search doctors, specialties..."
      />

      <div className="doctorTools">
        <div className="toolSearch">
          <span className="searchIcon">🔎</span>
          <input
            className="searchInput"
            placeholder="Search by doctor name, specialty..."
          />
        </div>

        <select className="select" defaultValue="All">
          <option value="All">All Specialties</option>
          <option>Cardiology</option>
          <option>Dermatology</option>
          <option>Orthopedics</option>
          <option>ENT</option>
          <option>Neurology</option>
          <option>Pediatrics</option>
        </select>

        <select className="select" defaultValue="Recommended">
          <option value="Recommended">Sort: Recommended</option>
          <option>Sort: Highest Rated</option>
          <option>Sort: Nearest</option>
          <option>Sort: Most Reviewed</option>
        </select>
      </div>

      <div className="doctorGrid">
        {allDoctors.map((d) => (
          <div key={d.id} className="card docTile">
            <div className="docTop">
              <img className="docTileAvatar" src={d.avatar} alt={d.name} />
              <div className="docTopInfo">
                <div className="docName">{d.name}</div>
                <div className="docSpec">{d.specialty}</div>
                <div className="ratingRow" style={{ margin: "6px 0 0" }}>
                  <Stars value={d.rating} />
                  <div className="ratingText">
                    <b>{d.rating.toFixed(1)}</b> ({d.reviews})
                  </div>
                </div>
              </div>
            </div>

            <div className="metaRow" style={{ marginTop: 10 }}>
              📍 {d.clinic} · {d.distance}
            </div>

            <div className="docBottom">
              <div className="pill">{d.status}</div>
              <button className="bookBtn">Book Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   REPORTS PAGE
========================= */
function ReportsPage() {
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

/* =========================
   SETTINGS PAGE
========================= */
function SettingsPage() {
  return (
    <div className="container">
      <Topbar
        title={<>Settings</>}
        subtitle="Profile, security and preferences"
        searchPlaceholder="Search settings..."
      />

      <div className="settingsGrid">
        <div className="card settingCard">
          <div className="panelTitle">Profile</div>

          <div className="profileRow">
            <img
              className="profileAvatar"
              src={patient.avatar}
              alt={patient.name}
            />
            <div>
              <div className="panelMain">{patient.name}</div>
              <div className="panelSub">{patient.city}, Bangladesh</div>
              <div className="panelSub">{patient.email}</div>
            </div>
          </div>

          <div className="formGrid">
            <div>
              <div className="label">Full Name</div>
              <input className="input" defaultValue={patient.name} />
            </div>

            <div>
              <div className="label">City</div>
              <input className="input" defaultValue={patient.city} />
            </div>

            <div>
              <div className="label">Phone</div>
              <input className="input" placeholder="+880 1XXXXXXXXX" />
            </div>

            <div>
              <div className="label">Blood Group</div>
              <select className="select" defaultValue="Select">
                <option value="Select">Select</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>
          </div>

          <div className="panelActions">
            <button className="btn">Save Changes</button>
            <button className="btn ghost">Cancel</button>
          </div>
        </div>

        <div className="card settingCard">
          <div className="panelTitle">Security</div>

          <div className="list" style={{ gap: 10 }}>
            <div className="securityRow">
              <div>
                <div className="panelMain">Change Password</div>
                <div className="panelSub">Update your password regularly.</div>
              </div>
              <button className="btn ghost">Change</button>
            </div>

            <div className="securityRow">
              <div>
                <div className="panelMain">Two-Factor Authentication</div>
                <div className="panelSub">Add extra protection to your account.</div>
              </div>
              <button className="btn">Enable</button>
            </div>

            <div className="securityRow">
              <div>
                <div className="panelMain">Logout</div>
                <div className="panelSub">Sign out from this device.</div>
              </div>
              <button
                className="btn"
                style={{ background: "#b42318" }}
                onClick={() => {
                  clearSession();
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   APP ROOT (AUTH PAGES ALADA)
========================= */
export default function App() {
  const location = useLocation();
  const session = getSession();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const protectedPaths = ["/home", "/appointments", "/doctors", "/reports", "/settings"];
  const isProtectedPath = protectedPaths.includes(location.pathname);

  if (!session && isProtectedPath) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={isAuthPage ? "authShell" : "app"}>
      {!isAuthPage ? <Sidebar /> : null}

      <main className={isAuthPage ? "authMain" : "main"}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/home" element={<HomePage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}
