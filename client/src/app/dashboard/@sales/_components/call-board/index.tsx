"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CALL_RESULT from "@/lib/constant/call-result.constant";
import { Phone } from "lucide-react";
import { useState } from "react";
import CallResult from "./call-result";
import DisqualifiedForm from "./disqualified-form";
import StartCall from "./start-call";

export default function CallBoard() {
  const [isCallEnding, setIsCallEnding] = useState(false);
  const [callResult, setCallResult] = useState("");

  return (
    <Card className="w-full h-full">
      {/* Header */}
      <CardHeader className="border-b border-border pb-3">
        {/* Title */}
        <CardTitle className="flex items-center gap-2 text-lg font-bold">
          {/* Icon */}
          <span className="flex items-center justify-center bg-primary/10 rounded-lg p-1.5">
            <Phone className="text-primary-dark" size={18} />
          </span>
          {/* Label */}
          <span> لوحة الاتصال</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <StartCall
          phoneNumber="01009474420"
          setIsCallEnding={setIsCallEnding}
          isCallEnding={isCallEnding}
        />
        {isCallEnding && (
          <CallResult
            setCallResult={setCallResult}
            setIsCallEnding={setIsCallEnding}
          />
        )}

        {callResult === CALL_RESULT.DISQUALIFIED && <DisqualifiedForm />}
      </CardContent>
    </Card>
  );
}
