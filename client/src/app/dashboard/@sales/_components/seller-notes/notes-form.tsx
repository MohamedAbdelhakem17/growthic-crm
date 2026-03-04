"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { AddNotsSchema, AddNotsType } from "@/lib/schemas/add-nots.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function NotesForm() {
  // Form and validations
  const form = useForm<AddNotsType>({
    defaultValues: {
      note: "",
    },
    resolver: zodResolver(AddNotsSchema),
  });

  // Functions
  const onSubmit: SubmitHandler<AddNotsType> = (payload) => {
    console.log(payload);
  };

  // Variables
  const { isSubmitted, isValid } = form.formState;
  return (
    <form
      className="w-full"
      id="notes-form"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {/* Note */}
      <Controller
        name="note"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            {/* Textarea */}
            <Textarea
              {...field}
              id="notes-form-note"
              aria-invalid={fieldState.invalid}
              placeholder="أكتب ملاحظتك هنا"
              className="bg-accent/50 border-border py-3 px-4 rounded-xl focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-background resize-none"
              rows={4}
            />

            {/* Error */}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Action */}
      <Button
        type="submit"
        size={"lg"}
        className="mt-3 mb-5 flex items-center gap-2"
        disabled={isSubmitted && !isValid}
      >
        <Save size={16} />
        إضافة الملاحظة
      </Button>
    </form>
  );
}
