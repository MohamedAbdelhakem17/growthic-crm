import CallBoard from "@/app/dashboard/@sales/_components/call-board";
import ClientInfo from "./_components/client-info";
import ClientsWaitingList from "./_components/clients-waiting-list";
import SalesHeader from "./_components/sales-header";
import SellerNotes from "./_components/seller-notes";

export default async function SalesPage() {
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  const minsAgo = (m: number) => new Date(now - m * 60 * 1000).toISOString();

  const waitingList = [
    {
      id: 1,
      name: "أحمد حسن",
      service: "الخدمة أ",
      createdAt: minsAgo(4),
      phone: "123456789",
    },
    {
      id: 2,
      name: "سارة محمد",
      service: "الخدمة ب",
      createdAt: minsAgo(9),
      phone: "987654321",
    },
    {
      id: 3,
      name: "عمر علي",
      service: "الخدمة د",
      createdAt: minsAgo(13),
      phone: "555555555",
    },
    {
      id: 4,
      name: "نور إبراهيم",
      service: "الخدمة ج",
      createdAt: minsAgo(20),
      phone: "111222333",
    },
    {
      id: 5,
      name: "خالد يوسف",
      service: "الخدمة أ",
      createdAt: minsAgo(30),
      phone: "444555666",
    },
  ];
  return (
    <main className="h-screen flex flex-col bg-accent/30 overflow-hidden">
      {/* Header */}
      <SalesHeader />

      {/* Main Layout */}
      <section className="w-full grid grid-cols-1 lg:grid-cols-[280px_1fr] flex-1 overflow-hidden">
        {/* Waiting List */}
        <ClientsWaitingList clients={waitingList} />

        {/* Main Content */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-y-auto">
          <ClientInfo />
          <CallBoard />
          <SellerNotes />
        </section>
      </section>
    </main>
  );
}
