const BOOKING_STATUS = {
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  PENDING: "pending",
  NOT_COMMENCED: "not_commenced",
} as const;

export type BookingStatusType =
  (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];

export { BOOKING_STATUS };
