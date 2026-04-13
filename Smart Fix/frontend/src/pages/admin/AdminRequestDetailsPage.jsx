import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import LoadingSpinner from "../../components/LoadingSpinner";
import StatusTimeline from "../../components/StatusTimeline";
import AdminSectionHeader from "../../components/AdminSectionHeader";
import AdminStatusBadge from "../../components/AdminStatusBadge";
import api from "../../api/axios";
import { resolveMediaUrl } from "../../utils/media";

const AdminRequestDetailsPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState(null);

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

  if (loading) {
    return (
      <AdminLayout title="Request Details" subtitle="Full admin view of one repair request">
        <LoadingSpinner />
      </AdminLayout>
    );
  }

  if (!request) {
    return (
      <AdminLayout title="Request Details" subtitle="Full admin view of one repair request">
        <div className="surface-card p-8">
          <h2 className="text-2xl font-semibold">Request not found</h2>
          <Link to="/admin/requests" className="mt-4 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-medium text-white">
            Back to Requests
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Request Details" subtitle="Review full user, provider, device, pricing, status, and uploaded image information for one repair request.">
      <div className="space-y-6">
        <AdminSectionHeader
          eyebrow="Detailed Request"
          title={`${request.productType} | ${request.issueType}`}
          text="This page gives admins a complete request view for monitoring, auditing, or dispute review."
        />

        <div className="grid gap-6 xl:grid-cols-[1fr,0.95fr]">
          <section className="space-y-6">
            {request.imageUrl ? (
              <img src={resolveMediaUrl(request.imageUrl)} alt={request.issueType} className="h-[320px] w-full rounded-[28px] border border-border object-cover" />
            ) : (
              <div className="flex h-[320px] items-center justify-center rounded-[28px] border border-dashed border-border bg-panelAlt text-sm text-[rgb(var(--color-text-soft))]">
                No uploaded image
              </div>
            )}

            <div className="surface-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Device & Issue</p>
              <p className="mt-4 text-base leading-8 text-[rgb(var(--color-text-soft))]">{request.description}</p>
            </div>

            <StatusTimeline currentStatus={request.status} history={request.statusHistory} />
          </section>

          <section className="space-y-4">
            <div className="surface-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">User Details</p>
              <div className="mt-4 grid gap-2 text-sm text-[rgb(var(--color-text-soft))]">
                <p>Name: {request.user?.fullName || "Unknown"}</p>
                <p>Email: {request.user?.email || "Not available"}</p>
                <p>Phone: {request.user?.phone || "Not available"}</p>
                <p>Address: {request.serviceAddress || request.user?.address || "Not available"}</p>
              </div>
            </div>

            <div className="surface-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Provider Details</p>
              <div className="mt-4 grid gap-2 text-sm text-[rgb(var(--color-text-soft))]">
                <p>Name: {request.provider?.name || "Unassigned"}</p>
                <p>Email: {request.provider?.email || "Not available"}</p>
              </div>
            </div>

            <div className="surface-card p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Price Info</p>
              <div className="mt-4 grid gap-2 text-sm text-[rgb(var(--color-text-soft))]">
                <p>Status: <span className="ml-2"><AdminStatusBadge status={request.status} /></span></p>
                <p>Proposed cost: Rs. {request.proposedCost || 0}</p>
                <p>Approved cost: Rs. {request.approvedCost || 0}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminRequestDetailsPage;
