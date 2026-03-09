import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

interface FeatureImpact {
  feature: string;
  impact: number;
  value: string;
}

export default function WaterfallExplanation({
  data
}: {
  data: FeatureImpact[];
}) {

  const CustomBar = (props: any) => {
    const { x, y, width, height, payload } = props;

    const color = payload.impact > 0 ? "#ef4444" : "#22c55e";

    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        rx={4}
      />
    );
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3>Churn Drivers (SHAP Explanation)</h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="feature" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="impact"
            shape={<CustomBar />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}