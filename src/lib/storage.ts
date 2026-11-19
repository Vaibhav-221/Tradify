import type { Listing, LookingForRequest, UserSession } from "./types";

export const STORAGE_KEYS = {
  session: "tradify_session",
  listings: "tradify_listings",
  wishlist: "tradify_wishlist",
  lookingFor: "tradify_looking_for",
} as const;

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getCurrentUser(): UserSession | null {
  return readJson<UserSession | null>(STORAGE_KEYS.session, null);
}

export function setCurrentUser(user: UserSession): void {
  writeJson(STORAGE_KEYS.session, user);
}

export function logoutUser(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEYS.session);
}

export function getListings(): Listing[] {
  return readJson<Listing[]>(STORAGE_KEYS.listings, []);
}

export function saveListings(listings: Listing[]): void {
  writeJson(STORAGE_KEYS.listings, listings);
}

export function addListing(listing: Listing): Listing[] {
  const listings = [listing, ...getListings()];
  saveListings(listings);
  return listings;
}

export function updateListing(
  listingId: string,
  updates: Partial<Listing>,
): Listing[] {
  const listings = getListings().map((listing) =>
    listing.id === listingId ? { ...listing, ...updates } : listing,
  );
  saveListings(listings);
  return listings;
}

export function deleteListing(listingId: string): Listing[] {
  const listings = getListings().filter((listing) => listing.id !== listingId);
  saveListings(listings);
  return listings;
}

export function getWishlist(): string[] {
  return readJson<string[]>(STORAGE_KEYS.wishlist, []);
}

export function saveWishlist(listingIds: string[]): void {
  writeJson(STORAGE_KEYS.wishlist, listingIds);
}

export function toggleWishlist(listingId: string): string[] {
  const wishlist = getWishlist();
  const next = wishlist.includes(listingId)
    ? wishlist.filter((id) => id !== listingId)
    : [...wishlist, listingId];
  saveWishlist(next);
  return next;
}

export function getLookingForRequests(): LookingForRequest[] {
  return readJson<LookingForRequest[]>(STORAGE_KEYS.lookingFor, []);
}

export function saveLookingForRequests(
  requests: LookingForRequest[],
): void {
  writeJson(STORAGE_KEYS.lookingFor, requests);
}
