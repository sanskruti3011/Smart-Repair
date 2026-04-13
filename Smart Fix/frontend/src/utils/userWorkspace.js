export const userNavLinks = [
  { label: "Dashboard", to: "/user" },
  { label: "Book Repair", to: "/user/book" },
  { label: "Service Providers", to: "/user/providers" },
  { label: "My Requests", to: "/user/requests" },
  { label: "History", to: "/user/history" },
  { label: "Notifications", to: "/user/notifications" },
  { label: "Profile", to: "/user/profile" },
  { label: "Settings", to: "/user/settings" }
];

export const requestStatusToneMap = {
  Pending: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  Accepted: "bg-sky-500/15 text-sky-300 border-sky-500/20",
  "Price Proposed": "bg-violet-500/15 text-violet-300 border-violet-500/20",
  Approved: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",
  "Picked Up": "bg-indigo-500/15 text-indigo-300 border-indigo-500/20",
  "In Progress": "bg-blue-500/15 text-blue-300 border-blue-500/20",
  Completed: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  Delivered: "bg-green-500/15 text-green-300 border-green-500/20",
  Closed: "bg-teal-500/15 text-teal-300 border-teal-500/20",
  Rejected: "bg-rose-500/15 text-rose-300 border-rose-500/20",
  Cancelled: "bg-slate-500/15 text-slate-300 border-slate-500/20"
};

export const requestStatuses = ["Pending", "Accepted", "Price Proposed", "Approved", "Picked Up", "In Progress", "Completed", "Delivered", "Closed"];
export const activeRequestStatuses = ["Pending", "Accepted", "Price Proposed", "Approved", "Picked Up", "In Progress"];
export const completedRequestStatuses = ["Completed", "Delivered", "Closed"];

export const getUserStatusTone = (status) =>
  requestStatusToneMap[status] || "bg-panelAlt text-[rgb(var(--color-text-soft))] border-border";
