"use client";

import Link from "next/link";

import { ListingCard } from "@/components/listing-card";
import { ProtectedShell } from "@/components/protected-shell";
import { Button } from "@/components/ui/button";
import { usePrototype } from "@/components/prototype-provider";

export default function WishlistPage() {
  const { wishlist, listings } = usePrototype();
  const savedListings = wishlist
    .map((id) => listings.find((listing) => listing.id === id))
    .filter((listing) => listing !== undefined);

  return (
    <ProtectedShell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm text-primary">Saved for later</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Wishlist</h1>
        {savedListings.length ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {savedListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-white/[0.12] px-6 py-12 text-center">
            <h2 className="font-semibold">Your wishlist is empty.</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Save listings you like and find them here later.
            </p>
            <Button asChild className="mt-5">
              <Link href="/home">Explore the marketplace</Link>
            </Button>
          </div>
        )}
      </section>
    </ProtectedShell>
  );
}
