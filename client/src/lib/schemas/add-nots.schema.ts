import * as z from "zod";

export const AddNotsSchema = z.object({
  note: z
    .string()
    .min(
      20,
      "الملاحظة لا يمكن أن تكون فارغة ويجب أن تحتوي على 20 حرف على الأقل",
    ),
});

export type AddNotsType = z.infer<typeof AddNotsSchema>;
