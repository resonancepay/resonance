import { apiClient } from "@/lib/axios";
import {
  AvailabilityEntry,
  DeleteAvailabilityPayload,
  NewAvailabilityEntry,
  ServiceLocation,
  SetServiceLocationPayload,
} from "../types/profile.type";

// Confirmed against Swagger — GET /v1/cleaners/availabilities.
export const getAvailabilities = async (): Promise<AvailabilityEntry[]> => {
  const result = await apiClient.get("/cleaners/availabilities");
  return result.data;
};

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

// Confirmed against Swagger — GET /v1/cleaners/service-locations.
export const getServiceLocation = async (): Promise<ServiceLocation> => {
  const result = await apiClient.get("/cleaners/service-locations");
  return result.data;
};

// Confirmed against Swagger — POST /v1/cleaners/service-locations/setup.
export const setupServiceLocation = async (payload: SetServiceLocationPayload) => {
  const result = await apiClient.post("/cleaners/service-locations/setup", payload);
  return result.data;
};
