import { TagVariant } from "@resonance/ui";

export interface StatusTag {
  variant: TagVariant;
  label: string;
}

// Confirmed against Swagger — GET /v1/cleaners/availabilities returns a list
// of these (note the key is `id` here, while the delete endpoint's request
// body calls it `availability_id`).
export interface AvailabilityEntry {
  id: number;
  day: string;
  start_time: string;
  end_time: string;
}

// Payload for POST /v1/cleaners/availability/setup — a new entry has no id
// yet, so this omits it rather than reusing AvailabilityEntry.
export interface NewAvailabilityEntry {
  day: string;
  start_time: string;
  end_time: string;
}

export interface DeleteAvailabilityPayload {
  availability_id: number;
}

// Confirmed against Swagger — GET /v1/cleaners/service-locations.
export interface ServiceArea {
  postcode: string;
  radius: string;
}

export interface ServiceLocation {
  state: string;
  area1: ServiceArea;
  area2: ServiceArea;
}

// Confirmed against Swagger — POST /v1/cleaners/service-locations/setup.
// Unlike the GET shape, radius is a number here and each area carries the
// coordinates of its postcode.
export interface ServiceAreaPayload {
  postcode: string;
  radius: number;
  gps_lat: number;
  gps_lng: number;
}

export interface SetServiceLocationPayload {
  state: string;
  area1: ServiceAreaPayload;
  // Omitted when the cleaner only sets one area.
  area2?: ServiceAreaPayload;
}
