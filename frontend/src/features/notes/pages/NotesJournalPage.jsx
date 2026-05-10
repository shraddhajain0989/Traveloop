import { useState } from "react";
import { useForm } from "react-hook-form";
import { CalendarDays, Edit3, ImagePlus, Save, Trash2, X } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";
import { PageHeader } from "@/shared/components/ui/PageHeader";
import { Textarea } from "@/shared/components/ui/Textarea";
import { useNotesContext } from "@/app/providers/NotesContext";
import { useSettingsContext } from "@/app/providers/SettingsContext";
import { useToast } from "@/app/providers/ToastProvider";

export default function NotesJournalPage() {
  const { notes, addNote, editNote, deleteNote } = useNotesContext();
  const { showToast } = useToast();
  const { t } = useSettingsContext();
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: { title: "", body: "" }
  });

  const resetForm = () => {
    reset({ title: "", body: "" });
    setEditingId(null);
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      if (editingId) {
        await editNote(editingId, { title: data.title.trim(), body: data.body.trim() });
        showToast({ type: "success", title: "Entry updated", description: `"${data.title}" has been updated.` });
      } else {
        const ok = await addNote(data.title.trim(), data.body.trim());
        if (!ok) {
          showToast({ title: "Create a trip first", description: "Notes are attached to a trip." });
          return;
        }
        showToast({ type: "success", title: "Entry saved! 📖", description: `"${data.title}" added to your journal.` });
      }

      resetForm();
    } catch (error) {
      showToast({ title: "Unable to save note", description: error.message });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (note) => {
    setEditingId(note.id);
    setValue("title", note.title);
    setValue("body", note.body);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (note) => {
    try {
      await deleteNote(note.id);
      showToast({ title: `"${note.title}" deleted` });
      if (editingId === note.id) resetForm();
    } catch (error) {
      showToast({ title: "Unable to delete note", description: error.message });
    }
  };

  const handleAddPhotos = () => {
    showToast({ title: "Photo upload", description: "Photo upload will be available soon!" });
  };

  return (
    <div className="mt-6 space-y-6">
      <PageHeader title={t("journalTitle")} description={t("journalDesc")} />

      <Card className="p-6 dark:bg-slate-800 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-ink dark:text-white">
            {editingId ? t("updateEntry") : t("newEntry")}
          </h2>
          {editingId && (
            <Button variant="ghost" className="h-9 w-9 p-0" onClick={resetForm} title="Cancel edit">
              <X size={17} />
            </Button>
          )}
        </div>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="journal-title"
            placeholder="Entry title..."
            error={errors.title?.message}
            {...register("title", { required: "Title is required" })}
          />
          <Textarea
            className="min-h-44"
            id="journal-body"
            placeholder="Write about your experience..."
            error={errors.body?.message}
            {...register("body", { required: "Write something before saving" })}
          />
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="secondary" onClick={handleAddPhotos}>
              <ImagePlus size={17} />
              Add Photos
            </Button>
            <Button type="submit" isLoading={saving}>
              <Save size={17} />
              {editingId ? t("updateEntry") : t("saveEntry")}
            </Button>
          </div>
        </form>
      </Card>

      <section>
        <h2 className="text-2xl font-black text-ink dark:text-white">
          {t("previousEntries")}
          {notes.length > 0 && (
            <span className="ml-2 rounded-full bg-brand-100 px-2.5 py-0.5 text-sm font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
              {notes.length}
            </span>
          )}
        </h2>
        {notes.length === 0 ? (
          <div className="mt-6 rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">No journal entries yet. Write your first one above!</p>
          </div>
        ) : (
          <div className="mt-4 space-y-5">
            {notes.map((entry) => (
              <Card className="p-6 dark:bg-slate-800 dark:border-slate-700" interactive key={entry.id}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                      <CalendarDays size={15} />
                      {entry.date}
                    </p>
                    <h3 className="mt-3 text-2xl font-black text-ink dark:text-white">{entry.title}</h3>
                    <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">{entry.body}</p>
                    {entry.image && (
                      <img
                        alt=""
                        className="mt-4 h-28 w-56 rounded-2xl object-cover"
                        src={entry.image}
                      />
                    )}
                  </div>
                  <div className="flex flex-shrink-0 gap-2">
                    <Button
                      aria-label="Edit entry"
                      className="h-9 w-9 p-0"
                      variant="ghost"
                      type="button"
                      onClick={() => handleEdit(entry)}
                    >
                      <Edit3 size={16} />
                    </Button>
                    <Button
                      aria-label="Delete entry"
                      className="h-9 w-9 p-0 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
                      variant="ghost"
                      type="button"
                      onClick={() => handleDelete(entry)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
