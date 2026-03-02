import * as z from "zod";

export const AddReasonSchema = z.object({
  reason: z.string().min(1, "السبب مطلوب"),
});

export type AddReasonType = z.infer<typeof AddReasonSchema>;
