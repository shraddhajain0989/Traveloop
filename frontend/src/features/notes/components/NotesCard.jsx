import { Card } from "@/shared/components/ui/Card";

export function NotesCard({ note }) {
  return (
    <Card className="p-5">
      <p className="text-sm font-bold text-brand-700">{note.day}</p>
      <h3 className="mt-2 font-extrabold text-ink">{note.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{note.body}</p>
    </Card>
  );
}

