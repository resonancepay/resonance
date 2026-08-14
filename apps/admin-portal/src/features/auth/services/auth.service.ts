import { apiClient } from "@/lib/axios";
import { authClient } from "@/lib/auth-client";
import { useAuthStore } from "@/shared/store/auth.store";
import { AdminProfile, LoginPayload, LoginResponse, RefreshResponse } from "../types/auth.type";

export const login = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const result = await authClient.post("/admin/login", payload);
  return result.data;
};

export const refresh = async (): Promise<RefreshResponse> => {
  const token = useAuthStore.getState().user?.access_token;
  const result = await authClient.get("/admin/refresh", {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return result.data;
};

export const getProfile = async (): Promise<AdminProfile> => {
  const result = await apiClient.get("/admin/profile");
  return result.data;
};
