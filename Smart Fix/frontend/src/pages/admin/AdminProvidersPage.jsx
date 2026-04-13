import { useMemo, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useAdminWorkspace } from "../../hooks/useAdminWorkspace";
import AdminSectionHeader from "../../components/AdminSectionHeader";
import AdminDataTable from "../../components/AdminDataTable";
import LoadingSpinner from "../../components/LoadingSpinner";
import AdminModal from "../../components/AdminModal";
import AdminStatusBadge from "../../components/AdminStatusBadge";
import { paginateItems } from "../../utils/adminWorkspace";

const pageSize = 8;

const AdminProvidersPage = () => {
  const { loading, providers, adminNotifications } = useAdminWorkspace();
  const [page, setPage] = useState(1);
  const [statusMap, setStatusMap] = useState({});
  const [selectedProvider, setSelectedProvider] = useState(null);

  const rows = useMemo(() => paginateItems(providers, page, pageSize), [page, providers]);
  const totalPages = Math.max(Math.ceil(providers.length / pageSize), 1);

  if (loading) {
    return (
      <AdminLayout title="Providers" subtitle="Manage service providers" unreadCount={adminNotifications.length}>
        <LoadingSpinner />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Providers" subtitle="Review service providers, inspect skills and ratings, and update approval state from one table." unreadCount={adminNotifications.length}>
      <div className="space-y-6">
        <AdminSectionHeader
          eyebrow="Providers Management"
          title="All service providers"
          text="This table lists every provider with skills, rating, status, and the main approval actions requested for the admin module."
        />

        <AdminDataTable
          columns={[
            { key: "name", label: "Name" },
            { key: "skills", label: "Skills", render: (row) => (row.skills || []).join(", ") || "No skills" },
            { key: "rating", label: "Rating", render: (row) => `${row.averageRating || 0} / 5` },
            {
              key: "status",
              label: "Status",
              render: (row) => <AdminStatusBadge status={statusMap[row._id] || "Pending"} />
            },
            {
              key: "actions",
              label: "Actions",
              render: (row) => (
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setStatusMap((current) => ({ ...current, [row._id]: "Approved" }))} className="rounded-full border border-emerald-500/30 px-3 py-1 text-xs text-emerald-300">
                    Approve
                  </button>
                  <button type="button" onClick={() => setStatusMap((current) => ({ ...current, [row._id]: "Rejected" }))} className="rounded-full border border-rose-500/30 px-3 py-1 text-xs text-rose-300">
                    Reject
                  </button>
                  <button type="button" onClick={() => setSelectedProvider(row)} className="rounded-full border border-border px-3 py-1 text-xs">View Details</button>
                  <button type="button" className="rounded-full border border-rose-500/30 px-3 py-1 text-xs text-rose-300">Delete Provider</button>
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

      <AdminModal open={Boolean(selectedProvider)} title="Provider Details" onClose={() => setSelectedProvider(null)}>
        {selectedProvider && (
          <div className="grid gap-4">
            <div className="metric-tile">
              <p className="metric-kicker">Name</p>
              <p className="mt-3 text-sm text-[rgb(var(--color-text-soft))]">{selectedProvider.name}</p>
            </div>
            <div className="metric-tile">
              <p className="metric-kicker">Skills</p>
              <p className="mt-3 text-sm text-[rgb(var(--color-text-soft))]">{(selectedProvider.skills || []).join(", ") || "No skills"}</p>
            </div>
            <div className="metric-tile">
              <p className="metric-kicker">Rating</p>
              <p className="mt-3 text-sm text-[rgb(var(--color-text-soft))]">{selectedProvider.averageRating || 0} / 5 from {selectedProvider.totalReviews || 0} reviews</p>
            </div>
          </div>
        )}
      </AdminModal>
    </AdminLayout>
  );
};

export default AdminProvidersPage;
