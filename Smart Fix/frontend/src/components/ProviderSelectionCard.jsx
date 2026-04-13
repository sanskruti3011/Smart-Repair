const ProviderSelectionCard = ({ provider, onSelect, selected }) => (
  <button
    type="button"
    onClick={() => onSelect(provider)}
    className={`w-full rounded-2xl border p-5 text-left transition ${
      selected ? "border-accent bg-accent/10 shadow-[0_20px_50px_rgba(14,116,144,0.12)]" : "border-border bg-panel hover:border-accent/50"
    }`}
  >
    <div className="flex items-start justify-between gap-3">
      <div>
        <h3 className="text-xl font-semibold tracking-tight text-[rgb(var(--color-text))]">{provider.name}</h3>
        <p className="mt-1 text-sm text-muted">{provider.location}</p>
      </div>
      <span className="rounded-full bg-panelAlt px-3 py-1 text-xs text-[rgb(var(--color-text-soft))]">
        {provider.averageRating || 0} ★
      </span>
    </div>
    <div className="mt-4 flex flex-wrap gap-2">
      {provider.skills?.map((skill) => (
        <span key={skill} className="rounded-full bg-panelAlt px-3 py-1 text-xs text-[rgb(var(--color-text-soft))]">
          {skill}
        </span>
      ))}
    </div>
    <p className="mt-4 text-sm text-[rgb(var(--color-text-soft))]">
      {provider.experience} years experience • {provider.totalReviews || 0} reviews
    </p>
  </button>
);

export default ProviderSelectionCard;
