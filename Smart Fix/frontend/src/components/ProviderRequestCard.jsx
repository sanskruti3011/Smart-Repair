import { Link } from "react-router-dom";
import { CalendarClock, MapPin, UserRound } from "lucide-react";
import ProviderStatusBadge from "./ProviderStatusBadge";
import { resolveMediaUrl } from "../utils/media";

const ProviderRequestCard = ({
  request,
  primaryAction,
  secondaryAction,
  footer,
  detailsHref,
  compact = false
}) => (
  <div className="surface-card overflow-hidden p-5">
    <div className={`grid gap-5 ${compact ? "lg:grid-cols-[minmax(0,1fr)_220px]" : "xl:grid-cols-[minmax(0,1fr)_340px]"}`}>
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-xl font-semibold tracking-tight text-[rgb(var(--color-text))]">
              {request.productType} | {request.issueType}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[rgb(var(--color-text-soft))]">{request.description}</p>
          </div>
          <ProviderStatusBadge status={request.status} />
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Customer</p>
              <div className="mt-3 space-y-2 text-sm text-[rgb(var(--color-text-soft))]">
                <p className="flex items-center gap-2"><UserRound size={14} /> {request.user?.fullName}</p>
                <p>{request.user?.phone || "Phone not available"}</p>
                <p>{request.user?.address || "Address not available"}</p>
              </div>
            </div>
            <div className="rounded-[22px] bg-panelAlt p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Job Info</p>
              <div className="mt-3 space-y-2 text-sm text-[rgb(var(--color-text-soft))]">
                <p>Proposed cost: Rs. {request.proposedCost || 0}</p>
                <p>Approved cost: Rs. {request.approvedCost || 0}</p>
                <p className="flex items-center gap-2"><CalendarClock size={14} /> {new Date(request.updatedAt).toLocaleString("en-IN")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {primaryAction}
        {secondaryAction}
        {detailsHref && (
          <Link
            to={detailsHref}
            className="inline-flex items-center justify-center rounded-full border border-border bg-panelAlt px-5 py-3 text-sm font-medium text-[rgb(var(--color-text))]"
          >
            Open Details
          </Link>
        )}
        {(request.serviceAddress || request.user?.address) && (
          <div className="rounded-[22px] bg-panelAlt p-4 text-sm text-[rgb(var(--color-text-soft))]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Address</p>
            <p className="mt-3 flex items-start gap-2"><MapPin size={14} className="mt-1 shrink-0" /> <span>{request.serviceAddress || request.user?.address}</span></p>
          </div>
        )}
        {footer}
      </div>
    </div>
  </div>
);

export default ProviderRequestCard;
