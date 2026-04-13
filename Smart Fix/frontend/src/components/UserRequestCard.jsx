import { Link } from "react-router-dom";
import UserStatusBadge from "./UserStatusBadge";
import { resolveMediaUrl } from "../utils/media";

const UserRequestCard = ({ request, detailsHref, footer, actions }) => (
  <div className="surface-card overflow-hidden p-5">
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-xl font-semibold tracking-tight text-[rgb(var(--color-text))]">
              {request.productType} | {request.issueType}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{request.description}</p>
          </div>
          <UserStatusBadge status={request.status} />
        </div>

        <div className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)]">
          {request.imageUrl ? (
            <img
              src={resolveMediaUrl(request.imageUrl)}
              alt={request.issueType}
              className="h-40 w-full rounded-[22px] border border-border object-cover"
            />
          ) : (
            <div className="flex h-40 items-center justify-center rounded-[22px] border border-dashed border-border bg-panelAlt text-sm text-[rgb(var(--color-text-soft))]">
              No image uploaded
            </div>
          )}

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-[22px] bg-panelAlt p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Provider</p>
              <p className="mt-3 text-sm font-medium text-[rgb(var(--color-text))]">{request.provider?.name || "Not assigned"}</p>
              <p className="mt-2 text-sm text-[rgb(var(--color-text-soft))]">{request.provider?.location || "Location not available"}</p>
            </div>
            <div className="rounded-[22px] bg-panelAlt p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Repair Details</p>
              <p className="mt-3 text-sm text-[rgb(var(--color-text-soft))]">Proposed cost: Rs. {request.proposedCost || 0}</p>
              <p className="mt-2 text-sm text-[rgb(var(--color-text-soft))]">Approved cost: Rs. {request.approvedCost || 0}</p>
              <p className="mt-2 text-sm text-[rgb(var(--color-text-soft))]">Updated: {new Date(request.updatedAt).toLocaleString("en-IN")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {detailsHref && (
          <Link to={detailsHref} className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-medium text-white">
            View Details
          </Link>
        )}
        {actions}
        {footer}
      </div>
    </div>
  </div>
);

export default UserRequestCard;
