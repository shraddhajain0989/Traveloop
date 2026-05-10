export function calculateBudgetUsage(spent, budget) {
  return Math.round((spent / budget) * 100);
}

