interface Prediction {
  churn_probability: number
  risk_level: "low" | "medium" | "high"
}

interface Props { predictions: Prediction[] }

export default function KPICards({ predictions }: Props) {
  const total = predictions.length
  const high = predictions.filter(p => p.risk_level === "high").length
  const medium = predictions.filter(p => p.risk_level === "medium").length
  const avg = total > 0
    ? (predictions.reduce((s, p) => s + p.churn_probability, 0) / total * 100).toFixed(1)
    : "0.0"
  const rate = total > 0 ? ((high / total) * 100).toFixed(0) : "0"

  const cards = [
    { label: "Analysed",        value: total,     color: "var(--text)" },
    { label: "High Risk",       value: high,      color: "var(--high)" },
    { label: "Medium Risk",     value: medium,    color: "var(--medium)" },
    { label: "Avg Probability", value: `${avg}%`, color: "var(--accent)" },
    { label: "High Risk Rate",  value: `${rate}%`,color: "var(--high)" },
  ]

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
      {cards.map(({ label, value, color }) => (
        <div key={label} className="card" style={{ padding: "18px 20px" }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 12 }}>
            {label}
          </div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 30, color, lineHeight: 1, letterSpacing: "-0.01em" }}>
            {value}
          </div>
        </div>
      ))}
    </div>
  )
}