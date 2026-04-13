import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { Bell, LogOut, Menu, Moon, Sun, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { providerNavLinks } from "../utils/providerWorkspace";
import ProviderSidebar from "../components/ProviderSidebar";
import { useSocket } from "../hooks/useSocket";

const publicLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

const ProviderLayout = ({ title, subtitle, actions, children }) => {
  const { authUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useSocket(authUser, (notification) => {
    setNotifications((current) => [notification, ...current]);
  });

  useEffect(() => {
    setNotifications([]);
  }, [authUser]);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications]
  );

  return (
    <div className="min-h-screen text-[rgb(var(--color-text))]" style={{ backgroundImage: "var(--page-gradient)" }}>
      <header className="sticky top-0 z-40 border-b border-border glass-band">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-3 px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="rounded-xl border border-border bg-panelAlt p-2 text-[rgb(var(--color-text-soft))] xl:hidden"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Service Provider Panel</p>
            <h1 className="truncate text-2xl font-semibold tracking-tight">{title}</h1>
          </div>
          <nav className="hidden items-center gap-2 xl:flex xl:ml-6">
            {publicLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-accent text-white"
                      : "text-[rgb(var(--color-text-soft))] hover:bg-panelAlt hover:text-[rgb(var(--color-text))]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            {actions}
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full border border-border bg-panelAlt px-3 py-2 text-sm text-[rgb(var(--color-text-soft))] sm:px-4"
            >
              <span className="flex items-center gap-2">
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                {theme === "light" ? "Dark" : "Light"}
              </span>
            </button>
            <div className="relative rounded-full border border-border bg-panelAlt px-3 py-2 sm:px-4">
              <Bell className="text-[rgb(var(--color-text-soft))]" size={18} />
              {unreadCount > 0 && (
                <span className="absolute -right-2 -top-2 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="hidden rounded-full border border-border bg-panelAlt px-3 py-2 text-sm text-[rgb(var(--color-text-soft))] 2xl:block">
              {authUser?.name || authUser?.fullName || "Technician"}
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

      <div className="mx-auto flex max-w-[1600px] gap-6 px-4 py-6 sm:px-6">
        <div className={`${mobileMenuOpen ? "block" : "hidden"} xl:block`}>
          <ProviderSidebar links={providerNavLinks} onNavigate={() => setMobileMenuOpen(false)} />
        </div>
        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProviderLayout;
