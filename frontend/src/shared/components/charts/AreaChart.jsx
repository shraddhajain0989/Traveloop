import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSettingsContext } from "@/app/providers/SettingsContext";
import { useTheme } from "@/app/providers/ThemeProvider";

export function AreaChart({ data, valueVariant = "number" }) {
  const { formatCurrency, formatNumber } = useSettingsContext();
  const { isDark } = useTheme();
  const valueFormatter = valueVariant === "currency" ? (value) => formatCurrency(value) : (value) => formatNumber(value);

  return (
    <ResponsiveContainer height={260} width="100%">
      <RechartsAreaChart data={data}>
        <defs>
          <linearGradient id="actualSpend" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={isDark ? "#334155" : "#e2e8f0"} strokeDasharray="3 3" />
        <XAxis dataKey="day" stroke={isDark ? "#cbd5e1" : "#64748b"} />
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
        <Area dataKey="actual" fill="url(#actualSpend)" stroke="#4f46e5" strokeWidth={3} />
        <Area dataKey="planned" fill="transparent" stroke="#06b6d4" strokeWidth={2} />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
