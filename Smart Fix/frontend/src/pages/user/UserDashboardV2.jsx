import { Link } from "react-router-dom";
import UserLayout from "../../layouts/UserLayout";
import { useUserWorkspace } from "../../hooks/useUserWorkspace";
import UserStatCard from "../../components/UserStatCard";
import UserSectionHeader from "../../components/UserSectionHeader";
import UserRequestCard from "../../components/UserRequestCard";
import LoadingSpinner from "../../components/LoadingSpinner";

const UserDashboardV2 = () => {
  const { loading, profile, requests, notifications, summary } = useUserWorkspace();

  if (loading) {
    return (
      <UserLayout title="Dashboard" subtitle="Overview of your repair requests and active service updates">
        <LoadingSpinner />
      </UserLayout>
    );
  }

  return (
    <UserLayout
      title="Dashboard"
      subtitle="Track repairs, compare providers, approve pricing, and keep every request visible from one customer workspace."
      actions={
        <Link to="/user/book" className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white">
          Book Repair
        </Link>
      }
    >
      <div className="space-y-6">
        <UserSectionHeader
          eyebrow="Welcome"
          title={`Hello${profile?.fullName ? `, ${profile.fullName}` : ""}`}
          text="Review your recent repairs, follow active status updates, and open a new repair request when you need technician support."
        />

        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
          <UserStatCard title="Total Requests" value={summary.totalRequests} subtitle="All repair requests created from your account." />
          <UserStatCard title="Active Repairs" value={summary.activeRepairs} subtitle="Requests currently moving through the repair workflow." accent="text-blue-300" />
          <UserStatCard title="Completed Repairs" value={summary.completedRepairs} subtitle="Completed and delivered repair jobs." accent="text-green-300" />
          <UserStatCard title="Open Notifications" value={notifications.filter((item) => !item.read).length} subtitle="Unread request, price, and status updates." accent="text-amber-300" />
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.1fr,0.9fr]">
          <div className="section-shell p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Customer Workspace</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Quick booking and live tracking</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[rgb(var(--color-text-soft))]">
              Book a repair, compare providers, approve pricing, and open each request in a dedicated details page with timeline updates.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="metric-tile">
                <p className="metric-kicker">Pending</p>
                <p className="mt-3 text-3xl font-semibold">{requests.filter((item) => item.status === "Pending").length}</p>
              </div>
              <div className="metric-tile">
                <p className="metric-kicker">Awaiting Approval</p>
                <p className="mt-3 text-3xl font-semibold">{requests.filter((item) => item.status === "Price Proposed").length}</p>
              </div>
              <div className="metric-tile">
                <p className="metric-kicker">Delivered</p>
                <p className="mt-3 text-3xl font-semibold">{requests.filter((item) => ["Delivered", "Closed"].includes(item.status)).length}</p>
              </div>
            </div>
          </div>
          <div className="surface-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Recent notifications</p>
            <div className="mt-5 space-y-3">
              {notifications.slice(0, 4).map((item) => (
                <div key={item._id} className="rounded-[22px] bg-panelAlt p-4">
                  <p className="text-sm font-semibold text-[rgb(var(--color-text))]">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{item.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Recent requests</h2>
              <p className="text-sm text-[rgb(var(--color-text-soft))]">Open any request to review provider info, uploaded image, pricing, and the full status timeline.</p>
            </div>
            <Link to="/user/requests" className="rounded-full border border-border bg-panelAlt px-4 py-2 text-sm font-medium text-[rgb(var(--color-text))]">
              View all requests
            </Link>
          </div>
          <div className="grid gap-4">
            {requests.slice(0, 4).map((request) => (
              <UserRequestCard key={request._id} request={request} detailsHref={`/user/requests/${request._id}`} />
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboardV2;
