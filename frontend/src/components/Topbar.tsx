import { Link } from "react-router-dom"

interface Props {
  rightLink: { to: string; label: string }
}

export default function TopBar({ rightLink }: Props) {
  return (
    <div style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      height: 52,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 40px",
      // Frosted glass
      background: "rgba(13, 13, 13, 0.72)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 7, height: 7, borderRadius: "50%",
          background: "var(--accent)",
          boxShadow: "0 0 6px var(--accent)"
        }} />
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 14,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text)"
        }}>ChurnIQ</span>
      </div>

      {/* Nav link */}
      <Link to={rightLink.to} className="nav-link">
        {rightLink.label}
      </Link>
    </div>
  )
}