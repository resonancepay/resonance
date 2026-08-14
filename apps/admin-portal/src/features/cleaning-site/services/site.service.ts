import { apiClient } from "@/lib/axios";
import {
  AddSitePayload,
  EditSitePayload,
  Site,
  SiteActionPayload,
  SiteDetailsPayload,
  SiteListResponse,
} from "../types/site.type";

// NOTE: request/response shapes are provisional (see site.type.ts) — paths
// and HTTP methods match the API docs, payload fields need confirming.

export const getSites = async (): Promise<SiteListResponse> => {
  const result = await apiClient.get("/admin/sites");
  return result.data;
};

export const getSite = async (payload: SiteDetailsPayload): Promise<Site> => {
  const result = await apiClient.post("/admin/site", payload);
  return result.data;
};

export const addSite = async (payload: AddSitePayload): Promise<Site> => {
  const result = await apiClient.post("/admin/site/add", payload);
  return result.data;
};

export const editSite = async (payload: EditSitePayload): Promise<Site> => {
  const result = await apiClient.post("/admin/site/edit", payload);
  return result.data;
};

export const activateSite = async (
  payload: SiteActionPayload,
): Promise<Site> => {
  const result = await apiClient.post("/admin/site/activate", payload);
  return result.data;
};

export const suspendSite = async (
  payload: SiteActionPayload,
): Promise<Site> => {
  const result = await apiClient.post("/admin/site/suspend", payload);
  return result.data;
};

// Response is application/json with a plain string body (CSV content), not
// raw binary — axios already decodes it to a JS string via result.data.
export const exportSites = async (): Promise<string> => {
  const result = await apiClient.get<string>("/admin/sites/export");
  return result.data;
};
