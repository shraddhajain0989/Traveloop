import { Card } from "@/shared/components/ui/Card";

export function StopCard({ stop }) {
  return (
    <Card className="p-4">
      <p className="text-sm font-bold text-brand-700">{stop.city}</p>
      <h3 className="mt-1 font-extrabold text-ink">{stop.title}</h3>
    </Card>
  );
}

