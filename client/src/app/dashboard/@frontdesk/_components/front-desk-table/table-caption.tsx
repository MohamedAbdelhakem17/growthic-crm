"use client";

import { BanknoteArrowUp } from "lucide-react";
import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";

import {
  BOOKING_STATUS,
  BookingStatusType,
} from "@/lib/constant/booking-status.constant";

import getStatusLabel from "@/lib/utils/get-status-label";
import { formatPrice } from "@/lib/utils/price-format";

interface Appointment {
  price?: number;
  status: BookingStatusType;
}

export default function TableCaption({
  appointments,
}: {
  appointments: Appointment[];
}) {
  /**
   * Memoized calculations
   */
  const { totalRevenue, statusCounts } = useMemo(() => {
    let revenue = 0;

    const counts: Record<BookingStatusType, number> = {
      [BOOKING_STATUS.CONFIRMED]: 0,
      [BOOKING_STATUS.CANCELLED]: 0,
      [BOOKING_STATUS.PENDING]: 0,
      [BOOKING_STATUS.NOT_COMMENCED]: 0,
    };

    appointments.forEach((appointment) => {
      revenue += appointment.price ?? 0;

      if (counts[appointment.status] !== undefined) {
        counts[appointment.status]++;
      }
    });

    return {
      totalRevenue: revenue,
      statusCounts: Object.entries(counts).map(([status, count]) => ({
        status: status as BookingStatusType,
        count,
      })),
    };
  }, [appointments]);

  return (
    <section className="border-t border-primary-dark/20 pt-4">
      {/* Status Badges */}
      <div className="flex flex-wrap gap-3 items-center justify-center">
        {statusCounts.map(({ status, count }) => {
          const { label, variant } = getStatusLabel(status);

          if (!count) return null;

          return (
            <Badge
              size={"lg"}
              key={status}
              variant={variant}
              className="px-3 py-1.5"
            >
              {label} ({count})
            </Badge>
          );
        })}
      </div>

      {/* Total Revenue */}
      <div className="flex items-center justify-center py-2 px-4 gap-3 bg-linear-to-r from-primary-light via-primary to-primary-dark/80 text-white rounded-4xl mt-4">
        <BanknoteArrowUp />

        <span className="text-lg">أيرادات اليوم</span>

        <span className="font-bold text-xl">
          {formatPrice(totalRevenue, {
            egpLabel: true,
          })}
        </span>
      </div>
    </section>
  );
}
