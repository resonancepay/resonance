// Direct REST calls to Places API (New) — no Maps JS SDK needed for this.
// https://places.googleapis.com/v1/places:autocomplete

const PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

export interface PlaceSuggestion {
  placeId: string;
  mainText: string;
  secondaryText: string;
  fullText: string;
}

export interface PlaceLocation {
  address: string;
  lat: number;
  lng: number;
}

interface AutocompleteApiResponse {
  suggestions?: {
    placePrediction?: {
      placeId: string;
      text?: { text: string };
      structuredFormat?: {
        mainText?: { text: string };
        secondaryText?: { text: string };
      };
    };
  }[];
}

// sessionToken bundles an autocomplete session's keystrokes + the final
// place-details lookup into one billed session instead of per-request —
// pass the same token for every call in a session, then start a new one.
export const autocompletePlaces = async (
  input: string,
  sessionToken: string,
): Promise<PlaceSuggestion[]> => {
  if (!input.trim()) return [];

  const response = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": PLACES_API_KEY,
    },
    body: JSON.stringify({ input, sessionToken }),
  });

  if (!response.ok) return [];

  const data: AutocompleteApiResponse = await response.json();

  return (data.suggestions ?? [])
    .map((s) => s.placePrediction)
    .filter((p): p is NonNullable<typeof p> => !!p?.placeId)
    .map((p) => ({
      placeId: p.placeId,
      mainText: p.structuredFormat?.mainText?.text ?? p.text?.text ?? "",
      secondaryText: p.structuredFormat?.secondaryText?.text ?? "",
      fullText: p.text?.text ?? "",
    }));
};

interface PlaceDetailsApiResponse {
  formattedAddress?: string;
  location?: { latitude: number; longitude: number };
}

export const getPlaceDetails = async (
  placeId: string,
  sessionToken: string,
): Promise<PlaceLocation | null> => {
  const response = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}?sessionToken=${sessionToken}`,
    {
      headers: {
        "X-Goog-Api-Key": PLACES_API_KEY,
        "X-Goog-FieldMask": "formattedAddress,location",
      },
    },
  );

  if (!response.ok) return null;

  const data: PlaceDetailsApiResponse = await response.json();
  if (!data.location) return null;

  return {
    address: data.formattedAddress ?? "",
    lat: data.location.latitude,
    lng: data.location.longitude,
  };
};

// Used to resolve an already-known address string (e.g. an existing site's
// address, on opening the edit drawer) to coordinates without going through
// the predict-then-select flow.
export const searchPlaceByText = async (query: string): Promise<PlaceLocation | null> => {
  if (!query.trim()) return null;

  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": PLACES_API_KEY,
      "X-Goog-FieldMask": "places.formattedAddress,places.location",
    },
    body: JSON.stringify({ textQuery: query }),
  });

  if (!response.ok) return null;

  const data: { places?: PlaceDetailsApiResponse[] } = await response.json();
  const place = data.places?.[0];
  if (!place?.location) return null;

  return {
    address: place.formattedAddress ?? query,
    lat: place.location.latitude,
    lng: place.location.longitude,
  };
};
