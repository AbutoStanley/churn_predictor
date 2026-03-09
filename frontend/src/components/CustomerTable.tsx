interface Props { predictions: any[] }

export default function CustomerTable({ predictions }: Props) {
  return (
    <div className="card">
      <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 18 }}>Prediction Results</h3>
      <div style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Churn Probability</th>
              <th>Risk Level</th>
              <th>Prediction</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((p, i) => {
              const pct = (p.churn_probability * 100).toFixed(1)
              const barColor = p.risk_level === "high" ? "#d95f4b" : p.risk_level === "medium" ? "#e8a93a" : "#5cb87a"
              return (
                <tr key={i}>
                  <td style={{ fontFamily: "'Share Tech Mono', monospace", color: "var(--muted)", fontSize: 12 }}>
                    #{String(p.customer_index + 1).padStart(2, "0")}
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ flex: 1, height: 3, background: "var(--surface2)", borderRadius: 2, overflow: "hidden", maxWidth: 100 }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: barColor, borderRadius: 2 }} />
                      </div>
                      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, minWidth: 40 }}>{pct}%</span>
                    </div>
                  </td>
                  <td><span className={`badge badge-${p.risk_level}`}>{p.risk_level}</span></td>
                  <td style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12, color: p.churn_prediction ? "#d95f4b" : "#5cb87a" }}>
                    {p.churn_prediction ? "Will Churn" : "Will Stay"}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}