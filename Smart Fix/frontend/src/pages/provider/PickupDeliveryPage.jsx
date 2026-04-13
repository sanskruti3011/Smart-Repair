import ProviderLayout from "../../layouts/ProviderLayout";
import { useProviderWorkspace } from "../../hooks/useProviderWorkspace";
import ProviderSectionHeader from "../../components/ProviderSectionHeader";
import ProviderRequestCard from "../../components/ProviderRequestCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import api from "../../api/axios";
import { getDeliveryStage } from "../../utils/providerWorkspace";

const PickupDeliveryPage = () => {
  const { loading, requests, refresh } = useProviderWorkspace();

  const deliveryJobs = requests.filter((item) => ["Approved", "Picked Up", "In Progress", "Completed", "Delivered", "Closed"].includes(item.status));

  const updateDelivery = async (id, status, note) => {
    await api.patch(`/providers/requests/${id}/status`, { status, note });
    await refresh();
  };

  if (loading) {
    return (
      <ProviderLayout title="Pickup & Delivery" subtitle="Track pickup, repair handoff, and delivery stages">
        <LoadingSpinner />
      </ProviderLayout>
    );
  }

  return (
    <ProviderLayout title="Pickup & Delivery" subtitle="Manage jobs that need pickup, are in transit, delivered, or finally closed.">
      <div className="space-y-6">
        <ProviderSectionHeader
          eyebrow="Logistics"
          title="Pickup and delivery workflow"
          text="Each job includes the customer address and a delivery stage so you can handle handoff cleanly."
        />

        <div className="grid gap-4">
          {deliveryJobs.map((request) => (
            <ProviderRequestCard
              key={request._id}
              request={request}
              primaryAction={
                request.status === "Approved" ? (
                  <button
                    type="button"
                    onClick={() => updateDelivery(request._id, "Picked Up", "Device picked up from customer")}
                    className="rounded-full bg-sky-500 px-5 py-3 text-sm font-medium text-white"
                  >
                    Mark Picked Up
                  </button>
                ) : request.status === "Completed" ? (
                  <button
                    type="button"
                    onClick={() => updateDelivery(request._id, "Completed", "Repair completed and device is out for delivery")}
                    className="rounded-full bg-violet-500 px-5 py-3 text-sm font-medium text-white"
                  >
                    Out for Delivery
                  </button>
                ) : null
              }
              secondaryAction={
                request.status === "Completed" ? (
                  <button
                    type="button"
                    onClick={() => updateDelivery(request._id, "Delivered", "Device delivered back to customer")}
                    className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white"
                  >
                    Delivered
                  </button>
                ) : request.status === "Delivered" ? (
                  <button
                    type="button"
                    onClick={() => updateDelivery(request._id, "Closed", "Repair request closed after successful delivery")}
                    className="rounded-full bg-teal-500 px-5 py-3 text-sm font-medium text-white"
                  >
                    Close Request
                  </button>
                ) : null
              }
              detailsHref={`/provider/requests/${request._id}`}
              footer={
                <div className="rounded-[22px] bg-panelAlt p-4 text-sm text-[rgb(var(--color-text-soft))]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Delivery Stage</p>
                  <p className="mt-3">{getDeliveryStage(request)}</p>
                </div>
              }
            />
          ))}
        </div>
      </div>
    </ProviderLayout>
  );
};

export default PickupDeliveryPage;
