import SellerStatus from "@/app/dashboard/@sales/_components/sales-header/seller-status";
import { Button } from "@/components/ui/button";
import {
  ChartLine,
  LaptopMinimal,
  ListChecks,
  LogOut,
  MapPin,
} from "lucide-react";
import AddNewClientDialog from "./add-new-client-dialog";

export default function SalesHeader() {
  return (
    <header className="bg-white w-full border-b shadow-sm">
      <div className="px-4 sm:px-6 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Logo and user */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <h1 className="flex items-center gap-1.5 text-primary-dark font-bold text-base sm:text-lg border-e-2 border-primary-dark/20 pe-3">
              {/* icon */}
              <ChartLine strokeWidth={2.5} className="w-5 h-5" />
              {/* Label */}
              <span className="whitespace-nowrap">Growthic</span>
            </h1>

            {/* User */}
            <div className="flex items-center gap-1.5 text-primary-dark font-semibold">
              <LaptopMinimal className="w-4 h-4 sm:w-4 sm:h-4 text-muted-foreground" />
              <span className="text-xs sm:text-sm whitespace-nowrap">محمد</span>
            </div>

            {/* Location */}
            <span className="flex items-center gap-1.5 text-xs sm:text-sm bg-accent border border-border py-1 px-3 rounded-full whitespace-nowrap text-muted-foreground">
              {/* Icon */}
              <MapPin size={13} className="text-primary-dark" />
              {/* Label */}
              الفرع الرئيسى
            </span>
          </div>

          {/* Logout Action - Mobile */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer h-8 w-8"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Waiting clients */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-center">
          <span className="flex items-center gap-2 text-xs sm:text-sm bg-primary-dark text-white py-1.5 px-4 rounded-full font-medium">
            {/* Icon */}
            <ListChecks size={14} />
            {/* Label */}
            العملاء قيد الانتظار : 3
          </span>
        </div>

        {/* Actions - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {/* Add New Client */}
          <AddNewClientDialog />
          {/* User Status */}
          <SellerStatus />
          {/* Logout */}
          <Button
            variant="outline"
            className="cursor-pointer flex items-center gap-2 h-8"
            size="sm"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
