import { Activity, CheckCircle2, UsersRound, Waypoints } from "lucide-react";
import { AreaChart } from "@/shared/components/charts/AreaChart";
import { BarChart } from "@/shared/components/charts/BarChart";
import { Card } from "@/shared/components/ui/Card";
import { MetricCard } from "@/shared/components/ui/MetricCard";
import { adminMetrics, cityCounts, userGrowth } from "@/shared/data/traveloopData";

export function AnalyticsOverview() {
  const icons = [UsersRound, Waypoints, CheckCircle2, Activity];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminMetrics.map((metric, index) => (
          <MetricCard icon={icons[index]} key={metric.label} {...metric} />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-5 dark:bg-slate-800 dark:border-slate-700">
          <h2 className="text-xl font-black text-ink dark:text-white">User growth</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Platform adoption trend for the admin dashboard.</p>
          <div className="mt-5">
            <AreaChart data={userGrowth} />
          </div>
        </Card>
        <Card className="p-5 dark:bg-slate-800 dark:border-slate-700">
          <h2 className="text-xl font-black text-ink dark:text-white">Popular Destinations</h2>
          <div className="mt-5">
            <BarChart data={cityCounts} dataKey="count" color="#16B8CC" />
          </div>
        </Card>
      </div>
      <Card className="p-7 dark:bg-slate-800 dark:border-slate-700">
        <h2 className="text-xl font-black text-ink dark:text-white">Recent Activity</h2>
        <div className="mt-5 space-y-5">
          {[
            "Sarah Johnson created a new trip to Paris",
            "Michael Chen completed trip to Tokyo",
            "Emma Williams added activities to Barcelona trip",
            "James Brown shared itinerary for Iceland adventure",
            "Olivia Davis joined Traveloop",
          ].map((activity, index) => (
            <div className="flex items-center gap-4" key={activity}>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
                <UsersRound size={18} />
              </span>
              <div>
                <p className="font-bold text-ink dark:text-white">{activity}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{index + 1} hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
