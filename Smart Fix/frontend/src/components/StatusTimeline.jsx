const statusSteps = ["Pending", "Accepted", "Price Proposed", "Approved", "Picked Up", "In Progress", "Completed", "Delivered", "Closed"];

const StatusTimeline = ({ currentStatus, history = [] }) => {
  const currentIndex = statusSteps.indexOf(currentStatus);

  return (
    <div className="rounded-2xl border border-border bg-panel p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {statusSteps.map((step, index) => {
          const active = currentIndex >= index;
          return (
            <div key={step} className="flex flex-1 items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${active ? "border-accent bg-accent text-white" : "border-border bg-panelAlt text-muted"}`}>
                {index + 1}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-[rgb(var(--color-text))]">{step}</p>
                <p className="text-xs text-muted">{history.find((item) => item.label === step)?.note || "Awaiting update"}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTimeline;
