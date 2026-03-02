import { Button } from "@/components/ui/button";
import CALL_RESULT from "@/lib/constant/call-result.constant";
import { CircleCheckBig, PhoneMissed, RotateCw, X } from "lucide-react";

export default function CallResult() {
  const callResult = [
    {
      label: "مؤهل",
      variant: "success",
      value: CALL_RESULT.QUALIFIED,
      Icon: <CircleCheckBig />,
    },
    {
      label: "غير مؤهل",
      variant: "soft-red",
      value: CALL_RESULT.DISQUALIFIED,
      Icon: <X />,
    },
    {
      label: "لم يتم الرد",
      variant: "warning",
      value: CALL_RESULT.NO_ANSWER,
      Icon: <PhoneMissed />,
    },
  ];

  return (
    <div className="space-y-4 p-3">
      {/* Labels */}
      <h2 className="text-lg font-semibold mb-2 text-center">نتيجة المكالمة</h2>

      {/* Actions */}
      {callResult.map((result) => {
        return (
          <Button
            key={result.value}
            variant={result.variant as "success" | "warning" | "soft-red"}
            className="w-full items-center flex-row-reverse gap-2"
          >
            {result.Icon}
            {result.label}
          </Button>
        );
      })}

      {/* Recall */}
      <Button
        variant="outline"
        className="w-full items-center flex-row-reverse gap-2"
      >
        <RotateCw />
        إعادة الاتصال
      </Button>
    </div>
  );
}
