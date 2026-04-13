import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/axios";
import UserLayout from "../../layouts/UserLayout";
import UserSectionHeader from "../../components/UserSectionHeader";
import LoadingSpinner from "../../components/LoadingSpinner";

const PriceConfirmationPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadRequest = async () => {
      try {
        const { data } = await api.get(`/repairs/${id}`);
        setRequest(data);
      } finally {
        setLoading(false);
      }
    };

    loadRequest();
  }, [id]);

  const handleDecision = async (approve) => {
    await api.post(`/repairs/${id}/confirm-price`, { approve });
    setMessage(approve ? "Price accepted successfully." : "Price rejected successfully.");
  };

  if (loading) {
    return (
      <UserLayout title="Price Confirmation" subtitle="Review and confirm the technician's proposed repair cost">
        <LoadingSpinner />
      </UserLayout>
    );
  }

  return (
    <UserLayout title="Price Confirmation" subtitle="Check the proposed repair cost and decide whether to accept or reject the provider estimate.">
      <div className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
        <div className="surface-card p-8">
          <UserSectionHeader
            eyebrow="Price Review"
            title={`${request?.productType} | ${request?.issueType}`}
            text="This page focuses only on cost confirmation so the customer can clearly review the proposed amount before repair work continues."
          />
          <div className="mt-8 rounded-[24px] bg-panelAlt p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Provider Details</p>
            <p className="mt-3 text-lg font-semibold">{request?.provider?.name}</p>
            <p className="mt-2 text-sm text-[rgb(var(--color-text-soft))]">{request?.provider?.location || "Location not specified"}</p>
            <p className="mt-2 text-sm text-[rgb(var(--color-text-soft))]">Rating: {request?.provider?.averageRating || 0} / 5</p>
          </div>
        </div>

        <div className="surface-card p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Proposed Repair Cost</p>
          <p className="mt-5 text-5xl font-semibold tracking-tight">Rs. {request?.proposedCost || 0}</p>
          <p className="mt-4 text-sm leading-7 text-[rgb(var(--color-text-soft))]">
            The provider has proposed this price for the repair. Accept it to continue, or reject it if you do not want to proceed with the updated estimate.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => handleDecision(true)} className="rounded-full bg-success px-6 py-3 text-sm font-medium text-white">
              Accept Price
            </button>
            <button type="button" onClick={() => handleDecision(false)} className="rounded-full border border-border px-6 py-3 text-sm font-medium text-[rgb(var(--color-text-soft))]">
              Reject Price
            </button>
            <Link to={`/user/requests/${id}`} className="rounded-full border border-border bg-panelAlt px-6 py-3 text-sm font-medium text-[rgb(var(--color-text))]">
              Back to Request
            </Link>
          </div>
          {message && <p className="mt-5 rounded-2xl bg-success/10 px-4 py-3 text-sm text-green-300">{message}</p>}
        </div>
      </div>
    </UserLayout>
  );
};

export default PriceConfirmationPage;
