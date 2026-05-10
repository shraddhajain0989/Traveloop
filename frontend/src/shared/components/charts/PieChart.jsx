import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useSettingsContext } from "@/app/providers/SettingsContext";
import { useTheme } from "@/app/providers/ThemeProvider";

const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#fb7185"];

export function PieChart({ data, valueVariant = "number" }) {
  const { formatCurrency, formatNumber } = useSettingsContext();
  const { isDark } = useTheme();
  const valueFormatter = valueVariant === "currency" ? (value) => formatCurrency(value) : (value) => formatNumber(value);

  return (
    <ResponsiveContainer height={260} width="100%">
      <RechartsPieChart>
        <Pie data={data} dataKey="amount" innerRadius={62} outerRadius={98} paddingAngle={4}>
          {data.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} key={entry.name} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => valueFormatter(value)}
          contentStyle={{
            borderRadius: 16,
            border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
            backgroundColor: isDark ? "#0f172a" : "#ffffff",
            color: isDark ? "#f8fafc" : "#0f172a",
          }}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
