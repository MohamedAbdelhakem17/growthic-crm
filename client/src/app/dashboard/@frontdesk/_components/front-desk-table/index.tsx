import TableCaption from "./table-caption";
import TableHeaders from "./table-headers";

import {
  Table,
  TableBody,
  TableCaption as TableCaptionWrapper,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { BOOKING_STATUS } from "@/lib/constant/booking-status.constant";
import { formatTime12h } from "@/lib/utils/time-format";
import BookingActions from "./booking-actions";
import PriceCell from "./price-cell";

export default function FrontDeskTable() {
  const appointments = [
    {
      time: "10:00",
      clientName: "أحمد حسان",
      service: "الخدمة أ",
      price: 500,
      status: BOOKING_STATUS.CONFIRMED,
    },
    {
      time: "10:30",
      clientName: "سارة محمد",
      service: "الخدمة ب",
      price: 300,
      status: BOOKING_STATUS.CANCELLED,
    },
    {
      time: "11:00",
      clientName: "عمر علي",
      service: "الخدمة د",
      status: BOOKING_STATUS.PENDING,
      price: 0,
    },
    {
      time: "11:30",
      clientName: "نور إبراهيم",
      service: "الخدمة ج",
      price: 200,
      status: BOOKING_STATUS.NOT_COMMENCED,
    },
    {
      time: "12:00",
      clientName: "خالد يوسف",
      service: "الخدمة أ",
      price: 350,
      status: BOOKING_STATUS.CONFIRMED,
    },
    {
      time: "13:30",
      clientName: "فاطمة أحمد",
      service: "الخدمة ب",
      price: 400,
      status: BOOKING_STATUS.CANCELLED,
    },
    {
      time: "16:00",
      clientName: "يوسف علي",
      service: "الخدمة د",
      price: 400,
      status: BOOKING_STATUS.CONFIRMED,
    },
  ];
  return (
    <div>
      <Table>
        {/* status */}
        <TableCaptionWrapper>
          <TableCaption appointments={appointments} />
        </TableCaptionWrapper>

        {/* Headers */}
        <TableHeader>
          <TableRow>
            <TableHeaders />
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody className="space-y-8">
          {appointments.map((appointment) => (
            <TableRow
              key={`${appointment.clientName}-${appointment.time}`}
              className="py-2 my-4"
            >
              <TableCell className="font-medium">
                {formatTime12h(appointment.time)}
              </TableCell>
              <TableCell>{appointment.clientName}</TableCell>
              <TableCell>{appointment.service}</TableCell>
              <PriceCell price={appointment.price} />
              <TableCell>
                <BookingActions status={appointment.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
