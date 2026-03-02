import NotesForm from "@/app/dashboard/@sales/_components/seller-notes/notes-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotebookPen } from "lucide-react";
import NotesMessages from "./notes-messages";

export default function SellerNotes() {
  return (
    <Card className="w-full h-full col-span-full">
      {/* Header */}
      <CardHeader className=" border-b border-primary-dark/20">
        {/* Title */}
        <CardTitle className="flex items-center gap-x-1 text-xl font-bold">
          {/* Icon */}
          <NotebookPen className="text-primary-dark" />
          {/* Label */}
          <span> الملاحظات</span>
        </CardTitle>
      </CardHeader>
      {/*  content */}
      <CardContent>
        {/* Form */}
        <NotesForm />

        {/* Notes  */}
        <NotesMessages />
      </CardContent>
    </Card>
  );
}
