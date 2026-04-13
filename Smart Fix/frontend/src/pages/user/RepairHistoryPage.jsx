import { Link } from "react-router-dom";
import UserLayout from "../../layouts/UserLayout";
import { useUserWorkspace } from "../../hooks/useUserWorkspace";
import UserSectionHeader from "../../components/UserSectionHeader";
import UserRequestCard from "../../components/UserRequestCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { completedRequestStatuses } from "../../utils/userWorkspace";

const RepairHistoryPage = () => {
  const { loading, requests } = useUserWorkspace();

  if (loading) {
    return (
      <UserLayout title="Repair History" subtitle="Completed and delivered repairs">
        <LoadingSpinner />
      </UserLayout>
    );
  }

  const historyItems = requests.filter((item) => completedRequestStatuses.includes(item.status));

  return (
    <UserLayout title="Repair History" subtitle="View completed repairs, open details again, or rebook another service.">
      <div className="space-y-6">
        <UserSectionHeader
          eyebrow="History"
          title="Repair history"
          text="Completed and delivered requests stay here so you can review their details, pricing, and service provider again later."
        />

        <div className="grid gap-4">
          {historyItems.map((request) => (
            <UserRequestCard
              key={request._id}
              request={request}
              detailsHref={`/user/requests/${request._id}`}
              actions={
                <div className="flex flex-col gap-3">
                  <Link to={`/user/requests/${request._id}/review`} className="rounded-full bg-accent px-5 py-3 text-center text-sm font-medium text-white">
                    Leave Review
                  </Link>
                  <Link to={`/user/book?provider=${request.provider?._id || ""}`} className="rounded-full border border-border px-5 py-3 text-center text-sm font-medium text-[rgb(var(--color-text-soft))]">
                    Rebook
                  </Link>
                </div>
              }
            />
          ))}

          {historyItems.length === 0 && (
            <div className="surface-card p-10 text-center">
              <h2 className="text-2xl font-semibold">No completed repairs yet</h2>
              <p className="mt-3 text-sm text-[rgb(var(--color-text-soft))]">Delivered requests will show up here automatically.</p>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default RepairHistoryPage;
