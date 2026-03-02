"use client";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SELLER_STATUS from "@/lib/constant/seller-status.constant";
import { cn } from "@/lib/utils/cn";
import { useState } from "react";

const variantClassMap: Record<string, string> = {
  success: "bg-green-100 text-green-700 border-green-200",
  destructive: "bg-red-100 text-red-700 border-red-200",
  warning: "bg-amber-100 text-amber-700 border-amber-200",
};

export default function SellerStatus() {
  const [status, setStatus] = useState(SELLER_STATUS[0].value);

  const current = SELLER_STATUS.find((s) => s.value === status)!;

  return (
    <div className="flex items-center gap-2">
      {/* Status Select */}
      <Select value={status} onValueChange={setStatus} dir="rtl">
        {/* Trigger */}
        <SelectTrigger
          size="sm"
          className=" h-8 w-fit px-0 py-0 border-0 bg-transparent shadow-none focus:outline-none focus:border-0 focus:ring-0 focus:ring-offset-0 data-[state=open]:ring-0 data-[state=open]:border-0 data-[state=open]:shadow-none"
        >
          <SelectValue asChild>
            <Badge
              className={cn(
                "cursor-pointer gap-2",
                variantClassMap[current.variant],
              )}
            >
              {/* dot status */}
              <span className="size-1.5 rounded-full bg-current" />

              {/* label */}
              {current.label}
            </Badge>
          </SelectValue>
        </SelectTrigger>

        {/* Content */}
        <SelectContent position="popper">
          {SELLER_STATUS.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "size-2 rounded-full",
                    s.variant === "success" && "bg-green-500",
                    s.variant === "destructive" && "bg-red-500",
                    s.variant === "warning" && "bg-amber-500",
                  )}
                />
                {s.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
