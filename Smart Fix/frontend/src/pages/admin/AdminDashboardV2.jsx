import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";
import StatCard from "../../components/StatCard";
import GraphCard from "../../components/GraphCard";

const AdminDashboardV2 = () => {
  const [analytics, setAnalytics] = useState(null);
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [providers, setProviders] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [analyticsRes, requestRes, userRes, providerRes, ticketRes] = await Promise.all([
        api.get("/admin/analytics"),
        api.get("/admin/requests"),
        api.get("/admin/users"),
        api.get("/admin/providers"),
        api.get("/admin/tickets")
      ]);
      setAnalytics(analyticsRes.data);
      setRequests(requestRes.data);
      setUsers(userRes.data);
      setProviders(providerRes.data);
      setTickets(ticketRes.data);
    };

    loadData();
  }, []);

  const resolveTicket = async (id) => {
    await api.patch(`/admin/tickets/${id}`, {
      status: "Resolved",
      resolution: "Resolved from dashboard"
    });
    setTickets((current) => current.map((ticket) => (ticket._id === id ? { ...ticket, status: "Resolved" } : ticket)));
  };

  const requestBreakdown = (analytics?.statusBreakdown || []).map((item) => ({
    label: item._id || "Unknown",
    value: item.count
  }));

  return (
    <DashboardLayout links={[{ label: "Admin Overview", to: "/admin" }]}>
      {analytics && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <StatCard title="Users" value={analytics.totalUsers} subtitle="Registered customers" />
            <StatCard title="Providers" value={analytics.totalProviders} subtitle="Active technicians" />
            <StatCard title="Requests" value={analytics.totalRequests} subtitle="All repair jobs" />
            <StatCard title="Open Tickets" value={analytics.openTickets} subtitle="Support and dispute load" />
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.15fr,0.85fr]">
            <div className="surface-card p-6">
              <h2 className="text-xl font-semibold text-[rgb(var(--color-text))]">Operations snapshot</h2>
              <p className="mt-2 text-sm text-[rgb(var(--color-text-soft))]">
                Review request movement, provider load, and support pressure from a single admin control panel.
              </p>
            </div>
            <GraphCard title="Status analytics" items={requestBreakdown} />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <section className="surface-card p-5">
              <h2 className="text-lg font-semibold text-[rgb(var(--color-text))]">Repair requests</h2>
              <div className="mt-4 space-y-3">
                {requests.slice(0, 6).map((request) => (
                  <div key={request._id} className="rounded-xl bg-panelAlt p-4">
                    <p className="font-medium text-[rgb(var(--color-text))]">
                      {request.productType} | {request.issueType}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {request.user?.fullName} → {request.provider?.name}
                    </p>
                    <p className="mt-2 text-xs text-[rgb(var(--color-text-soft))]">{request.status}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="surface-card p-5">
              <h2 className="text-lg font-semibold text-[rgb(var(--color-text))]">Support tickets</h2>
              <div className="mt-4 space-y-3">
                {tickets.map((ticket) => (
                  <div key={ticket._id} className="rounded-xl bg-panelAlt p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-[rgb(var(--color-text))]">{ticket.subject}</p>
                        <p className="mt-1 text-sm text-muted">{ticket.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => resolveTicket(ticket._id)}
                        className="rounded-lg border border-border px-3 py-2 text-xs text-[rgb(var(--color-text-soft))]"
                      >
                        Resolve
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-[rgb(var(--color-text-soft))]">{ticket.status}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <section className="surface-card p-5">
              <h2 className="text-lg font-semibold text-[rgb(var(--color-text))]">Users</h2>
              <div className="mt-4 space-y-3">
                {users.slice(0, 6).map((user) => (
                  <div key={user._id} className="flex items-center justify-between rounded-xl bg-panelAlt p-4">
                    <div>
                      <p className="font-medium text-[rgb(var(--color-text))]">{user.fullName}</p>
                      <p className="text-sm text-muted">{user.email}</p>
                    </div>
                    <span className="text-xs text-[rgb(var(--color-text-soft))]">{user.role}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="surface-card p-5">
              <h2 className="text-lg font-semibold text-[rgb(var(--color-text))]">Service providers</h2>
              <div className="mt-4 space-y-3">
                {providers.slice(0, 6).map((provider) => (
                  <div key={provider._id} className="flex items-center justify-between rounded-xl bg-panelAlt p-4">
                    <div>
                      <p className="font-medium text-[rgb(var(--color-text))]">{provider.name}</p>
                      <p className="text-sm text-muted">{provider.email}</p>
                    </div>
                    <span className="text-xs text-[rgb(var(--color-text-soft))]">{provider.location}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboardV2;
