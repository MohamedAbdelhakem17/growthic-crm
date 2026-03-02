import * as z from "zod";

export const AddNewClientSchema = z.object({
  full_name: z.string().min(1, "الاسم الكامل مطلوب"),
  service: z.string().min(1, "الخدمة مطلوبة"),
  phone: z.string().min(1, "رقم الهاتف مطلوب"),
  location: z.string().min(1, "الموقع مطلوب"),
  comment: z.string().optional(),
  source: z.string().optional(),
});

export type AddNewClientType = z.infer<typeof AddNewClientSchema>;
