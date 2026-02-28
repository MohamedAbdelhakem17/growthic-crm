import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  ChartLine,
  LaptopMinimal,
  LogOut,
  MapPin,
} from "lucide-react";

export default function FrontDeskHeader() {
  // Variables
  const currentDate = new Date().toLocaleDateString("ar-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="bg-white w-full border-b">
      <div className="px-4 sm:px-6 py-3 sm:py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Log and user */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-2.5">
            {/* Logo */}
            <h1 className="flex items-center gap-1.5 text-primary-dark font-bold text-base sm:text-lg border-e-2 border-primary-dark/20 pe-4">
              {/* icon */}
              <ChartLine strokeWidth={3} className="w-5 h-5" />
              {/* Label */}
              <span className="whitespace-nowrap">Growthic</span>
            </h1>

            {/* User and Location */}
            <h2 className="flex items-center gap-2 text-primary-dark font-bold">
              <LaptopMinimal className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm whitespace-nowrap">
                فاطمة
              </span>
            </h2>
          </div>

          {/* Logout Action - Mobile */}
          <div className="md:hidden">
            <Button variant="outline" size="icon" className="cursor-pointer">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Location and Date */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-center">
          {/* Location */}
          <p className="flex items-center gap-2 text-xs sm:text-sm bg-accent py-1 px-3 sm:px-4 rounded-full whitespace-nowrap">
            {/* Icon */}
            <MapPin size={15} />
            {/* Label */}
            <span>الفرع الرئيسى</span>
          </p>

          {/* Date */}
          <p className="flex items-center gap-2 text-xs sm:text-sm bg-accent py-1 px-3 sm:px-4 rounded-full">
            {/* Icon */}
            <CalendarDays size={15} />
            {/* Label */}
            <span>{currentDate}</span>
          </p>
        </div>

        {/* Logout Action - Desktop */}
        <div className="hidden md:block">
          <Button
            variant="outline"
            className="cursor-pointer flex items-center gap-2"
            size="sm"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
