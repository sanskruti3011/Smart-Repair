import { Link } from "react-router-dom";
import ProviderLayout from "../../layouts/ProviderLayout";
import { useProviderWorkspace } from "../../hooks/useProviderWorkspace";
import ProviderStatCard from "../../components/ProviderStatCard";
import ProviderSectionHeader from "../../components/ProviderSectionHeader";
import ProviderRequestCard from "../../components/ProviderRequestCard";
import LoadingSpinner from "../../components/LoadingSpinner";

const ProviderDashboardV2 = () => {
  const { loading, requests, notifications, summary } = useProviderWorkspace();

  if (loading) {
    return (
      <ProviderLayout title="Dashboard" subtitle="Overview of technician requests, jobs, and performance">
        <LoadingSpinner />
      </ProviderLayout>
    );
  }

  const recentRequests = requests.slice(0, 4);

  return (
    <ProviderLayout
      title="Dashboard"
      subtitle="Monitor incoming repair requests, live jobs, completed work, and the latest customer activity."
      actions={
        <Link to="/provider/incoming" className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white">
          View Incoming Requests
        </Link>
      }
    >
      <div className="space-y-6">
        <ProviderSectionHeader
          eyebrow="Overview"
          title="Technician command center"
          text="Use the provider workspace to review new requests, manage active jobs, update pricing, and move devices through pickup and delivery."
        />

        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
          <ProviderStatCard title="Total Requests" value={summary.totalRequests} subtitle="Every repair request assigned to your account." />
          <ProviderStatCard title="Pending Requests" value={summary.pendingRequests} subtitle="New requests waiting for accept or reject." accent="text-amber-300" />
          <ProviderStatCard title="Active Jobs" value={summary.activeJobs} subtitle="Accepted and in-progress repair work." accent="text-blue-300" />
          <ProviderStatCard title="Completed Jobs" value={summary.completedJobs} subtitle="Completed and delivered repair jobs." accent="text-green-300" />
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.15fr,0.85fr]">
          <div className="section-shell p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Summary</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Recent request flow</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[rgb(var(--color-text-soft))]">
              Review the latest service activity, jump into request details, and keep each job moving through the proper technician workflow.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="metric-tile">
                <p className="metric-kicker">Unread Alerts</p>
                <p className="mt-3 text-3xl font-semibold">{notifications.filter((item) => !item.read).length}</p>
              </div>
              <div className="metric-tile">
                <p className="metric-kicker">Pending Pickup</p>
                <p className="mt-3 text-3xl font-semibold">{requests.filter((item) => item.status === "Accepted").length}</p>
              </div>
              <div className="metric-tile">
                <p className="metric-kicker">Approved Jobs</p>
                <p className="mt-3 text-3xl font-semibold">{requests.filter((item) => item.status === "Approved").length}</p>
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
              <p className="text-sm text-[rgb(var(--color-text-soft))]">Open any request to manage pricing, status, pickup, and delivery from one details page.</p>
            </div>
            <Link to="/provider/jobs" className="rounded-full border border-border bg-panelAlt px-4 py-2 text-sm font-medium text-[rgb(var(--color-text))]">
              View all jobs
            </Link>
          </div>
          <div className="grid gap-4">
            {recentRequests.map((request) => (
              <ProviderRequestCard
                key={request._id}
                request={request}
                detailsHref={`/provider/requests/${request._id}`}
                compact
              />
            ))}
          </div>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ProviderDashboardV2;
