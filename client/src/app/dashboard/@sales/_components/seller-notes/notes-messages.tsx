import { MessageCircle, User } from "lucide-react";

type Note = {
  date: string; // ISO string
  message?: string;
  employee?: string;
};

const notes: Note[] = [
  {
    date: "2026-03-02T09:15:00Z",
    message: "تم التواصل مع العميل وحجز موعد يوم الخميس القادم",
    employee: "أحمد حسن",
  },
  {
    date: "2026-03-02T10:30:00Z",
    message: "العميل طلب تأجيل الموعد لظروف خاصة",
    employee: "سارة محمد",
  },
  {
    date: "2026-03-02T11:45:00Z",
    message: "تم إعادة الاتصال وتأكيد الموعد الجديد يوم السبت",
    employee: "أحمد حسن",
  },
  {
    date: "2026-03-02T13:20:00Z",
    message: "العميل أبدى اهتمام بالعروض الإضافية",
    employee: "محمد علي",
  },
  {
    date: "2026-03-02T14:00:00Z",
  }, // No response
  {
    date: "2026-03-02T15:10:00Z",
    message: "تم إرسال تفاصيل العرض عبر الواتساب",
    employee: "سارة محمد",
  },
  {
    date: "2026-03-02T16:30:00Z",
    message: "العميل يحتاج وقت للتفكير قبل اتخاذ القرار",
    employee: "أحمد حسن",
  },
];

const arabicMonths = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = arabicMonths[date.getMonth()];
  const time = date.toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return { day, month, time };
}

export default function NotesMessages() {
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-primary/5 to-primary/10 border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-lg text-primary-dark">سجل المحادثات</h3>
          <span className="mr-auto text-xs text-muted-foreground bg-white px-2 py-1 rounded-full">
            {notes.length} محادثة
          </span>
        </div>
      </div>

      {/* Messages List */}
      <ul className="divide-y divide-border max-h-90 overflow-y-auto">
        {notes.map(
          (note, idx) =>
            note.message && (
              <li
                key={idx}
                className="py-4 px-4 hover:bg-accent/50 transition-colors duration-200"
              >
                <div className="flex gap-3">
                  {/* Date Badge */}
                  <div className="shrink-0 text-center">
                    <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-lg shadow-sm min-w-17.5">
                      <div className="text-base">
                        {formatDate(note.date).day}
                      </div>
                      <div className="text-[10px] opacity-90">
                        {formatDate(note.date).month}
                      </div>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-relaxed mb-2">
                      {note.message}
                    </p>
                    {note.employee && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="w-3 h-3" />
                        <span>الموظف: {note.employee}</span>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ),
        )}
      </ul>

      {/* Empty State */}
      {notes.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">لا توجد محادثات حتى الآن</p>
        </div>
      )}
    </div>
  );
}
