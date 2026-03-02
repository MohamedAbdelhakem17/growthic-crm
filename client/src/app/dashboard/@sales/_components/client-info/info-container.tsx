import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export default function InfoContainer({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}) {
  return (
    <div className="space-y-1 col-span-1 border-y rounded-md p-2 border-primary-dark/40">
      <p className=" flex items-center gap-2 text-sm text-muted-foreground font-medium">
        {/* Icon */}
        <Icon size={14} className="text-primary-dark" strokeWidth={4} />
        <span>{label}</span>
      </p>
      <p className="text-md font-bold">{value}</p>
    </div>
  );
}
