import { useMutation } from "@tanstack/react-query";
import { deleteAvailability, setupAvailability } from "../services/profile.service";
import {
  DeleteAvailabilityPayload,
  NewAvailabilityEntry,
} from "@/features/auth/types/auth.type";

export const useSetupAvailability = (
  sc: (val: any) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: NewAvailabilityEntry[]) => setupAvailability(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useDeleteAvailability = (
  sc: (val: any) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: DeleteAvailabilityPayload) => deleteAvailability(payload),
    onSuccess: sc,
    onError: ec,
  });
};
