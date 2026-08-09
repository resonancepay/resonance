import { useMutation, useQuery } from "@tanstack/react-query";
import {
  activateSite,
  addSite,
  editSite,
  exportSites,
  getSite,
  getSites,
  suspendSite,
} from "../services/site.service";
import {
  AddSitePayload,
  EditSitePayload,
  Site,
  SiteActionPayload,
} from "../types/site.type";

export const useSites = () => {
  return useQuery({
    queryKey: ["sites"],
    queryFn: getSites,
  });
};

export const useSite = (siteId: number, enabled = true) => {
  return useQuery({
    queryKey: ["site", siteId],
    queryFn: () => getSite({ site_id: siteId }),
    enabled,
  });
};

export const useAddSite = (
  sc: (val: Site) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: AddSitePayload) => addSite(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useEditSite = (
  sc: (val: Site) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: EditSitePayload) => editSite(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useActivateSite = (
  sc: (val: Site) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: SiteActionPayload) => activateSite(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useSuspendSite = (
  sc: (val: Site) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: (payload: SiteActionPayload) => suspendSite(payload),
    onSuccess: sc,
    onError: ec,
  });
};

export const useExportSites = (
  sc: (val: Blob) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: () => exportSites(),
    onSuccess: sc,
    onError: ec,
  });
};
