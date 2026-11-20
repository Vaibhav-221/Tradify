"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Pencil, Trash2 } from "lucide-react";

import { ListingCard } from "@/components/listing-card";
import { Modal } from "@/components/modal";
import { ProtectedShell } from "@/components/protected-shell";
import { usePrototype } from "@/components/prototype-provider";
import { Button } from "@/components/ui/button";
import type { Listing, ListingStatus } from "@/lib/types";

export default function MyListingsPage() {
  const { user, listings, updateListing, deleteListing, notify } =
    usePrototype();
  const [pendingDelete, setPendingDelete] = useState<Listing | null>(null);
  const myListings = listings.filter((listing) => listing.sellerId === user?.id);

  function setStatus(listing: Listing, status: ListingStatus) {
    updateListing(listing.id, { status });
    notify(`Listing marked ${status}.`);
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    deleteListing(pendingDelete.id);
    setPendingDelete(null);
    notify("Listing deleted.");
  }

  return (
    <ProtectedShell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm text-primary">Your activity</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            My Listings
          </h1>
        </div>

        {myListings.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {myListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                showWishlist={false}
                actions={
                  <>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/listings/${listing.id}/edit`}>
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                    </Button>
                    {listing.status === "available" ? (
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => setStatus(listing, "sold")}
                      >
                        <Check className="h-3.5 w-3.5" />
                        Mark sold
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => setStatus(listing, "available")}
                      >
                        <Check className="h-3.5 w-3.5" />
                        Mark available
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => setPendingDelete(listing)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </>
                }
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/[0.12] px-6 py-12 text-center">
            <h2 className="font-semibold">You haven’t listed anything yet.</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Create a listing to share useful items with your campus.
            </p>
            <Button asChild className="mt-5">
              <Link href="/create-listing">Create your first listing</Link>
            </Button>
          </div>
        )}
      </section>

      {pendingDelete ? (
        <Modal
          title="Delete this listing?"
          onClose={() => setPendingDelete(null)}
          footer={
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => setPendingDelete(null)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={confirmDelete}
              >
                Delete
              </Button>
            </>
          }
        >
          <p className="text-sm text-muted-foreground">
            “{pendingDelete.title}” will be permanently removed from the
            marketplace. Its wishlist entries will also be cleared.
          </p>
        </Modal>
      ) : null}
    </ProtectedShell>
  );
}
