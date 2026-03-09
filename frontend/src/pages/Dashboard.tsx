import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import TopBar from "../components/Topbar"
import CustomerTable from "../components/CustomerTable"
import ChurnBarChart from "../components/ChurnBarChart"
import ProbabilityGauge from "../components/ProbabilityGauge"
import KPICards from "../components/KPICards"
import RiskPieChart from "../components/RiskPieChart"
import ProbabilityHistogram from "../components/ProbabilityHistogram"
import ProbabilityScatter from "../components/ProbabilityScatter"

export default function Dashboard() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const stored = localStorage.getItem("predictions")
    if (stored) setData(JSON.parse(stored))
  }, [])

  const predictions = data?.predictions || []
  const avgProbability = predictions.length === 0 ? 0
    : predictions.reduce((s: number, p: any) => s + p.churn_probability, 0) / predictions.length

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>

      <TopBar rightLink={{ to: "/", label: "← New Prediction" }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "44px 40px" }}>

        <div style={{ marginBottom: 36, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <p className="section-title">Analytics Dashboard</p>
            <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.15 }}>
              Churn <span style={{ color: "var(--accent)" }}>Intelligence</span>
            </h1>
          </div>
          {predictions.length > 0 && (
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.08em",
              color: "var(--muted)",
              textTransform: "uppercase"
            }}>
              {predictions.length} customer{predictions.length !== 1 ? "s" : ""} analysed
            </span>
          )}
        </div>

        {predictions.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "80px 40px",
            border: "1px dashed var(--border2)",
            borderRadius: 12
          }}>
            <div style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 28,
              color: "var(--faint)",
              marginBottom: 20,
              letterSpacing: "0.1em"
            }}>
              [ NO DATA ]
            </div>
            <p style={{ color: "var(--muted)", marginBottom: 28, fontSize: 13 }}>
              Run a prediction to see results here.
            </p>
            <Link to="/" style={{
              display: "inline-block",
              textDecoration: "none",
              padding: "11px 26px",
              background: "var(--accent)",
              color: "#0d0d0d",
              borderRadius: 6,
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "uppercase"
            }}>
              Start Predicting →
            </Link>
          </div>
        ) : (
          <>
            <KPICards predictions={predictions} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
              <RiskPieChart predictions={predictions} />
              <ProbabilityHistogram predictions={predictions} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
              <ProbabilityGauge probability={avgProbability} />
              <ChurnBarChart predictions={predictions} />
            </div>

            <div style={{ marginTop: 20 }}>
              <ProbabilityScatter predictions={predictions} />
            </div>

            <div style={{ marginTop: 20 }}>
              <CustomerTable predictions={predictions} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}