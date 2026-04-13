import { Bell, LogOut, Wrench } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ notifications = [] }) => {
  const { authUser, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-panel/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-accent/15 p-2 text-accent">
            <Wrench size={20} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">Smart Repair System</h1>
            <p className="text-xs text-muted">Track repairs across users, technicians, and admin</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden rounded-full border border-border px-3 py-1 text-sm text-slate-300 sm:block">
            {authUser?.fullName || authUser?.name || "Guest"}
          </div>
          <div className="relative">
            <Bell className="text-slate-300" size={18} />
            {notifications.length > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">
                {notifications.length}
              </span>
            )}
          </div>
          <button type="button" onClick={logout} className="rounded-lg border border-border px-3 py-2 text-sm text-slate-200 transition hover:bg-panelAlt">
            <span className="flex items-center gap-2">
              <LogOut size={16} />
              Logout
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
