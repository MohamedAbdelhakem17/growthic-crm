"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";

import SYSTEM_ROLES from "@/lib/constant/system-roles.constant";
import { loginSchema, LoginValuesType } from "@/lib/schemas/login.schema";
import { LockKeyhole, Mail, UserKey } from "lucide-react";

export default function LoginForm() {
  const form = useForm<LoginValuesType>({
    defaultValues: {
      email: "",
      password: "",
      role: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginValuesType> = (data: {
    email: string;
    password: string;
    role: string;
  }) => {
    console.log(data);
  };

  // Variables
  const userRolesIOptions = [
    { value: SYSTEM_ROLES.MANAGER, label: "مدير المبيعات" },
    { value: SYSTEM_ROLES.SALES, label: "موظف المبيعات" },
    { value: SYSTEM_ROLES.FRONT_DESK, label: "مكتب الاستقبال" },
  ];

  const { isValid, isSubmitted } = form.formState;

  return (
    <form
      id="login"
      className="max-w-lg bg-white p-8 space-y-3 rounded-2xl shadow-2xl text-start mx-auto"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {/* Email */}
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-title" Icon={Mail}>
                البريد الإلكتروني
              </FieldLabel>
              <Input
                {...field}
                id="login-title"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="user@example.com"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/*   Password */}
      <FieldGroup>
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-password" Icon={LockKeyhole}>
                {" "}
                كلمة المرور
              </FieldLabel>
              <Input
                {...field}
                id="login-password"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="********"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Role */}
      <Controller
        name="role"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field orientation="responsive" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="login-role " Icon={UserKey}>
              الدور
            </FieldLabel>

            <Select
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
              dir="rtl"
            >
              <SelectTrigger
                id="login-select-role"
                aria-invalid={fieldState.invalid}
                className="min-w-full"
              >
                <SelectValue placeholder="أختار الدور" />
              </SelectTrigger>
              <SelectContent position="popper">
                {userRolesIOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Login */}
      <Button
        type="submit"
        className="w-full cursor-pointer"
        disabled={!isValid && isSubmitted}
      >
        تسجيل الدخول
      </Button>
    </form>
  );
}
