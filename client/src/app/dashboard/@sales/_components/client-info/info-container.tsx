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
    <div className="col-span-1 border border-border rounded-lg p-3 bg-accent/30 hover:bg-accent/60 transition-colors duration-150">
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mb-1.5">
        {/* Icon */}
        <Icon size={13} className="text-primary-dark" strokeWidth={2.5} />
        <span>{label}</span>
      </p>
      <p className="text-sm font-bold text-foreground">{value}</p>
    </div>
  );
}
