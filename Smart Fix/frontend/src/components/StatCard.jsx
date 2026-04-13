const StatCard = ({ title, value, subtitle }) => (
  <div className="surface-card p-5">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{title}</p>
    <h3 className="mt-5 text-4xl font-semibold tracking-tight text-[rgb(var(--color-text))]">{value}</h3>
    <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{subtitle}</p>
  </div>
);

export default StatCard;
