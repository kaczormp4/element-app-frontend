export const Paths = {
  DEFAULT: "/",
  HOME: "/*",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  CREATE_ELEMENT: "/dashboard/new",
  EDIT_ELEMENT: "/dashboard/:id/edit",
  SHARED: "/shared",
  CONFIRM_EMAIL: "/confirm-email",
} as const;
