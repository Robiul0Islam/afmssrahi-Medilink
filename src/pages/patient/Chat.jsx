import { useMemo, useState } from "react";
import Topbar from "../../components/Topbar";
import { doctors, patient } from "../../data/demoData";

export default function Chat() {
  const [selectedId, setSelectedId] = useState(doctors[0]?.id || 1);
  const [text, setText] = useState("");

  const selectedDoctor = useMemo(
    () => doctors.find((d) => d.id === selectedId) || doctors[0],
    [selectedId]
  );

  const [messages, setMessages] = useState(() => [
    {
      id: 1,
      from: "doctor",
      text: "Hello! How can I help you today?",
      time: "10:15 AM",
    },
    {
      id: 2,
      from: "patient",
      text: "I have some chest discomfort. What should I do?",
      time: "10:16 AM",
    },
    {
      id: 3,
      from: "doctor",
      text: "If it’s severe or with shortness of breath, please visit ER. Otherwise share symptoms details.",
      time: "10:18 AM",
    },
  ]);

  const send = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        from: "patient",
        text: t,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setText("");
  };

  return (
    <div className="container">
      <Topbar
        title={<>Chat</>}
        subtitle={`Message doctors directly • ${patient.city}, Bangladesh`}
        searchPlaceholder="Search chats..."
      />

      <div className="chatLayout">
        {/* Left: doctor list */}
        <div className="card chatList">
          <div className="panelTitle">Doctors</div>

          <div className="list" style={{ gap: 10 }}>
            {doctors.map((d) => (
              <button
                key={d.id}
                className={`chatPerson ${selectedId === d.id ? "active" : ""}`}
                onClick={() => setSelectedId(d.id)}
              >
                <img className="chatAvatar" src={d.avatar} alt={d.name} />
                <div className="chatPersonInfo">
                  <div className="chatPersonName">{d.name}</div>
                  <div className="chatPersonSub">{d.specialty}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: chat box */}
        <div className="card chatBox">
          <div className="chatHeader">
            <div>
              <div className="panelMain">{selectedDoctor?.name}</div>
              <div className="panelSub">{selectedDoctor?.clinic}</div>
            </div>
            <div className="pill">{selectedDoctor?.status}</div>
          </div>

          <div className="chatMessages">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`chatMsgRow ${m.from === "patient" ? "me" : "them"}`}
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
