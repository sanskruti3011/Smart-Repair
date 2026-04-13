import { getUserStatusTone } from "../utils/userWorkspace";

const UserStatusBadge = ({ status }) => (
  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getUserStatusTone(status)}`}>
    {status}
  </span>
);

export default UserStatusBadge;
