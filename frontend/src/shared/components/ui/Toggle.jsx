import { useState } from "react";
import { cn } from "@/shared/lib/cn";

export function Toggle({ defaultChecked = false, label, description, onChange }) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleClick = () => {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="font-bold text-ink dark:text-white">{label}</p>
        {description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
      <button
        aria-pressed={checked}
        className={cn(
          "relative h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
          checked ? "bg-brand-500" : "bg-slate-200 dark:bg-slate-600"
        )}
        onClick={handleClick}
        type="button"
      >
        <span
          className={cn(
            "absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all duration-200",
            checked ? "left-6" : "left-1"
          )}
        />
      </button>
    </div>
  );
}
