"use client";
import { TableHead } from "@/components/ui/table";
import { Clock9, ListTodo, PoundSterling, Tag, User } from "lucide-react";

export default function TableHeaders() {
  const tableHeaders = [
    { Icon: Clock9, label: "الوقت" },
    { Icon: User, label: "اسم العميل" },
    { Icon: Tag, label: "الخدمة" },
    { Icon: PoundSterling, label: "المبلغ المدفوع" },
    { Icon: ListTodo, label: "الحالة" },
  ];

  return (
    <>
      {tableHeaders.map((header) => (
        <TableHead key={header.label}>
          <div className="flex items-center gap-2">
            <header.Icon className="w-4 h-4" />
            {header.label}
          </div>
        </TableHead>
      ))}
    </>
  );
}
