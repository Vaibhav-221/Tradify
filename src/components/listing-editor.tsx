"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, ImagePlus, X } from "lucide-react";
import { motion } from "motion/react";

import { ProtectedShell } from "@/components/protected-shell";
import { Button } from "@/components/ui/button";
import { usePrototype } from "@/components/prototype-provider";
import { CONDITIONS, LISTING_CATEGORIES } from "@/lib/marketplace";
import { readImageFile } from "@/lib/image";
import type { ListingType } from "@/lib/types";

interface ListingEditorProps {
  editId?: string;
}

export function ListingEditor({ editId }: ListingEditorProps) {
  const router = useRouter();
  const resolvedEditId = editId;
  const { ready, user, listings, addListing, updateListing, notify } =
    usePrototype();
  const existing = resolvedEditId
    ? listings.find((listing) => listing.id === resolvedEditId)
    : undefined;
  const [typeOverride, setTypeOverride] = useState<ListingType | null>(null);
  const [imageOverride, setImageOverride] = useState<string | null | undefined>(
    undefined,
  );
  const type = typeOverride ?? existing?.type ?? "sell";
  const image =
    imageOverride === undefined
      ? existing?.image
      : imageOverride === null
        ? undefined
        : imageOverride;
  const [imageError, setImageError] = useState("");
  const [formError, setFormError] = useState("");
  const [readingImage, setReadingImage] = useState(false);
  const [previewRevision, setPreviewRevision] = useState(0);

  useEffect(() => {
    if (!ready || !resolvedEditId || !existing || !user) return;
    if (existing.sellerId !== user.id) router.replace("/my-listings");
  }, [ready, resolvedEditId, existing, user, router]);

  function onImageChange(file: File | undefined) {
    setImageError("");
    if (!file) return;

    setReadingImage(true);
    void readImageFile(file)
      .then((dataUrl) => {
        setImageOverride(dataUrl);
        setPreviewRevision((revision) => revision + 1);
      })
      .catch((error: unknown) => {
        setImageError(
          error instanceof Error ? error.message : "Unable to load this image.",
        );
      })
      .finally(() => setReadingImage(false));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user || readingImage) return;

    const formData = new FormData(event.currentTarget);
    const text = (name: string) => {
      const value = formData.get(name);
      return typeof value === "string" ? value.trim() : "";
    };
    const title = text("title");
    const description = text("description");
    const category = text("category");
    const hostel = text("hostel");
    const condition = CONDITIONS.find(
      (option) => option.value === text("condition"),
    )?.value;
    const priceValue = text("price");
    const price = priceValue ? Number(priceValue) : undefined;
    const exchangeFor = text("exchangeFor");

    if (
      !title ||
      !description ||
      description.length < 10 ||
      description.length > 1000 ||
      !LISTING_CATEGORIES.includes(
        category as (typeof LISTING_CATEGORIES)[number],
      ) ||
      !condition ||
      !hostel ||
      (type === "sell" &&
        (price === undefined || !Number.isFinite(price) || price <= 0)) ||
      (type === "exchange" && !exchangeFor)
    ) {
      setFormError("Check the required fields and enter valid values.");
      return;
    }

    setFormError("");
    if (existing && resolvedEditId) {
      updateListing(resolvedEditId, {
        title,
        description,
        category,
        hostel,
        condition,
        type,
        ...(type === "sell" ? { price } : { price: undefined }),
        ...(type === "exchange" ? { exchangeFor } : { exchangeFor: undefined }),
        image,
      });
      notify("Listing updated successfully.");
      router.push(`/listings/${resolvedEditId}`);
      return;
    }

    const listingId = crypto.randomUUID();
    addListing({
      id: listingId,
      sellerId: user.id,
      sellerName: user.name,
      sellerBranch: user.branch,
      title,
      description,
      category,
      type,
      ...(type === "sell" && price !== undefined ? { price } : {}),
      ...(type === "exchange" ? { exchangeFor } : {}),
      condition,
      hostel,
      ...(image ? { image } : {}),
      status: "available",
      createdAt: new Date().toISOString(),
    });
    notify("Listing created successfully.");
    router.push(`/listings/${listingId}`);
  }

  if (!ready || (resolvedEditId && !existing)) {
    return (
      <ProtectedShell>
        <section className="mx-auto max-w-3xl px-4 py-16 text-center text-sm text-muted-foreground">
          {ready && resolvedEditId ? "Listing not found." : "Loading listing..."}
        </section>
      </ProtectedShell>
    );
  }

  if (existing && user && existing.sellerId !== user.id) {
    return (
      <ProtectedShell>
        <section className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-xl font-semibold">This listing is not yours.</h1>
          <Button asChild className="mt-5">
            <Link href="/my-listings">Back to My Listings</Link>
          </Button>
        </section>
      </ProtectedShell>
    );
  }

  return (
    <ProtectedShell>
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Link
          href={existing ? "/my-listings" : "/home"}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {existing ? "My Listings" : "Marketplace"}
        </Link>
        <div className="mb-8 mt-6">
          <p className="text-sm text-primary">Share with your campus</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
            {existing ? "Edit listing" : "Create a listing"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Add clear details to help other students make a decision.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-border bg-card/50 p-5 sm:p-8"
        >
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Item name
            </label>
            <input
              id="title"
              name="title"
              required
              maxLength={80}
              defaultValue={existing?.title}
              placeholder="e.g. Scientific calculator"
              className="h-11 w-full rounded-lg border border-border bg-secondary px-3 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary/50"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">
                Listing type
              </label>
              <select
                id="type"
                value={type}
                onChange={(event) =>
                  setTypeOverride(event.target.value as ListingType)
                }
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm"
              >
                <option value="sell">Sell</option>
                <option value="giveaway">Give Away</option>
                <option value="exchange">Exchange</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                defaultValue={existing?.category ?? ""}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm"
              >
                <option value="">Choose a category</option>
                {LISTING_CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {type === "sell" ? (
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium">
                Price (₹)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="0.01"
                step="0.01"
                required
                defaultValue={existing?.price}
                placeholder="e.g. 650"
                className="h-11 w-full rounded-lg border border-border bg-secondary px-3 text-sm outline-none"
              />
            </div>
          ) : null}

          {type === "exchange" ? (
            <div className="space-y-2">
              <label htmlFor="exchangeFor" className="text-sm font-medium">
                What are you looking for in exchange?
              </label>
              <input
                id="exchangeFor"
                name="exchangeFor"
                required
                maxLength={120}
                defaultValue={existing?.exchangeFor}
                placeholder="e.g. A desk lamp or study supplies"
                className="h-11 w-full rounded-lg border border-border bg-secondary px-3 text-sm outline-none"
              />
            </div>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="condition" className="text-sm font-medium">
                Condition
              </label>
              <select
                id="condition"
                name="condition"
                required
                defaultValue={existing?.condition ?? "new"}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm"
              >
                {CONDITIONS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="hostel" className="text-sm font-medium">
                Hostel / location
              </label>
              <input
                id="hostel"
                name="hostel"
                required
                maxLength={60}
                defaultValue={existing?.hostel ?? user?.hostel}
                placeholder="e.g. Hostel A"
                className="h-11 w-full rounded-lg border border-border bg-secondary px-3 text-sm outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              minLength={10}
              maxLength={1000}
              rows={5}
              defaultValue={existing?.description}
              placeholder="Describe the item and anything a buyer should know."
              className="w-full resize-y rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm outline-none"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="listing-image" className="text-sm font-medium">
              Item image <span className="text-muted-foreground">(optional)</span>
            </label>
            {image ? (
              <motion.div
                key={previewRevision}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="relative w-full max-w-sm overflow-hidden rounded-xl border border-border"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt="Selected listing preview"
                  className="h-56 w-full object-cover"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setImageOverride(null);
                    setPreviewRevision((revision) => revision + 1);
                  }}
                  className="absolute right-2 top-2"
                >
                  <X className="h-4 w-4" />
                  Remove image
                </Button>
              </motion.div>
            ) : (
              <label
                htmlFor="listing-image"
                className="flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-secondary text-sm text-muted-foreground hover:bg-accent"
              >
                <ImagePlus className="h-5 w-5" />
                Choose JPG, PNG, or WebP (up to 1 MB)
              </label>
            )}
            <input
              id="listing-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={(event) => onImageChange(event.target.files?.[0])}
            />
            {imageError ? (
              <p role="alert" className="text-sm text-red-300">
                {imageError}
              </p>
            ) : null}
          </div>

          {formError ? (
            <p
              role="alert"
              className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-red-300"
            >
              {formError}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={readingImage}
            className="w-full sm:w-auto"
          >
            {readingImage
              ? "Reading image..."
              : existing
                ? "Save changes"
                : "Publish listing"}
          </Button>
        </form>
      </section>
    </ProtectedShell>
  );
}
