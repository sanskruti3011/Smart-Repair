import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/axios";
import UserLayout from "../../layouts/UserLayout";
import LoadingSpinner from "../../components/LoadingSpinner";
import StatusTimeline from "../../components/StatusTimeline";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../hooks/useSocket";
import { resolveMediaUrl } from "../../utils/media";
import UserSectionHeader from "../../components/UserSectionHeader";
import UserStatusBadge from "../../components/UserStatusBadge";

const UserRequestDetailsPage = () => {
  const { id } = useParams();
  const { authUser } = useAuth();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadRequest = useCallback(async () => {
    const { data } = await api.get(`/repairs/${id}`);
    setRequest(data);
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

  const handleCancel = () => {
    setMessage("");
    api.patch(`/repairs/${id}/cancel`).then(async () => {
      setMessage("Request cancelled successfully.");
      await loadRequest();
    });
  };

  if (loading) {
    return (
      <UserLayout title="Request Details" subtitle="Detailed view of one repair request">
        <LoadingSpinner />
      </UserLayout>
    );
  }

  if (!request) {
    return (
      <UserLayout title="Request Details" subtitle="Detailed view of one repair request">
        <div className="surface-card p-8">
          <h2 className="text-2xl font-semibold">Request not found</h2>
          <Link to="/user/requests" className="mt-4 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-medium text-white">
            Back to my requests
          </Link>
        </div>
      </UserLayout>
    );
  }

  const latestNote = request.statusHistory?.[request.statusHistory.length - 1]?.note || "Awaiting update";

  return (
    <UserLayout
      title="Request Details"
      subtitle="Review device info, provider details, uploaded images, price info, and the full request timeline."
      actions={
        request.status === "Price Proposed" ? (
          <Link to={`/user/requests/${id}/price`} className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white">
            Open Price Confirmation
          </Link>
        ) : null
      }
    >
      <div className="space-y-6">
        <UserSectionHeader
          eyebrow="Detailed Request"
          title={`${request.productType} | ${request.issueType}`}
          text="This page gives one clear view of your repair request, including provider information, pricing, uploaded images, and status progress."
        />

        <div className="grid gap-6 xl:grid-cols-[1fr,0.95fr]">
          <section className="space-y-6">
            {request.imageUrl ? (
              <img src={resolveMediaUrl(request.imageUrl)} alt={request.issueType} className="h-[320px] w-full rounded-[28px] border border-border object-cover" />
            ) : (
              <div className="flex h-[320px] items-center justify-center rounded-[28px] border border-dashed border-border bg-panelAlt text-sm text-[rgb(var(--color-text-soft))]">
                No uploaded issue image
              </div>
            )}

            <div className="surface-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Issue Description</p>
              <p className="mt-4 text-base leading-8 text-[rgb(var(--color-text-soft))]">{request.description}</p>
            </div>

            <StatusTimeline currentStatus={request.status} history={request.statusHistory} />
          </section>

          <section className="space-y-4">
            <div className="surface-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Provider Info</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">{request.provider?.name}</h2>
              <div className="mt-4 grid gap-3 text-sm text-[rgb(var(--color-text-soft))]">
                <p>Location: {request.provider?.location || "Not specified"}</p>
                <p>Skills: {(request.provider?.skills || []).join(", ") || "Not specified"}</p>
                <p>Rating: {request.provider?.averageRating || 0} / 5</p>
              </div>
            </div>

            <div className="surface-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Price Details</p>
              <div className="mt-4 grid gap-3 text-sm text-[rgb(var(--color-text-soft))]">
                <p>Status: <span className="ml-2"><UserStatusBadge status={request.status} /></span></p>
                <p>Proposed cost: Rs. {request.proposedCost || 0}</p>
                <p>Approved cost: Rs. {request.approvedCost || 0}</p>
                <p>Service address: {request.serviceAddress || request.user?.address || "Not available"}</p>
                <p>Submitted: {new Date(request.createdAt).toLocaleString("en-IN")}</p>
                <p>Last update: {new Date(request.updatedAt).toLocaleString("en-IN")}</p>
              </div>
            </div>

            <div className="surface-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Latest Note</p>
              <p className="mt-4 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{latestNote}</p>
            </div>

            <div className="surface-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Actions</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {request.status === "Price Proposed" && (
                  <Link to={`/user/requests/${id}/price`} className="rounded-full bg-success px-5 py-3 text-sm font-medium text-white">
                    Approve Price
                  </Link>
                )}
                {["Delivered", "Closed"].includes(request.status) && (
                  <Link to={`/user/requests/${id}/review`} className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white">
                    Leave Review
                  </Link>
                )}
                {!["Cancelled", "Rejected", "Completed", "Delivered", "Closed"].includes(request.status) && (
                  <button type="button" onClick={handleCancel} className="rounded-full border border-border px-5 py-3 text-sm font-medium text-[rgb(var(--color-text-soft))]">
                    Cancel Request
                  </button>
                )}
              </div>
            </div>

            {message && <p className="rounded-2xl bg-accent/10 px-4 py-3 text-sm text-sky-200">{message}</p>}
          </section>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserRequestDetailsPage;
