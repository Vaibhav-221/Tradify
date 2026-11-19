"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, Check, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { addListing, getCurrentUser } from "@/lib/storage";
import type { Condition, ListingType, UserSession } from "@/lib/types";

const categories = [
  "Electronics",
  "Books & Notes",
  "Fashion",
  "Hostel Essentials",
  "Stationery",
  "Sports",
  "Other",
];

const conditions: { value: Condition; label: string }[] = [
  { value: "new", label: "New" },
  { value: "like-new", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
];

export default function CreateListingPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserSession | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [type, setType] = useState<ListingType>("sell");
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const session = getCurrentUser();
    if (!session?.loggedIn) {
      router.replace("/login");
      return;
    }

    queueMicrotask(() => {
      setUser(session);
      setCheckingSession(false);
    });
  }, [router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;

    const formData = new FormData(event.currentTarget);
    const priceValue = formData.get("price")?.toString();

    addListing({
      id: crypto.randomUUID(),
      sellerId: user.id,
      title: formData.get("title")!.toString().trim(),
      description: formData.get("description")!.toString().trim(),
      category: formData.get("category")!.toString(),
      type,
      ...(type === "sell" && priceValue
        ? { price: Number(priceValue) }
        : {}),
      condition: formData.get("condition")!.toString() as Condition,
      hostel: formData.get("hostel")!.toString().trim(),
      status: "available",
      createdAt: new Date().toISOString(),
    });

    setPublished(true);
  }

  if (checkingSession) {
    return (
      <main className="dark flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-sm text-muted-foreground">Checking your session...</p>
      </main>
    );
  }

  return (
    <main className="dark min-h-screen bg-background text-foreground">
      <header className="border-b border-white/[0.07]">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Link href="/home" className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-semibold">Tradify</span>
          </Link>
          <Link
            href="/home"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Marketplace
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {published ? (
          <div
            role="status"
            className="rounded-2xl border border-white/[0.08] bg-card/60 p-8 text-center"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold">Listing published</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Your listing has been saved on this device.
            </p>
            <Button asChild className="mt-6">
              <Link href="/home">Back to marketplace</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-sm text-primary">Share with your campus</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
                Create a listing
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Add the details so other students know what you’re offering.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-white/[0.08] bg-card/50 p-5 sm:p-8"
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
                  placeholder="e.g. Scientific calculator"
                  className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary/50"
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
                      setType(event.target.value as ListingType)
                    }
                    className="h-11 w-full rounded-lg border border-white/10 bg-background px-3 text-sm outline-none focus:border-primary/50"
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
                    className="h-11 w-full rounded-lg border border-white/10 bg-background px-3 text-sm outline-none focus:border-primary/50"
                  >
                    <option value="">Choose a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
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
                    placeholder="e.g. 650"
                    className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary/50"
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
                    className="h-11 w-full rounded-lg border border-white/10 bg-background px-3 text-sm outline-none focus:border-primary/50"
                  >
                    {conditions.map((condition) => (
                      <option key={condition.value} value={condition.value}>
                        {condition.label}
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
                    defaultValue={user?.hostel}
                    placeholder="e.g. Hostel A"
                    className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary/50"
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
                  placeholder="Describe the item and anything a buyer should know."
                  className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary/50"
                />
              </div>

              <Button type="submit" className="w-full sm:w-auto">
                Publish listing
              </Button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}
