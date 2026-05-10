import { NavLink } from "react-router-dom";
import { Map, Moon, Sun, X } from "lucide-react";
import { navigationItems } from "@/config/navigation.config";
import { useAuth } from "@/app/providers/AuthProvider";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useSettingsContext } from "@/app/providers/SettingsContext";
import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/lib/cn";

export function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const { t } = useSettingsContext();

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-slate-100 bg-white transition-transform duration-300 dark:border-slate-700 dark:bg-slate-900 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-24 items-center justify-between px-5">
          <NavLink className="flex items-center gap-3" to="/dashboard">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-cyan text-white shadow-glow">
              <Map size={20} />
            </span>
            <span>
              <span className="block text-2xl font-black leading-6 text-transparent bg-gradient-to-r from-brand-500 to-accent-cyan bg-clip-text">
                Traveloop
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {t("planExploreTravel", "Plan. Explore. Travel.")}
              </span>
            </span>
          </NavLink>
          <Button aria-label="Close navigation" className="h-9 w-9 p-0 lg:hidden" onClick={onClose} variant="ghost">
            <X size={18} />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-2">
          {navigationItems.map(({ icon: Icon, label, labelKey, path }) => {
            const translatedLabel = t(labelKey, label);
            return path === "/logout" ? (
              <button
                className="mt-auto flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-red-50 hover:text-red-700 dark:text-slate-300 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                key={path}
                onClick={logout}
                type="button"
              >
                <Icon size={18} />
                {translatedLabel}
              </button>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition duration-200",
                    isActive
                      ? "bg-brand-500 text-white shadow-glow"
                      : "text-slate-900 hover:bg-brand-50 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-brand-900/30 dark:hover:text-brand-300"
                  )
                }
                key={path}
                onClick={onClose}
                to={path}
              >
                <Icon size={18} />
                {translatedLabel}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 px-4 pb-5 pt-2 dark:border-slate-700">
          <button
            onClick={toggleTheme}
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {isDark ? (
              <><Sun size={18} className="text-amber-400" /><span>{t("lightMode")}</span></>
            ) : (
              <><Moon size={18} /><span>{t("darkMode")}</span></>
            )}
          </button>
        </div>
      </aside>

      {isOpen && (
        <button
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          onClick={onClose}
          type="button"
        />
      )}
    </>
  );
}
