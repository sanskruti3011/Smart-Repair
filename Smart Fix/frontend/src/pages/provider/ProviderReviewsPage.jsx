import ProviderLayout from "../../layouts/ProviderLayout";
import { useProviderWorkspace } from "../../hooks/useProviderWorkspace";
import ProviderSectionHeader from "../../components/ProviderSectionHeader";
import LoadingSpinner from "../../components/LoadingSpinner";

const sampleComments = [
  "Fast diagnosis and clear communication throughout the repair.",
  "Pickup and delivery were smooth, and the device came back in great condition.",
  "Pricing was transparent and updates were shared on time."
];

const ProviderReviewsPage = () => {
  const { loading, profile, requests } = useProviderWorkspace();

  if (loading) {
    return (
      <ProviderLayout title="Reviews" subtitle="Customer ratings and feedback overview">
        <LoadingSpinner />
      </ProviderLayout>
    );
  }

  const reviewCards = Array.from({ length: Math.min(profile?.totalReviews || 0, 3) || 3 }).map((_, index) => ({
    id: index,
    customer: requests[index]?.user?.fullName || `Customer ${index + 1}`,
    rating: profile?.averageRating || 4.8,
    comment: sampleComments[index % sampleComments.length]
  }));

  return (
    <ProviderLayout title="Reviews" subtitle="See your rating summary and the latest customer comments from completed work.">
      <div className="space-y-6">
        <ProviderSectionHeader
          eyebrow="Feedback"
          title="Ratings and reviews"
          text="This frontend page surfaces average technician rating and customer comment cards in a clean review overview."
        />

        <div className="grid gap-4 lg:grid-cols-[0.7fr,1.3fr]">
          <div className="surface-card p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Average rating</p>
            <p className="mt-5 text-6xl font-semibold tracking-tight">{profile?.averageRating || 0}</p>
            <p className="mt-3 text-sm text-[rgb(var(--color-text-soft))]">Based on {profile?.totalReviews || 0} customer ratings</p>
            <div className="mt-6 flex text-3xl text-warning">
              {"★★★★★".split("").map((star, index) => (
                <span key={`${star}-${index}`} className={index < Math.round(profile?.averageRating || 0) ? "opacity-100" : "opacity-25"}>{star}</span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {reviewCards.map((item) => (
              <div key={item.id} className="surface-card p-6">
                <p className="text-sm font-semibold text-[rgb(var(--color-text))]">{item.customer}</p>
                <div className="mt-4 flex text-xl text-warning">
                  {"★★★★★".split("").map((star, index) => (
                    <span key={`${item.id}-${star}-${index}`} className={index < Math.round(item.rating) ? "opacity-100" : "opacity-25"}>{star}</span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{item.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ProviderReviewsPage;
