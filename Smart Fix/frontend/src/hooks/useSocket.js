import { useEffect } from "react";
import { io } from "socket.io-client";

export const useSocket = (authUser, onNotification) => {
  useEffect(() => {
    if (!authUser?._id) return undefined;

    const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000");
    const recipientType = authUser.accountType === "provider" ? "provider" : authUser.role;

    socket.emit("join", { recipientType, recipientId: authUser._id });
    socket.on("notification:new", onNotification);

    return () => socket.disconnect();
  }, [authUser, onNotification]);
};
