import { ActivityCard } from "./ActivityCard";

export function ActivityGallery({ activities }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {activities.map((activity) => (
        <ActivityCard activity={activity} key={activity.id} />
      ))}
    </div>
  );
}

