import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "./useSocket";
import { activeJobStatuses, completedJobStatuses } from "../utils/providerWorkspace";

export const useProviderWorkspace = () => {
  const { authUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [profile, setProfile] = useState(null);

  const loadWorkspace = useCallback(async () => {
    const [profileRes, requestRes, notificationRes] = await Promise.all([
      api.get("/providers/me"),
      api.get("/providers/requests"),
      api.get("/providers/notifications")
    ]);

    setProfile(profileRes.data);
    setRequests(requestRes.data);
    setNotifications(notificationRes.data);
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
    setNotifications((current) => [notification, ...current]);
    if (notification?.metadata?.requestId) {
      loadWorkspace();
    }
  });

  const summary = useMemo(() => ({
    totalRequests: requests.length,
    pendingRequests: requests.filter((item) => item.status === "Pending").length,
    activeJobs: requests.filter((item) => activeJobStatuses.includes(item.status)).length,
    completedJobs: requests.filter((item) => completedJobStatuses.includes(item.status)).length
  }), [requests]);

  return {
    loading,
    requests,
    notifications,
    profile,
    summary,
    refresh: loadWorkspace,
    setProfile
  };
};
