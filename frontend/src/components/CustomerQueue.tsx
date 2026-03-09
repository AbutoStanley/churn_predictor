interface Props {
  customers: any[]
  onRemove?: (index: number) => void
}

export default function CustomerQueue({ customers, onRemove }: Props) {
  if (customers.length === 0) return null

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700 }}>Queued Customers</h3>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--accent)",
          background: "rgba(232,125,58,0.08)",
          border: "1px solid rgba(232,125,58,0.18)",
          padding: "3px 10px",
          borderRadius: 3
        }}>
          {customers.length} / 10
        </span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Contract</th>
              <th>Payment</th>
              <th>Monthly</th>
              <th>Total</th>
              <th>Paperless</th>
              <th>Streaming TV</th>
              <th>Dependents</th>
              <th>Senior</th>
              {onRemove && <th></th>}
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={i}>
                <td style={{ fontFamily: "'Share Tech Mono', monospace", color: "var(--muted)", fontSize: 11 }}>
                  {String(i + 1).padStart(2, "0")}
                </td>
                <td>{c.Contract}</td>
                <td style={{ fontSize: 12 }}>{c.PaymentMethod}</td>
                <td style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12 }}>${c.MonthlyCharges}</td>
                <td style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 12 }}>${c.TotalCharges}</td>
                <td>{c.PaperlessBilling}</td>
                <td>{c.StreamingTV}</td>
                <td>{c.Dependents}</td>
                <td>{c.SeniorCitizen === 1 ? "Yes" : "No"}</td>
                {onRemove && (
                  <td>
                    <button
                      onClick={() => onRemove(i)}
                      style={{
                        background: "none", border: "none",
                        color: "var(--muted)", cursor: "pointer",
                        fontSize: 16, padding: "2px 6px",
                        borderRadius: 3, transition: "color 0.15s",
                        fontFamily: "'Share Tech Mono', monospace"
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#d95f4b")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                    >
                      ×
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}