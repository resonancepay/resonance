import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  SiteListResponse,
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

// Toggles a site's active/suspended state, flipping it in the cached list
// immediately (optimistic) so the table updates without waiting on the
// round trip, then reconciles with the server once the call settles.
export const useToggleSiteStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (site: Site) =>
      site.is_active
        ? suspendSite({ site_id: site.site_id })
        : activateSite({ site_id: site.site_id }),
    onMutate: async (site) => {
      await queryClient.cancelQueries({ queryKey: ["sites"] });
      const previous = queryClient.getQueryData<SiteListResponse>(["sites"]);

      queryClient.setQueryData<SiteListResponse>(["sites"], (old) =>
        old?.map((s) =>
          s.site_id === site.site_id ? { ...s, is_active: !s.is_active } : s,
        ),
      );

      return { previous };
    },
    onError: (_err, _site, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["sites"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["sites"] });
    },
  });
};

export const useExportSites = (
  sc: (val: string) => void,
  ec?: (err: any) => void,
) => {
  return useMutation({
    mutationFn: () => exportSites(),
    onSuccess: sc,
    onError: ec,
  });
};
