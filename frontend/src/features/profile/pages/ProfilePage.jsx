import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CalendarDays, Mail, MapPin, Settings, UserRound } from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";
import { useSettingsContext } from "@/app/providers/SettingsContext";
import { useToast } from "@/app/providers/ToastProvider";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";
import { PageHeader } from "@/shared/components/ui/PageHeader";
import { Select } from "@/shared/components/ui/Select";

export default function ProfilePage() {
  const { user } = useAuth();
  const { settings, updateSetting, t, languageOptions, currencyOptions } = useSettingsContext();
  const { showToast } = useToast();
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: user?.name || "Sarah Johnson",
      email: user?.email || "sarah.johnson@example.com",
      memberSince: "15/01/2024",
    },
  });

  const favorites = ["Paris", "Tokyo", "Bali", "New York"];

  const onSubmit = async (data) => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    showToast({ type: "success", title: t("profileUpdated") });
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Simulate upload
    showToast({ title: t("uploadAvatar"), description: "Please wait..." });
    await new Promise((r) => setTimeout(r, 1000));
    showToast({ type: "success", title: t("avatarUpdated"), description: "Your new profile picture looks great." });
  };

  return (
    <div className="mt-6 space-y-6">
      <PageHeader title={t("profileTitle")} description={t("profileDesc")} />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-6">
          <Card className="p-7 text-center dark:bg-slate-800 dark:border-slate-700">
            <div className="relative inline-block">
              <img
                alt=""
                className="mx-auto h-28 w-28 rounded-full border-4 border-brand-100 object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-brand-500 text-white hover:bg-brand-600 transition dark:border-slate-800"
                onClick={handleAvatarClick}
                title="Change avatar"
              >
                <UserRound size={14} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <h2 className="mt-5 text-2xl font-black text-ink dark:text-white">{user?.name || "Sarah Johnson"}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email || "sarah.johnson@example.com"}</p>
            <div className="mt-8 space-y-3 text-sm">
              <p className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>{t("memberSince")}</span>
                <strong className="text-ink dark:text-white">2024</strong>
              </p>
              <p className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>{t("totalTrips")}</span>
                <strong className="text-ink dark:text-white">12</strong>
              </p>
              <p className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>{t("countriesVisited")}</span>
                <strong className="text-ink dark:text-white">18</strong>
              </p>
            </div>
          </Card>
          <Card className="p-6 dark:bg-slate-800 dark:border-slate-700">
            <h3 className="text-lg font-black text-ink dark:text-white">{t("travelStats")}</h3>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl bg-brand-50 p-4 dark:bg-brand-900/20">
                <p className="text-sm text-slate-500 dark:text-slate-400">{t("completedTrips")}</p>
                <p className="text-2xl font-black text-brand-600 dark:text-brand-300">1</p>
              </div>
              <div className="rounded-2xl bg-cyan-50 p-4 dark:bg-cyan-900/20">
                <p className="text-sm text-slate-500 dark:text-slate-400">{t("upcomingTrips")}</p>
                <p className="text-2xl font-black text-cyan-600 dark:text-cyan-400">2</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-7 dark:bg-slate-800 dark:border-slate-700">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-black text-ink dark:text-white">{t("personalInformation")}</h2>
              <Settings size={19} className="text-slate-400" />
            </div>
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="relative">
                <UserRound className="absolute left-4 top-[2.9rem] text-slate-400" size={18} />
                <Input
                  className="pl-12"
                  id="full-name"
                  label={t("fullName")}
                  error={errors.fullName?.message}
                  {...register("fullName", { required: "Full name is required" })}
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-[2.9rem] text-slate-400" size={18} />
                <Input
                  className="pl-12"
                  id="profile-email"
                  label={t("emailAddress")}
                  type="email"
                  error={errors.email?.message}
                  {...register("email", { 
                    required: "Email is required",
                    pattern: { value: /\S+@\S+\.\S+/, message: "Valid email is required" }
                  })}
                />
              </div>
              <div className="relative">
                <CalendarDays className="absolute left-4 top-[2.9rem] text-slate-400" size={18} />
                <Input
                  className="pl-12"
                  id="member-since"
                  label={t("memberSince")}
                  readOnly
                  {...register("memberSince")}
                />
              </div>
              <Button className="w-fit" type="submit" isLoading={saving}>
                {t("saveChanges")}
              </Button>
            </form>
          </Card>

          <Card className="p-7 dark:bg-slate-800 dark:border-slate-700">
            <h2 className="text-2xl font-black text-ink dark:text-white">{t("favoriteDestinations")}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {favorites.map((fav) => (
                <p className="flex items-center gap-3 font-bold text-ink dark:text-white" key={fav}>
                  <MapPin className="text-brand-500" size={18} />
                  {fav}
                </p>
              ))}
            </div>
          </Card>

          <Card className="p-7 dark:bg-slate-800 dark:border-slate-700">
            <h2 className="text-2xl font-black text-ink dark:text-white">{t("preferences")}</h2>
            <div className="mt-5 grid gap-4">
              <Select
                id="profile-currency"
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
                id="profile-language"
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
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
