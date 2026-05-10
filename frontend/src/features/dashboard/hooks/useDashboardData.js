import { budgetCategories, dailySpend, trips } from "@/shared/data/traveloopData";

export function useDashboardData() {
  return { budgetCategories, dailySpend, trips, isLoading: false, error: null };
}

