import axios from "axios";

const configuredBaseUrl = import.meta.env.VITE_API_URL?.trim();

const api = axios.create({
  baseURL: configuredBaseUrl
    ? configuredBaseUrl.replace(/\/$/, "")
    : "/api",
  timeout: 12000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

export default api;
