const SYSTEM_ROLES = {
  MANAGER: "manager",
  SALES: "sales",
  FRONT_DESK: "frontdesk",
} as const;

export default SYSTEM_ROLES;

export type SystemRoleType = (typeof SYSTEM_ROLES)[keyof typeof SYSTEM_ROLES];
