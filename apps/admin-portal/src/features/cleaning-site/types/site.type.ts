// NOTE: Site, AddSitePayload, and EditSitePayload are all confirmed against
// the real API.

export interface Site {
  site_id: number;
  site_name: string;
  site_address: string;
  client_name: string;
  client_email: string;
  job_type: string;
  jobs: number;
  uniforms: string[];
  date_added: string;
  is_active: boolean;
}

export type SiteListResponse = Site[];

export interface SiteDetailsPayload {
  site_id: number;
}

export interface AddSitePayload {
  site_name: string;
  address: string;
  gps_lat: number;
  gps_lng: number;
  job_type: string;
  uniform: string[];
  client_name: string;
  client_email: string;
}

export interface EditSitePayload extends AddSitePayload {
  site_id: number;
  is_active: boolean;
}

export interface SiteActionPayload {
  site_id: number;
}
