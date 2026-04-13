import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/StatCard";
import StatusTimeline from "../../components/StatusTimeline";
import LoadingSpinner from "../../components/LoadingSpinner";

const UserDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [requestRes, notificationRes] = await Promise.all([api.get("/users/requests"), api.get("/users/notifications")]);
        setRequests(requestRes.data);
        setNotifications(notificationRes.data);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const activeRequest = requests[0];

  return (
    <DashboardLayout links={[{ label: "Overview", to: "/user" }, { label: "Book Repair", to: "/user/book" }, { label: "Profile", to: "/user/profile" }]}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard title="Total Requests" value={requests.length} subtitle="All bookings made by you" />
            <StatCard title="Open Notifications" value={notifications.filter((item) => !item.read).length} subtitle="Unread alerts and updates" />
            <StatCard title="Active Repairs" value={requests.filter((item) => !["Delivered", "Completed", "Cancelled", "Rejected"].includes(item.status)).length} subtitle="Requests currently moving through workflow" />
          </div>
          {activeRequest && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-white">Latest repair status</h2>
                <p className="text-sm text-muted">{activeRequest.productType} • {activeRequest.issueType} • {activeRequest.provider?.name}</p>
              </div>
              <StatusTimeline currentStatus={activeRequest.status} history={activeRequest.statusHistory} />
            </div>
          )}
          <div className="grid gap-4 xl:grid-cols-2">
            {requests.map((request) => (
              <div key={request._id} className="rounded-2xl border border-border bg-panel p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{request.productType} • {request.issueType}</h3>
                    <p className="mt-1 text-sm text-muted">{request.description}</p>
                  </div>
                  <span className="rounded-full bg-panelAlt px-3 py-1 text-xs text-slate-200">{request.status}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400">
                  <span>Provider: {request.provider?.name}</span>
                  <span>Proposed cost: Rs. {request.proposedCost || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default UserDashboard;
