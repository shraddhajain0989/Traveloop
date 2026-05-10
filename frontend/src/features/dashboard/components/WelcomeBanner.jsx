import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/Button";
import { useSettingsContext } from "@/app/providers/SettingsContext";

export function WelcomeBanner() {
  const navigate = useNavigate();
  const { t } = useSettingsContext();

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-900 via-brand-500 to-accent-cyan p-8 text-white shadow-glow"
      initial={{ opacity: 0, y: 16 }}
    >
      <div className="absolute right-8 top-8 hidden h-32 w-32 rounded-full bg-white/10 blur-2xl md:block" />
      <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-cyan-100">
        <Sparkles size={16} />
        {t("aiTravelCommandCenter")}
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
        {t("welcomeTitle")}
      </h1>
      <p className="mt-4 max-w-2xl text-slate-100">
        {t("welcomeSubtitle")}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          className="bg-white text-brand-700 hover:bg-slate-50"
          variant="secondary"
          onClick={() => navigate("/trips/new")}
        >
          {t("createIntelligentTrip")}
        </Button>
        <button
          type="button"
          className="flex min-w-0 items-center gap-2 rounded-2xl border border-white/20 bg-white/15 px-4 py-2.5 text-sm text-white/90 backdrop-blur hover:bg-white/25 transition"
          onClick={() => navigate("/activities")}
        >
          <Search size={17} />
          {t("dashboardSearchCta")}
        </button>
      </div>
    </motion.section>
  );
}
