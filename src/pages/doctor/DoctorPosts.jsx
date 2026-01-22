import { useEffect, useMemo, useState } from "react";
import Topbar from "../../components/Topbar";
import { getSession } from "../../utils/auth";
import { loadPosts, savePosts } from "../../utils/posts";

export default function DoctorPosts() {
  const session = getSession();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(loadPosts());
  }, []);

  const myPosts = useMemo(() => {
    const email = session?.email;
    return posts.filter((p) => p.doctorEmail === email);
  }, [posts, session]);

  const createPost = (e) => {
    e.preventDefault();
    const t = title.trim();
    const b = body.trim();
    if (!t || !b) return;

    const newPost = {
      id: Date.now(),
      doctorEmail: session?.email,
      doctorName: session?.name || "Doctor",
      title: t,
      body: b,
      status: "Pending", // Admin will approve/reject
      createdAt: new Date().toISOString(),
    };

    const next = [newPost, ...posts];
    setPosts(next);
    savePosts(next);

    setTitle("");
    setBody("");
  };

  return (
    <div className="container">
      <Topbar
        title={<>Awareness Posts</>}
        subtitle="Create health posts (Admin approval required)"
        searchPlaceholder="Search posts..."
      />

      <div className="reportsTop">
        {/* Create */}
        <div className="card reportUpload">
          <div className="reportUploadTitle">Create New Post</div>
          <div className="reportUploadSub">
            Posts will be visible on home after Admin approval.
          </div>

          <form className="authForm" onSubmit={createPost} style={{ gap: 10 }}>
            <div>
              <div className="label">Title</div>
              <input
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., How to control blood pressure"
              />
            </div>

            <div>
              <div className="label">Content</div>
              <textarea
                className="input"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your health awareness content..."
                style={{ minHeight: 110, resize: "vertical" }}
              />
            </div>

            <button className="btn" type="submit" style={{ width: "fit-content" }}>
              Submit for Approval
            </button>
          </form>
        </div>

        {/* Summary */}
        <div className="card reportStats">
          <div className="panelTitle">Summary</div>
          <div className="summary">
            <div className="summaryItem">
              <div className="k">My Posts</div>
              <div className="v">{myPosts.length}</div>
            </div>
            <div className="summaryItem">
              <div className="k">Approved</div>
              <div className="v">
                {myPosts.filter((p) => p.status === "Approved").length}
              </div>
            </div>
            <div className="summaryItem">
              <div className="k">Pending</div>
              <div className="v">
                {myPosts.filter((p) => p.status === "Pending").length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sectionHeader mt">
        <div className="sectionTitle">My Posts</div>
        <button className="seeAll" onClick={() => setPosts(loadPosts())}>
          Refresh ↻
        </button>
      </div>

      <div className="list">
        {myPosts.length === 0 ? (
          <div className="card">
            <div className="panelTitle">No posts yet</div>
            <div className="panelSub">Create your first awareness post.</div>
          </div>
        ) : (
          myPosts.map((p) => (
            <div key={p.id} className="card">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div>
                  <div className="apptTitle">{p.title}</div>
                  <div className="apptMeta">
                    📅 {new Date(p.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className={`tag ${p.status === "Approved" ? "ok" : "warn"}`}>
                  {p.status}
                </div>
              </div>

              <div className="panelSub" style={{ marginTop: 10 }}>
                {p.body}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
