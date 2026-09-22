import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteAvailability,
  getAvailabilities,
  getServiceLocation,
  setupAvailability,
  setupServiceLocation,
} from "../services/profile.service";
import {
  DeleteAvailabilityPayload,
  NewAvailabilityEntry,
  SetServiceLocationPayload,
} from "../types/profile.type";

export const AVAILABILITIES_QUERY_KEY = ["cleaner-availabilities"];
export const SERVICE_LOCATION_QUERY_KEY = ["cleaner-service-location"];

export const useAvailabilities = () => {
  return useQuery({
    queryKey: AVAILABILITIES_QUERY_KEY,
    queryFn: () => getAvailabilities(),
  });
};

export const useServiceLocation = () => {
  return useQuery({
    queryKey: SERVICE_LOCATION_QUERY_KEY,
    queryFn: () => getServiceLocation(),
  });
};

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

export const useSetupServiceLocation = (
  sc: (val: any) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: SetServiceLocationPayload) => setupServiceLocation(payload),
    onSuccess: sc,
    onError: ec,
  });
};
