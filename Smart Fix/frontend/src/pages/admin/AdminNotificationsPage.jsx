import AdminLayout from "../../layouts/AdminLayout";
import { useAdminWorkspace } from "../../hooks/useAdminWorkspace";
import AdminSectionHeader from "../../components/AdminSectionHeader";
import LoadingSpinner from "../../components/LoadingSpinner";
import AdminStatusBadge from "../../components/AdminStatusBadge";

const AdminNotificationsPage = () => {
  const { loading, adminNotifications } = useAdminWorkspace();

  if (loading) {
    return (
      <AdminLayout title="Notifications" subtitle="System alerts and admin-facing events" unreadCount={adminNotifications.length}>
        <LoadingSpinner />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Notifications" subtitle="View alerts for new users, new requests, support issues, and other system events." unreadCount={adminNotifications.length}>
      <div className="space-y-6">
        <AdminSectionHeader
          eyebrow="Notifications"
          title="System notifications"
          text="This page collects admin-facing alerts such as new users, new repair requests, and support issues."
        />

        <div className="grid gap-4">
          {adminNotifications.map((item) => (
            <div key={item.id} className="surface-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[rgb(var(--color-text))]">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{item.text}</p>
                </div>
                <AdminStatusBadge status={item.status} />
              </div>
              <p className="mt-4 text-xs text-muted">{new Date(item.createdAt).toLocaleString("en-IN")}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNotificationsPage;
