"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

import { ListingCard } from "@/components/listing-card";
import { ProtectedShell } from "@/components/protected-shell";
import { Button } from "@/components/ui/button";
import { usePrototype } from "@/components/prototype-provider";
import { CONDITIONS, LISTING_CATEGORIES } from "@/lib/marketplace";

export default function HomePage() {
  const { listings, lookingForRequests } = usePrototype();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("all");
  const [condition, setCondition] = useState("all");
  const [hostel, setHostel] = useState("all");
  const [filtersExpanded, setFiltersExpanded] = useState(true);
  const hostels = useMemo(
    () => [...new Set(listings.map((listing) => listing.hostel))].sort(),
    [listings],
  );
  const normalizedSearch = search.trim().toLocaleLowerCase();
  const filteredListings = listings.filter((listing) => {
    if (listing.status === "sold") return false;
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
  const filteredRequests = lookingForRequests.filter((request) => {
    if (category !== "All" && request.category !== category) return false;
    if (hostel !== "all" && request.hostel !== hostel) return false;
    if (!normalizedSearch) return true;

    return [
      request.title,
      request.description,
      request.category,
      request.hostel,
    ].some((value) => value.toLocaleLowerCase().includes(normalizedSearch));
  });
  const hasFilters =
    normalizedSearch.length > 0 ||
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
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="relative">
          <label className="sr-only" htmlFor="marketplace-search">
            Search listings
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            id="marketplace-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search listings by name, category, location..."
            className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/50"
          />
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Filters</p>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={filtersExpanded ? "Collapse filters" : "Expand filters"}
              aria-expanded={filtersExpanded}
              aria-controls="marketplace-filters"
              onClick={() => setFiltersExpanded((expanded) => !expanded)}
              className="size-8"
            >
              <ChevronDown
                aria-hidden="true"
                className={`h-4 w-4 transition-transform ${filtersExpanded ? "rotate-180" : ""}`}
              />
            </Button>
          </div>
          <div
            id="marketplace-filters"
            className={
              filtersExpanded
                ? "mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4"
                : "hidden"
            }
          >
            <div className="min-w-0">
              <label
                htmlFor="category-filter"
                className="mb-1 block text-xs text-muted-foreground"
              >
                Category
              </label>
              <select
                id="category-filter"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-10 w-full rounded-lg border border-white/10 bg-background px-2.5 text-sm sm:px-3"
              >
                <option value="All">All Categories</option>
                {LISTING_CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="min-w-0">
              <label
                htmlFor="listing-type-filter"
                className="mb-1 block text-xs text-muted-foreground"
              >
                Listing type
              </label>
              <select
                id="listing-type-filter"
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="h-10 w-full rounded-lg border border-white/10 bg-background px-2.5 text-sm sm:px-3"
              >
                <option value="all">All Types</option>
                <option value="sell">Sell</option>
                <option value="giveaway">Give Away</option>
                <option value="exchange">Exchange</option>
              </select>
            </div>
            <div className="min-w-0">
              <label
                htmlFor="condition-filter"
                className="mb-1 block text-xs text-muted-foreground"
              >
                Condition
              </label>
              <select
                id="condition-filter"
                value={condition}
                onChange={(event) => setCondition(event.target.value)}
                className="h-10 w-full rounded-lg border border-white/10 bg-background px-2.5 text-sm sm:px-3"
              >
                <option value="all">Any Condition</option>
                {CONDITIONS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="min-w-0">
              <label
                htmlFor="hostel-filter"
                className="mb-1 block text-xs text-muted-foreground"
              >
                Location
              </label>
              <select
                id="hostel-filter"
                value={hostel}
                onChange={(event) => setHostel(event.target.value)}
                className="h-10 w-full rounded-lg border border-white/10 bg-background px-2.5 text-sm sm:px-3"
              >
                <option value="all">All Locations</option>
                {hostels.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4 mt-6 flex items-end justify-between gap-3 sm:mt-7">
          <div>
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Campus listings
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {filteredListings.length}{" "}
              {filteredListings.length === 1 ? "item" : "items"} listed
            </p>
          </div>
          {hasFilters ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 shrink-0 px-2 text-xs"
            >
              Clear filters
            </Button>
          ) : null}
        </div>

        {filteredListings.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/[0.12] px-6 py-10 text-center">
            <h2 className="font-semibold">
              {listings.some((listing) => listing.status !== "sold")
                ? "No listings match your filters"
                : "No listings yet"}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              {listings.some((listing) => listing.status !== "sold")
                ? "Try a different search or clear the selected filters."
                : "Be the first to share something with your campus community."}
            </p>
            {!listings.some((listing) => listing.status !== "sold") ? (
              <Button asChild className="mt-5">
                <Link href="/create-listing">Create the first listing</Link>
              </Button>
            ) : null}
          </div>
        )}

        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Looking For
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Requests from your campus community
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/looking-for">Post a request</Link>
            </Button>
          </div>
          {filteredRequests.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredRequests.map((request) => (
                <article
                  key={request.id}
                  className="flex flex-col rounded-xl border border-white/[0.08] bg-card/60 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold leading-5">{request.title}</h3>
                    <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] text-primary">
                      Looking For
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-4 whitespace-pre-wrap text-sm text-muted-foreground">
                    {request.description}
                  </p>
                  <div className="mt-auto border-t border-white/[0.07] pt-3">
                    <p className="text-xs text-muted-foreground">
                      {request.category} ·{" "}
                      {request.budget === undefined
                        ? "No budget specified"
                        : `Up to ₹${request.budget}`}{" "}
                      · {request.hostel}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-white/[0.12] px-6 py-8 text-center text-sm text-muted-foreground">
              {lookingForRequests.length
                ? "No requests match your filters."
                : "No Looking For requests yet."}
            </p>
          )}
        </section>
      </section>
    </ProtectedShell>
  );
}
