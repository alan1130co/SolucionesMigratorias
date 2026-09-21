import { unstable_cache } from "next/cache";

const PLACES_API_BASE = "https://places.googleapis.com/v1/places";

const FIELD_MASK = [
  "displayName",
  "rating",
  "userRatingCount",
  "googleMapsUri",
  "reviews.rating",
  "reviews.text",
  "reviews.originalText",
  "reviews.relativePublishTimeDescription",
  "reviews.publishTime",
  "reviews.authorAttribution",
].join(",");

interface GooglePlaceApiResponse {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: Array<{
    rating?: number;
    text?: { text?: string };
    originalText?: { text?: string };
    relativePublishTimeDescription?: string;
    publishTime?: string;
    authorAttribution?: {
      displayName?: string;
      uri?: string;
      photoUri?: string;
    };
  }>;
}

export interface GoogleReview {
  rating: number;
  text: string;
  relativeTime: string;
  publishTime: string;
  authorName: string;
  authorPhotoUrl: string | null;
  authorProfileUrl: string | null;
}

export interface GoogleReviewsData {
  businessName: string;
  rating: number;
  userRatingCount: number;
  googleMapsUri: string;
  reviews: GoogleReview[];
}

async function fetchGoogleReviews(): Promise<GoogleReviewsData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    throw new Error(
      "Faltan las variables de entorno GOOGLE_PLACES_API_KEY y/o GOOGLE_PLACE_ID"
    );
  }

  // cache: "no-store" a propósito: el cacheo de 24h lo controla únicamente
  // unstable_cache() más abajo, que solo persiste el resultado si esta
  // función se resuelve con éxito (si lanza, no queda nada cacheado).
  const res = await fetch(`${PLACES_API_BASE}/${placeId}?languageCode=es`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Google Places API respondió con estado ${res.status}`);
  }

  const data: GooglePlaceApiResponse = await res.json();

  return {
    businessName: data.displayName?.text ?? "Soluciones Migratorias SM",
    rating: data.rating ?? 0,
    userRatingCount: data.userRatingCount ?? 0,
    googleMapsUri: data.googleMapsUri ?? "",
    reviews: (data.reviews ?? []).map((review) => ({
      rating: review.rating ?? 0,
      text: review.text?.text ?? review.originalText?.text ?? "",
      relativeTime: review.relativePublishTimeDescription ?? "",
      publishTime: review.publishTime ?? "",
      authorName: review.authorAttribution?.displayName ?? "Cliente de Google",
      authorPhotoUrl: review.authorAttribution?.photoUri ?? null,
      authorProfileUrl: review.authorAttribution?.uri ?? null,
    })),
  };
}

// Si fetchGoogleReviews() lanza (credenciales faltantes, error de red,
// respuesta no-OK de Google), unstable_cache no persiste nada: la próxima
// visita vuelve a intentarlo en vez de quedar con un error cacheado 24h.
const getCachedGoogleReviews = unstable_cache(
  fetchGoogleReviews,
  ["google-reviews"],
  { revalidate: 86400 }
);

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  try {
    return await getCachedGoogleReviews();
  } catch (error) {
    console.error(
      "[google-reviews] No se pudieron obtener las reseñas de Google:",
      error instanceof Error ? error.message : error
    );
    return null;
  }
}

export function getGoogleMapsFallbackUrl(): string | null {
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!placeId) return null;
  return `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(placeId)}`;
}
