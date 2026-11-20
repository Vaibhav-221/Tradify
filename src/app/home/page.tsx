"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ListingCard } from "@/components/listing-card";
import { ProtectedShell } from "@/components/protected-shell";
import { Button } from "@/components/ui/button";
import { usePrototype } from "@/components/prototype-provider";
import {
  CONDITIONS,
  LISTING_CATEGORIES,
} from "@/lib/marketplace";

export default function HomePage() {
  const { user, listings } = usePrototype();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("all");
  const [condition, setCondition] = useState("all");
  const [hostel, setHostel] = useState("all");
  const hostels = useMemo(
    () => [...new Set(listings.map((listing) => listing.hostel))].sort(),
    [listings],
  );
  const normalizedSearch = search.trim().toLocaleLowerCase();
  const filteredListings = listings.filter((listing) => {
    if (listing.status !== "available") return false;
    if (category !== "All" && listing.category !== category) return false;
    if (type !== "all" && listing.type !== type) return false;
    if (condition !== "all" && listing.condition !== condition) return false;
    if (hostel !== "all" && listing.hostel !== hostel) return false;
    if (!normalizedSearch) return true;

    return [
      listing.title,
      listing.description,
      listing.category,
      listing.hostel,
    ].some((value) => value.toLocaleLowerCase().includes(normalizedSearch));
  });
  const hasFilters =
    search.length > 0 ||
    category !== "All" ||
    type !== "all" ||
    condition !== "all" ||
    hostel !== "all";

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setType("all");
    setCondition("all");
    setHostel("all");
  }

  return (
    <ProtectedShell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="mb-2 text-sm text-primary">
            Welcome back, {user?.name}
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.04em]">
            Find what you need on campus.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Discover items shared by students in your campus community.
          </p>
        </div>

        <label className="sr-only" htmlFor="marketplace-search">
          Search listings
        </label>
        <input
          id="marketplace-search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, category, location, or description..."
          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/50"
        />

        <div className="scrollbar-none mt-5 flex gap-2 overflow-x-auto pb-2">
          {["All", ...LISTING_CATEGORIES].map((item) => (
            <Button
              key={item}
              type="button"
              size="sm"
              variant={category === item ? "secondary" : "outline"}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              className="shrink-0 border-white/10"
            >
              {item}
            </Button>
          ))}
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div>
            <label
              htmlFor="listing-type-filter"
              className="mb-1.5 block text-xs text-muted-foreground"
            >
              Listing type
            </label>
            <select
              id="listing-type-filter"
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="h-10 w-full rounded-lg border border-white/10 bg-background px-3 text-sm"
            >
              <option value="all">All types</option>
              <option value="sell">For sale</option>
              <option value="giveaway">Give away</option>
              <option value="exchange">Exchange</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="condition-filter"
              className="mb-1.5 block text-xs text-muted-foreground"
            >
              Condition
            </label>
            <select
              id="condition-filter"
              value={condition}
              onChange={(event) => setCondition(event.target.value)}
              className="h-10 w-full rounded-lg border border-white/10 bg-background px-3 text-sm"
            >
              <option value="all">Any condition</option>
              {CONDITIONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="hostel-filter"
              className="mb-1.5 block text-xs text-muted-foreground"
            >
              Location
            </label>
            <select
              id="hostel-filter"
              value={hostel}
              onChange={(event) => setHostel(event.target.value)}
              className="h-10 w-full rounded-lg border border-white/10 bg-background px-3 text-sm"
            >
              <option value="all">All locations</option>
              {hostels.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-5 mt-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Campus listings
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filteredListings.length}{" "}
              {filteredListings.length === 1 ? "item" : "items"} available
            </p>
          </div>
          {hasFilters ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearFilters}
            >
              Clear filters
            </Button>
          ) : null}
        </div>

        {filteredListings.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/[0.12] px-6 py-12 text-center">
            <h3 className="font-semibold">
              {listings.some((listing) => listing.status === "available")
                ? "No listings match your filters"
                : "No listings yet"}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              {listings.some((listing) => listing.status === "available")
                ? "Try a different search or clear the selected filters."
                : "Be the first to share something with your campus community."}
            </p>
            {!listings.some((listing) => listing.status === "available") ? (
              <Button asChild className="mt-5">
                <Link href="/create-listing">Create the first listing</Link>
              </Button>
            ) : null}
          </div>
        )}
      </section>
    </ProtectedShell>
  );
}
