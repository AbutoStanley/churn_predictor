import { useState } from "react"
import { useNavigate } from "react-router-dom"
import TopBar from "../components/Topbar"
import PredictionForm from "../components/PredictionForm"
import CustomerQueue from "../components/CustomerQueue"
import CSVUploader from "../components/CSVUploader"
import { predictChurn } from "../services/api"

function Predict() {
  const navigate = useNavigate()
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const addCustomer = (customer: any) => {
    if (customers.length >= 10) { alert("Maximum 10 customers allowed"); return }
    setCustomers(prev => [...prev, customer])
  }

  const addFromCSV = (rows: any[]) => {
    setCustomers(prev => {
      const combined = [...prev, ...rows]
      if (combined.length > 10) {
        alert(`Queue would exceed 10 customers (currently ${prev.length}, CSV has ${rows.length}). Remove some customers first.`)
        return prev
      }
      return combined
    })
  }

  const removeCustomer = (index: number) => {
    setCustomers(prev => prev.filter((_, i) => i !== index))
  }

  const clearQueue = () => setCustomers([])

  const runPrediction = async () => {
    if (customers.length === 0) return
    setLoading(true)
    try {
      const res = await predictChurn(customers)
      localStorage.setItem("predictions", JSON.stringify({ predictions: res }))
      navigate("/dashboard")
    } catch {
      alert("Prediction failed. Check that the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>

      <TopBar rightLink={{ to: "/dashboard", label: "Dashboard →" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "44px 40px" }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <p className="section-title">New Prediction</p>
          <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.15 }}>
            Add customers &{" "}
            <span style={{ color: "var(--accent)" }}>run analysis</span>
          </h1>
          <p style={{ color: "var(--muted)", marginTop: 10, fontSize: 13 }}>
            Fill in the form or upload a CSV — both add to the same queue.
          </p>
        </div>

        {/* Two column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>

          {/* Form */}
          <div className="card">
            <PredictionForm addCustomer={addCustomer} />
          </div>

          {/* Side panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Queue counter + predict */}
            <div className="card" style={{ textAlign: "center", padding: "28px 24px" }}>
              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 56,
                color: customers.length > 0 ? "var(--accent)" : "var(--border2)",
                lineHeight: 1,
                transition: "color 0.3s",
                letterSpacing: "-0.02em"
              }}>
                {String(customers.length).padStart(2, "0")}
              </div>
              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                margin: "8px 0 22px"
              }}>
                customers queued / 10
              </div>

              <button
                className="btn-primary"
                onClick={runPrediction}
                disabled={loading || customers.length === 0}
                style={{ width: "100%", marginBottom: customers.length > 0 ? 10 : 0 }}
              >
                {loading ? "Analysing..." : "Run Prediction →"}
              </button>

              {customers.length > 0 && !loading && (
                <button
                  onClick={clearQueue}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "1px solid var(--border2)",
                    borderRadius: 6,
                    padding: "9px 0",
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    cursor: "pointer",
                    transition: "border-color 0.2s, color 0.2s"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--high)"; e.currentTarget.style.color = "var(--high)" }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--muted)" }}
                >
                  Clear Queue
                </button>
              )}
            </div>

            {/* CSV uploader */}
            <div className="card">
              <p className="section-title">Bulk Upload</p>
              <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 12, lineHeight: 1.5 }}>
                Upload a CSV with up to 10 customers. Rows are added to the queue alongside any manually entered customers.
              </p>
              <CSVUploader onCustomers={addFromCSV} />
            </div>

          </div>
        </div>

        {/* Loading overlay */}
        {loading && (
          <div style={{
            marginTop: 32,
            padding: "32px 24px",
            border: "1px solid var(--border)",
            borderRadius: 10,
            textAlign: "center",
            background: "var(--surface)"
          }}>
            <div style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 16
            }}>
              Running model...
            </div>
            {/* Simple animated dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} style={{
                  width: 8, height: 8,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  opacity: 0.3,
                  animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`
                }} />
              ))}
            </div>
            <style>{`
              @keyframes pulse {
                0%, 100% { opacity: 0.2; transform: scale(0.8); }
                50% { opacity: 1; transform: scale(1.2); }
              }
            `}</style>
          </div>
        )}

        {/* Queue table */}
        {customers.length > 0 && !loading && (
          <div style={{ marginTop: 24 }}>
            <CustomerQueue customers={customers} onRemove={removeCustomer} />
          </div>
        )}

      </div>
    </div>
  )
}

export default Predict