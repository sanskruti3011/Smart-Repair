import { Bell, Clock3, History, LayoutDashboard, Settings, UserRound, Users, Wrench } from "lucide-react";
import { NavLink } from "react-router-dom";

const iconMap = {
  Dashboard: LayoutDashboard,
  "Book Repair": Wrench,
  "Service Providers": Users,
  "My Requests": Clock3,
  History,
  Notifications: Bell,
  Profile: UserRound,
  Settings
};

const UserSidebar = ({ links, onNavigate }) => (
  <aside className="w-full xl:w-72">
    <div className="surface-card sticky top-24 p-4">
      <div className="rounded-[24px] bg-accent/10 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Customer Workspace</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">Smart Repair System</h2>
        <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">
          Book repairs, compare providers, approve pricing, follow status updates, and manage your request history from one clean workspace.
        </p>
      </div>

      <nav className="mt-4 grid gap-2">
        {links.map((link) => {
          const Icon = iconMap[link.label] || LayoutDashboard;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onNavigate}
              end={link.to === "/user"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-accent text-white"
                    : "bg-panelAlt text-[rgb(var(--color-text-soft))] hover:text-[rgb(var(--color-text))]"
                }`
              }
            >
              <Icon size={18} />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  </aside>
);

export default UserSidebar;
