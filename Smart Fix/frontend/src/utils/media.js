const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const uploadBaseUrl = apiBaseUrl.replace(/\/api\/?$/, "");

export const resolveMediaUrl = (value) => {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `${uploadBaseUrl}${value.startsWith("/") ? value : `/${value}`}`;
};
