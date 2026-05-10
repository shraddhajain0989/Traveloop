import { z } from "zod";

export const destinationSchema = z.object({
  city: z.string().min(2),
  country: z.string().min(2),
  nights: z.coerce.number().min(1),
});

