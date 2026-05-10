import { z } from "zod";
import { validationMessages } from "@/shared/constants/validationMessages";

export const loginSchema = z.object({
  email: z.string().min(1, validationMessages.required).email(validationMessages.email),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

