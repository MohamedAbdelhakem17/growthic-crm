"use client";

import CallCounter from "@/app/dashboard/@sales/_components/call-board/call-counter";
import { Button } from "@/components/ui/button";
import { Check, Copy, Phone, PhoneOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CopyPhoneNumber({
  phoneNumber = "1234567890",
  setIsCallEnding,
  isCallEnding,
}: {
  phoneNumber: string;
  setIsCallEnding: React.Dispatch<React.SetStateAction<boolean>>;
  isCallEnding: boolean;
}) {
  // State
  const [copied, setCopied] = useState(false);
  const [startTime, setStartTime] = useState<boolean>(false);

  // Functions
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);

      setCopied(true);
      toast.success("تم نسخ الرقم بنجاح");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error: unknown) {
      void error;
      toast.error("فشل نسخ الرقم");
    }
  };

  return (
    <div className="flex items-center justify-between flex-col gap-5 py-2">
      {/* Phone Number */}
      <div
        onClick={handleCopy}
        className="flex items-center gap-3  px-5 py-3 cursor-pointer transition-colors duration-150 group"
      >
        {copied ? (
          <Check className="text-green-500 shrink-0" size={20} />
        ) : (
          <Copy
            className="text-primary group-hover:text-primary-dark shrink-0 transition-colors"
            size={20}
          />
        )}
        <p className="font-bold text-xl tracking-widest">{phoneNumber}</p>
      </div>

      {/* Counter */}
      <CallCounter key={startTime ? "started" : "stopped"} start={startTime} />

      {/* Actions */}
      {/* Start Call */}
      {(!startTime || isCallEnding) && (
        <Button
          variant={"success"}
          className="w-50"
          size={"lg"}
          onClick={() => setStartTime(true)}
        >
          <Phone />
          بدء المكالمة
        </Button>
      )}

      {startTime && (
        <Button
          variant={"destructive"}
          className="w-50"
          size={"lg"}
          onClick={() => {
            setStartTime(false);
            setIsCallEnding(true);
          }}
        >
          <PhoneOff />
          أنهاء المكالمة
        </Button>
      )}
    </div>
  );
}
