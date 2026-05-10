export function ChecklistFilters() {
  return (
    <div className="flex flex-wrap gap-2">
      {["All", "Documents", "Essentials", "Clothing", "Apps"].map((filter) => (
        <button className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-600 ring-1 ring-slate-200 hover:text-brand-700" key={filter} type="button">
          {filter}
        </button>
      ))}
    </div>
  );
}

