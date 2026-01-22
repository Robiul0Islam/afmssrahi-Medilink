import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_DEMO, getSession, loadUsers, saveUsers } from "../utils/auth";

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

export default function Register() {
  const [role, setRole] = useState("Patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [spec, setSpec] = useState("Cardiology");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const s = getSession();
    if (s) {
      // already logged in, redirect
      if (s.role === "Admin") nav("/admin", { replace: true });
      else if (s.role === "Doctor") nav("/doctor/dashboard", { replace: true });
      else nav("/p/home", { replace: true });
    }
  }, [nav]);

  function handleRegister(e) {
    e.preventDefault();
    setMsg("");

    if (role === "Admin") {
      setMsg(
        `Admin registration is disabled. Use ${ADMIN_DEMO.email} / ${ADMIN_DEMO.password}`
      );
      return;
    }

    const users = loadUsers();
    const exists = users.some((u) => u.email === email && u.role === role);
    if (exists) return setMsg("Account already exists for this role & email.");

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
      setMsg("Doctor account created! Status: Pending (Admin verification needed).");
    } else {
      setMsg("Patient account created! You can login now.");
    }

    // optional auto go login after a short action
    // nav("/login");
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
