import { Bell, LogOut, Moon, Sun, Wrench } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const navClass = ({ isActive }) =>
  `whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-accent text-white shadow-[0_12px_30px_rgba(14,116,144,0.22)]"
      : "text-[rgb(var(--color-text-soft))] hover:bg-panelAlt hover:text-[rgb(var(--color-text))]"
  }`;

const AppNavbar = ({ notifications = [], links = [] }) => {
  const { authUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const dashboardHref = "/dashboard";

  const onDashboard =
    location.pathname === dashboardHref ||
    location.pathname.startsWith("/user/") ||
    location.pathname.startsWith("/provider/") ||
    location.pathname.startsWith("/admin/");

  const workflowLinks = links.filter(
    (link) => !["/dashboard", "/user", "/provider", "/admin"].includes(link.to)
  );

  return (
    <header className="sticky top-0 z-30 border-b border-border glass-band">
      <div className="mx-auto grid max-w-[1440px] gap-4 px-4 py-4 sm:px-6 xl:grid-cols-[auto_minmax(0,1fr)_auto] xl:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <div className="rounded-2xl bg-accent/12 p-3 text-accent">
            <Wrench size={18} />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold tracking-tight text-[rgb(var(--color-text))]">Smart Repair System</h1>
          </div>
        </div>
        <div className="min-w-0 xl:px-4">
          <nav className="flex min-w-0 items-center gap-2 overflow-x-auto rounded-[28px] border border-border bg-panel/80 p-2 shadow-panel [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <a href="/#home" className="pill-link whitespace-nowrap">Home</a>
            <a href="/#platform" className="pill-link whitespace-nowrap">Platform</a>
            <NavLink to="/about" className={navClass}>
              About Us
            </NavLink>
            <NavLink to="/contact" className={navClass}>
              Contact Us
            </NavLink>
            <NavLink
              to={dashboardHref}
              className={() =>
                `whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  onDashboard
                    ? "bg-accent text-white"
                    : "text-[rgb(var(--color-text-soft))] hover:bg-panelAlt hover:text-[rgb(var(--color-text))]"
                }`
              }
            >
              Dashboard
            </NavLink>
            {workflowLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={navClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <div className="hidden rounded-full border border-border bg-panelAlt px-3 py-1 text-sm text-[rgb(var(--color-text-soft))] 2xl:block">
            {authUser?.fullName || authUser?.name || "Guest"}
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-border bg-panelAlt px-3 py-2 text-sm text-[rgb(var(--color-text-soft))] transition hover:border-accent sm:px-4"
          >
            <span className="flex items-center gap-2">
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              {theme === "light" ? "Dark" : "Light"}
            </span>
          </button>
          <div className="relative rounded-full border border-border bg-panelAlt px-3 py-2 sm:px-4">
            <Bell className="text-[rgb(var(--color-text-soft))]" size={18} />
            {notifications.length > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">
                {notifications.length}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-border px-3 py-2 text-sm text-[rgb(var(--color-text-soft))] transition hover:bg-panelAlt sm:px-4"
          >
            <span className="flex items-center gap-2">
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppNavbar;
