import { Globe2 } from "lucide-react";

export function AuthBanner({ title, description }) {
  return (
    <div className="mb-8 text-center">
      <div className="inline-flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-cyan text-white shadow-glow">
          <Globe2 size={22} />
        </span>
        <h1 className="text-4xl font-black tracking-tight text-transparent bg-gradient-to-r from-brand-500 to-accent-cyan bg-clip-text">
          Traveloop
        </h1>
      </div>
      <p className="mt-4 text-sm text-slate-500">{description || title}</p>
    </div>
  );
}
