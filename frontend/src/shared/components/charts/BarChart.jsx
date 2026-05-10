import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSettingsContext } from "@/app/providers/SettingsContext";
import { useTheme } from "@/app/providers/ThemeProvider";

export function BarChart({ data, dataKey = "actual", color = "#5B4BFF", xKey = "day", valueVariant = "number" }) {
  const { formatCurrency, formatNumber } = useSettingsContext();
  const { isDark } = useTheme();
  const valueFormatter = valueVariant === "currency" ? (value) => formatCurrency(value) : (value) => formatNumber(value);

  return (
    <ResponsiveContainer height={260} width="100%">
      <RechartsBarChart data={data}>
        <CartesianGrid stroke={isDark ? "#334155" : "#edf0f5"} strokeDasharray="3 3" />
        <XAxis dataKey={xKey} stroke={isDark ? "#cbd5e1" : "#64748b"} />
        <YAxis stroke={isDark ? "#cbd5e1" : "#64748b"} tickFormatter={valueFormatter} width={92} />
        <Tooltip
          formatter={(value) => valueFormatter(value)}
          contentStyle={{
            borderRadius: 16,
            border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
            backgroundColor: isDark ? "#0f172a" : "#ffffff",
            color: isDark ? "#f8fafc" : "#0f172a",
          }}
        />
        <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
