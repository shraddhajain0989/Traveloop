import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import { useSettingsContext } from "@/app/providers/SettingsContext";
import { Avatar } from "@/shared/components/ui/Avatar";
import { Button } from "@/shared/components/ui/Button";
import { useAuth } from "@/app/providers/AuthProvider";
import { useTheme } from "@/app/providers/ThemeProvider";

export function Navbar({ onMenuClick }) {
  const { user } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const { t } = useSettingsContext();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-[#f7f8fb]/90 backdrop-blur-xl dark:border-slate-700 dark:bg-[#0f1117]/90 lg:hidden">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Button
            aria-label="Open navigation"
            className="h-10 w-10 p-0 lg:hidden"
            onClick={onMenuClick}
            variant="ghost"
          >
            <Menu size={20} />
          </Button>
          <div className="hidden min-w-80 items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-4 py-2.5 text-sm text-slate-500 shadow-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 md:flex">
            <Search size={16} />
            <span>{t("searchEverything")}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="h-10 w-10 p-0"
            onClick={toggleTheme}
            variant="ghost"
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </Button>
          <Button aria-label="Notifications" className="h-10 w-10 p-0" variant="ghost">
            <Bell size={18} />
          </Button>
          <Avatar name={user?.name} />
        </div>
      </div>
    </header>
  );
}
