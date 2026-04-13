import UserLayout from "../../layouts/UserLayout";
import { useUserWorkspace } from "../../hooks/useUserWorkspace";
import UserSectionHeader from "../../components/UserSectionHeader";
import UserRequestCard from "../../components/UserRequestCard";
import LoadingSpinner from "../../components/LoadingSpinner";

const MyRepairRequestsPage = () => {
  const { loading, requests } = useUserWorkspace();

  if (loading) {
    return (
      <UserLayout title="My Requests" subtitle="Track every repair request from one page">
        <LoadingSpinner />
      </UserLayout>
    );
  }

  return (
    <UserLayout title="My Requests" subtitle="View all repair requests with device type, issue, provider info, and color-coded status badges.">
      <div className="space-y-6">
        <UserSectionHeader
          eyebrow="Requests"
          title="My repair requests"
          text="Open each request to see uploaded images, provider details, pricing, and the full status timeline."
        />

        <div className="grid gap-4">
          {requests.map((request) => (
            <UserRequestCard key={request._id} request={request} detailsHref={`/user/requests/${request._id}`} />
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default MyRepairRequestsPage;
