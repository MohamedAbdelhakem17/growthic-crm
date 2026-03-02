"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone } from "lucide-react";
import CallResult from "./call-result";
import DisqualifiedForm from "./disqualified-form";

export default function CallBoard() {
  return (
    <Card className="w-full h-full">
      {/* Header */}
      <CardHeader className=" border-b border-primary-dark/20">
        {/* Title */}
        <CardTitle className="flex items-center gap-x-1 text-xl font-bold">
          {/* Icon */}
          <Phone className="text-primary-dark" />
          {/* Label */}
          <span> لوحة الاتصال</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p>Card Content</p>
        <CallResult />
        <DisqualifiedForm />
      </CardContent>
    </Card>
  );
}
