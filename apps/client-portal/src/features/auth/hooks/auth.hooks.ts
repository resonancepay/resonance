import { useMutation, useQuery } from "@tanstack/react-query";
import {
  login,
  resendOtp,
  verifyOtp,
  profile,
  verifyPassword,
  refresh,
  logout,
  changePassword,
  deleteProfile,
} from "../services/auth.service";
import {
  LoginPayload,
  LoginResponse,
  ResendOtpPayload,
  ResendOtpResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
  VerifyPasswordPayload,
  VerifyPasswordResponse,
  RefreshResponse,
  LogoutResponse,
  ChangePasswordPayload,
  Profile,
  DeleteProfileResponse,
} from "../types/auth.type";

export const useLogin = (
  sc: (val: LoginResponse) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useResendOtp = (
  sc: (val: ResendOtpResponse) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: ResendOtpPayload) => resendOtp(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useVerifyOtp = (
  sc: (val: VerifyOtpResponse) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => verifyOtp(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useGetProfile = (
  sc: (val: Profile) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: () => profile(),
    onSuccess: sc,
    onError: ec,
  });
};

// Query-based fetch for screens that just load and display the current
// profile (e.g. the profile screen), as opposed to useGetProfile's mutation
// form used for the one-off fetch right after login.
export const PROFILE_QUERY_KEY = ["client-profile"];

export const useProfile = () => {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: () => profile(),
  });
};

export const useVerifyPassword = (
  sc: (val: VerifyPasswordResponse) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: VerifyPasswordPayload) => verifyPassword(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useRefresh = (
  sc: (val: RefreshResponse) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: () => refresh(),
    onSuccess: sc,
    onError: ec,
  });
};

export const useLogout = (
  sc: (val: LogoutResponse) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: sc,
    onError: ec,
  });
};

export const useChangePassword = (
  sc: (val: any) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePassword(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useDeleteProfile = (
  sc: (val: DeleteProfileResponse) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: () => deleteProfile(),
    onSuccess: sc,
    onError: ec,
  });
};
