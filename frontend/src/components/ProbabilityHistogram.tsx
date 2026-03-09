import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts"

interface Props { predictions: { churn_probability: number }[] }

const TT = {
  contentStyle: { background: "#1a1a1a", border: "1px solid #272727", borderRadius: 6 },
  labelStyle:   { color: "#d0cbc3", fontFamily: "'Share Tech Mono', monospace", fontSize: 11 },
  itemStyle:    { color: "#d0cbc3", fontFamily: "'Share Tech Mono', monospace", fontSize: 11 },
  cursor:       { fill: "rgba(255,255,255,0.02)" },
}

const tick = { fill: "#5e5850", fontSize: 10, fontFamily: "'Share Tech Mono', monospace" }

export default function ProbabilityHistogram({ predictions }: Props) {
  const bins = [0, 0, 0, 0, 0]
  predictions.forEach(p => {
    const v = p.churn_probability
    if (v < 0.2) bins[0]++
    else if (v < 0.4) bins[1]++
    else if (v < 0.6) bins[2]++
    else if (v < 0.8) bins[3]++
    else bins[4]++
  })
  const data = [
    { range: "0–20%",   count: bins[0], color: "#5cb87a" },
    { range: "20–40%",  count: bins[1], color: "#8ec97a" },
    { range: "40–60%",  count: bins[2], color: "#e8a93a" },
    { range: "60–80%",  count: bins[3], color: "#e07848" },
    { range: "80–100%", count: bins[4], color: "#d95f4b" },
  ]

  return (
    <div className="card">
      <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 18 }}>Probability Distribution</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} barCategoryGap="25%">
          <XAxis dataKey="range" tick={tick} axisLine={false} tickLine={false} />
          <YAxis tick={tick} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip {...TT} />
          <Bar dataKey="count" radius={[5, 5, 0, 0]}>
            {data.map((e, i) => <Cell key={i} fill={e.color} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}