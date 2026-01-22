import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_DEMO, getSession, loadUsers, setSession } from "../utils/auth";

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

export default function Login() {
  const [role, setRole] = useState("Patient");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const s = getSession();
    if (s) {
      if (s.role === "Admin") nav("/admin", { replace: true });
      else if (s.role === "Doctor") nav("/doctor/dashboard", { replace: true });
      else nav("/p/home", { replace: true });
    }
  }, [nav]);

  function handleLogin(e) {
    e.preventDefault();
    setMsg("");

    // Admin demo
    if (role === "Admin") {
      if (email === ADMIN_DEMO.email && pass === ADMIN_DEMO.password) {
        setSession({ role: "Admin", email });
        nav("/admin", { replace: true });
      } else {
        setMsg("Invalid admin credentials. (Try admin@medilink.com / admin123)");
      }
      return;
    }

    // Patient/Doctor
    const users = loadUsers();
    const u = users.find((x) => x.email === email && x.role === role);

    if (!u) return setMsg("Account not found for this role/email.");
    if (u.password !== pass) return setMsg("Wrong password.");

    if (u.role === "Doctor" && u.status !== "Approved") {
      return setMsg("Doctor account is not approved yet (Pending/Rejected).");
    }

    setSession({
      role: u.role,
      email: u.email,
      name: u.name,
      status: u.status,
    });

    if (u.role === "Doctor") nav("/doctor/dashboard", { replace: true });
    else nav("/p/home", { replace: true });
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

          <div className="authHint" style={{ marginTop: 10, fontSize: 12 }}>
            Admin demo: <b>admin@medilink.com</b> / <b>admin123</b>
          </div>
        </form>
      </div>
    </div>
  );
}
