import { NotesCard } from "./NotesCard";

export function NotesTimeline({ notes }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {notes.map((note) => (
        <NotesCard key={note.id} note={note} />
      ))}
    </div>
  );
}

