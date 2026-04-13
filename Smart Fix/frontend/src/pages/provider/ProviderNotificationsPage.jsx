import ProviderLayout from "../../layouts/ProviderLayout";
import { useProviderWorkspace } from "../../hooks/useProviderWorkspace";
import ProviderSectionHeader from "../../components/ProviderSectionHeader";
import LoadingSpinner from "../../components/LoadingSpinner";

const ProviderNotificationsPage = () => {
  const { loading, notifications } = useProviderWorkspace();

  if (loading) {
    return (
      <ProviderLayout title="Notifications" subtitle="Technician alerts and workflow updates">
        <LoadingSpinner />
      </ProviderLayout>
    );
  }

  return (
    <ProviderLayout title="Notifications" subtitle="Track new requests, price approvals, and other provider alerts in one place.">
      <div className="space-y-6">
        <ProviderSectionHeader
          eyebrow="Alerts"
          title="Notifications"
          text="This page collects new requests, pricing confirmations, and status updates relevant to your technician account."
        />

        <div className="grid gap-4">
          {notifications.map((item) => (
            <div key={item._id} className="surface-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[rgb(var(--color-text))]">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{item.message}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs ${item.read ? "bg-panelAlt text-[rgb(var(--color-text-soft))]" : "bg-accent/15 text-accent"}`}>
                  {item.read ? "Read" : "New"}
                </span>
              </div>
              <p className="mt-4 text-xs text-muted">{new Date(item.createdAt).toLocaleString("en-IN")}</p>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="surface-card p-10 text-center">
              <h2 className="text-2xl font-semibold">No notifications yet</h2>
              <p className="mt-3 text-sm text-[rgb(var(--color-text-soft))]">Request alerts and status updates will show up here automatically.</p>
            </div>
          )}
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ProviderNotificationsPage;
