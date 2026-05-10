import { z } from "zod";
import { validationMessages } from "@/shared/constants/validationMessages";

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().min(1, validationMessages.required).email(validationMessages.email),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, validationMessages.password),
});

