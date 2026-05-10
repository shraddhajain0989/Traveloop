export function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex gap-2 rounded-xl bg-slate-100 p-1">
      {tabs.map((tab) => (
        <button
          className={`rounded-lg px-3 py-2 text-sm font-semibold ${activeTab === tab.value ? "bg-white text-brand-700 shadow-sm" : "text-slate-600"}`}
          key={tab.value}
          onClick={() => onChange(tab.value)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

