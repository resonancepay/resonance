import { apiClient } from "@/lib/axios";
import {
  ChangePasswordPayload,
  DeleteProfileResponse,
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  Profile,
  RefreshResponse,
  ResendOtpPayload,
  ResendOtpResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
  VerifyPasswordPayload,
  VerifyPasswordResponse,
} from "../types/auth.type";

// Paths confirmed against Swagger — all live under /client/...

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const result = await apiClient.post(`/client/login`, payload);
  return result.data;
};

export const resendOtp = async (
  payload: ResendOtpPayload,
): Promise<ResendOtpResponse> => {
  const result = await apiClient.post("/client/resend-otp", payload);
  return result.data;
};

export const verifyOtp = async (
  payload: VerifyOtpPayload,
): Promise<VerifyOtpResponse> => {
  const result = await apiClient.post(`/client/verify-otp`, payload);
  return result.data;
};

export const profile = async (): Promise<Profile> => {
  const result = await apiClient.get("/client/profile");
  return result.data;
};

export const verifyPassword = async (
  payload: VerifyPasswordPayload,
): Promise<VerifyPasswordResponse> => {
  const result = await apiClient.post("/client/verify-password", payload);
  return result.data;
};

export const refresh = async (): Promise<RefreshResponse> => {
  const result = await apiClient.get("/client/refresh");
  return result.data;
};

export const logout = async (): Promise<LogoutResponse> => {
  const result = await apiClient.get("/client/logout");
  return result.data;
};

export const changePassword = async (payload: ChangePasswordPayload) => {
  const result = await apiClient.post("/client/change-password", payload);
  return result.data;
};

export const deleteProfile = async (): Promise<DeleteProfileResponse> => {
  const result = await apiClient.get("/client/delete-profile");
  return result.data;
};
