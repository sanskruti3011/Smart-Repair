import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";
import StatCard from "../../components/StatCard";
import GraphCard from "../../components/GraphCard";

const ProviderDashboardModern = () => {
  const [requests, setRequests] = useState([]);
  const [costs, setCosts] = useState({});
  const [statusDrafts, setStatusDrafts] = useState({});

  const loadData = async () => {
    const { data } = await api.get("/providers/requests");
    setRequests(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAction = async (id, action) => {
    await api.post(`/providers/requests/${id}/action`, { action });
    loadData();
  };

  const handleCost = async (id) => {
    await api.post(`/providers/requests/${id}/cost`, { cost: Number(costs[id] || 0) });
    loadData();
  };

  const handleStatus = async (id) => {
    await api.patch(`/providers/requests/${id}/status`, {
      status: statusDrafts[id] || "In Progress"
    });
    loadData();
  };

  const workload = [
    { label: "Pending", value: requests.filter((item) => item.status === "Pending").length },
    { label: "Accepted", value: requests.filter((item) => item.status === "Accepted").length },
    { label: "In Progress", value: requests.filter((item) => item.status === "In Progress").length },
    { label: "Delivered", value: requests.filter((item) => item.status === "Delivered").length }
  ];

  return (
    <DashboardLayout
      links={[
        { label: "Dashboard", to: "/provider" },
        { label: "Profile", to: "/provider/profile" }
      ]}
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard title="Incoming Requests" value={requests.filter((item) => item.status === "Pending").length} subtitle="Awaiting technician action" />
          <StatCard title="Active Jobs" value={requests.filter((item) => ["Accepted", "Price Proposed", "Awaiting User Confirmation", "In Progress"].includes(item.status)).length} subtitle="Repairs currently underway" />
          <StatCard title="Completed Jobs" value={requests.filter((item) => item.status === "Delivered").length} subtitle="Delivered devices" />
        </div>
        <div className="grid gap-4 xl:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-2xl border border-border bg-panel p-6 shadow-panel">
            <h2 className="text-xl font-semibold text-[rgb(var(--color-text))]">Technician queue</h2>
            <p className="mt-2 text-sm text-[rgb(var(--color-text-soft))]">
              Accept jobs, send updated pricing, and move devices through pickup, repair, completion, and dispatch.
            </p>
          </div>
          <GraphCard title="Job pipeline" items={workload} />
        </div>
        <div className="grid gap-4">
          {requests.map((request) => (
            <div key={request._id} className="rounded-2xl border border-border bg-panel p-5 shadow-panel">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[rgb(var(--color-text))]">
                    {request.productType} • {request.issueType}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{request.description}</p>
                  <p className="mt-3 text-sm text-[rgb(var(--color-text-soft))]">
                    Customer: {request.user?.fullName} • {request.user?.phone}
                  </p>
                  <span className="mt-4 inline-flex rounded-full bg-panelAlt px-3 py-1 text-xs text-[rgb(var(--color-text-soft))]">
                    {request.status}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:w-[420px]">
                  <button className="rounded-xl bg-success px-4 py-3 text-sm font-medium text-white" onClick={() => handleAction(request._id, "accept")}>
                    Accept
                  </button>
                  <button className="rounded-xl bg-danger px-4 py-3 text-sm font-medium text-white" onClick={() => handleAction(request._id, "reject")}>
                    Reject
                  </button>
                  <input
                    className="input-field"
                    placeholder="Repair cost"
                    value={costs[request._id] || ""}
                    onChange={(e) => setCosts({ ...costs, [request._id]: e.target.value })}
                  />
                  <button className="rounded-xl border border-border px-4 py-3 text-sm text-[rgb(var(--color-text-soft))]" onClick={() => handleCost(request._id)}>
                    Set cost
                  </button>
                  <select
                    className="input-field"
                    value={statusDrafts[request._id] || request.status}
                    onChange={(e) => setStatusDrafts({ ...statusDrafts, [request._id]: e.target.value })}
                  >
                    <option>Accepted</option>
                    <option>Price Proposed</option>
                    <option>Awaiting User Confirmation</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Delivered</option>
                  </select>
                  <button className="rounded-xl border border-border px-4 py-3 text-sm text-[rgb(var(--color-text-soft))]" onClick={() => handleStatus(request._id)}>
                    Update status
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProviderDashboardModern;
