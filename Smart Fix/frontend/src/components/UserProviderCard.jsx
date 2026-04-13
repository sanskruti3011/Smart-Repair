import { Link } from "react-router-dom";

const renderStars = (value) => {
  const rounded = Math.round(value || 0);
  return "★★★★★".split("").map((star, index) => (
    <span key={`${star}-${index}`} className={index < rounded ? "opacity-100" : "opacity-25"}>{star}</span>
  ));
};

const UserProviderCard = ({ provider, selected, onSelect, showSelectLink = false }) => (
  <div className={`surface-card p-5 transition ${selected ? "border-accent shadow-[0_20px_50px_rgba(14,116,144,0.16)]" : ""}`}>
    <div className="flex items-start justify-between gap-3">
      <div>
        <h3 className="text-xl font-semibold tracking-tight">{provider.name}</h3>
        <p className="mt-1 text-sm text-[rgb(var(--color-text-soft))]">{provider.location}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-[rgb(var(--color-text))]">{provider.averageRating || 0}/5</p>
        <div className="mt-1 flex text-warning">{renderStars(provider.averageRating || 0)}</div>
      </div>
    </div>

    <div className="mt-4 flex flex-wrap gap-2">
      {(provider.skills || []).map((skill) => (
        <span key={skill} className="rounded-full bg-panelAlt px-3 py-1 text-xs text-[rgb(var(--color-text-soft))]">
          {skill}
        </span>
      ))}
    </div>

    <p className="mt-4 text-sm leading-7 text-[rgb(var(--color-text-soft))]">
      {provider.experience || 0} years experience • {provider.totalReviews || 0} reviews
    </p>

    <div className="mt-5 flex flex-wrap gap-3">
      {onSelect && (
        <button
          type="button"
          onClick={() => onSelect(provider)}
          className={`rounded-full px-4 py-2 text-sm font-medium ${selected ? "bg-accent text-white" : "border border-border bg-panelAlt text-[rgb(var(--color-text-soft))]"}`}
        >
          {selected ? "Selected" : "Select Provider"}
        </button>
      )}
      {showSelectLink && (
        <Link to={`/user/book?provider=${provider._id}`} className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white">
          Select Provider
        </Link>
      )}
    </div>
  </div>
);

export default UserProviderCard;
