import SYSTEM_ROLES from "@/lib/constant/system-roles.constant";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  role: z.enum([...Object.values(SYSTEM_ROLES)] as [string, ...string[]], {
    message: "الدور غير صالح",
  }),
});

type LoginValuesType = z.infer<typeof loginSchema>;

export { loginSchema, type LoginValuesType };
