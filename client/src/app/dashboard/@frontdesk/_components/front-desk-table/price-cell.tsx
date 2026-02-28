"use client";
import { Input } from "@/components/ui/input";
import { TableCell } from "@/components/ui/table";
import { useState } from "react";

type PriceCellProps = {
  price: number | null;
  onChange?: (value: number | null) => void;
  currency?: string;
};

export default function PriceCell({
  price,
  onChange,
  currency = "جنيه",
}: PriceCellProps) {
  const [localPrice, setLocalPrice] = useState<number | null>(price);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsed = value === "" ? null : Number(value);

    setLocalPrice(parsed);
    onChange?.(parsed);
  };

  const formattedPrice =
    localPrice !== null ? new Intl.NumberFormat("ar-EG").format(localPrice) : 0;

  return (
    <TableCell>
      {price !== 0 ? (
        <span className="font-bold text-green-600">
          {formattedPrice} {currency}
        </span>
      ) : (
        <Input
          type="number"
          placeholder="أدخل السعر"
          className="w-28 text-center"
          value={localPrice ?? ""}
          onChange={handleChange}
          min={0}
        />
      )}
    </TableCell>
  );
}
