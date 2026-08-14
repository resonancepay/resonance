import { apiClient } from "@/lib/axios";
import {
  ApplicationPayload,
  ApprovedCleanerListResponse,
  ApproveApplicationPayload,
  CleanerApplicationDetails,
  PaginationQuery,
  PendingCleaner,
  PendingCleanerListResponse,
  RejectApplicationPayload,
} from "../types/cleaner.type";

// NOTE: everything below is confirmed against the real API except
// approveApplication/rejectApplication's response shapes (still typed as
// the lean PendingCleaner, unconfirmed) and the two export endpoints,
// which are assumed to follow the same application/json-string pattern
// confirmed for sites' export, not yet confirmed here.

export const getPendingCleaners = async (
  query: PaginationQuery = {},
): Promise<PendingCleanerListResponse> => {
  const result = await apiClient.get("/admin/pending-cleaners", {
    params: { page: query.page ?? 1, size: query.size ?? 10 },
  });
  return result.data;
};

export const getPendingCleaner = async (
  payload: ApplicationPayload,
): Promise<CleanerApplicationDetails> => {
  const result = await apiClient.post("/admin/pending-cleaner", payload);
  return result.data;
};

export const approveApplication = async (
  payload: ApproveApplicationPayload,
): Promise<PendingCleaner> => {
  const result = await apiClient.post("/admin/approve-application", payload);
  return result.data;
};

export const getApprovedCleaners = async (
  query: PaginationQuery = {},
): Promise<ApprovedCleanerListResponse> => {
  const result = await apiClient.get("/admin/approved-cleaners", {
    params: { page: query.page ?? 1, size: query.size ?? 10 },
  });
  return result.data;
};

export const getApprovedCleaner = async (
  payload: ApplicationPayload,
): Promise<CleanerApplicationDetails> => {
  const result = await apiClient.post("/admin/approved-cleaner", payload);
  return result.data;
};

export const rejectApplication = async (
  payload: RejectApplicationPayload,
): Promise<PendingCleaner> => {
  const result = await apiClient.post("/admin/reject-application", payload);
  return result.data;
};

export const exportPendingCleaners = async (): Promise<string> => {
  const result = await apiClient.get<string>("/admin/pending-cleaners/export");
  return result.data;
};

export const exportApprovedCleaners = async (): Promise<string> => {
  const result = await apiClient.get<string>("/admin/approved-cleaners/export");
  return result.data;
};
