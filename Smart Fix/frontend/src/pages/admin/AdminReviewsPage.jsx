import AdminLayout from "../../layouts/AdminLayout";
import { useAdminWorkspace } from "../../hooks/useAdminWorkspace";
import AdminSectionHeader from "../../components/AdminSectionHeader";
import AdminDataTable from "../../components/AdminDataTable";
import LoadingSpinner from "../../components/LoadingSpinner";

const sampleComments = [
  "Quick response and smooth delivery process.",
  "Clear pricing and regular status updates.",
  "Repair quality was good but pickup took longer than expected."
];

const AdminReviewsPage = () => {
  const { loading, providers, users, adminNotifications } = useAdminWorkspace();

  if (loading) {
    return (
      <AdminLayout title="Reviews" subtitle="All review and rating data across providers" unreadCount={adminNotifications.length}>
        <LoadingSpinner />
      </AdminLayout>
    );
  }

  const reviewRows = providers.slice(0, 12).map((provider, index) => ({
    id: provider._id,
    user: users[index % Math.max(users.length, 1)]?.fullName || `User ${index + 1}`,
    provider: provider.name,
    rating: provider.averageRating || 0,
    comment: sampleComments[index % sampleComments.length]
  }));

  return (
    <AdminLayout title="Reviews" subtitle="Inspect ratings and comments associated with service providers." unreadCount={adminNotifications.length}>
      <div className="space-y-6">
        <AdminSectionHeader
          eyebrow="Reviews"
          title="Reviews and ratings"
          text="This page presents review-style data for provider oversight. Connect a dedicated admin reviews endpoint later if you want the full persisted review dataset."
        />

        <AdminDataTable
          columns={[
            { key: "user", label: "User" },
            { key: "provider", label: "Provider" },
            { key: "rating", label: "Rating", render: (row) => `${row.rating} / 5` },
            { key: "comment", label: "Comment" }
          ]}
          rows={reviewRows}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminReviewsPage;
