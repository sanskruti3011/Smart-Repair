export const adminNavLinks = [
  { label: "Dashboard", to: "/admin" },
  { label: "Users", to: "/admin/users" },
  { label: "Providers", to: "/admin/providers" },
  { label: "Repair Requests", to: "/admin/requests" },
  { label: "Support", to: "/admin/support" },
  { label: "Reviews", to: "/admin/reviews" },
  { label: "Notifications", to: "/admin/notifications" },
  { label: "Profile", to: "/admin/profile" },
  { label: "Settings", to: "/admin/settings" }
];

export const adminStatusToneMap = {
  Active: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  Pending: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  Blocked: "bg-rose-500/15 text-rose-300 border-rose-500/20",
  Resolved: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  Open: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  Rejected: "bg-rose-500/15 text-rose-300 border-rose-500/20",
  Approved: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  "Picked Up": "bg-indigo-500/15 text-indigo-300 border-indigo-500/20",
  Completed: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  Delivered: "bg-green-500/15 text-green-300 border-green-500/20",
  Closed: "bg-teal-500/15 text-teal-300 border-teal-500/20",
  Cancelled: "bg-slate-500/15 text-slate-300 border-slate-500/20",
  "In Progress": "bg-blue-500/15 text-blue-300 border-blue-500/20",
  Accepted: "bg-sky-500/15 text-sky-300 border-sky-500/20",
  PendingApproval: "bg-amber-500/15 text-amber-300 border-amber-500/20"
};

export const getAdminStatusTone = (status) =>
  adminStatusToneMap[status] || "bg-panelAlt text-[rgb(var(--color-text-soft))] border-border";

export const paginateItems = (items, page = 1, pageSize = 8) => {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
};
