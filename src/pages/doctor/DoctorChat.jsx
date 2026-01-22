import { useMemo, useState } from "react";
import Topbar from "../../components/Topbar";
import { getSession } from "../../utils/auth";

const demoPatients = [
  { id: 1, name: "Robiul Islam", issue: "Chest discomfort" },
  { id: 2, name: "Ayesha Rahman", issue: "Skin allergy" },
  { id: 3, name: "Tanvir Hossain", issue: "Knee pain" },
];

export default function DoctorChat() {
  const session = getSession();
  const [selectedId, setSelectedId] = useState(demoPatients[0].id);
  const [text, setText] = useState("");

  const selectedPatient = useMemo(
    () => demoPatients.find((p) => p.id === selectedId) || demoPatients[0],
    [selectedId]
  );

  const [messages, setMessages] = useState(() => [
    { id: 1, from: "patient", text: "Hello doctor, I need help.", time: "9:10 AM" },
    { id: 2, from: "doctor", text: "Sure, please describe symptoms.", time: "9:12 AM" },
  ]);

  const send = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        from: "doctor",
        text: t,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setText("");
  };

  return (
    <div className="container">
      <Topbar
        title={<>Doctor Chat</>}
        subtitle={`Message patients directly • ${session?.email || ""}`}
        searchPlaceholder="Search chats..."
      />

      <div className="chatLayout">
        <div className="card chatList">
          <div className="panelTitle">Patients</div>

          <div className="list" style={{ gap: 10 }}>
            {demoPatients.map((p) => (
              <button
                key={p.id}
                className={`chatPerson ${selectedId === p.id ? "active" : ""}`}
                onClick={() => setSelectedId(p.id)}
              >
                <div className="chatAvatar" style={{ display: "grid", placeItems: "center" }}>
                  👤
                </div>
                <div className="chatPersonInfo">
                  <div className="chatPersonName">{p.name}</div>
                  <div className="chatPersonSub">{p.issue}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="card chatBox">
          <div className="chatHeader">
            <div>
              <div className="panelMain">{selectedPatient?.name}</div>
              <div className="panelSub">Issue: {selectedPatient?.issue}</div>
            </div>
            <div className="pill">Active</div>
          </div>

          <div className="chatMessages">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`chatMsgRow ${m.from === "doctor" ? "me" : "them"}`}
              >
                <div className="chatBubble">
                  <div className="chatText">{m.text}</div>
                  <div className="chatTime">{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          <form className="chatInputRow" onSubmit={send}>
            <input
              className="input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message..."
            />
            <button className="btn" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
