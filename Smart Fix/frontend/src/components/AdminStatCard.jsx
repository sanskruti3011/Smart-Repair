const AdminStatCard = ({ title, value, subtitle, accent = "text-accent" }) => (
  <div className="surface-card p-5">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{title}</p>
    <p className={`mt-4 text-4xl font-semibold tracking-tight ${accent}`}>{value}</p>
    <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{subtitle}</p>
  </div>
);

export default AdminStatCard;
