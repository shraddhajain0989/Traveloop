import { Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/lib/cn";

export function ChecklistItem({ item, onToggle, onDelete }) {
  return (
    <div
      className={cn(
        "mx-6 my-3 flex items-center justify-between gap-4 rounded-2xl p-3 transition-all duration-200 last:mb-6",
        item.packed ? "bg-brand-50 dark:bg-brand-900/20" : "bg-white dark:bg-slate-700"
      )}
    >
      <label className="flex flex-1 cursor-pointer items-center gap-3 min-w-0">
        <input
          type="checkbox"
          checked={item.packed}
          onChange={onToggle}
          className="h-5 w-5 flex-shrink-0 cursor-pointer rounded border-slate-300 accent-brand-500"
        />
        <span
          className={cn(
            "text-sm font-semibold transition-all",
            item.packed
              ? "text-slate-400 line-through dark:text-slate-500"
              : "text-slate-700 dark:text-slate-200"
          )}
        >
          {item.label}
        </span>
      </label>
      <div className="flex flex-shrink-0 items-center gap-2">
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-bold",
            item.packed
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
              : "bg-slate-100 text-slate-600 dark:bg-slate-600 dark:text-slate-300"
          )}
        >
          {item.category}
        </span>
        <Button
          aria-label="Delete item"
          className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
          variant="ghost"
          onClick={onDelete}
        >
          <Trash2 size={15} />
        </Button>
      </div>
    </div>
  );
}
