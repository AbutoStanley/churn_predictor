import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer, Cell } from "recharts"

interface Props { predictions: { churn_probability: number; risk_level: string }[] }

const C: any = { low: "#5cb87a", medium: "#e8a93a", high: "#d95f4b" }

const TT = {
  contentStyle: { background: "#1a1a1a", border: "1px solid #272727", borderRadius: 6 },
  labelStyle:   { color: "#d0cbc3", fontFamily: "'Share Tech Mono', monospace", fontSize: 11 },
  itemStyle:    { color: "#d0cbc3", fontFamily: "'Share Tech Mono', monospace", fontSize: 11 },
}

const tick = { fill: "#5e5850", fontSize: 10, fontFamily: "'Share Tech Mono', monospace" }

export default function ProbabilityScatter({ predictions }: Props) {
  const data = predictions.map((p, i) => ({
    index: i + 1,
    probability: parseFloat((p.churn_probability * 100).toFixed(1)),
    risk: p.risk_level
  }))

  return (
    <div className="card">
      <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Individual Churn Probabilities</h3>
      <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 18, fontFamily: "'Share Tech Mono', monospace", letterSpacing: "0.04em", textTransform: "uppercase" }}>
        Each dot represents one customer
      </p>
      <ResponsiveContainer width="100%" height={200}>
        <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <XAxis
            dataKey="index"
            name="Customer"
            type="number"
            tick={tick}
            axisLine={false}
            tickLine={false}
            label={{ value: "Customer #", position: "insideBottom", offset: -4, fill: "#5e5850", fontSize: 10, fontFamily: "'Share Tech Mono', monospace" }}
          />
          <YAxis
            dataKey="probability"
            domain={[0, 100]}
            tick={tick}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `${v}%`}
          />
          <ReferenceLine y={50} stroke="#272727" strokeDasharray="4 4" />
          <Tooltip
            {...TT}
            formatter={(v: any) => [`${v}%`, "Churn Probability"]}
            labelFormatter={l => `Customer #${l}`}
          />
          <Scatter data={data}>
            {data.map((e, i) => <Cell key={i} fill={C[e.risk]} opacity={0.9} />)}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}