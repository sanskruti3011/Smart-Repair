import ProviderLayout from "../../layouts/ProviderLayout";
import { useProviderWorkspace } from "../../hooks/useProviderWorkspace";
import ProviderSectionHeader from "../../components/ProviderSectionHeader";
import ProviderRequestCard from "../../components/ProviderRequestCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import api from "../../api/axios";

const IncomingRequestsPage = () => {
  const { loading, requests, refresh } = useProviderWorkspace();

  const incomingRequests = requests.filter((item) => item.status === "Pending");

  const handleDecision = async (id, action) => {
    await api.post(`/providers/requests/${id}/action`, { action });
    await refresh();
  };

  if (loading) {
    return (
      <ProviderLayout title="Incoming Requests" subtitle="Review new repair requests waiting for a technician decision">
        <LoadingSpinner />
      </ProviderLayout>
    );
  }

  return (
    <ProviderLayout title="Incoming Requests" subtitle="Accept or reject new repair jobs after reviewing customer issue details and uploaded photos.">
      <div className="space-y-6">
        <ProviderSectionHeader
          eyebrow="Requests"
          title="New repair requests"
          text="Each request shows the customer, device type, issue summary, and uploaded image so you can decide quickly."
        />

        <div className="grid gap-4">
          {incomingRequests.map((request) => (
            <ProviderRequestCard
              key={request._id}
              request={request}
              primaryAction={
                <button
                  type="button"
                  onClick={() => handleDecision(request._id, "accept")}
                  className="rounded-full bg-success px-5 py-3 text-sm font-medium text-white"
                >
                  Accept
                </button>
              }
              secondaryAction={
                <button
                  type="button"
                  onClick={() => handleDecision(request._id, "reject")}
                  className="rounded-full bg-danger px-5 py-3 text-sm font-medium text-white"
                >
                  Reject
                </button>
              }
              detailsHref={`/provider/requests/${request._id}`}
            />
          ))}

          {incomingRequests.length === 0 && (
            <div className="surface-card p-10 text-center">
              <h2 className="text-2xl font-semibold">No incoming requests</h2>
              <p className="mt-3 text-sm text-[rgb(var(--color-text-soft))]">New requests will appear here when users assign repairs to your technician profile.</p>
            </div>
          )}
        </div>
      </div>
    </ProviderLayout>
  );
};

export default IncomingRequestsPage;
