import { z } from "zod";

export const sendMoneySchema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/),
  amount: z.number().positive("Amount must be greater than 0"),
});
