import { Card } from "@/shared/components/ui/Card";
import { activities } from "@/shared/data/traveloopData";

export function RecentActivities() {
  return (
    <Card className="p-5">
      <h2 className="text-xl font-extrabold text-ink">Recent activity picks</h2>
      <div className="mt-4 space-y-3">
        {activities.slice(0, 3).map((activity) => (
          <div className="flex items-center justify-between gap-4" key={activity.id}>
            <div>
              <p className="font-semibold text-ink">{activity.name}</p>
              <p className="text-sm text-slate-500">{activity.city}</p>
            </div>
            <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700">
              {activity.category}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

