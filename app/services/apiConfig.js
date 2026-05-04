const defaultApiUrl = "http://localhost:4000/api";

export function getApiUrl() {
  const rawApiUrl = import.meta.env.VITE_API_URL || defaultApiUrl;
  const cleanApiUrl = rawApiUrl.replace(/\/+$/, "");

  return cleanApiUrl.endsWith("/api") ? cleanApiUrl : `${cleanApiUrl}/api`;
}
