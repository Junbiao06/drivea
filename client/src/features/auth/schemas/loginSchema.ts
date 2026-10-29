import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[A-Za-z]/, "Password must contain at least one English letter.")
    .regex(/[0-9]/, "Password must contain at least one number."),
});

export type LoginInput = z.infer<typeof loginSchema>;
