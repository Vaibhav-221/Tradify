"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Heart, MapPin, PackageOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePrototype } from "@/components/prototype-provider";
import {
  formatPrice,
  getConditionLabel,
  getListingTypeLabel,
} from "@/lib/marketplace";
import type { Listing } from "@/lib/types";

interface ListingCardProps {
  listing: Listing;
  showWishlist?: boolean;
  sellerName?: string;
  actions?: ReactNode;
}

export function ListingCard({
  listing,
  showWishlist = true,
  sellerName,
  actions,
}: ListingCardProps) {
  const { wishlist, toggleWishlist, notify, user } = usePrototype();
  const isSaved = wishlist.includes(listing.id);

  function handleWishlist() {
    const nextSaved = !wishlist.includes(listing.id);
    toggleWishlist(listing.id);
    notify(nextSaved ? "Added to wishlist." : "Removed from wishlist.");
  }

  return (
    <article className="overflow-hidden rounded-xl border border-white/[0.08] bg-card/60 transition-colors hover:border-white/[0.16]">
      <div className="relative">
        <Link
          href={`/listings/${listing.id}`}
          aria-label={`View listing: ${listing.title}`}
          className="block"
        >
          <div className="flex h-48 items-center justify-center bg-white/[0.025]">
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
        </Link>
        {showWishlist ? (
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={handleWishlist}
            aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={isSaved}
            className="absolute right-3 top-3 rounded-full bg-background/90"
          >
            <Heart
              className={`h-4 w-4 ${isSaved ? "fill-rose-500 text-rose-500" : ""}`}
            />
          </Button>
        ) : null}
      </div>

      <div className="space-y-3 p-4">
        <Link
          href={`/listings/${listing.id}`}
          className="block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex items-start justify-between gap-3">
            <h2 className="line-clamp-2 font-semibold leading-5">
              {listing.title}
            </h2>
            <span className="shrink-0 text-sm font-semibold">
              {formatPrice(listing)}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {listing.category} · {getConditionLabel(listing.condition)}
          </p>
        </Link>

        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="flex min-w-0 items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{listing.hostel}</span>
          </span>
          <span className="shrink-0">
            {sellerName ??
              (listing.sellerId === user?.id
                ? user.name
                : listing.sellerName ?? "Campus student")}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] pt-3">
          <span className="text-xs text-muted-foreground">
            {getListingTypeLabel(listing.type)}
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] ${
              listing.status === "available"
                ? "bg-emerald-500/10 text-emerald-300"
                : listing.status === "reserved"
                  ? "bg-amber-500/10 text-amber-300"
                  : "bg-white/[0.08] text-muted-foreground"
            }`}
          >
            {listing.status[0].toUpperCase() + listing.status.slice(1)}
          </span>
        </div>

        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </article>
  );
}
