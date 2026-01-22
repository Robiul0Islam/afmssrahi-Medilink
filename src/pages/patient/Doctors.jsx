import Topbar from "../../components/Topbar";
import Stars from "../../components/Stars";
import { doctors, patient } from "../../data/demoData";

export default function Doctors() {
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
        {doctors.map((d) => (
          <div key={d.id} className="card docTile">
            <div className="docTop">
              <img
                className="docTileAvatar"
                src={d.avatar}
                alt={d.name}
              />

              <div className="docTopInfo">
                <div className="docName docNameDark">{d.name}</div>
                <div className="docSpec">{d.specialty}</div>

                <div className="ratingRow" style={{ marginTop: 6 }}>
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
