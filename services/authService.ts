import api from "@/lib/axios";

interface LoginPayload {
  name?: string;
  email: string;
  password: string;
}

export const registerApi = async (payload: LoginPayload) => {
    const res = await api.post("/auth/register", payload);
    return res.data;
}

export const loginApi = async (payload: LoginPayload) => {
  const res = await api.post("/auth/login", payload);
  return res.data; 
};
export const logoutApi = async () => {
  const res = await api.get("/auth/logout", { withCredentials: true });
  return res; 
};



