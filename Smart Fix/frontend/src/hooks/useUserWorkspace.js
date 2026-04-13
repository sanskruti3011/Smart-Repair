import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "./useSocket";
import { activeRequestStatuses, completedRequestStatuses } from "../utils/userWorkspace";

export const useUserWorkspace = () => {
  const { authUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const loadWorkspace = useCallback(async () => {
    const [profileRes, requestRes, notificationRes] = await Promise.all([
      api.get("/users/profile"),
      api.get("/users/requests"),
      api.get("/users/notifications")
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

  const summary = useMemo(
    () => ({
      totalRequests: requests.length,
      activeRepairs: requests.filter((item) => activeRequestStatuses.includes(item.status)).length,
      completedRepairs: requests.filter((item) => completedRequestStatuses.includes(item.status)).length
    }),
    [requests]
  );

  return {
    loading,
    profile,
    requests,
    notifications,
    summary,
    refresh: loadWorkspace,
    setProfile
  };
};
