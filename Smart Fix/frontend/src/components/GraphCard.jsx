const GraphCard = ({ title, items = [] }) => {
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="surface-card p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Insights</p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-[rgb(var(--color-text))]">{title}</h3>
      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[rgb(var(--color-text-soft))]">{item.label}</span>
              <span className="font-medium text-[rgb(var(--color-text))]">{item.value}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-panelAlt">
              <div
                className="h-full rounded-full bg-accent transition-all"
                style={{ width: `${Math.max((item.value / max) * 100, 8)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphCard;
