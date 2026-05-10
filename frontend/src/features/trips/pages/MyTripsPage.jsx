import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/shared/components/ui/Input";
import { PageHeader } from "@/shared/components/ui/PageHeader";
import { Tabs } from "@/shared/components/ui/Tabs";
import { EmptyState } from "@/shared/components/ui/EmptyState";
import { TripCard } from "../components/TripCard";
import { useTripContext } from "@/app/providers/TripContext";
import { useSettingsContext } from "@/app/providers/SettingsContext";

export default function MyTripsPage() {
  const navigate = useNavigate();
  const { trips } = useTripContext();
  const { t } = useSettingsContext();
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");

  const filteredTrips = useMemo(
    () =>
      trips.filter((trip) => {
        const matchesQuery = `${trip.title} ${(trip.cities || []).join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const status = trip.status?.toLowerCase();
        const matchesTab =
          activeTab === "all" ||
          status === activeTab ||
          (activeTab === "upcoming" && status !== "completed");
        return matchesQuery && matchesTab;
      }),
    [activeTab, query, trips]
  );

  return (
    <div className="mt-6 space-y-6">
      <PageHeader
        actionLabel={`+ ${t("createTrip")}`}
        eyebrow="Trip management"
        title={t("myTripsTitle")}
        description={t("myTripsDesc")}
        onAction={() => navigate("/trips/new")}
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <Input
          id="trip-search"
          label={t("searchTrips")}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchTripsPlaceholder")}
          value={query}
        />
        <div className="self-end">
          <Tabs
            activeTab={activeTab}
            onChange={setActiveTab}
            tabs={[
              { label: "All", value: "all" },
              { label: "Upcoming", value: "upcoming" },
              { label: "Planning", value: "planning" },
              { label: "Completed", value: "completed" },
            ]}
          />
        </div>
      </div>

      {filteredTrips.length === 0 ? (
        <EmptyState
          title={t("noTripsFound")}
          description={query ? `${t("search")} "${query}"` : t("createFirstTrip")}
          actionLabel={t("createTrip")}
          onAction={() => navigate("/trips/new")}
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
}
