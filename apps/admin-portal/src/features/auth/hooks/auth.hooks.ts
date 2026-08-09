import { useMutation } from "@tanstack/react-query";
import { login, refresh } from "../services/auth.service";
import { LoginPayload, LoginResponse, RefreshResponse } from "../types/auth.type";

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
