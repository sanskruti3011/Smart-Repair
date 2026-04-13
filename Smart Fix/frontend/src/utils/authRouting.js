export const resolveRole = (authUser) => {
  if (!authUser) return "guest";
  if (authUser.accountType === "provider") return "provider";
  return authUser.role || "user";
};

export const getDefaultRouteForUser = (authUser) => {
  const role = resolveRole(authUser);

  if (role === "admin") return "/admin";
  if (role === "provider") return "/provider";
  if (role === "user") return "/user";
  return "/";
};
