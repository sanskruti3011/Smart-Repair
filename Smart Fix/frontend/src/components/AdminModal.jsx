const AdminModal = ({ open, title, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="surface-card w-full max-w-2xl p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-full border border-border px-3 py-1 text-sm text-[rgb(var(--color-text-soft))]">
            Close
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
};

export default AdminModal;
