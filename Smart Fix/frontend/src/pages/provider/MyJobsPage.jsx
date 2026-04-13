import { useMemo, useState } from "react";
import ProviderLayout from "../../layouts/ProviderLayout";
import { useProviderWorkspace } from "../../hooks/useProviderWorkspace";
import ProviderSectionHeader from "../../components/ProviderSectionHeader";
import ProviderRequestCard from "../../components/ProviderRequestCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import api from "../../api/axios";

const filters = ["Approved", "In Progress", "Completed"];

const MyJobsPage = () => {
  const { loading, requests, refresh } = useProviderWorkspace();
  const [activeFilter, setActiveFilter] = useState("Approved");

  const jobs = useMemo(() => {
    if (activeFilter === "Completed") {
      return requests.filter((item) => ["Completed", "Delivered", "Closed"].includes(item.status));
    }
    return requests.filter((item) => item.status === activeFilter);
  }, [activeFilter, requests]);

  const handleStatus = async (id, status, note) => {
    await api.patch(`/providers/requests/${id}/status`, { status, note });
    await refresh();
  };

  if (loading) {
    return (
      <ProviderLayout title="My Jobs" subtitle="Track approved and active technician jobs">
        <LoadingSpinner />
      </ProviderLayout>
    );
  }

  return (
    <ProviderLayout title="My Jobs" subtitle="Filter approved, active, and completed jobs and move them through pickup, repair, and delivery.">
      <div className="space-y-6">
        <ProviderSectionHeader
          eyebrow="Jobs"
          title="Manage active repair jobs"
          text="Use filters to focus on approved jobs ready for pickup, work currently in progress, or completed jobs ready for delivery."
          actions={filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${activeFilter === filter ? "bg-accent text-white" : "border border-border bg-panelAlt text-[rgb(var(--color-text-soft))]"}`}
            >
              {filter}
            </button>
          ))}
        />

        <div className="grid gap-4">
          {jobs.map((request) => (
            <ProviderRequestCard
              key={request._id}
              request={request}
              primaryAction={
                request.status === "Approved" ? (
                  <button
                    type="button"
                    onClick={() => handleStatus(request._id, "Picked Up", "Device picked up from customer")}
                    className="rounded-full bg-sky-500 px-5 py-3 text-sm font-medium text-white"
                  >
                    Mark Picked Up
                  </button>
                ) : request.status === "Picked Up" ? (
                  <button
                    type="button"
                    onClick={() => handleStatus(request._id, "In Progress", "Repair started by technician")}
                    className="rounded-full bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                  >
                    Start Repair
                  </button>
                ) : request.status === "In Progress" ? (
                  <button
                    type="button"
                    onClick={() => handleStatus(request._id, "Completed", "Repair marked completed by technician")}
                    className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white"
                  >
                    Mark Completed
                  </button>
                ) : null
              }
              detailsHref={`/provider/requests/${request._id}`}
            />
          ))}

          {jobs.length === 0 && (
            <div className="surface-card p-10 text-center">
              <h2 className="text-2xl font-semibold">No jobs in this filter</h2>
              <p className="mt-3 text-sm text-[rgb(var(--color-text-soft))]">Switch filters to review other technician work states.</p>
            </div>
          )}
        </div>
      </div>
    </ProviderLayout>
  );
};

export default MyJobsPage;
