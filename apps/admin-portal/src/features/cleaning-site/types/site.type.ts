// NOTE: Site itself is confirmed against the real GET /v1/admin/sites
// response. AddSitePayload/EditSitePayload are still provisional — grounded
// in the add-site-drawer form, not yet confirmed against the API.

export interface Site {
  site_id: number;
  site_name: string;
  site_address: string;
  client_name: string;
  client_email: string;
  job_type: string;
  jobs: number;
  uniforms: number;
  date_added: string;
  is_active: boolean;
}

export type SiteListResponse = Site[];

export interface SiteDetailsPayload {
  site_id: number;
}

export interface AddSitePayload {
  site_name: string;
  site_address: string;
  job_type: string;
  uniforms: string[];
  client_name: string;
  client_email: string;
}

export interface EditSitePayload extends Partial<AddSitePayload> {
  site_id: number;
}

export interface SiteActionPayload {
  site_id: number;
}
