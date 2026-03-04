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
    <aside className="bg-white border-e border-border w-full max-w-87.5 mx-auto h-full overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 pt-4 pb-3 border-b border-border">
        <h2 className="flex items-center gap-2.5 text-lg font-bold">
          <span className="flex items-center justify-center bg-primary/10 rounded-lg p-1.5">
            <Users className="text-primary-dark" size={20} strokeWidth={2.5} />
          </span>
          قائمة الانتظار
          <span className="mr-auto text-xs font-medium text-muted-foreground bg-accent px-2 py-1 rounded-full">
            {clients.length} عميل
          </span>
        </h2>
      </div>

      {/* User List  */}
      <div className="flex-1 divide-y divide-border/60">
        {clients.length > 0 ? (
          clients.map((client, index) => {
            const { minutes, variant } = getUserTimeWait(client.createdAt);
            return (
              <div
                key={index}
                className="flex items-center justify-between gap-2 px-4 py-2.5 hover:bg-accent/40 transition-colors duration-150 cursor-pointer"
              >
                <div className="flex flex-col gap-1 min-w-0">
                  {/* User Name */}
                  <p className="text-lg font-semibold truncate">
                    {client.name}
                  </p>
                  {/* Service */}
                  <p className="text-xs text-muted-foreground inline-flex items-center gap-1">
                    <Tag size={11} />
                    {client.service}
                  </p>
                  <p className="text-xs text-muted-foreground inline-flex items-center gap-1">
                    <Clock size={11} />
                    منذ {minutes} دقيقة
                  </p>
                </div>

                {/* Wait time badge */}
                <Badge
                  className={cn(
                    "gap-1.5 bg-transparent shrink-0 border px-2 py-1 rounded-full",
                    variantClassMap[variant],
                  )}
                >
                  <span className="size-2 rounded-full bg-current" />
                </Badge>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
            <Users size={36} className="opacity-20" />
            <p className="text-sm">لا يوجد عملاء في قائمة الانتظار</p>
          </div>
        )}
      </div>
    </aside>
  );
}
