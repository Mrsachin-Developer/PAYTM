import { z } from "zod";

export const amountSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
});
