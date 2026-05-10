import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CheckCircle2, Info, X } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((toast) => {
    const id = window.crypto?.randomUUID?.() || `toast-${Date.now()}`;
    setToasts((current) => [...current, { id, type: "info", ...toast }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, toast.duration || 3500);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-[60] space-y-3">
        {toasts.map((toast) => {
          const Icon = toast.type === "success" ? CheckCircle2 : Info;
          return (
            <div
              className="flex w-80 items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-glow"
              key={toast.id}
              role="status"
            >
              <Icon className="mt-0.5 text-brand-600" size={18} />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-ink">{toast.title}</p>
                {toast.description && (
                  <p className="mt-1 text-sm text-slate-500">{toast.description}</p>
                )}
              </div>
              <Button
                aria-label="Dismiss notification"
                className="h-7 w-7 p-0"
                onClick={() => setToasts((current) => current.filter((item) => item.id !== toast.id))}
                variant="ghost"
              >
                <X size={14} />
              </Button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
