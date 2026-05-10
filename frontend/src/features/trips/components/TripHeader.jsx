import { Badge } from "@/shared/components/ui/Badge";

export function TripHeader({ trip }) {
  if (!trip) return null;

  return (
    <section className="relative overflow-hidden rounded-2xl bg-ink text-white shadow-glow">
      <img alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" src={trip.image} />
      <div className="relative p-8 sm:p-10">
        <Badge tone="cyan">{trip.status}</Badge>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold">{trip.title}</h1>
        <p className="mt-3 text-slate-100">{(trip.cities || []).join(" -> ")}</p>
      </div>
    </section>
  );
}
