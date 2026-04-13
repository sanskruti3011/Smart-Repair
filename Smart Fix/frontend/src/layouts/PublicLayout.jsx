import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const linkClass =
  "pill-link";

const publicLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#platform", label: "Platform" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" }
];

const PublicLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { authUser, logout } = useAuth();

  const dashboardHref = "/dashboard";

  return (
    <div className="public-shell min-h-screen text-[rgb(var(--color-text))]">
      <header className="sticky top-0 z-30 border-b border-border glass-band">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="rounded-[20px] bg-accent/12 px-3 py-2 text-sm font-semibold tracking-[0.2em] text-accent">SR</div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Smart Repair System</h1>
            </div>
          </Link>
          <nav className="hidden items-center gap-2 rounded-full border border-border bg-panel/80 px-3 py-2 shadow-panel sm:flex sm:flex-wrap sm:justify-end">
            {publicLinks.map((item) => (
              <a key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </a>
            ))}
            {authUser ? (
              <>
                <Link to={dashboardHref} className="button-secondary px-5 py-2">
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="button-primary px-5 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="button-primary px-5 py-2">
                Login
              </Link>
            )}
          </nav>
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="rounded-xl border border-border bg-panelAlt p-2 text-[rgb(var(--color-text-soft))] sm:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {open && (
          <div className="border-t border-border bg-panel/95 px-4 py-4 sm:hidden">
            <nav className="grid gap-2">
              {[...publicLinks, ...(authUser ? [{ href: dashboardHref, label: "Dashboard" }] : [{ href: "/login", label: "Login" }])].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-border bg-panelAlt px-4 py-3 text-sm text-[rgb(var(--color-text-soft))]"
                >
                  {item.label}
                </a>
              ))}
              {authUser && (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="rounded-2xl bg-accent px-4 py-3 text-left text-sm font-medium text-white"
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        )}
      </header>
      <main className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">{children}</main>
      <footer className="border-t border-border bg-panel/70 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-6 text-sm text-[rgb(var(--color-text-soft))] sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>Smart Repair System</p>
          <div className="flex flex-wrap gap-4">
            <a href="/#platform">Platform</a>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
            {authUser ? <Link to={dashboardHref}>Dashboard</Link> : <Link to="/login">Login</Link>}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
