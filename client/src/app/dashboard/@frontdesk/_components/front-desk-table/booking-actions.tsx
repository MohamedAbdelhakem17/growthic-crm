"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  BOOKING_STATUS,
  BookingStatusType,
} from "@/lib/constant/booking-status.constant";

import getStatusLabel from "@/lib/utils/get-status-label";

import { BookmarkX, UserCheck, UserX } from "lucide-react";

const statusIconMap: Record<BookingStatusType, React.ElementType | null> = {
  [BOOKING_STATUS.CONFIRMED]: UserCheck,
  [BOOKING_STATUS.NOT_COMMENCED]: UserX,
  [BOOKING_STATUS.CANCELLED]: BookmarkX,
  [BOOKING_STATUS.PENDING]: null,
};

export default function BookingActions({
  status,
}: {
  status: BookingStatusType;
}) {
  const handleChangeStatus = (newStatus: BookingStatusType) => {
    console.log(`Changing status to: ${newStatus}`);
  };

  const { label, variant } = getStatusLabel(status);

  const actions = Object.values(BOOKING_STATUS)
    .filter((value) => value !== BOOKING_STATUS.PENDING)
    .map((value) => ({
      value,
      ...getStatusLabel(value),
      Icon: statusIconMap[value],
    }));

  return (
    <>
      {status === BOOKING_STATUS.PENDING ? (
        actions.map(({ value, label, variant, Icon }) => (
          <Button
            key={value}
            variant={variant}
            size="sm"
            onClick={() => handleChangeStatus(value)}
            className="inline-flex items-center gap-2 mx-2 cursor-pointer"
          >
            {Icon && <Icon className="w-4 h-4" />}
            {label}
          </Button>
        ))
      ) : (
        <Badge variant={variant} className="px-3 py-1.5">
          {label}
        </Badge>
      )}
    </>
  );
}
