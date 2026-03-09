import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface Props { predictions: { risk_level: "low" | "medium" | "high" }[] }

const C = { low: "#5cb87a", medium: "#e8a93a", high: "#d95f4b" }

const TT = {
  contentStyle: { background: "#1a1a1a", border: "1px solid #272727", borderRadius: 6 },
  labelStyle:   { color: "#d0cbc3", fontFamily: "'Share Tech Mono', monospace", fontSize: 11 },
  itemStyle:    { color: "#d0cbc3", fontFamily: "'Share Tech Mono', monospace", fontSize: 11 },
}

export default function RiskPieChart({ predictions }: Props) {
  const counts = { low: 0, medium: 0, high: 0 }
  predictions.forEach(p => counts[p.risk_level]++)
  const data = [
    { name: "Low",    value: counts.low,    color: C.low    },
    { name: "Medium", value: counts.medium, color: C.medium },
    { name: "High",   value: counts.high,   color: C.high   },
  ].filter(d => d.value > 0)

  return (
    <div className="card">
      <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 18 }}>Risk Segmentation</h3>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={3}>
            {data.map((e, i) => <Cell key={i} fill={e.color} stroke="transparent" />)}
          </Pie>
          <Tooltip {...TT} />
          <Legend
            iconType="circle"
            iconSize={7}
            formatter={v => (
              <span style={{ fontSize: 11, fontFamily: "'Share Tech Mono', monospace", color: "#5e5850", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {v}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}