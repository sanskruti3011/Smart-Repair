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

const AdminUsersPage = () => {
  const { loading, users, adminNotifications } = useAdminWorkspace();
  const [page, setPage] = useState(1);
  const [blockedMap, setBlockedMap] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);

  const rows = useMemo(() => paginateItems(users, page, pageSize), [page, users]);
  const totalPages = Math.max(Math.ceil(users.length / pageSize), 1);

  if (loading) {
    return (
      <AdminLayout title="Users" subtitle="Manage all registered users" unreadCount={adminNotifications.length}>
        <LoadingSpinner />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Users" subtitle="View users, inspect their details, and perform admin actions from one table." unreadCount={adminNotifications.length}>
      <div className="space-y-6">
        <AdminSectionHeader
          eyebrow="Users Management"
          title="All users"
          text="This table shows every registered customer with status and quick admin actions such as view, block/unblock, and delete."
        />

        <AdminDataTable
          columns={[
            { key: "fullName", label: "Name" },
            { key: "email", label: "Email" },
            {
              key: "status",
              label: "Status",
              render: (row) => <AdminStatusBadge status={blockedMap[row._id] ? "Blocked" : "Active"} />
            },
            {
              key: "actions",
              label: "Actions",
              render: (row) => (
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setSelectedUser(row)} className="rounded-full border border-border px-3 py-1 text-xs">View Details</button>
                  <button type="button" onClick={() => setBlockedMap((current) => ({ ...current, [row._id]: !current[row._id] }))} className="rounded-full border border-border px-3 py-1 text-xs">
                    {blockedMap[row._id] ? "Unblock" : "Block"}
                  </button>
                  <button type="button" className="rounded-full border border-rose-500/30 px-3 py-1 text-xs text-rose-300">Delete User</button>
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

      <AdminModal open={Boolean(selectedUser)} title="User Details" onClose={() => setSelectedUser(null)}>
        {selectedUser && (
          <div className="grid gap-4">
            <div className="metric-tile">
              <p className="metric-kicker">Name</p>
              <p className="mt-3 text-sm text-[rgb(var(--color-text-soft))]">{selectedUser.fullName}</p>
            </div>
            <div className="metric-tile">
              <p className="metric-kicker">Email</p>
              <p className="mt-3 text-sm text-[rgb(var(--color-text-soft))]">{selectedUser.email}</p>
            </div>
            <div className="metric-tile">
              <p className="metric-kicker">Address</p>
              <p className="mt-3 text-sm text-[rgb(var(--color-text-soft))]">{selectedUser.address || "Not available"}</p>
            </div>
          </div>
        )}
      </AdminModal>
    </AdminLayout>
  );
};

export default AdminUsersPage;
