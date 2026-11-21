"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Heart, MapPin, PackageOpen, Trash2 } from "lucide-react";
import { motion } from "motion/react";

import { Modal } from "@/components/modal";
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
  index?: number;
}

export function ListingCard({
  listing,
  showWishlist = true,
  sellerName,
  actions,
  index = 0,
}: ListingCardProps) {
  const { wishlist, toggleWishlist, notify, user, deleteListing } =
    usePrototype();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isSaved = wishlist.includes(listing.id);
  const isOwner = listing.sellerId === user?.id;

  function handleWishlist() {
    const nextSaved = !wishlist.includes(listing.id);
    toggleWishlist(listing.id);
    notify(nextSaved ? "Added to favorites." : "Removed from favorites.");
  }

  function handleDelete() {
    if (!isOwner) return;
    deleteListing(listing.id);
    setConfirmDelete(false);
    notify("Listing deleted.");
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{
        layout: { duration: 0.25 },
        default: { duration: 0.25, delay: Math.min(index * 0.04, 0.2) },
      }}
      className="overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/30"
    >
      <div className="relative">
        <Link
          href={`/listings/${listing.id}`}
          aria-label={`View listing: ${listing.title}`}
          className="block"
        >
          <motion.div
            whileHover={{ scale: 1.035 }}
            transition={{ duration: 0.25 }}
            className="flex h-48 items-center justify-center bg-secondary"
          >
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
          </motion.div>
        </Link>
        {showWishlist ? (
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={handleWishlist}
            aria-label={isSaved ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={isSaved}
            className="absolute right-3 top-3 rounded-full bg-background/90"
          >
            <motion.span
              animate={isSaved ? { scale: [1, 1.16, 1] } : { scale: 1 }}
              transition={{ duration: 0.28 }}
            >
              <Heart
                className={`h-4 w-4 ${isSaved ? "fill-rose-500 text-rose-500" : ""}`}
              />
            </motion.span>
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

        <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
          <span className="text-xs text-muted-foreground">
            {getListingTypeLabel(listing.type)}
          </span>
          <motion.span
            key={listing.status}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`rounded-full px-2.5 py-1 text-[11px] ${
              listing.status === "available"
                ? "bg-[var(--status-success-bg)] text-[var(--status-success-text)]"
                : listing.status === "reserved"
                  ? "bg-[var(--status-warning-bg)] text-[var(--status-warning-text)]"
                  : "bg-secondary text-muted-foreground"
            }`}
          >
            {listing.status[0].toUpperCase() + listing.status.slice(1)}
          </motion.span>
        </div>

        {actions || isOwner ? (
          <div className="flex flex-wrap items-center gap-2">
            {actions}
            {isOwner ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Delete listing ${listing.title}`}
                title="Delete listing"
                onClick={() => setConfirmDelete(true)}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
      {confirmDelete ? (
        <Modal
          title="Delete this listing?"
          onClose={() => setConfirmDelete(false)}
          footer={
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
              >
                Delete listing
              </Button>
            </>
          }
        >
          <p className="text-sm text-muted-foreground">
            “{listing.title}” will be permanently removed from the marketplace.
            Its favorites will also be cleared.
          </p>
        </Modal>
      ) : null}
    </motion.article>
  );
}
