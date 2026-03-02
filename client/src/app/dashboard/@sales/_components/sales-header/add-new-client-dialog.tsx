"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import AddNewClientForm from "./add-new-client-form";

export default function AddNewClientDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* OPen Dialog */}
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer " size={"sm"}>
          {/* Icon */}
          <Plus />
          {/* Label */}
          <span className=" text-xs"> أضافة عميل</span>
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent>
        {/* Header */}
        <DialogHeader className="border-b border-primary-dark/20">
          <DialogTitle className="flex items-center gap-2 py-4 px-2">
            {/* icon */}
            <UserRoundPlus className="text-primary-dark" strokeWidth={2.3} />
            {/* Label */}
            <span className="text-lg font-bold">أضافة عميل جديد</span>
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <AddNewClientForm
          closeModel={() => {
            setIsOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
