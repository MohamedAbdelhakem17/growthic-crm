import SYSTEM_ROLES, {
  SystemRoleType,
} from "@/lib/constant/system-roles.constant";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Growthic CRM",
    template: "%s | Growthic CRM",
  },
  description:
    "Growthic CRM is a powerful customer relationship management tool designed to help businesses manage their customer interactions, sales processes, and marketing campaigns effectively. With Growthic CRM, you can streamline your sales pipeline, track customer interactions, and gain valuable insights into your business performance.",
};

interface DashboardLayoutProps {
  frontdesk: React.ReactNode;
  sales: React.ReactNode;
  manager: React.ReactNode;
}

export default function DashboardLayout({
  frontdesk,
  sales,
  manager,
}: DashboardLayoutProps): React.ReactNode {
  //  user Role
  const userRole: SystemRoleType = SYSTEM_ROLES.FRONT_DESK;

  // dashboards based on user role
  const dashboards: Record<SystemRoleType, React.ReactNode> = {
    [SYSTEM_ROLES.FRONT_DESK]: frontdesk,
    [SYSTEM_ROLES.SALES]: sales,
    [SYSTEM_ROLES.MANAGER]: manager,
  };

  // render the appropriate dashboard based on user role
  return dashboards[userRole] || <div>Unauthorized Access</div>;
}
