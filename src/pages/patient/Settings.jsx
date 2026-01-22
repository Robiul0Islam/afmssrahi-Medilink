import Topbar from "../../components/Topbar";
import { patient } from "../../data/demoData";
import { clearSession } from "../../utils/auth";

export default function Settings() {
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
