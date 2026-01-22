export default function Topbar({ title, subtitle, searchPlaceholder = "Search..." }) {
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
