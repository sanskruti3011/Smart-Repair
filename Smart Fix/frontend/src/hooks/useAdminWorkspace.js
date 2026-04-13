import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "./useSocket";

export const useAdminWorkspace = () => {
  const { authUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [providers, setProviders] = useState([]);
  const [requests, setRequests] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const loadWorkspace = useCallback(async () => {
    const [analyticsRes, usersRes, providersRes, requestsRes, ticketsRes] = await Promise.all([
      api.get("/admin/analytics"),
      api.get("/admin/users"),
      api.get("/admin/providers"),
      api.get("/admin/requests"),
      api.get("/admin/tickets")
    ]);

    setAnalytics(analyticsRes.data);
    setUsers(usersRes.data);
    setProviders(providersRes.data);
    setRequests(requestsRes.data);
    setTickets(ticketsRes.data);
  }, []);

  useEffect(() => {
    const initialize = async () => {
      try {
        await loadWorkspace();
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [loadWorkspace]);

  useSocket(authUser, (notification) => {
    setAlerts((current) => [notification, ...current]);
    loadWorkspace();
  });

  const derived = useMemo(() => {
    const activeJobs = requests.filter((item) => ["Accepted", "Price Proposed", "Approved", "Picked Up", "In Progress"].includes(item.status)).length;
    const completedJobs = requests.filter((item) => ["Completed", "Delivered", "Closed"].includes(item.status)).length;
    const recentActivity = [
      ...requests.slice(0, 4).map((item) => ({
        id: `request-${item._id}`,
        title: `${item.productType} repair request`,
        text: `${item.user?.fullName || "User"} assigned ${item.provider?.name || "provider"} and is currently ${item.status}.`,
        createdAt: item.updatedAt
      })),
      ...tickets.slice(0, 2).map((item) => ({
        id: `ticket-${item._id}`,
        title: `Support ticket: ${item.subject}`,
        text: `${item.status} support issue from ${item.createdByType || "user"}.`,
        createdAt: item.updatedAt || item.createdAt
      }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const adminNotifications = [
      ...alerts.map((item, index) => ({
        id: `socket-${index}`,
        title: item.title,
        text: item.message,
        status: "Active",
        createdAt: new Date().toISOString()
      })),
      ...users.slice(0, 2).map((user) => ({
        id: `user-${user._id}`,
        title: "New user activity",
        text: `${user.fullName} is present in the system user list.`,
        status: "Active",
        createdAt: user.createdAt
      })),
      ...requests.slice(0, 2).map((request) => ({
        id: `request-alert-${request._id}`,
        title: "New request activity",
        text: `${request.productType} request from ${request.user?.fullName || "user"} is ${request.status}.`,
        status: "Pending",
        createdAt: request.createdAt
      })),
      ...tickets.slice(0, 2).map((ticket) => ({
        id: `ticket-alert-${ticket._id}`,
        title: "Support issue",
        text: `${ticket.subject} is currently ${ticket.status}.`,
        status: ticket.status === "Resolved" ? "Active" : "Pending",
        createdAt: ticket.createdAt
      }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return { activeJobs, completedJobs, recentActivity, adminNotifications };
  }, [alerts, requests, tickets, users]);

  return {
    loading,
    analytics,
    users,
    providers,
    requests,
    tickets,
    refresh: loadWorkspace,
    activeJobs: derived.activeJobs,
    completedJobs: derived.completedJobs,
    recentActivity: derived.recentActivity,
    adminNotifications: derived.adminNotifications
  };
};
