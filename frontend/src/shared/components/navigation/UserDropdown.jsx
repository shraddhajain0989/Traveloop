import { LogOut } from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";
import { useSettingsContext } from "@/app/providers/SettingsContext";
import { Button } from "@/shared/components/ui/Button";

export function UserDropdown() {
  const { logout, user } = useAuth();
  const { t } = useSettingsContext();

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <p className="font-bold text-slate-950 dark:text-white">{user?.name}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
      <Button className="mt-4 w-full" onClick={logout} variant="secondary">
        <LogOut size={16} />
        {t("logout")}
      </Button>
    </div>
  );
}
