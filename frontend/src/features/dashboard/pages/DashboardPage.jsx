import { BudgetInsights } from "../components/BudgetInsights";
import { PopularDestinations } from "../components/PopularDestinations";
import { RecentActivities } from "../components/RecentActivities";
import { StatsOverview } from "../components/StatsOverview";
import { UpcomingTrips } from "../components/UpcomingTrips";
import { WelcomeBanner } from "../components/WelcomeBanner";

export default function DashboardPage() {
  return (
    <div className="mt-6 space-y-8">
      <WelcomeBanner />
      <StatsOverview />
      <UpcomingTrips />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <BudgetInsights />
        <div className="space-y-6">
          <PopularDestinations />
          <RecentActivities />
        </div>
      </div>
    </div>
  );
}
