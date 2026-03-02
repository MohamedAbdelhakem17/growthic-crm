"use client";

import { Field, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AddReasonSchema,
  AddReasonType,
} from "@/lib/schemas/add-reason.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function DisqualifiedForm() {
  const reasons = [
    "الميزانية غير جاهزة",
    "يحتاج موافقة صانع القرار",
    "الموقع غير مناسب",
    "ليس الوقت المناسب",
    "يتصفح فقط",
    "عميل حالي",
    "رقم خاطئ",
  ];

  const form = useForm<AddReasonType>({
    defaultValues: {
      reason: "",
    },
    resolver: zodResolver(AddReasonSchema),
  });

  const onSubmit: SubmitHandler<AddReasonType> = (data) => {
    alert("Selected reason: " + data.reason);
  };

  return (
    <form id="disqualified-form">
      <Controller
        name="reason"
        control={form.control}
        rules={{ required: "يرجى اختيار سبب الاستبعاد" }}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            {/* Select */}
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                form.handleSubmit(onSubmit)();
              }}
              dir="rtl"
            >
              <SelectTrigger
                id="disqualified-form-reason"
                aria-invalid={fieldState.invalid}
                className="w-full"
              >
                <SelectValue placeholder="اختر السبب..." />
              </SelectTrigger>

              <SelectContent position="popper">
                {reasons.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Error */}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </form>
  );
}
