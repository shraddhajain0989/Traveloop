import { useMemo, useState } from "react";
import { DestinationCard } from "../components/DestinationCard";
import { Input } from "@/shared/components/ui/Input";
import { PageHeader } from "@/shared/components/ui/PageHeader";
import { destinations } from "@/shared/data/traveloopData";
import { useSettingsContext } from "@/app/providers/SettingsContext";

export default function DiscoverCitiesPage() {
  const { t } = useSettingsContext();
  const [query, setQuery] = useState("");
  const filteredDestinations = useMemo(
    () =>
      destinations.filter((destination) =>
        `${destination.name} ${destination.country}`.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <div className="mt-6 space-y-6">
      <PageHeader
        eyebrow={t("discoverCities")}
        title={t("discoverTitle")}
        description={t("discoverDesc")}
      />
      <Input
        id="discover-search"
        label={t("search")}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={`${t("search")} Goa, Paris, Tokyo...`}
        value={query}
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {filteredDestinations.map((destination) => (
          <DestinationCard destination={destination} key={destination.id} />
        ))}
      </div>
    </div>
  );
}
