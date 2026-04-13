import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ServiceProvider from "../models/ServiceProvider.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.accountType === "provider") {
      req.auth = {
        accountType: "provider",
        role: "provider",
        entity: await ServiceProvider.findById(decoded.id).select("-password")
      };
    } else {
      req.auth = {
        accountType: "user",
        entity: await User.findById(decoded.id).select("-password")
      };
      req.auth.role = req.auth.entity?.role ?? "user";
    }

    if (!req.auth.entity) {
      return res.status(401).json({ message: "Account not found" });
    }

    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.auth.role)) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
