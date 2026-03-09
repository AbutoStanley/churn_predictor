import GaugeComponent from "react-gauge-component"

interface Props { probability: number }

export default function ProbabilityGauge({ probability }: Props) {
  const pct = Math.round(probability * 100)
  const label = pct < 30 ? "Low Risk" : pct < 60 ? "Medium Risk" : "High Risk"
  const color = pct < 30 ? "#5cb87a" : pct < 60 ? "#e8a93a" : "#d95f4b"

  return (
    <div className="card" style={{ textAlign: "center" }}>
      <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, textAlign: "left" }}>Avg Churn Probability</h3>
      <p style={{ fontSize: 10, color: "var(--muted)", marginBottom: 4, textAlign: "left", fontFamily: "'Share Tech Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        Across all analysed customers
      </p>
      <GaugeComponent
        type="semicircle"
        value={pct}
        minValue={0}
        maxValue={100}
        arc={{
          colorArray: ["#5cb87a", "#e8a93a", "#d95f4b"],
          subArcs: [{ limit: 30 }, { limit: 60 }, { limit: 100 }],
          padding: 0.02,
          width: 0.28
        }}
        pointer={{ type: "blob", animationDelay: 0 }}
        labels={{
          valueLabel: {
            formatTextValue: v => `${v}%`,
            style: { fontFamily: "'Share Tech Mono', monospace", fontSize: 32, fill: "#d0cbc3" }
          }
        }}
      />
      <div style={{
        color,
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 12,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginTop: -6
      }}>
        {label}
      </div>
    </div>
  )
}