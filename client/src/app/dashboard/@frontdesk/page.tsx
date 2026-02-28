import { CalendarCheck } from "lucide-react";
import FrontDeskHeader from "./_components/front-desk-header";
import FrontDeskTable from "./_components/front-desk-table";

export default function FrontDeskPage() {
  return (
    <main className="flex items-center justify-center min-h-screen flex-col gap-4">
      {/* Header */}
      <FrontDeskHeader />

      {/* Content */}
      <section className="flex-1  w-full md:max-w-7xl lg:max-w-5xl flex items-center justify-center ">
        <div className="container mx-auto bg-white rounded-md shadow-md p-6 ">
          {/* Header */}
          <h2 className="flex items-center gap-1.5 mb-4 border-b pb-4 border-primary-dark/20 ">
            {/* Icon */}
            <CalendarCheck className="size-6 text-primary-dark" />
            {/* Label */}
            <span className="text-primary-dark font-bold text-lg">
              مواعيد اليوم
            </span>
          </h2>

          {/* Table */}
          <FrontDeskTable />
        </div>
      </section>
    </main>
  );
}
