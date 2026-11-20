"use client";

import Link from "next/link";
import { useState } from "react";

import { ProtectedShell } from "@/components/protected-shell";
import { usePrototype } from "@/components/prototype-provider";
import { Button } from "@/components/ui/button";
import { getConditionLabel, getListingTypeLabel } from "@/lib/marketplace";

type AdminTab = "listings" | "users" | "reports";

export default function AdminPage() {
  const { user, listings, reports, listingActions } = usePrototype();
  const [tab, setTab] = useState<AdminTab>("listings");
  const active = listings.filter((listing) => listing.status === "available").length;
  const sold = listings.filter((listing) => listing.status === "sold").length;
  const reserved = listings.filter(
    (listing) => listing.status === "reserved",
  ).length;
  const stats = [
    { label: "Local user profile", value: user ? 1 : 0 },
    { label: "Total listings", value: listings.length },
    { label: "Active listings", value: active },
    { label: "Sold listings", value: sold },
    { label: "Reserved listings", value: reserved },
    { label: "Reported listings", value: reports.length },
  ];

  return (
    <ProtectedShell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm text-primary">Prototype tools</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Data shown here is limited to this browser’s local prototype. This is
          not an authorization boundary.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/[0.08] bg-card/50 p-4"
            >
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
          <div className="rounded-xl border border-white/[0.08] bg-card/50 p-4">
            <p className="text-2xl font-semibold">{listingActions.length}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Simulated interactions
            </p>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Admin sections"
          className="mt-8 flex gap-2 border-b border-white/[0.08]"
        >
          {(
            [
              ["listings", "Listings"],
              ["users", "Users"],
              ["reports", "Reports"],
            ] as const
          ).map(([value, label]) => (
            <Button
              key={value}
              type="button"
              role="tab"
              aria-selected={tab === value}
              variant="ghost"
              onClick={() => setTab(value)}
              className={
                tab === value
                  ? "rounded-b-none border-b-2 border-primary"
                  : "text-muted-foreground"
              }
            >
              {label}
            </Button>
          ))}
        </div>

        <section
          role="tabpanel"
          className="mt-5 rounded-2xl border border-white/[0.08] bg-card/30 p-5"
        >
          {tab === "listings" ? (
            <>
              <h2 className="text-lg font-semibold">Local listings</h2>
              {listings.length ? (
                <div className="mt-4 divide-y divide-white/[0.07]">
                  {listings.map((listing) => (
                    <div
                      key={listing.id}
                      className="flex flex-wrap items-center justify-between gap-3 py-4"
                    >
                      <div>
                        <Link
                          href={`/listings/${listing.id}`}
                          className="font-medium hover:underline"
                        >
                          {listing.title}
                        </Link>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {listing.category} ·{" "}
                          {getConditionLabel(listing.condition)} ·{" "}
                          {getListingTypeLabel(listing.type)}
                        </p>
                      </div>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs capitalize text-muted-foreground">
                        {listing.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  There are no listings stored in this browser.
                </p>
              )}
            </>
          ) : null}

          {tab === "users" ? (
            <>
              <h2 className="text-lg font-semibold">Local user profile</h2>
              {user ? (
                <div className="mt-4 rounded-xl border border-white/[0.08] p-4">
                  <p className="font-medium">{user.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {user.email} · {user.studentId}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {user.branch} · {user.year} · {user.hostel}
                  </p>
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  No profile is saved in this browser.
                </p>
              )}
              <p className="mt-4 text-xs text-muted-foreground">
                User records are stored per browser; this prototype cannot
                enumerate other students or devices.
              </p>
            </>
          ) : null}

          {tab === "reports" ? (
            <>
              <h2 className="text-lg font-semibold">Listing reports</h2>
              {reports.length ? (
                <div className="mt-4 space-y-3">
                  {reports.map((report) => {
                    const listing = listings.find(
                      (item) => item.id === report.listingId,
                    );
                    return (
                      <article
                        key={report.id}
                        className="rounded-xl border border-white/[0.08] p-4"
                      >
                        <p className="font-medium">
                          {listing ? (
                            <Link
                              href={`/listings/${listing.id}`}
                              className="hover:underline"
                            >
                              {listing.title}
                            </Link>
                          ) : (
                            "Listing deleted"
                          )}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Reason: {report.reason}
                          {report.description
                            ? ` — ${report.description}`
                            : ""}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Reported {new Date(report.createdAt).toLocaleString()}
                        </p>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  No listing reports have been submitted in this browser.
                </p>
              )}
            </>
          ) : null}
        </section>
      </section>
    </ProtectedShell>
  );
}
