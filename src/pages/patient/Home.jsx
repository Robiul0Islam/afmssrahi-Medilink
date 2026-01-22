import Topbar from "../../components/Topbar";
import Stars from "../../components/Stars";
import { patient, doctors, shows } from "../../data/demoData";

export default function Home() {
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
                  {/* ✅ doctor name black (your request) */}
                  <div className="docName docNameDark">{d.name}</div>

                  <div className="docSpec">{d.specialty}</div>

                  <div className="ratingRow">
                    <Stars value={d.rating} />
                    <div className="ratingText">
                      <b>{d.rating.toFixed(1)}</b> ({d.reviews} Reviews)
                    </div>
                  </div>

                  <div className="metaRow">📍 {d.clinic} · {d.distance}</div>
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
