import axios from "axios";
import { store } from "@/store";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // apna backend url
  withCredentials: true, 
});

// Har request me token lagao agar available ho
api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
