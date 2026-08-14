import { useMutation, useQuery } from "@tanstack/react-query";
import {
  approveApplication,
  exportApprovedCleaners,
  exportPendingCleaners,
  getApprovedCleaner,
  getApprovedCleaners,
  getPendingCleaner,
  getPendingCleaners,
  rejectApplication,
} from "../services/cleaner.service";
import {
  ApplicationPayload,
  ApproveApplicationPayload,
  PaginationQuery,
  PendingCleaner,
  RejectApplicationPayload,
} from "../types/cleaner.type";

export const usePendingCleaners = (query: PaginationQuery = {}) => {
  return useQuery({
    queryKey: ["pending-cleaners", query.page ?? 1, query.size ?? 10],
    queryFn: () => getPendingCleaners(query),
  });
};

export const usePendingCleaner = (
  payload: ApplicationPayload,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["pending-cleaner", payload.application_id],
    queryFn: () => getPendingCleaner(payload),
    enabled,
  });
};

export const useApproveApplication = (
  sc: (val: PendingCleaner) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: ApproveApplicationPayload) => approveApplication(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useRejectApplication = (
  sc: (val: PendingCleaner) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: RejectApplicationPayload) => rejectApplication(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useApprovedCleaners = (query: PaginationQuery = {}) => {
  return useQuery({
    queryKey: ["approved-cleaners", query.page ?? 1, query.size ?? 10],
    queryFn: () => getApprovedCleaners(query),
  });
};

export const useApprovedCleaner = (
  payload: ApplicationPayload,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["approved-cleaner", payload.application_id],
    queryFn: () => getApprovedCleaner(payload),
    enabled,
  });
};

export const useExportPendingCleaners = (
  sc: (val: string) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: () => exportPendingCleaners(),
    onSuccess: sc,
    onError: ec,
  });
};

export const useExportApprovedCleaners = (
  sc: (val: string) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: () => exportApprovedCleaners(),
    onSuccess: sc,
    onError: ec,
  });
};
