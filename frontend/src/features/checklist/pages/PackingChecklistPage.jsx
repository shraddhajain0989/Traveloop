import { useState } from "react";
import { Package, Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";
import { PageHeader } from "@/shared/components/ui/PageHeader";
import { Select } from "@/shared/components/ui/Select";
import { ChecklistCategory } from "../components/ChecklistCategory";
import { ChecklistItem } from "../components/ChecklistItem";
import { useChecklistContext } from "@/app/providers/ChecklistContext";
import { useSettingsContext } from "@/app/providers/SettingsContext";
import { useToast } from "@/app/providers/ToastProvider";

const CATEGORIES = ["Documents", "Clothing", "Toiletries", "Electronics"];

export default function PackingChecklistPage() {
  const { items, addItem, toggleItem, deleteItem } = useChecklistContext();
  const { showToast } = useToast();
  const { t } = useSettingsContext();
  const [newLabel, setNewLabel] = useState("");
  const [newCategory, setNewCategory] = useState("Documents");

  const packedCount = items.filter((i) => i.packed).length;
  const percentage = items.length > 0 ? Math.round((packedCount / items.length) * 100) : 0;

  const handleAdd = async () => {
    try {
      const ok = await addItem(newLabel, newCategory);
      if (!ok) { showToast({ title: "Select a trip and item name first" }); return; }
      showToast({ type: "success", title: "Item added", description: `"${newLabel.trim()}" added to ${newCategory}.` });
      setNewLabel("");
    } catch (error) {
      showToast({ title: "Unable to add item", description: error.message });
    }
  };

  const handleToggle = async (id) => {
    const item = items.find((i) => i.id === id);
    try {
      await toggleItem(id);
      if (item && !item.packed) showToast({ type: "success", title: `✓ ${item.label}` });
    } catch (error) {
      showToast({ title: "Unable to update item", description: error.message });
    }
  };

  const handleDelete = async (id) => {
    const item = items.find((i) => i.id === id);
    try {
      await deleteItem(id);
      showToast({ title: `"${item?.label}" removed` });
    } catch (error) {
      showToast({ title: "Unable to delete item", description: error.message });
    }
  };

  return (
    <div className="mt-6 space-y-6">
      <PageHeader title={t("checklistTitle")} description={t("checklistDesc")} />

      <Card className="p-6 dark:bg-slate-800 dark:border-slate-700">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-cyan text-white shadow-glow">
              <Package size={22} />
            </span>
            <div>
              <p className="text-lg font-black text-ink dark:text-white">{t("packingProgress")}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {packedCount} of {items.length} {t("itemsPacked")}
              </p>
            </div>
          </div>
          <p className={`text-3xl font-black ${percentage === 100 ? "text-emerald-500" : "text-brand-500"}`}>
            {percentage}%
          </p>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className={`h-full rounded-full transition-all duration-500 ${percentage === 100 ? "bg-emerald-500" : "bg-gradient-to-r from-brand-500 to-accent-cyan"}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {percentage === 100 && (
          <p className="mt-3 text-center text-sm font-bold text-emerald-600 dark:text-emerald-400">
            🎉 All packed! You're ready to go!
          </p>
        )}
      </Card>

      <Card className="p-6 dark:bg-slate-800 dark:border-slate-700">
        <h2 className="mb-4 text-lg font-black text-ink dark:text-white">{t("addNewItem")}</h2>
        <div className="grid gap-3 md:grid-cols-[1fr_180px_auto]">
          <Input
            id="packing-item"
            placeholder="Item name..."
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
          />
          <Select id="packing-category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
            {CATEGORIES.map((cat) => <option key={cat}>{cat}</option>)}
          </Select>
          <Button onClick={handleAdd}><Plus size={16} />{t("add")}</Button>
        </div>
      </Card>

      <div className="space-y-6">
        {CATEGORIES.map((category) => {
          const catItems = items.filter((item) => item.category === category);
          if (catItems.length === 0) return null;
          const done = catItems.filter((i) => i.packed).length;
          return (
            <ChecklistCategory key={category}>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 p-6">
                <h2 className="font-black text-ink dark:text-white">{category}</h2>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{done} / {catItems.length}</p>
              </div>
              {catItems.map((item) => (
                <ChecklistItem
                  item={item}
                  key={item.id}
                  onToggle={() => handleToggle(item.id)}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
            </ChecklistCategory>
          );
        })}
      </div>
    </div>
  );
}
