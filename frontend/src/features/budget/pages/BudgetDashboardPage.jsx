import { useMemo, useState } from "react";
import { CreditCard, PiggyBank, Wallet } from "lucide-react";
import { BudgetAlerts } from "../components/BudgetAlerts";
import { BudgetSummary } from "../components/BudgetSummary";
import { DailyBudgetChart } from "../components/DailyBudgetChart";
import { ExpenseBreakdown } from "../components/ExpenseBreakdown";
import { MetricCard } from "@/shared/components/ui/MetricCard";
import { PageHeader } from "@/shared/components/ui/PageHeader";
import { Select } from "@/shared/components/ui/Select";
import { useTripContext } from "@/app/providers/TripContext";
import { useSettingsContext } from "@/app/providers/SettingsContext";

export default function BudgetDashboardPage() {
  const { trips } = useTripContext();
  const { t, formatCurrency } = useSettingsContext();
  const [selectedTripId, setSelectedTripId] = useState(trips[0]?.id || "all");

  const selectedTrip = trips.find((t) => t.id === selectedTripId);

  const metrics = useMemo(() => {
    if (selectedTrip) {
      const remaining = selectedTrip.budget - selectedTrip.spent;
      const spentPct = Math.round((selectedTrip.spent / selectedTrip.budget) * 100);
      return {
        budget: selectedTrip.budget,
        spent: selectedTrip.spent,
        remaining,
        spentPct,
      };
    }
    const budget = trips.reduce((s, tr) => s + tr.budget, 0);
    const spent = trips.reduce((s, tr) => s + tr.spent, 0);
    return {
      budget,
      spent,
      remaining: budget - spent,
      spentPct: budget > 0 ? Math.round((spent / budget) * 100) : 0,
    };
  }, [selectedTrip, trips]);

  return (
    <div className="mt-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader
          eyebrow={t("budgetAnalyticsEyebrow")}
          title={t("budgetTitle")}
          description={t("budgetDesc")}
        />
        <div className="w-full sm:w-56">
          <Select
            id="budget-trip-select"
            label={t("viewingBudgetFor")}
            value={selectedTripId}
            onChange={(e) => setSelectedTripId(e.target.value)}
          >
            <option value="all">{t("allTrips")}</option>
            {trips.map((tr) => (
              <option key={tr.id} value={tr.id}>
                {tr.title}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          icon={PiggyBank}
          label={t("totalBudget")}
          value={formatCurrency(metrics.budget)}
          delta={`${100 - metrics.spentPct}% remaining`}
        />
        <MetricCard
          icon={CreditCard}
          label={t("totalSpent")}
          value={formatCurrency(metrics.spent)}
          delta={`${metrics.spentPct}% of budget`}
        />
        <MetricCard
          icon={Wallet}
          label={t("remaining")}
          value={formatCurrency(metrics.remaining)}
          delta={metrics.remaining >= 0 ? "On track" : "Over budget!"}
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <BudgetSummary budget={metrics.budget} spent={metrics.spent} />
        <BudgetAlerts />
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <ExpenseBreakdown />
        <DailyBudgetChart />
      </div>
    </div>
  );
}
