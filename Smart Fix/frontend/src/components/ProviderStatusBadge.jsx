import { getStatusTone } from "../utils/providerWorkspace";

const ProviderStatusBadge = ({ status }) => (
  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getStatusTone(status)}`}>
    {status}
  </span>
);

export default ProviderStatusBadge;
