import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProviderLayout from "../../layouts/ProviderLayout";
import ProviderSectionHeader from "../../components/ProviderSectionHeader";
import LoadingSpinner from "../../components/LoadingSpinner";
import api from "../../api/axios";

const PriceProposalPage = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cost, setCost] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadRequest = async () => {
      try {
        const { data } = await api.get(`/repairs/${id}`);
        setRequest(data);
        setCost(data.proposedCost ? String(data.proposedCost) : "");
      } finally {
        setLoading(false);
      }
    };

    loadRequest();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await api.post(`/providers/requests/${id}/cost`, { cost: Number(cost || 0), note });
    setMessage("Price proposal submitted successfully.");
  };

  if (loading) {
    return (
      <ProviderLayout title="Price Proposal" subtitle="Submit repair costs for the selected job">
        <LoadingSpinner />
      </ProviderLayout>
    );
  }

  return (
    <ProviderLayout title="Price Proposal" subtitle="Share a repair estimate and optional note for the selected request.">
      <div className="grid gap-6 xl:grid-cols-[0.92fr,1.08fr]">
        <div className="surface-card p-8">
          <ProviderSectionHeader
            eyebrow="Pricing"
            title={request ? `${request.productType} | ${request.issueType}` : "Repair price proposal"}
            text="Use this page when you need to propose a repair cost or explain changes in diagnostics, parts, or labor."
          />
          <div className="mt-8 rounded-[24px] bg-panelAlt p-5">
            <p className="text-sm font-medium text-[rgb(var(--color-text))]">Customer</p>
            <p className="mt-2 text-sm text-[rgb(var(--color-text-soft))]">{request?.user?.fullName}</p>
            <p className="mt-2 text-sm text-[rgb(var(--color-text-soft))]">{request?.description}</p>
          </div>
        </div>

        <div className="surface-card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="input-field"
              type="number"
              min="0"
              placeholder="Enter repair cost"
              value={cost}
              onChange={(event) => setCost(event.target.value)}
            />
            <textarea
              className="input-field min-h-40"
              placeholder="Optional note for diagnostics, spare parts, or pricing reason"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
            {message && <p className="rounded-2xl bg-success/10 px-4 py-3 text-sm text-green-300">{message}</p>}
            <div className="flex flex-wrap gap-3">
              <button type="submit" className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white">
                Submit Price Proposal
              </button>
              <Link to={`/provider/requests/${id}`} className="rounded-full border border-border px-6 py-3 text-sm font-medium text-[rgb(var(--color-text-soft))]">
                Back to Job Details
              </Link>
            </div>
          </form>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default PriceProposalPage;
