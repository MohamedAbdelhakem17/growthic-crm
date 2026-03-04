import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserTimeWait } from "@/lib/utils/get-user-time-wait";
import {
  Clock,
  IdCard,
  LassoSelect,
  MapPin,
  MessageCircleMore,
  RectangleGoggles,
  Tag,
  User2,
} from "lucide-react";
import InfoContainer from "./info-container";

const now = Date.now();
const minsAgo = (m: number) => new Date(now - m * 60 * 1000).toISOString();

export default function ClientInfo() {
  const lead = {
    name: "سارة محمد",
    source: "جوجل",
    campaign: "الحملة ب - يناير",
    service: "الخدمة ب",
    submittedAt: minsAgo(2),
    location: "الفرع الرئيسي",
  };
  const { minutes } = getUserTimeWait(lead.submittedAt);
  return (
    <Card className="w-full h-full">
      {/* Header */}
      <CardHeader className="flex items-center justify-between border-b border-border pb-3">
        {/* Title */}
        <CardTitle className="flex items-center gap-2 text-lg font-bold">
          {/* Icon */}
          <span className="flex items-center justify-center bg-primary/10 rounded-lg p-1.5">
            <IdCard className="text-primary-dark" size={18} />
          </span>
          {/* Label */}
          <span>معلومات العميل</span>
        </CardTitle>

        {/* Tag */}
        <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
          جديد
        </Badge>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
        {/* Name */}
        <InfoContainer label="الاسم" value={lead.name} Icon={User2} />
        <InfoContainer label="المصدر" value={lead.source} Icon={LassoSelect} />
        <InfoContainer
          label="الحمله"
          value={lead.campaign}
          Icon={RectangleGoggles}
        />
        <InfoContainer label="الخدمة" value={lead.service} Icon={Tag} />
        <InfoContainer
          label="وقت الارسال"
          value={`${minutes} دقيقة`}
          Icon={Clock}
        />
        <InfoContainer label="الموقع" value={lead.location} Icon={MapPin} />

        <div className="flex items-center gap-2 text-sm text-green-700 col-span-full mt-1 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
          {/* Icon */}
          <MessageCircleMore size={15} />
          {/* Label */}
          <span>تم إرسال الرد التلقائي</span>
        </div>
      </CardContent>
    </Card>
  );
}
