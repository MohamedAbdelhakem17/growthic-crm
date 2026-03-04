import NotesForm from "@/app/dashboard/@sales/_components/seller-notes/notes-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotebookPen } from "lucide-react";
import NotesMessages from "./notes-messages";

export default function SellerNotes() {
  return (
    <Card className="w-full h-full col-span-full">
      {/* Header */}
      <CardHeader className="border-b border-border pb-3">
        {/* Title */}
        <CardTitle className="flex items-center gap-2 text-lg font-bold">
          {/* Icon */}
          <span className="flex items-center justify-center bg-primary/10 rounded-lg p-1.5">
            <NotebookPen className="text-primary-dark" size={18} />
          </span>
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
