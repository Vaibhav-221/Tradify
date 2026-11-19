"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LogOut,
  MapPin,
  PackageOpen,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getCurrentUser, getListings, logoutUser } from "@/lib/storage";
import type { Listing, UserSession } from "@/lib/types";

function formatPrice(listing: Listing): string {
  if (listing.type === "giveaway") return "Free";
  if (listing.type === "exchange") return "Exchange";
  if (listing.price === undefined) return "Contact for price";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(listing.price);
}

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserSession | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const session = getCurrentUser();
    if (!session?.loggedIn) {
      router.replace("/login");
      return;
    }
    queueMicrotask(() => {
      setUser(session);
      setListings(getListings());
      setCheckingSession(false);
    });
  }, [router]);

  const normalizedSearch = search.trim().toLocaleLowerCase();
  const filteredListings = listings
    .filter((listing) => listing.status === "available")
    .filter((listing) =>
      [
        listing.title,
        listing.description,
        listing.category,
        listing.hostel,
        listing.type,
      ].some((value) => value.toLocaleLowerCase().includes(normalizedSearch)),
    );

  function handleLogout() {
    logoutUser();
    router.replace("/login");
  }

  if (checkingSession) {
    return (
      <main className="dark flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-sm text-muted-foreground">Loading marketplace...</p>
      </main>
    );
  }

  return (
    <main className="dark min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/home" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07]">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <span className="text-[17px] font-semibold tracking-[-0.02em]">
              Tradify
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-white/10"
            >
              <Link href="/create-listing">
                <Plus className="mr-1.5 h-4 w-4" />
                Create Listing
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground"
            >
              <LogOut className="mr-1.5 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="mb-2 text-sm text-primary">
            Welcome back, {user?.name}
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.04em]">
            Find what you need on campus.
          </h1>
        </div>

        <div className="relative mt-8">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            aria-label="Search listings"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search listings by name, category, or location..."
            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-12 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/50"
          />
        </div>

        <section className="mt-12" aria-labelledby="listings-heading">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2
                id="listings-heading"
                className="text-2xl font-semibold tracking-tight"
              >
                Campus listings
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {filteredListings.length}{" "}
                {filteredListings.length === 1 ? "item" : "items"} available
              </p>
            </div>
          </div>

          {filteredListings.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredListings.map((listing) => (
                <article
                  key={listing.id}
                  className="overflow-hidden rounded-xl border border-white/[0.08] bg-card/60"
                >
                  <div className="flex h-44 items-center justify-center bg-white/[0.025]">
                    {listing.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <PackageOpen
                        aria-hidden="true"
                        className="h-10 w-10 text-muted-foreground/40"
                      />
                    )}
                  </div>

                  <div className="space-y-3 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold leading-5">{listing.title}</h3>
                      <span className="shrink-0 text-sm font-semibold">
                        {formatPrice(listing)}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {listing.description}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full border border-white/10 px-2.5 py-1 text-muted-foreground">
                        {listing.category}
                      </span>
                      <span className="rounded-full border border-white/10 px-2.5 py-1 text-muted-foreground">
                        {listing.condition.replace("-", " ")}
                      </span>
                      <span className="rounded-full border border-white/10 px-2.5 py-1 text-muted-foreground">
                        {listing.type === "giveaway"
                          ? "Give Away"
                          : listing.type === "exchange"
                            ? "Exchange"
                            : "For Sale"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] pt-3 text-xs text-muted-foreground">
                      <span className="flex min-w-0 items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{listing.hostel}</span>
                      </span>
                      <span className="shrink-0">
                        {listing.sellerId === user?.id
                          ? "Your listing"
                          : "Campus student"}
                      </span>
                    </div>
                    {listing.type === "exchange" && listing.exchangeFor ? (
                      <p className="text-xs text-muted-foreground">
                        Looking for: {listing.exchangeFor}
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/[0.12] px-6 py-12 text-center">
              <PackageOpen className="mx-auto h-8 w-8 text-muted-foreground/50" />
              <h3 className="mt-4 font-semibold">
                {normalizedSearch ? "No listings found" : "No listings yet"}
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                {normalizedSearch
                  ? "Try a different search term."
                  : "Be the first to share something with your campus community."}
              </p>
              {!normalizedSearch ? (
                <Button asChild className="mt-5">
                  <Link href="/create-listing">
                    <Plus className="mr-1.5 h-4 w-4" />
                    Create a listing
                  </Link>
                </Button>
              ) : null}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
