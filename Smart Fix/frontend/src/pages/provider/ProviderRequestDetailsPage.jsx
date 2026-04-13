import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/axios";
import ProviderLayout from "../../layouts/ProviderLayout";
import LoadingSpinner from "../../components/LoadingSpinner";
import StatusTimeline from "../../components/StatusTimeline";
import { resolveMediaUrl } from "../../utils/media";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../hooks/useSocket";
import ProviderSectionHeader from "../../components/ProviderSectionHeader";
import ProviderStatusBadge from "../../components/ProviderStatusBadge";
import { finalJobStatuses, getDeliveryStage, getNextJobStatusOptions } from "../../utils/providerWorkspace";

const ProviderRequestDetailsPage = () => {
  const { id } = useParams();
  const { authUser } = useAuth();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusDraft, setStatusDraft] = useState("");
  const [message, setMessage] = useState("");

  const loadRequest = useCallback(async () => {
    const { data } = await api.get(`/repairs/${id}`);
    setRequest(data);
    setStatusDraft(getNextJobStatusOptions(data.status)[0] || "");
  }, [id]);

  useEffect(() => {
    const initialize = async () => {
      try {
        await loadRequest();
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [loadRequest]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      loadRequest();
    }, 15000);

    return () => window.clearInterval(intervalId);
  }, [loadRequest]);

  useSocket(authUser, (notification) => {
    if (notification?.metadata?.requestId === id) {
      loadRequest();
    }
  });

  const nextStatusOptions = useMemo(() => getNextJobStatusOptions(request?.status), [request?.status]);
  const latestNote = request?.statusHistory?.[request.statusHistory.length - 1]?.note || "Awaiting technician update";
  const canAcceptReject = request?.status === "Pending";
  const canUpdateStatus = nextStatusOptions.length > 0;

  const handleAction = async (action) => {
    await api.post(`/providers/requests/${id}/action`, { action });
    setMessage(action === "accept" ? "Request accepted." : "Request rejected.");
    await loadRequest();
  };

  const handleStatus = async () => {
    if (!statusDraft) return;
    await api.patch(`/providers/requests/${id}/status`, { status: statusDraft, note: `Technician updated status to ${statusDraft}` });
    setMessage(`Status updated to ${statusDraft}.`);
    await loadRequest();
  };

  if (loading) {
    return (
      <ProviderLayout title="Job Details" subtitle="Detailed technician view for one request">
        <LoadingSpinner />
      </ProviderLayout>
    );
  }

  if (!request) {
    return (
      <ProviderLayout title="Job Details" subtitle="Detailed technician view for one request">
        <div className="surface-card p-8">
          <h2 className="text-2xl font-semibold">Request not found</h2>
          <Link to="/provider/jobs" className="mt-4 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-medium text-white">
            Back to My Jobs
          </Link>
        </div>
      </ProviderLayout>
    );
  }

  return (
    <ProviderLayout
      title="Job Details"
      subtitle="Review user details, device issue, uploaded image, pricing, and the full status timeline for one request."
      actions={
        ["Accepted", "Price Proposed"].includes(request.status) ? (
          <Link to={`/provider/requests/${id}/pricing`} className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white">
            Open Price Proposal
          </Link>
        ) : null
      }
    >
      <div className="space-y-6">
        <ProviderSectionHeader
          eyebrow="Detailed View"
          title={`${request.productType} | ${request.issueType}`}
          text="This page holds the full technician workflow for one repair request, including decision actions, pricing navigation, and status updates."
        />

        <div className="grid gap-6 xl:grid-cols-[1fr,420px]">
          <section className="space-y-6">
            <div className="grid gap-4 md:grid-cols-[280px_minmax(0,1fr)]">
              {request.imageUrl ? (
                <img src={resolveMediaUrl(request.imageUrl)} alt={request.issueType} className="h-72 w-full rounded-[24px] border border-border object-cover" />
              ) : (
                <div className="flex h-72 items-center justify-center rounded-[24px] border border-dashed border-border bg-panelAlt text-sm text-[rgb(var(--color-text-soft))]">
                  No issue image uploaded
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="surface-card-soft p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">User Info</p>
                  <p className="mt-4 text-lg font-semibold">{request.user?.fullName}</p>
                  <p className="mt-2 text-sm text-muted">{request.user?.phone || "Phone not available"}</p>
                  <p className="mt-1 text-sm text-muted">{request.user?.email || "Email not available"}</p>
                  <p className="mt-1 text-sm text-muted">{request.user?.address || "Address not available"}</p>
                </div>
                <div className="surface-card-soft p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Price Info</p>
                  <p className="mt-4 text-sm text-muted">Proposed cost: Rs. {request.proposedCost || 0}</p>
                  <p className="mt-2 text-sm text-muted">Approved cost: Rs. {request.approvedCost || 0}</p>
                  <p className="mt-2"><ProviderStatusBadge status={request.status} /></p>
                  <p className="mt-2 text-sm text-muted">Delivery stage: {getDeliveryStage(request)}</p>
                </div>
              </div>
            </div>

            <div className="surface-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Issue Description</p>
              <p className="mt-4 text-base leading-8 text-[rgb(var(--color-text-soft))]">{request.description}</p>
            </div>

            <div className="surface-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Latest Note</p>
              <p className="mt-4 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{latestNote}</p>
            </div>

            <StatusTimeline currentStatus={request.status} history={request.statusHistory} />
          </section>

          <section className="space-y-4">
            {canAcceptReject && (
              <div className="surface-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Incoming Request Actions</p>
                <div className="mt-5 grid gap-3">
                  <button type="button" onClick={() => handleAction("accept")} className="rounded-full bg-success px-5 py-3 text-sm font-medium text-white">
                    Accept
                  </button>
                  <button type="button" onClick={() => handleAction("reject")} className="rounded-full bg-danger px-5 py-3 text-sm font-medium text-white">
                    Reject
                  </button>
                </div>
              </div>
            )}

            {canUpdateStatus && (
              <div className="surface-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Update Status</p>
                <select className="input-field mt-5" value={statusDraft} onChange={(event) => setStatusDraft(event.target.value)}>
                  {nextStatusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <button type="button" onClick={handleStatus} className="mt-4 w-full rounded-full border border-border px-5 py-3 text-sm font-medium text-[rgb(var(--color-text-soft))]">
                  Update Status
                </button>
              </div>
            )}

            {!canAcceptReject && !canUpdateStatus && (
              <div className="surface-card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Final State</p>
                <p className="mt-4 text-sm leading-7 text-[rgb(var(--color-text-soft))]">
                  {finalJobStatuses.includes(request.status)
                    ? "This request has reached a final state, so no more technician actions are available."
                    : "No immediate action is available right now."}
                </p>
              </div>
            )}

            {message && <p className="rounded-2xl bg-accent/10 px-4 py-3 text-sm text-sky-200">{message}</p>}
          </section>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ProviderRequestDetailsPage;
