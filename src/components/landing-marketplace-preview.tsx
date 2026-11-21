"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Heart,
  Laptop,
  Search,
  Tag,
} from "lucide-react";

const listings = [
  {
    icon: Laptop,
    title: "Laptop stand",
    category: "Electronics",
    price: "₹450",
    detail: "Like new",
  },
  {
    icon: BookOpen,
    title: "DSA notes",
    category: "Books & Notes",
    price: "₹120",
    detail: "Well organized",
  },
];

const requests = [
  {
    icon: Search,
    title: "Drawing kit",
    category: "Stationery",
    price: "Up to ₹300",
    detail: "Needed this week",
  },
  {
    icon: Search,
    title: "Study lamp",
    category: "Hostel Essentials",
    price: "Under ₹500",
    detail: "Hostel A",
  },
];

export function LandingMarketplacePreview() {
  const [activeTab, setActiveTab] = useState<"listings" | "requests">(
    "listings",
  );
  const items = activeTab === "listings" ? listings : requests;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-2xl"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-8 inset-y-12 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative rounded-2xl border border-border bg-card p-2 shadow-2xl shadow-black/20 sm:p-3">
        <div className="rounded-xl border border-border bg-background p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary">
                <Tag className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Campus board</p>
                <p className="text-xs text-muted-foreground">
                  Your student community
                </p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1 text-[11px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Live preview
            </span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
            {[
              ["Campus listings", "126"],
              ["New today", "18"],
              ["Open requests", "08"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="min-w-0 rounded-lg border border-border bg-card px-2.5 py-3 transition-all hover:border-primary/40 motion-safe:hover:-translate-y-0.5 sm:px-3"
              >
                <p className="min-h-6 whitespace-normal text-[9px] leading-3 text-muted-foreground sm:min-h-0 sm:whitespace-nowrap sm:text-xs sm:leading-normal">
                  {label}
                </p>
                <p className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-b border-border">
            <div
              aria-label="Preview type"
              className="flex items-center gap-5"
              role="tablist"
            >
              {(
                [
                  ["listings", "Listings"],
                  ["requests", "Looking for"],
                ] as const
              ).map(([tab, label]) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative py-2.5 text-xs font-medium transition-colors ${
                    activeTab === tab
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                  {activeTab === tab ? (
                    <motion.span
                      layoutId="landing-preview-tab"
                      className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary"
                      transition={{ duration: 0.2 }}
                    />
                  ) : null}
                </button>
              ))}
            </div>
            <span className="hidden items-center gap-1.5 text-[11px] text-muted-foreground sm:inline-flex">
              <Check className="h-3.5 w-3.5 text-primary" />
              Campus verified
            </span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              role="tabpanel"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="grid gap-3 pt-4 sm:grid-cols-2"
            >
              {items.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, delay: index * 0.06 }}
                    whileHover={{ y: -3 }}
                    className="min-w-0 rounded-xl border border-border bg-card p-3.5 transition-colors hover:border-primary/40 sm:p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-medium">
                            {item.title}
                          </h3>
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {item.category}
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/login"
                        aria-label={`Sign in to save ${item.title}`}
                        className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                      >
                        <Heart className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="mt-4 flex items-end justify-between gap-2 border-t border-border pt-3">
                      <div>
                        <p className="text-sm font-semibold">{item.price}</p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {item.detail}
                        </p>
                      </div>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 text-muted-foreground"
                      />
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2.5">
            <p className="text-xs text-muted-foreground">
              A better way to find it nearby.
            </p>
            <span className="shrink-0 text-[11px] font-medium text-primary">
              Made for campus
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
