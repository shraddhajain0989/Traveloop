import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export const Select = forwardRef(({ label, id, className, children, error, ...props }, ref) => {
  return (
    <label className="block" htmlFor={id}>
      {label && <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</span>}
      <div className="relative mt-2">
        <select
          ref={ref}
          id={id}
          className={cn(
            "w-full appearance-none rounded-2xl border bg-white/90 px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-900 dark:text-white",
            error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-slate-200",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={16}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs font-medium text-red-500" id={`${id}-error`}>
          {error}
        </p>
      )}
    </label>
  );
});

Select.displayName = "Select";
