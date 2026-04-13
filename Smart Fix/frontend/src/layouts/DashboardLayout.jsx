import { useEffect, useState } from "react";
import AppNavbar from "../components/AppNavbar";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../hooks/useSocket";

const DashboardLayout = ({ links, children }) => {
  const { authUser } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useSocket(authUser, (notification) => {
    setNotifications((current) => [notification, ...current]);
  });

  useEffect(() => {
    setNotifications([]);
  }, [authUser]);

  return (
    <div className="min-h-screen text-[rgb(var(--color-text))]" style={{ backgroundImage: "var(--page-gradient)" }}>
      <AppNavbar notifications={notifications.filter((item) => !item.read)} links={links} />
      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6">
        <section className="min-w-0">{children}</section>
      </main>
    </div>
  );
};

export default DashboardLayout;
