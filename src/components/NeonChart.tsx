import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface NeonChartProps {
  data: Array<{ time: string; value: number }>;
  color?: "purple" | "teal";
  height?: number;
}

export const NeonChart = ({ data, color = "purple", height = 200 }: NeonChartProps) => {
  const colors = {
    purple: {
      stroke: "hsl(270 91% 65%)",
      fill: "hsl(270 91% 65%)",
      glow: "rgba(168, 85, 247, 0.3)",
    },
    teal: {
      stroke: "hsl(174 72% 40%)",
      fill: "hsl(174 72% 40%)",
      glow: "rgba(20, 184, 166, 0.3)",
    },
  };

  const { stroke, fill, glow } = colors[color];

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fill} stopOpacity={0.4} />
              <stop offset="100%" stopColor={fill} stopOpacity={0} />
            </linearGradient>
            <filter id={`glow-${color}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(215 20% 65%)", fontSize: 10 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(215 20% 65%)", fontSize: 10 }}
          />
          
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(222 47% 10%)",
              border: "1px solid hsl(222 47% 20%)",
              borderRadius: "12px",
              boxShadow: `0 0 20px ${glow}`,
            }}
            labelStyle={{ color: "hsl(210 40% 98%)" }}
            itemStyle={{ color: stroke }}
          />
          
          <Area
            type="monotone"
            dataKey="value"
            stroke={stroke}
            strokeWidth={2}
            fill={`url(#gradient-${color})`}
            filter={`url(#glow-${color})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
