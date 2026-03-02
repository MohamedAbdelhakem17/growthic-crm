import CallBoard from "@/app/dashboard/@sales/_components/call-board";
import ClientInfo from "./_components/client-info";
import ClientsWaitingList from "./_components/clients-waiting-list";
import SalesHeader from "./_components/sales-header";
import SellerNotes from "./_components/seller-notes";

export default async function SalesPage() {
  const now = Date.now();
  const minsAgo = (m: number) => new Date(now - m * 60 * 1000).toISOString();

  const waitingList = [
    {
      id: 1,
      name: "أحمد حسن",
      service: "الخدمة أ",
      createdAt: minsAgo(4), // 4 دقايق ← أخضر
      phone: "123456789",
    },
    {
      id: 2,
      name: "سارة محمد",
      service: "الخدمة ب",
      createdAt: minsAgo(9), // 9 دقايق ← أخضر
      phone: "987654321",
    },
    {
      id: 3,
      name: "عمر علي",
      service: "الخدمة د",
      createdAt: minsAgo(13), // 13 دقيقة ← برتقالي
      phone: "555555555",
    },
    {
      id: 4,
      name: "نور إبراهيم",
      service: "الخدمة ج",
      createdAt: minsAgo(20), // 20 دقيقة ← أحمر
      phone: "111222333",
    },
    {
      id: 5,
      name: "خالد يوسف",
      service: "الخدمة أ",
      createdAt: minsAgo(30), // 30 دقيقة ← أحمر
      phone: "444555666",
    },
  ];
  return (
    <main className="min-h-screen flex flex-col ">
      {/* Header */}
      <SalesHeader />

      {/* Main Layout */}
      <section className="w-full  grid grid-cols-1 lg:grid-cols-[300px_1fr]  flex-1 ">
        {/* Waiting List */}
        <ClientsWaitingList clients={waitingList} />

        {/* Main Content */}
        <section className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-1 p-4">
          <ClientInfo />
          <CallBoard />
          <SellerNotes />
        </section>
      </section>
    </main>
  );
}
