import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useAdminWorkspace } from "../../hooks/useAdminWorkspace";
import AdminSectionHeader from "../../components/AdminSectionHeader";
import AdminDataTable from "../../components/AdminDataTable";
import LoadingSpinner from "../../components/LoadingSpinner";
import AdminStatusBadge from "../../components/AdminStatusBadge";
import api from "../../api/axios";

const AdminSupportPage = () => {
  const { loading, tickets, refresh, adminNotifications } = useAdminWorkspace();
  const [replyDraft, setReplyDraft] = useState({});

  const handleResolve = async (ticket) => {
    await api.patch(`/admin/tickets/${ticket._id}`, {
      status: "Resolved",
      resolution: replyDraft[ticket._id] || "Resolved by admin"
    });
    await refresh();
  };

  if (loading) {
    return (
      <AdminLayout title="Support" subtitle="Manage support tickets and system issues" unreadCount={adminNotifications.length}>
        <LoadingSpinner />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Support" subtitle="View support tickets, reply with a resolution note, and mark issues as resolved." unreadCount={adminNotifications.length}>
      <div className="space-y-6">
        <AdminSectionHeader
          eyebrow="Support Tickets"
          title="Ticket management"
          text="This page lists system and user support tickets with resolution controls for the admin team."
        />

        <AdminDataTable
          columns={[
            { key: "user", label: "User", render: (row) => row.createdByType || "User" },
            { key: "issue", label: "Issue", render: (row) => row.subject },
            { key: "status", label: "Status", render: (row) => <AdminStatusBadge status={row.status === "Resolved" ? "Active" : "Pending"} /> },
            {
              key: "actions",
              label: "Actions",
              render: (row) => (
                <div className="grid gap-2">
                  <textarea
                    className="rounded-2xl border border-border bg-panelAlt px-3 py-2 text-xs text-[rgb(var(--color-text-soft))]"
                    placeholder="Reply or resolution note"
                    value={replyDraft[row._id] || ""}
                    onChange={(event) => setReplyDraft((current) => ({ ...current, [row._id]: event.target.value }))}
                  />
                  <button type="button" onClick={() => handleResolve(row)} className="rounded-full border border-border px-3 py-2 text-xs">
                    Mark Resolved
                  </button>
                </div>
              )
            }
          ]}
          rows={tickets}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminSupportPage;
