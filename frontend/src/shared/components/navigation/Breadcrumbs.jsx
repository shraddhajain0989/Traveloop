import { Link, useLocation } from "react-router-dom";
import { useSettingsContext } from "@/app/providers/SettingsContext";

export function Breadcrumbs() {
  const location = useLocation();
  const { t } = useSettingsContext();
  const segments = location.pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
      <Link className="hover:text-brand-700" to="/dashboard">
        {t("dashboard")}
      </Link>
      {segments.map((segment, index) => (
        <span key={`${segment}-${index}`}>
          <span className="mx-2">/</span>
          <span className="capitalize text-slate-700">{segment.replaceAll("-", " ")}</span>
        </span>
      ))}
    </nav>
  );
}
