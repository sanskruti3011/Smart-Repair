import Notification from "../models/Notification.js";
import { getSocketServer } from "./socket.js";

export const createNotification = async ({
  recipientType,
  recipientId,
  title,
  message,
  type = "info",
  metadata = {}
}) => {
  const notification = await Notification.create({
    recipientType,
    recipientId,
    title,
    message,
    type,
    metadata
  });

  const io = getSocketServer();
  if (io) {
    io.to(`${recipientType}:${recipientId}`).emit("notification:new", notification);
  }

  return notification;
};
