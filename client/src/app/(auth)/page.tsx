import { ChartLine } from "lucide-react";
import LoginForm from "./_components/login-form";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Growthic CRM",
  description: "Login to Growthic CRM to manage your customer relationships.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-main-foreground text-center px-2 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl flex flex-col items-center gap-2">
        {/* Icon*/}
        <ChartLine className="text-primary-dark" size={80} strokeWidth={2.75} />

        {/* Title */}
        <h1 className="font-bold text-2xl sm:text-3xl text-primary-dark py-3 sm:py-2">
          Growthic CRM Pro
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-base sm:text-lg mb-4 sm:mb-8">
          نظام إدارة العملاء المحتملين الذكي
        </p>

        {/* Login form */}
        <div className="w-full">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
