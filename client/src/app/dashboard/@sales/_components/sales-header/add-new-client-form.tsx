"use client";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import {
  AddNewClientSchema,
  AddNewClientType,
} from "@/lib/schemas/add-new-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function AddNewClientForm({
  closeModel,
}: {
  closeModel: () => void;
}) {
  // Form And Validation
  const form = useForm<AddNewClientType>({
    defaultValues: {
      full_name: "",
      service: "",
      phone: "",
      location: "",
      comment: "",
      source: "call",
    },
    resolver: zodResolver(AddNewClientSchema),
  });

  // Function
  const onSubmit: SubmitHandler<AddNewClientType> = (payload) => {
    console.log(payload);
    closeModel();
  };

  // Variables
  const { isSubmitted, isValid } = form.formState;
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
      id="new-client-form"
    >
      {/* Full Name */}
      <Controller
        name="full_name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            {/* Label */}
            <FieldLabel htmlFor="new-client-form-full-name">
              الاسم الكامل
            </FieldLabel>

            {/* Input */}
            <Input
              {...field}
              id="new-client-form-full-name"
              aria-invalid={fieldState.invalid}
              placeholder="أدخل اسم العميل الكامل"
              autoComplete="off"
            />

            {/* Error */}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Phone */}
      <Controller
        name="phone"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            {/* Label */}
            <FieldLabel htmlFor="new-client-form-phone">رقم الهاتف</FieldLabel>

            {/* Input */}
            <Input
              {...field}
              id="new-client-form-phone"
              aria-invalid={fieldState.invalid}
              placeholder="أدخل رقم هاتف العميل"
              autoComplete="tel"
            />

            {/* Error */}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Service */}
      <Controller
        name="service"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            {/* Label */}
            <FieldLabel htmlFor="new-client-form-service">الخدمة</FieldLabel>

            {/* Select */}
            <Select
              value={field.value}
              onValueChange={field.onChange}
              dir="rtl"
            >
              <SelectTrigger
                id="new-client-form-service"
                aria-invalid={fieldState.invalid}
                className="w-full"
              >
                <SelectValue placeholder="اختر الخدمة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consultation">استشارة</SelectItem>
                <SelectItem value="treatment">علاج</SelectItem>
                <SelectItem value="checkup">كشف</SelectItem>
                <SelectItem value="surgery">عملية جراحية</SelectItem>
                <SelectItem value="followup">متابعة</SelectItem>
              </SelectContent>
            </Select>

            {/* Error */}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Location */}
      <Controller
        name="location"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            {/* Label */}
            <FieldLabel htmlFor="new-client-form-location">الموقع</FieldLabel>

            {/* Select */}
            <Select
              value={field.value}
              onValueChange={field.onChange}
              dir="rtl"
            >
              <SelectTrigger
                id="new-client-form-location"
                aria-invalid={fieldState.invalid}
                className="w-full"
              >
                <SelectValue placeholder="اختر الموقع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="riyadh">الرياض</SelectItem>
                <SelectItem value="jeddah">جدة</SelectItem>
                <SelectItem value="dammam">الدمام</SelectItem>
                <SelectItem value="mecca">مكة المكرمة</SelectItem>
                <SelectItem value="medina">المدينة المنورة</SelectItem>
                <SelectItem value="taif">الطائف</SelectItem>
              </SelectContent>
            </Select>

            {/* Error */}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Comment */}
      <Controller
        name="comment"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            {/* Label */}
            <FieldLabel htmlFor="new-client-form-comment">ملاحظات</FieldLabel>

            {/* Textarea */}
            <Textarea
              {...field}
              id="new-client-form-comment"
              aria-invalid={fieldState.invalid}
              placeholder="أدخل أي ملاحظات إضافية عن العميل"
              rows={5}
            />

            {/* Error */}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Action */}
      <DialogFooter className="sm:justify-start">
        {/* Submit  */}
        <Button type="submit" size={"lg"} disabled={isSubmitted && !isValid}>
          أضافة العميل
        </Button>
        {/* Close Action */}
        <DialogClose asChild>
          <Button type="button" variant={"outline"} size={"lg"}>
            الغاء
          </Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
}
