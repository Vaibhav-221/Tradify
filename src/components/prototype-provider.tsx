"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  addListing as storeAddListing,
  addListingAction as storeAddListingAction,
  addLookingForRequest as storeAddLookingForRequest,
  addReport as storeAddReport,
  deleteListing as storeDeleteListing,
  deleteLookingForRequest as storeDeleteLookingForRequest,
  getCurrentUser,
  getListingActions,
  getListings,
  getLookingForRequests,
  getReports,
  getWishlist,
  logoutUser as storeLogoutUser,
  setCurrentUser,
  toggleWishlist as storeToggleWishlist,
  updateCurrentUser as storeUpdateCurrentUser,
  updateListing as storeUpdateListing,
} from "@/lib/storage";
import type {
  Listing,
  ListingAction,
  ListingReport,
  LookingForRequest,
  UserSession,
} from "@/lib/types";

interface ToastMessage {
  id: number;
  message: string;
}

interface PrototypeContextValue {
  ready: boolean;
  user: UserSession | null;
  listings: Listing[];
  wishlist: string[];
  lookingForRequests: LookingForRequest[];
  listingActions: ListingAction[];
  reports: ListingReport[];
  login: (session: UserSession) => void;
  logout: () => void;
  updateUser: (updates: Partial<UserSession>) => void;
  addListing: (listing: Listing) => void;
  updateListing: (listingId: string, updates: Partial<Listing>) => void;
  deleteListing: (listingId: string) => void;
  toggleWishlist: (listingId: string) => void;
  addLookingForRequest: (request: LookingForRequest) => void;
  deleteLookingForRequest: (requestId: string) => void;
  addListingAction: (action: ListingAction) => void;
  addReport: (report: ListingReport) => void;
  notify: (message: string) => void;
}

const PrototypeContext = createContext<PrototypeContextValue | null>(null);

export function PrototypeProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<UserSession | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [lookingForRequests, setLookingForRequests] = useState<
    LookingForRequest[]
  >([]);
  const [listingActions, setListingActions] = useState<ListingAction[]>([]);
  const [reports, setReports] = useState<ListingReport[]>([]);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setUser(getCurrentUser());
      setListings(getListings());
      setWishlist(getWishlist());
      setLookingForRequests(getLookingForRequests());
      setListingActions(getListingActions());
      setReports(getReports());
      setReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    function syncFromStorage(event: StorageEvent) {
      if (!event.key || event.key === "tradify_session") {
        setUser(getCurrentUser());
      }
      if (!event.key || event.key === "tradify_listings") {
        setListings(getListings());
      }
      if (!event.key || event.key === "tradify_wishlist") {
        setWishlist(getWishlist());
      }
      if (!event.key || event.key === "tradify_looking_for") {
        setLookingForRequests(getLookingForRequests());
      }
      if (!event.key || event.key === "tradify_listing_actions") {
        setListingActions(getListingActions());
      }
      if (!event.key || event.key === "tradify_reports") {
        setReports(getReports());
      }
    }

    window.addEventListener("storage", syncFromStorage);
    return () => window.removeEventListener("storage", syncFromStorage);
  }, []);

  const notify = useCallback((message: string) => {
    const id = Date.now();
    setToast({ id, message });
    window.setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3500);
  }, []);

  const value = useMemo<PrototypeContextValue>(
    () => ({
      ready,
      user,
      listings,
      wishlist,
      lookingForRequests,
      listingActions,
      reports,
      login(session) {
        setUser(setCurrentUser(session));
      },
      logout() {
        storeLogoutUser();
        setUser(null);
      },
      updateUser(updates) {
        const updatedUser = storeUpdateCurrentUser(updates);
        if (updatedUser) setUser(updatedUser);
      },
      addListing(listing) {
        const nextListings = storeAddListing(listing);
        setListings(nextListings);
      },
      updateListing(listingId, updates) {
        setListings(storeUpdateListing(listingId, updates));
      },
      deleteListing(listingId) {
        setListings(storeDeleteListing(listingId));
        setWishlist(getWishlist());
        setListingActions(getListingActions());
      },
      toggleWishlist(listingId) {
        setWishlist(storeToggleWishlist(listingId));
      },
      addLookingForRequest(request) {
        setLookingForRequests(storeAddLookingForRequest(request));
      },
      deleteLookingForRequest(requestId) {
        setLookingForRequests(storeDeleteLookingForRequest(requestId));
      },
      addListingAction(action) {
        setListingActions(storeAddListingAction(action));
      },
      addReport(report) {
        setReports(storeAddReport(report));
      },
      notify,
    }),
    [
      ready,
      user,
      listings,
      wishlist,
      lookingForRequests,
      listingActions,
      reports,
      notify,
    ],
  );

  return (
    <PrototypeContext.Provider value={value}>
      {children}
      {toast ? (
        <div
          key={toast.id}
          role="status"
          aria-live="polite"
          className="fixed bottom-4 right-4 z-[100] max-w-[calc(100vw-2rem)] rounded-xl border border-white/10 bg-card px-4 py-3 text-sm text-foreground shadow-2xl"
        >
          {toast.message}
        </div>
      ) : null}
    </PrototypeContext.Provider>
  );
}

export function usePrototype(): PrototypeContextValue {
  const context = useContext(PrototypeContext);
  if (!context) {
    throw new Error("usePrototype must be used inside PrototypeProvider.");
  }
  return context;
}
