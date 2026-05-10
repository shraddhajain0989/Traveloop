import { useMemo, useState } from "react";
import { ActivityFilters } from "../components/ActivityFilters";
import { ActivityGallery } from "../components/ActivityGallery";
import { PageHeader } from "@/shared/components/ui/PageHeader";
import { Tabs } from "@/shared/components/ui/Tabs";
import { activities } from "@/shared/data/traveloopData";
import { useSettingsContext } from "@/app/providers/SettingsContext";

export default function ActivitySearchPage() {
  const { t } = useSettingsContext();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const filteredActivities = useMemo(
    () =>
      activities.filter((activity) => {
        const matchesQuery = `${activity.name} ${activity.city} ${activity.category}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory = category === "All" || activity.category === category;
        return matchesQuery && matchesCategory;
      }),
    [category, query]
  );

  return (
    <div className="mt-6 space-y-6">
      <PageHeader
        eyebrow="Activity discovery"
        title={t("activitiesTitle")}
        description={t("activitiesDesc")}
      />
      <Tabs
        activeTab={category}
        onChange={setCategory}
        tabs={["All", "Adventure", "Food", "Culture", "Nightlife", "Relaxation"].map((value) => ({ label: value, value }))}
      />
      <ActivityFilters query={query} setQuery={setQuery} />
      <ActivityGallery activities={filteredActivities} />
    </div>
  );
}
