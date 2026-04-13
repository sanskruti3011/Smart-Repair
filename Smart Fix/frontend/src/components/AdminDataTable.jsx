const AdminDataTable = ({ columns = [], rows = [], emptyText = "No records found.", pagination }) => (
  <div className="surface-card overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-panelAlt/80">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--color-text-soft))]">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-5 py-10 text-center text-sm text-[rgb(var(--color-text-soft))]">
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => (
              <tr key={row.id || rowIndex} className="border-t border-border">
                {columns.map((column) => (
                  <td key={column.key} className="px-5 py-4 align-top text-sm text-[rgb(var(--color-text))]">
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    {pagination && (
      <div className="flex items-center justify-between border-t border-border px-5 py-4 text-sm text-[rgb(var(--color-text-soft))]">
        <span>{pagination.label}</span>
        <div className="flex gap-2">
          <button type="button" onClick={pagination.onPrevious} disabled={pagination.page <= 1} className="rounded-full border border-border px-3 py-1 disabled:opacity-50">
            Previous
          </button>
          <button type="button" onClick={pagination.onNext} disabled={pagination.page >= pagination.totalPages} className="rounded-full border border-border px-3 py-1 disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    )}
  </div>
);

export default AdminDataTable;
