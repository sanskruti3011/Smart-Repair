import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { useAdminWorkspace } from "../../hooks/useAdminWorkspace";
import AdminStatCard from "../../components/AdminStatCard";
import AdminSectionHeader from "../../components/AdminSectionHeader";
import GraphCard from "../../components/GraphCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import AdminStatusBadge from "../../components/AdminStatusBadge";

const AdminDashboardV3 = () => {
  const { loading, analytics, requests, tickets, activeJobs, completedJobs, recentActivity, adminNotifications } = useAdminWorkspace();

  if (loading) {
    return (
      <AdminLayout title="Dashboard" subtitle="Admin overview of users, providers, requests, and support activity" unreadCount={adminNotifications.length}>
        <LoadingSpinner />
      </AdminLayout>
    );
  }

  const requestBreakdown = (analytics?.statusBreakdown || []).map((item) => ({
    label: item._id || "Unknown",
    value: item.count
  }));

  const requestsPerDay = Object.values(
    requests.reduce((acc, item) => {
      const dateLabel = new Date(item.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
      acc[dateLabel] = acc[dateLabel] || { label: dateLabel, value: 0 };
      acc[dateLabel].value += 1;
      return acc;
    }, {})
  ).slice(-7);

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Monitor users, providers, repair requests, support load, and system activity from the admin command center."
      unreadCount={adminNotifications.length}
      actions={
        <Link to="/admin/requests" className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white">
          Manage Requests
        </Link>
      }
    >
      <div className="space-y-6">
        <AdminSectionHeader
          eyebrow="Overview"
          title="Admin operations dashboard"
          text="Track the full system state including total users, provider activity, repair request volume, active jobs, completed jobs, and the latest platform events."
        />

        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-5">
          <AdminStatCard title="Total Users" value={analytics?.totalUsers || 0} subtitle="Registered customers in the system." />
          <AdminStatCard title="Total Providers" value={analytics?.totalProviders || 0} subtitle="Service providers available to handle requests." />
          <AdminStatCard title="Total Repair Requests" value={analytics?.totalRequests || 0} subtitle="All repair requests across the platform." />
          <AdminStatCard title="Active Jobs" value={activeJobs} subtitle="Requests currently moving through the workflow." accent="text-blue-300" />
          <AdminStatCard title="Completed Jobs" value={completedJobs} subtitle="Completed and delivered repair jobs." accent="text-green-300" />
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <GraphCard title="Requests per day" items={requestsPerDay.length ? requestsPerDay : [{ label: "No data", value: 0 }]} />
          <GraphCard title="Request status breakdown" items={requestBreakdown.length ? requestBreakdown : [{ label: "No data", value: 0 }]} />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
          <div className="surface-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Recent activity</p>
            <div className="mt-5 space-y-3">
              {recentActivity.slice(0, 6).map((item) => (
                <div key={item.id} className="rounded-[22px] bg-panelAlt p-4">
                  <p className="text-sm font-semibold text-[rgb(var(--color-text))]">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{item.text}</p>
                  <p className="mt-3 text-xs text-muted">{new Date(item.createdAt).toLocaleString("en-IN")}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Open support items</p>
            <div className="mt-5 space-y-3">
              {tickets.slice(0, 5).map((ticket) => (
                <div key={ticket._id} className="rounded-[22px] bg-panelAlt p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-[rgb(var(--color-text))]">{ticket.subject}</p>
                      <p className="mt-2 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{ticket.description}</p>
                    </div>
                    <AdminStatusBadge status={ticket.status === "Resolved" ? "Active" : "Pending"} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardV3;
