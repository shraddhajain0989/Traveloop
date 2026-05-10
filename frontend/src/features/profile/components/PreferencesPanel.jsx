import { Checkbox } from "@/shared/components/ui/Checkbox";

export function PreferencesPanel() {
  return (
    <div className="space-y-3">
      <Checkbox label="Email me itinerary changes" defaultChecked />
      <Checkbox label="Enable public itinerary sharing" defaultChecked />
      <Checkbox label="Show budget alerts" defaultChecked />
    </div>
  );
}

