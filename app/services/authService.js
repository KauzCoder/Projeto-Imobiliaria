import axios from "axios";

const apiUrl = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");
const tokenKey = "authToken";
const accountKey = "authAccount";
const authChangeEvent = "auth-state-change";

export async function loginAccount(credentials) {
  const { data } = await axios.post(`${apiUrl}/auth/login`, credentials);
  return data;
}

export function getStoredAuth() {
  if (typeof window === "undefined") {
    return { token: "", account: null };
  }

  const token = window.localStorage.getItem(tokenKey) ?? "";
  const accountJson = window.localStorage.getItem(accountKey);

  try {
    return {
      token,
      account: accountJson ? JSON.parse(accountJson) : null,
    };
  } catch {
    return { token, account: null };
  }
}

export function saveAuthSession({ token, account }) {
  window.localStorage.setItem(tokenKey, token);
  window.localStorage.setItem(accountKey, JSON.stringify(account));
  window.dispatchEvent(new Event(authChangeEvent));
}

export function clearAuthSession() {
  window.localStorage.removeItem(tokenKey);
  window.localStorage.removeItem(accountKey);
  window.dispatchEvent(new Event(authChangeEvent));
}

export function subscribeAuthChanges(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener(authChangeEvent, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(authChangeEvent, callback);
  };
}
