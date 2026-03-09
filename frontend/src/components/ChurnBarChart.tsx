import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts"

interface Props { predictions: { risk_level: "low" | "medium" | "high" }[] }

const C: any = { Low: "#5cb87a", Medium: "#e8a93a", High: "#d95f4b" }

const TT = {
  contentStyle: { background: "#1a1a1a", border: "1px solid #272727", borderRadius: 6 },
  labelStyle:   { color: "#d0cbc3", fontFamily: "'Share Tech Mono', monospace", fontSize: 11 },
  itemStyle:    { color: "#d0cbc3", fontFamily: "'Share Tech Mono', monospace", fontSize: 11 },
  cursor:       { fill: "rgba(255,255,255,0.02)" },
}

const tick = { fill: "#5e5850", fontSize: 11, fontFamily: "'Share Tech Mono', monospace" }

export default function ChurnBarChart({ predictions }: Props) {
  const counts = { low: 0, medium: 0, high: 0 }
  predictions.forEach(p => counts[p.risk_level]++)
  const data = [
    { risk: "Low",    value: counts.low    },
    { risk: "Medium", value: counts.medium },
    { risk: "High",   value: counts.high   },
  ]

  return (
    <div className="card">
      <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 18 }}>Risk Distribution</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} barCategoryGap="38%">
          <XAxis dataKey="risk" tick={tick} axisLine={false} tickLine={false} />
          <YAxis tick={tick} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip {...TT} />
          <Bar dataKey="value" radius={[5, 5, 0, 0]}>
            {data.map((e, i) => <Cell key={i} fill={C[e.risk]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}