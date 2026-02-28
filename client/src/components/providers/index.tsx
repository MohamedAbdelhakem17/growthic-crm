import React from "react";
import { Toaster } from "sonner";
import QueryProvider from "./query-client-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Toaster */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 1000,
          style: {
            fontSize: "14px",
            padding: "12px 16px",
          },
        }}
      />
      {/* React Query */}
      <QueryProvider>{children}</QueryProvider>
    </>
  );
}
