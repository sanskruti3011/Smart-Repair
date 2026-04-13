import { getAdminStatusTone } from "../utils/adminWorkspace";

const AdminStatusBadge = ({ status }) => (
  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getAdminStatusTone(status)}`}>
    {status}
  </span>
);

export default AdminStatusBadge;
