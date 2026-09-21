import { apiClient } from "@/lib/axios";
import {
  DeleteAvailabilityPayload,
  NewAvailabilityEntry,
} from "@/features/auth/types/auth.type";

// Confirmed against Swagger — POST /v1/cleaners/availability/setup, body is
// the list of new availability entries (day/start_time/end_time) to create.
export const setupAvailability = async (payload: NewAvailabilityEntry[]) => {
  const result = await apiClient.post("/cleaners/availability/setup", payload);
  return result.data;
};

// Confirmed against Swagger — POST /v1/cleaners/availability/delete.
export const deleteAvailability = async (payload: DeleteAvailabilityPayload) => {
  const result = await apiClient.post("/cleaners/availability/delete", payload);
  return result.data;
};
