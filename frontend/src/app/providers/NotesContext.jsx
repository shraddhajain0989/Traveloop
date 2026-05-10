import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { notesApi } from "@/features/notes/api/notesApi";
import { useTripContext } from "./TripContext";

const NotesContext = createContext(null);

function formatNote(note) {
  return {
    id: note.id,
    title: note.title,
    body: note.content,
    date: new Date(note.created_at).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}

export function NotesProvider({ children }) {
  const { trips, selectedTripId } = useTripContext();
  const [notes, setNotes] = useState([]);
  const activeTripId = selectedTripId || trips[0]?.id || null;

  const loadNotes = useCallback(async () => {
    if (!activeTripId) {
      setNotes([]);
      return [];
    }
    const response = await notesApi.list(activeTripId);
    const nextNotes = (response.data?.data || []).map(formatNote);
    setNotes(nextNotes);
    return nextNotes;
  }, [activeTripId]);

  useEffect(() => {
    loadNotes().catch(() => setNotes([]));
  }, [loadNotes]);

  const addNote = useCallback(
    async (title, body) => {
      if (!title.trim() || !body.trim() || !activeTripId) return false;
      const response = await notesApi.create(activeTripId, {
        title: title.trim(),
        content: body.trim(),
      });
      const created = formatNote(response.data?.data);
      setNotes((current) => [created, ...current]);
      return true;
    },
    [activeTripId]
  );

  const editNote = useCallback(
    async (id, data) => {
      const response = await notesApi.update(id, {
        title: data.title,
        content: data.body,
      });
      const updated = formatNote(response.data?.data);
      setNotes((current) => current.map((note) => (note.id === id ? updated : note)));
      return updated;
    },
    []
  );

  const deleteNote = useCallback(
    async (id) => {
      await notesApi.delete(id);
      setNotes((current) => current.filter((note) => note.id !== id));
    },
    []
  );

  const value = useMemo(
    () => ({ notes, activeTripId, loadNotes, addNote, editNote, deleteNote }),
    [notes, activeTripId, loadNotes, addNote, editNote, deleteNote]
  );

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export function useNotesContext() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotesContext must be used inside NotesProvider");
  return ctx;
}
