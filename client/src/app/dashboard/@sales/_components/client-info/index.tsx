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
    submittedAt: minsAgo(2), // وقت الإرسال
    location: "الفرع الرئيسي",
  };
  const { minutes } = getUserTimeWait(lead.submittedAt);
  return (
    <Card className="w-full h-full">
      {/* Header */}
      <CardHeader className="flex items-center  justify-between border-b border-primary-dark/10">
        {/* Title */}
        <CardTitle className="flex items-center gap-x-1 text-xl font-bold">
          {/* Icon */}
          <IdCard className="text-primary-dark" />
          {/* Label */}
          <span>معلومات العميل</span>
        </CardTitle>

        {/* Tag */}
        <Badge>جديد</Badge>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <p className="flex items-center gap-2 text-sm text-green-600 col-span-full mt-2">
          {/* Icon */}
          <MessageCircleMore size={16} />
          {/* Label */}
          <span>تم إرسال الرد التلقائي</span>
        </p>
      </CardContent>
    </Card>
  );
}
