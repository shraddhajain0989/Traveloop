import { Input } from "@/shared/components/ui/Input";

export function ActivityFilters({ query, setQuery }) {
  return (
    <Input
      id="activity-search"
      label="Search activities"
      onChange={(event) => setQuery(event.target.value)}
      placeholder="Food, hikes, museums..."
      value={query}
    />
  );
}

