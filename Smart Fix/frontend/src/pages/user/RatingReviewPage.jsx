import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import UserLayout from "../../layouts/UserLayout";
import UserSectionHeader from "../../components/UserSectionHeader";
import LoadingSpinner from "../../components/LoadingSpinner";

const RatingReviewPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    await api.post("/users/reviews", {
      requestId: id,
      providerId: request.provider?._id,
      rating,
      comment
    });
    setMessage("Review submitted successfully.");
  };

  if (loading) {
    return (
      <UserLayout title="Rating & Review" subtitle="Rate the completed repair service">
        <LoadingSpinner />
      </UserLayout>
    );
  }

  return (
    <UserLayout title="Rating & Review" subtitle="Share a star rating and written feedback after a completed repair.">
      <div className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
        <div className="surface-card p-8">
          <UserSectionHeader
            eyebrow="Review"
            title={`${request?.provider?.name || "Provider"} review`}
            text="Use this page to rate the provider from 1 to 5 stars and leave a comment about the completed repair experience."
          />
          <p className="mt-8 text-sm text-[rgb(var(--color-text-soft))]">
            Request: {request?.productType} | {request?.issueType}
          </p>
        </div>

        <div className="surface-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="text-sm font-medium text-[rgb(var(--color-text))]">Star Rating</p>
              <div className="mt-4 flex gap-3 text-4xl text-warning">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setRating(star)} className={star <= rating ? "opacity-100" : "opacity-25"}>
                    ★
                  </button>
                ))}
              </div>
            </div>
            <textarea className="input-field min-h-40" placeholder="Write your review" value={comment} onChange={(e) => setComment(e.target.value)} />
            {message && <p className="rounded-2xl bg-success/10 px-4 py-3 text-sm text-green-300">{message}</p>}
            <button type="submit" className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default RatingReviewPage;
