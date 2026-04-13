import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { useAdminWorkspace } from "../../hooks/useAdminWorkspace";
import AdminSectionHeader from "../../components/AdminSectionHeader";
import AdminDataTable from "../../components/AdminDataTable";
import LoadingSpinner from "../../components/LoadingSpinner";
import AdminStatusBadge from "../../components/AdminStatusBadge";
import { paginateItems } from "../../utils/adminWorkspace";

const pageSize = 8;

const AdminRequestsPage = () => {
  const { loading, requests, providers, adminNotifications } = useAdminWorkspace();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ status: "", date: "" });
  const [assignedProviderMap, setAssignedProviderMap] = useState({});

  const filteredRequests = useMemo(
    () =>
      requests.filter((request) => {
        const matchesStatus = !filters.status || request.status === filters.status;
        const matchesDate = !filters.date || new Date(request.createdAt).toISOString().slice(0, 10) === filters.date;
        return matchesStatus && matchesDate;
      }),
    [filters.date, filters.status, requests]
  );

  const rows = useMemo(() => paginateItems(filteredRequests, page, pageSize), [filteredRequests, page]);
  const totalPages = Math.max(Math.ceil(filteredRequests.length / pageSize), 1);

  if (loading) {
    return (
      <AdminLayout title="Repair Requests" subtitle="Manage all repair requests" unreadCount={adminNotifications.length}>
        <LoadingSpinner />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Repair Requests" subtitle="Monitor all repair requests, filter them by status or date, and assign providers from the admin panel." unreadCount={adminNotifications.length}>
      <div className="space-y-6">
        <AdminSectionHeader
          eyebrow="Requests Management"
          title="All repair requests"
          text="This page lists every repair request with user, provider, device, issue, and status details plus admin-side assignment controls."
        />

        <div className="surface-card p-6">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            <select className="input-field" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
              <option value="">All statuses</option>
              {["Pending", "Accepted", "Price Proposed", "Approved", "Picked Up", "In Progress", "Completed", "Delivered", "Closed", "Rejected", "Cancelled"].map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            <input className="input-field" type="date" value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} />
          </div>
        </div>

        <AdminDataTable
          columns={[
            { key: "user", label: "User", render: (row) => row.user?.fullName || "Unknown" },
            {
              key: "provider",
              label: "Provider",
              render: (row) => assignedProviderMap[row._id] || row.provider?.name || "Unassigned"
            },
            { key: "device", label: "Device", render: (row) => row.productType },
            { key: "issue", label: "Issue", render: (row) => row.issueType },
            { key: "status", label: "Status", render: (row) => <AdminStatusBadge status={row.status} /> },
            {
              key: "actions",
              label: "Actions",
              render: (row) => (
                <div className="flex flex-wrap gap-2">
                  <Link to={`/admin/requests/${row._id}`} className="rounded-full border border-border px-3 py-1 text-xs">View Details</Link>
                  <select
                    className="rounded-full border border-border bg-panelAlt px-3 py-1 text-xs text-[rgb(var(--color-text-soft))]"
                    value={assignedProviderMap[row._id] || row.provider?.name || ""}
                    onChange={(event) => setAssignedProviderMap((current) => ({ ...current, [row._id]: event.target.value }))}
                  >
                    <option value="">Assign provider</option>
                    {providers.map((provider) => (
                      <option key={provider._id} value={provider.name}>{provider.name}</option>
                    ))}
                  </select>
                </div>
              )
            }
          ]}
          rows={rows}
          pagination={{
            page,
            totalPages,
            onPrevious: () => setPage((current) => Math.max(current - 1, 1)),
            onNext: () => setPage((current) => Math.min(current + 1, totalPages)),
            label: `Page ${page} of ${totalPages}`
          }}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminRequestsPage;
