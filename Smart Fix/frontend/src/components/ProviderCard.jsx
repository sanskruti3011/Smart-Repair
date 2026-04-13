const ProviderCard = ({ provider, onSelect, selected }) => (
  <button
    type="button"
    onClick={() => onSelect(provider)}
    className={`w-full rounded-2xl border p-5 text-left transition ${selected ? "border-accent bg-accent/10" : "border-border bg-panel hover:border-slate-500"}`}
  >
    <div className="flex items-start justify-between gap-3">
      <div>
        <h3 className="text-lg font-semibold text-white">{provider.name}</h3>
        <p className="mt-1 text-sm text-muted">{provider.location}</p>
      </div>
      <span className="rounded-full bg-panelAlt px-3 py-1 text-xs text-slate-200">{provider.averageRating || 0} ★</span>
    </div>
    <div className="mt-4 flex flex-wrap gap-2">
      {provider.skills?.map((skill) => (
        <span key={skill} className="rounded-full bg-panelAlt px-3 py-1 text-xs text-slate-300">
          {skill}
        </span>
      ))}
    </div>
    <p className="mt-4 text-sm text-slate-400">{provider.experience} years experience • {provider.totalReviews || 0} reviews</p>
  </button>
);

export default ProviderCard;
