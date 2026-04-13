import { Bell, ClipboardList, LayoutDashboard, Settings, Star, Truck, UserCog, Wrench, Wallet } from "lucide-react";
import { NavLink } from "react-router-dom";

const iconMap = {
  Dashboard: LayoutDashboard,
  "Incoming Requests": ClipboardList,
  "My Jobs": Wrench,
  "Pickup & Delivery": Truck,
  Reviews: Star,
  Notifications: Bell,
  Profile: UserCog,
  Settings
};

const ProviderSidebar = ({ links, onNavigate }) => (
  <aside className="w-full xl:w-72">
    <div className="surface-card sticky top-24 p-4">
      <div className="rounded-[24px] bg-accent/10 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Technician Workspace</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">Smart Repair System</h2>
        <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-text-soft))]">
          Manage requests, pricing, active repairs, pickups, reviews, and notifications from one clean sidebar flow.
        </p>
      </div>

      <nav className="mt-4 grid gap-2">
        {links.map((link) => {
          const Icon = iconMap[link.label] || Wallet;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onNavigate}
              end={link.to === "/provider"}
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

export default ProviderSidebar;
