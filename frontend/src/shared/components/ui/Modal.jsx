import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";

export function Modal({ children, isOpen, onClose, title }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-glow dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-4">
          <h2 className="text-lg font-extrabold text-ink dark:text-white">{title}</h2>
          <Button aria-label="Close modal" className="h-9 w-9 p-0" onClick={onClose} variant="ghost">
            <X size={18} />
          </Button>
        </div>
        <div className="pt-4">{children}</div>
      </section>
    </div>
  );
}
