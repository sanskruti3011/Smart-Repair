import UserLayout from "../../layouts/UserLayout";
import { useUserWorkspace } from "../../hooks/useUserWorkspace";
import UserSectionHeader from "../../components/UserSectionHeader";
import LoadingSpinner from "../../components/LoadingSpinner";

const UserNotificationsPage = () => {
  const { loading, notifications } = useUserWorkspace();

  if (loading) {
    return (
      <UserLayout title="Notifications" subtitle="Request updates, price updates, and status changes">
        <LoadingSpinner />
      </UserLayout>
    );
  }

  return (
    <UserLayout title="Notifications" subtitle="View request updates, price notifications, and repair status changes in one list.">
      <div className="space-y-6">
        <UserSectionHeader
          eyebrow="Notifications"
          title="All notifications"
          text="This page collects repair request updates, price changes, and status notifications related to your customer account."
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
        </div>
      </div>
    </UserLayout>
  );
};

export default UserNotificationsPage;
