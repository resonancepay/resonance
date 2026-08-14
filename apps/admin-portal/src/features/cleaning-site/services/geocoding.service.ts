// Legacy Geocoding API — used only for reverse geocoding (coordinates ->
// address), which Places API (New) doesn't offer directly. Needs its own
// "Geocoding API" enabled in Cloud Console, separate from Places API (New)
// and Maps Static API.
const GEOCODING_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

interface GeocodeApiResponse {
  status: string;
  results?: { formatted_address: string }[];
}

export const reverseGeocode = async (lat: number, lng: number): Promise<string | null> => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GEOCODING_API_KEY}`,
  );

  if (!response.ok) return null;

  const data: GeocodeApiResponse = await response.json();
  if (data.status !== "OK") return null;

  return data.results?.[0]?.formatted_address ?? null;
};
