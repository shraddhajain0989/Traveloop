import { forwardRef } from "react";
import { cn } from "@/shared/lib/cn";

export const Input = forwardRef(({ error, label, id, className, ...props }, ref) => {
  return (
    <label className="block" htmlFor={id}>
      {label && <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</span>}
      <input
        ref={ref}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "mt-2 w-full rounded-2xl border bg-white/90 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500",
          error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-slate-200",
          className
        )}
        id={id}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs font-medium text-red-500" id={`${id}-error`}>
          {error}
        </p>
      )}
    </label>
  );
});

Input.displayName = "Input";
