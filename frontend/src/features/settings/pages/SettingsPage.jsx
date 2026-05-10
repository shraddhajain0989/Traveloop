import { useState } from "react";
import { useForm } from "react-hook-form";
import { Bell, Download, Globe2, Lock, Moon, Palette, Shield, Sun } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";
import { PageHeader } from "@/shared/components/ui/PageHeader";
import { Select } from "@/shared/components/ui/Select";
import { Toggle } from "@/shared/components/ui/Toggle";
import { useTheme } from "@/app/providers/ThemeProvider";
import { useSettingsContext } from "@/app/providers/SettingsContext";
import { useToast } from "@/app/providers/ToastProvider";

function PasswordChangeForm({ onClose, t }) {
  const { showToast } = useToast();
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: { current: "", next: "", confirm: "" }
  });

  const nextValue = watch("next");

  const onSubmit = (data) => {
    showToast({ type: "success", title: t("passwordUpdated") });
    onClose();
  };

  return (
    <form className="mt-4 space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="current-password"
        label="Current Password"
        type="password"
        error={errors.current?.message}
        placeholder="••••••••"
        {...register("current", { required: "Current password is required" })}
      />
      <Input
        id="new-password"
        label="New Password"
        type="password"
        error={errors.next?.message}
        placeholder="Min 8 characters"
        {...register("next", { 
          required: "New password is required",
          minLength: { value: 8, message: "Minimum 8 characters" }
        })}
      />
      <Input
        id="confirm-password"
        label="Confirm New Password"
        type="password"
        error={errors.confirm?.message}
        placeholder="Repeat new password"
        {...register("confirm", { 
          required: "Confirm new password",
          validate: value => value === nextValue || "Passwords do not match"
        })}
      />
      <div className="flex gap-3 pt-1">
        <Button type="submit">{t("saveChanges")}</Button>
        <Button variant="ghost" type="button" onClick={onClose}>{t("cancel")}</Button>
      </div>
    </form>
  );
}

export default function SettingsPage() {
  const { theme, setTheme, isDark } = useTheme();
  const { settings, updateSetting, updateNotification, t, languageOptions, currencyOptions } = useSettingsContext();
  const { showToast } = useToast();
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleExportData = () => {
    const data = JSON.stringify({ settings, exportedAt: new Date().toISOString() }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "traveloop-data.json";
    a.click();
    URL.revokeObjectURL(url);
    showToast({ type: "success", title: t("dataExported") });
  };

  const handleToggle2FA = () => {
    const next = !settings.twoFAEnabled;
    updateSetting("twoFAEnabled", next);
    showToast({
      type: "success",
      title: next ? t("enable2FA") : t("disable2FA"),
    });
  };

  return (
    <div className="mt-6 space-y-6">
      <PageHeader title={t("settingsTitle")} description={t("settingsDesc")} />

      {/* Notifications */}
      <Card className="p-7 dark:bg-slate-800 dark:border-slate-700">
        <div className="mb-7 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500 text-white shadow-glow">
            <Bell size={20} />
          </span>
          <h2 className="text-xl font-black text-ink dark:text-white">{t("notifications")}</h2>
        </div>
        <div className="space-y-7">
          <Toggle
            defaultChecked={settings.notifications.tripReminders}
            label={t("tripReminders")}
            onChange={(v) => updateNotification("tripReminders", v)}
          />
          <Toggle
            defaultChecked={settings.notifications.budgetAlerts}
            label={t("budgetAlerts")}
            onChange={(v) => updateNotification("budgetAlerts", v)}
          />
        </div>
      </Card>

      {/* Appearance */}
      <Card className="p-7 dark:bg-slate-800 dark:border-slate-700">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-cyan text-white">
            <Palette size={20} />
          </span>
          <h2 className="text-xl font-black text-ink dark:text-white">{t("appearance")}</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`flex items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
              theme === "light"
                ? "border-brand-500 bg-brand-50 text-brand-700"
                : "border-slate-200 bg-white text-slate-700 hover:border-brand-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
            }`}
          >
            <Sun size={17} />
            {t("lightMode")}
          </button>
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`flex items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
              theme === "dark"
                ? "border-brand-500 bg-brand-900 text-white"
                : "border-slate-200 bg-slate-900 text-white hover:border-brand-400 dark:border-slate-600"
            }`}
          >
            <Moon size={17} />
            {t("darkMode")}
          </button>
        </div>
      </Card>

      {/* Privacy & Security */}
      <Card className="p-7 dark:bg-slate-800 dark:border-slate-700">
        <div className="mb-7 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-orange-500 text-white">
            <Lock size={20} />
          </span>
          <h2 className="text-xl font-black text-ink dark:text-white">{t("security")}</h2>
        </div>
        <div className="space-y-6">
          <div>
            <p className="font-bold text-ink dark:text-white">{t("changePassword")}</p>
            {!showPasswordForm ? (
              <Button className="mt-3" variant="secondary" onClick={() => setShowPasswordForm(true)}>
                {t("changePassword")}
              </Button>
            ) : (
              <PasswordChangeForm onClose={() => setShowPasswordForm(false)} t={t} />
            )}
          </div>

          <div className="border-t border-slate-100 dark:border-slate-700 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-ink dark:text-white">Two-Factor Authentication</p>
              </div>
              <div className="flex items-center gap-3">
                {settings.twoFAEnabled && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <Shield size={12} /> Enabled
                  </span>
                )}
                <Button
                  className="mt-0"
                  variant={settings.twoFAEnabled ? "danger" : "secondary"}
                  onClick={handleToggle2FA}
                >
                  {settings.twoFAEnabled ? t("disable2FA") : t("enable2FA")}
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-700 pt-6">
            <p className="font-bold text-ink dark:text-white">{t("exportData")}</p>
            <Button className="mt-3" variant="secondary" onClick={handleExportData}>
              <Download size={16} />
              {t("exportData")}
            </Button>
          </div>
        </div>
      </Card>

      {/* Regional Settings */}
      <Card className="p-7 dark:bg-slate-800 dark:border-slate-700">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-cyan text-white">
            <Globe2 size={20} />
          </span>
          <h2 className="text-xl font-black text-ink dark:text-white">{t("regional")}</h2>
        </div>
        <div className="grid gap-4">
          <Select
            id="language"
            label={t("language")}
            value={settings.language}
            onChange={(e) => {
              updateSetting("language", e.target.value);
              showToast({ type: "success", title: t("languageUpdated") });
            }}
          >
            {languageOptions.map((language) => (
              <option key={language}>{language}</option>
            ))}
          </Select>
          <Select
            id="currency"
            label={t("currency")}
            value={settings.currency}
            onChange={(e) => {
              updateSetting("currency", e.target.value);
              showToast({ type: "success", title: t("currencyUpdated") });
            }}
          >
            {currencyOptions.map((currency) => (
              <option key={currency.code}>{currency.label}</option>
            ))}
          </Select>
          <Select
            id="timezone"
            label={t("timezone")}
            value={settings.timezone}
            onChange={(e) => {
              updateSetting("timezone", e.target.value);
              showToast({ type: "success", title: t("timezoneUpdated") });
            }}
          >
            <option>Asia/Kolkata</option>
            <option>UTC</option>
            <option>America/New_York</option>
            <option>Europe/London</option>
            <option>Asia/Tokyo</option>
            <option>Australia/Sydney</option>
          </Select>
        </div>
      </Card>
    </div>
  );
}
