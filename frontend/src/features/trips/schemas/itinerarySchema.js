import { z } from "zod";

export const itinerarySchema = z.object({
  city: z.string().min(2),
  date: z.string().min(1),
  activities: z.array(z.string()).default([]),
});

