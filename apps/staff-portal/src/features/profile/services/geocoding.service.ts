// Legacy Geocoding API (forward: postcode -> coordinates), same Google Maps
// key the rest of the app uses. Needs "Geocoding API" enabled in Cloud
// Console, separate from Places API (New) — same requirement as admin-portal's
// reverse geocoding.
const GEOCODING_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

export interface Coordinates {
  lat: number;
  lng: number;
}

interface GeocodeApiResponse {
  status: string;
  results?: { geometry?: { location?: Coordinates } }[];
}

// Restricted to the UK — service locations are UK postcodes.
export const geocodePostcode = async (
  postcode: string,
): Promise<Coordinates | null> => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(postcode)}&components=country:GB&key=${GEOCODING_API_KEY}`,
  );

  if (!response.ok) return null;

  const data: GeocodeApiResponse = await response.json();
  if (data.status !== "OK") return null;

  return data.results?.[0]?.geometry?.location ?? null;
};
