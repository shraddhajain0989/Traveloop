import { z } from "zod";

export const createTripSchema = z.object({
  title: z.string().min(3, "Trip name must be at least 3 characters."),
  cities: z.string().min(2, "Add at least one destination."),
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string().min(1, "End date is required."),
  budget: z.coerce.number().min(100, "Budget must be at least 100."),
});

