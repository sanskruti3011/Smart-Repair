export const providerNavLinks = [
  { label: "Dashboard", to: "/provider" },
  { label: "Incoming Requests", to: "/provider/incoming" },
  { label: "My Jobs", to: "/provider/jobs" },
  { label: "Pickup & Delivery", to: "/provider/pickup-delivery" },
  { label: "Reviews", to: "/provider/reviews" },
  { label: "Notifications", to: "/provider/notifications" },
  { label: "Profile", to: "/provider/profile" },
  { label: "Settings", to: "/provider/settings" }
];

export const statusToneMap = {
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

export const activeJobStatuses = ["Accepted", "Price Proposed", "Approved", "Picked Up", "In Progress"];
export const completedJobStatuses = ["Completed", "Delivered", "Closed"];
export const finalJobStatuses = ["Closed", "Rejected", "Cancelled"];

export const getStatusTone = (status) => statusToneMap[status] || "bg-panelAlt text-[rgb(var(--color-text-soft))] border-border";

export const getNextJobStatusOptions = (status) => {
  const map = {
    Approved: ["Picked Up"],
    "Picked Up": ["In Progress"],
    "In Progress": ["Completed"],
    Completed: ["Delivered"],
    Delivered: ["Closed"]
  };

  return map[status] || [];
};

export const getDeliveryStage = (request) => {
  const latestNote = request?.statusHistory?.[request.statusHistory.length - 1]?.note?.toLowerCase() || "";

  if (request?.status === "Closed") return "Closed";
  if (request?.status === "Delivered") return "Delivered";
  if (request?.status === "Picked Up") return "Picked Up";
  if (latestNote.includes("out for delivery")) return "Out for Delivery";
  if (latestNote.includes("picked up")) return "Picked Up";
  if (request?.status === "Completed") return "Ready for Delivery";
  return "Awaiting Pickup";
};
