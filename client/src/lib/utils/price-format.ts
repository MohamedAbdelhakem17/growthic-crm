// Format a number as a price with optional thousands separator and currency
export function formatPrice(
  value: number | string,
  options?: {
    currency?: string;
    locale?: string;
    egpLabel?: boolean;
    useGrouping?: boolean; // NEW
  },
): string {
  const num = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(num)) return "0.00";

  const locale = options?.locale || "ar-EG";
  const currency = options?.currency;
  const useGrouping = options?.useGrouping ?? false;

  let formatted = "";

  if (currency) {
    formatted = num.toLocaleString(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping,
    });
  } else {
    formatted = num.toLocaleString(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping,
    });
  }

  if (options?.egpLabel) {
    formatted = `${formatted} ج.م`;
  }

  return formatted;
}
