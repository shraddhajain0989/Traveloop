import { Button } from "@/shared/components/ui/Button";
import { useSettingsContext } from "@/app/providers/SettingsContext";

export function ShareActions() {
  const { t } = useSettingsContext();
  return <Button variant="secondary">{t("copyShareLink") || "Copy share link"}</Button>;
}

