import { z } from "zod";

export const createBankAccountSchema = z.object({
  bankName: z
    .string()
    .trim()
    .min(3, "Bank name must be at least 3 characters"),

  accountNumber: z
    .string()
    .trim()
    .regex(/^\d{9,18}$/, "Invalid account number"),

  ifscCode: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
});