import {
  BOOKING_STATUS,
  BookingStatusType,
} from "@/lib/constant/booking-status.constant";

export default function getStatusLabel(status: BookingStatusType): {
  label: string;
  variant: "default" | "outline" | "destructive";
} {
  const label: {
    label: string;
    variant: "default" | "outline" | "destructive";
  } = {
    label: "",
    variant: "default",
  };

  switch (status) {
    case BOOKING_STATUS.CONFIRMED:
      return {
        label: "حضر",
        variant: "default",
      };
    case BOOKING_STATUS.NOT_COMMENCED:
      return {
        label: "لم يحضر",
        variant: "outline",
      };
    case BOOKING_STATUS.CANCELLED:
      return {
        label: "ألغى",
        variant: "destructive",
      };
    case BOOKING_STATUS.PENDING:
      return {
        label: "قيد الانتظار",
        variant: "default",
      };
    default:
      return label;
  }
}
