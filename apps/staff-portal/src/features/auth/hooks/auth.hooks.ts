import { useMutation, useQuery } from "@tanstack/react-query";
import {
  login,
  register,
  resendOtp,
  forgotPassword,
  resetPassword,
  verifyOtp,
  profile,
  changePassword,
  deleteAccount,
} from "../services/auth.service";
import {
  LoginPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  RegisterResponse,
  VerifyOtpPayload,
  ChangePasswordPayload,
  DeleteAccountResponse,
} from "../types/auth.type";
import { useToast } from "@/shared/toast";

export const useRegister = (
  sc: (val: RegisterResponse) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: register,
    onSuccess: sc,
    onError: ec,
  });
};

export const useLogin = (sc: (val: any) => void, ec?: (err: any) => void) => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useResendOtp = (
  sc: (val: any) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (user_id: string) => resendOtp(user_id),
    onSuccess: sc,
    onError: ec,
  });
};

export const useForgotPassword = (
  sc: (val: any) => void,
  ec?: (err: any) => void,
) => {
  const { addToast } = useToast();
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPassword(payload),
    onSuccess: (res) => {
      sc(res);
      addToast({
        title: "Reset link sent",
        description: "Password reset link sent to email",
        variant: "success",
        duration: 10000,
      });
    },
    onError: (e) => {
      console.log(e, "Error page");
      addToast({
        title: "",
        variant: "error",
      });
    },
  });
};

export const useResetPassword = (
  sc: (val: any) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPassword(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useVerifyOtp = (
  sc: (val: any) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => verifyOtp(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useGetProfile = (
  sc: (val: any) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: () => profile(),
    onSuccess: sc,
    onError: ec,
  });
};

// Query-based fetch for screens that just need to load and display the
// current profile (e.g. the profile screen), as opposed to useGetProfile's
// mutation form used for one-off fetches gated behind another action.
export const PROFILE_QUERY_KEY = ["cleaner-profile"];

export const useProfile = () => {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: () => profile(),
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

export const useDeleteAccount = (
  sc: (val: DeleteAccountResponse) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: () => deleteAccount(),
    onSuccess: sc,
    onError: ec,
  });
};

const PROFILE_POLL_INTERVAL_MS = 30000;

// Used while an application is pending/submitted, so the onboarding screen
// notices an admin's approve/decline decision on its own — refetches every
// 30s and immediately on tab focus, without needing a manual refresh or
// re-login. `enabled` should be false once the application is resolved
// (approved/declined) so this doesn't keep polling forever.
export const useProfileStatusPoll = (enabled: boolean) => {
  return useQuery({
    queryKey: ["cleaner-profile-status"],
    queryFn: () => profile(),
    enabled,
    refetchInterval: enabled ? PROFILE_POLL_INTERVAL_MS : false,
    refetchOnWindowFocus: enabled,
  });
};
