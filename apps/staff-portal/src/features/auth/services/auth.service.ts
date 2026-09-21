import { apiClient } from "@/lib/axios";
import {
  ChangePasswordPayload,
  DeleteAccountResponse,
  ForgotPasswordPayload,
  LoginPayload,
  Profile,
  RegisterResponse,
  RegisterUser,
  ResetPasswordPayload,
  VerifyOtpPayload,
} from "../types/auth.type";

// Paths confirmed against Swagger (all live under /cleaners/...).

export const login = async (payload: LoginPayload) => {
  const result = await apiClient.post(`/cleaners/login`, payload);
  return result.data;
};

export const register = async (
  registerPayload: RegisterUser,
): Promise<RegisterResponse> => {
  const result = await apiClient.post("/cleaners/register", registerPayload);
  return result.data;
};

export const resendOtp = async (user_id: string) => {
  const result = await apiClient.post("/cleaners/resend-otp", { user_id });
  return result;
};

export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  const result = await apiClient.post("/cleaners/forget-password", payload);
  return result.data;
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const result = await apiClient.post(`/cleaners/reset-password`, payload);
  return result.data;
};

export const verifyOtp = async (payload: VerifyOtpPayload) => {
  const result = await apiClient.post(`/cleaners/verify-otp`, payload);
  return result.data;
};

// NOTE: not shown in the confirmed "Authentication" endpoint list — inferred
// from the /cleaners/ pattern used by every other endpoint in this app.
export const profile = async (): Promise<Profile> => {
  const result = await apiClient.get("/cleaners/profile");
  return result.data;
};

// NOTE: not confirmed against Swagger — inferred from the /cleaners/ pattern
// and client-portal's equivalent /client/change-password (old_password /
// new_password payload shape).
export const changePassword = async (payload: ChangePasswordPayload) => {
  const result = await apiClient.post("/cleaners/change-password", payload);
  return result.data;
};

// NOTE: not confirmed against Swagger — inferred from the /cleaners/ pattern
// and client-portal's equivalent GET /client/delete-profile.
export const deleteAccount = async (): Promise<DeleteAccountResponse> => {
  const result = await apiClient.get("/cleaners/delete-account");
  return result.data;
};
