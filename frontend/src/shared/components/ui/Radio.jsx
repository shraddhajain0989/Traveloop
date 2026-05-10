export function Radio({ label, ...props }) {
  return (
    <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
      <input className="h-4 w-4 border-slate-300 text-brand-600 focus:ring-brand-500" type="radio" {...props} />
      {label}
    </label>
  );
}

