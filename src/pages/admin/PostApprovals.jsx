import { useEffect, useState } from "react";
import Topbar from "../../components/Topbar";
import { loadPosts, savePosts } from "../../utils/posts";

export default function PostApprovals() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(loadPosts());
  }, []);

  const updatePost = (id, status) => {
    const next = posts.map((p) => (p.id === id ? { ...p, status } : p));
    setPosts(next);
    savePosts(next);
  };

  const pending = posts.filter((p) => p.status === "Pending");
  const approved = posts.filter((p) => p.status === "Approved");
  const rejected = posts.filter((p) => p.status === "Rejected");

  return (
    <div className="container">
      <Topbar
        title={<>Post Approvals</>}
        subtitle="Approve or reject awareness posts created by doctors"
        searchPlaceholder="Search posts..."
      />

      <div className="apptStats">
        <div className="card statCard">
          <div className="statK">Pending</div>
          <div className="statV">{pending.length}</div>
        </div>
        <div className="card statCard">
          <div className="statK">Approved</div>
          <div className="statV">{approved.length}</div>
        </div>
        <div className="card statCard">
          <div className="statK">Rejected</div>
          <div className="statV">{rejected.length}</div>
        </div>
        <div className="card statCard">
          <div className="statK">Total</div>
          <div className="statV">{posts.length}</div>
        </div>
      </div>

      <div className="sectionHeader mt">
        <div className="sectionTitle">Pending Posts</div>
        <button className="seeAll" onClick={() => setPosts(loadPosts())}>
          Refresh ↻
        </button>
      </div>

      <div className="list">
        {pending.length === 0 ? (
          <div className="card">
            <div className="panelTitle">No pending posts</div>
            <div className="panelSub">
              Doctors have not submitted any posts for review yet.
            </div>
          </div>
        ) : (
          pending.map((p) => (
            <div key={p.id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div>
                  <div className="apptTitle">{p.title}</div>
                  <div className="apptMeta">
                    👨‍⚕️ {p.doctorName} • {p.doctorEmail} • 📅{" "}
                    {new Date(p.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="tag warn">Pending</div>
              </div>

              <div className="panelSub" style={{ marginTop: 10 }}>
                {p.body}
              </div>

              <div className="panelActions" style={{ marginTop: 12 }}>
                <button className="btn" onClick={() => updatePost(p.id, "Approved")}>
                  Approve
                </button>
                <button className="btn ghost" onClick={() => updatePost(p.id, "Rejected")}>
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="sectionHeader mt">
        <div className="sectionTitle">Approved Posts</div>
      </div>

      <div className="list">
        {approved.slice(0, 5).map((p) => (
          <div key={p.id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <div>
                <div className="apptTitle">{p.title}</div>
                <div className="apptMeta">
                  👨‍⚕️ {p.doctorName} • 📅 {new Date(p.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="tag ok">Approved</div>
            </div>
            <div className="panelSub" style={{ marginTop: 10 }}>
              {p.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
