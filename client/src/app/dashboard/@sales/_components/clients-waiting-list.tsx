import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import { getUserTimeWait } from "@/lib/utils/get-user-time-wait";
import { Clock, Tag, Users } from "lucide-react";

const variantClassMap: Record<string, string> = {
  success: " text-green-700 ",
  warning: " text-amber-700 ",
  destructive: " text-red-700  ",
};

export default function ClientsWaitingList({
  clients,
}: {
  clients: {
    name: string;
    service: string;
    phone: string;
    createdAt: string;
  }[];
}) {
  return (
    <aside className="bg-white shadow py-4  max-w-87.5 w-full max-h-100 mx-auto lg:min-h-full overflow-y-scroll lg:overflow-y-auto">
      {/* Header */}
      <h2 className="flex items-center gap-2.5 text-xl font-bold  p-4 ">
        {/* Icon */}
        <Users className="text-primary-dark" size={28} strokeWidth={3} />
        {/* Label */}
        قائمة الانتظار
        <span className="text-sm text-muted-foreground mr-2">
          ({clients.length} عميل)
        </span>
      </h2>

      {/* User List  */}
      <div className="py-2 lg:space-y-6 space-y-1">
        {clients.length > 0 ? (
          clients.map((client, index) => {
            const { minutes, variant } = getUserTimeWait(client.createdAt);
            return (
              <div
                key={index}
                className="flex flex-col gap-1 p-3  border-y border-primary-dark/20"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="space-y-2 space-x-3.5">
                    {/* User Name */}
                    <p className="text-sm font-medium">{client.name}</p>
                    {/* Service */}
                    <p className="text-sm text-muted-foreground inline-flex items-center gap-1">
                      <Tag size={14} />
                      {client.service}
                    </p>
                    <p className="text-sm text-muted-foreground inline-flex items-center gap-1">
                      <Clock size={14} />
                      منذ {minutes} دقيقة
                    </p>
                  </div>

                  {/* Wait time badge */}
                  <Badge
                    className={cn(
                      "gap-1 bg-transparent",
                      variantClassMap[variant],
                    )}
                  >
                    <span className="size-1.5 rounded-full bg-current" />
                  </Badge>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-sm text-muted-foreground py-10">
            لا يوجد عملاء في قائمة الانتظار
          </div>
        )}
      </div>
    </aside>
  );
}
