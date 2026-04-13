import bcrypt from "bcryptjs";
import { body } from "express-validator";
import User from "../models/User.js";
import ServiceProvider from "../models/ServiceProvider.js";
import { signToken } from "../utils/jwt.js";

const buildAuthResponse = (entity, accountType, role) => ({
  token: signToken({ id: entity._id, role, accountType }),
  user: {
    ...entity.toObject(),
    password: undefined,
    accountType,
    role
  }
});

export const registerUserValidation = [
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];

export const registerProviderValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];

export const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("accountType")
    .optional()
    .isIn(["user", "provider"])
    .withMessage("Valid account type is required")
];

export const registerUser = async (req, res) => {
  const { fullName, email, password, phone, address } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "Email already exists" });

  const user = await User.create({
    fullName,
    email,
    password: await bcrypt.hash(password, 10),
    phone,
    address
  });

  res.status(201).json(buildAuthResponse(user, "user", user.role));
};

export const registerProvider = async (req, res) => {
  const { name, email, password, phone, skills, experience, location, bio } = req.body;
  const existing = await ServiceProvider.findOne({ email });
  if (existing) return res.status(400).json({ message: "Email already exists" });

  const provider = await ServiceProvider.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
    phone,
    skills: Array.isArray(skills)
      ? skills
      : String(skills || "")
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
    experience,
    location,
    bio
  });

  res.status(201).json(buildAuthResponse(provider, "provider", "provider"));
};

export const login = async (req, res) => {
  const { email, password, accountType } = req.body;
  const normalizedEmail = String(email).toLowerCase().trim();

  let entity = null;
  let resolvedAccountType = accountType;
  let role = "user";

  if (accountType === "provider") {
    entity = await ServiceProvider.findOne({ email: normalizedEmail });
    resolvedAccountType = "provider";
    role = "provider";
  } else if (accountType === "user") {
    entity = await User.findOne({ email: normalizedEmail });
    resolvedAccountType = "user";
    role = entity?.role || "user";
  } else {
    const matchedUser = await User.findOne({ email: normalizedEmail });
    const matchedProvider = matchedUser ? null : await ServiceProvider.findOne({ email: normalizedEmail });

    if (matchedUser) {
      entity = matchedUser;
      resolvedAccountType = "user";
      role = matchedUser.role || "user";
    } else if (matchedProvider) {
      entity = matchedProvider;
      resolvedAccountType = "provider";
      role = "provider";
    }
  }

  if (!entity) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const passwordMatches = await bcrypt.compare(password, entity.password);
  if (!passwordMatches) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json(buildAuthResponse(entity, resolvedAccountType, role));
};
