import type {
  Listing,
  ListingAction,
  ListingReport,
  LookingForRequest,
  UserSession,
} from "./types";
import { INITIAL_LISTINGS } from "./mock-data";

export const STORAGE_KEYS = {
  session: "tradify_session",
  profile: "tradify_profile",
  listings: "tradify_listings",
  wishlist: "tradify_wishlist",
  lookingFor: "tradify_looking_for",
  listingActions: "tradify_listing_actions",
  reports: "tradify_reports",
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

function persistUser(user: UserSession): void {
  const profile = {
    id: user.id,
    name: user.name,
    email: user.email,
    studentId: user.studentId,
    phone: user.phone,
    branch: user.branch,
    year: user.year,
    hostel: user.hostel,
    bio: user.bio,
    profileImage: user.profileImage,
  };
  writeJson(STORAGE_KEYS.profile, profile);
  writeJson(STORAGE_KEYS.session, user);
}

export function setCurrentUser(user: UserSession): UserSession {
  const savedProfile = readJson<Partial<UserSession> | null>(
    STORAGE_KEYS.profile,
    null,
  );
  const updatedUser = {
    ...user,
    ...(savedProfile?.id === user.id ? savedProfile : {}),
    loggedIn: true as const,
  };
  persistUser(updatedUser);
  return updatedUser;
}

export function updateCurrentUser(updates: Partial<UserSession>): UserSession | null {
  const user = getCurrentUser();
  if (!user) return null;
  const updatedUser = { ...user, ...updates };
  persistUser(updatedUser);
  return updatedUser;
}

export function logoutUser(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEYS.session);
}

export function getListings(): Listing[] {
  const existing = readJson<Listing[] | null>(STORAGE_KEYS.listings, null);
  if (existing) return existing;
  saveListings(INITIAL_LISTINGS);
  return INITIAL_LISTINGS;
}

export function getListing(listingId: string): Listing | undefined {
  return getListings().find((listing) => listing.id === listingId);
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
  saveWishlist(getWishlist().filter((id) => id !== listingId));
  saveListingActions(
    getListingActions().filter((action) => action.listingId !== listingId),
  );
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

export function addLookingForRequest(
  request: LookingForRequest,
): LookingForRequest[] {
  const requests = [request, ...getLookingForRequests()];
  saveLookingForRequests(requests);
  return requests;
}

export function deleteLookingForRequest(requestId: string): LookingForRequest[] {
  const requests = getLookingForRequests().filter(
    (request) => request.id !== requestId,
  );
  saveLookingForRequests(requests);
  return requests;
}

export function getListingActions(): ListingAction[] {
  return readJson<ListingAction[]>(STORAGE_KEYS.listingActions, []);
}

export function saveListingActions(actions: ListingAction[]): void {
  writeJson(STORAGE_KEYS.listingActions, actions);
}

export function addListingAction(action: ListingAction): ListingAction[] {
  const actions = [action, ...getListingActions()];
  saveListingActions(actions);
  return actions;
}

export function getReports(): ListingReport[] {
  return readJson<ListingReport[]>(STORAGE_KEYS.reports, []);
}

export function addReport(report: ListingReport): ListingReport[] {
  const reports = [report, ...getReports()];
  writeJson(STORAGE_KEYS.reports, reports);
  return reports;
}
