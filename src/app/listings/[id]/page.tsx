"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { ArrowLeft, Heart, MapPin, Pencil, ShieldAlert } from "lucide-react";

import { Modal } from "@/components/modal";
import { ProtectedShell } from "@/components/protected-shell";
import { usePrototype } from "@/components/prototype-provider";
import { Button } from "@/components/ui/button";
import {
  formatPrice,
  getConditionLabel,
  getListingTypeLabel,
} from "@/lib/marketplace";
import type { ListingActionKind, ReportReason } from "@/lib/types";

type Dialog = "contact" | "reserve" | "giveaway" | "exchange" | "report" | null;

const reportReasons: { value: ReportReason; label: string }[] = [
  { value: "spam", label: "Spam" },
  { value: "fake", label: "Fake listing" },
  { value: "prohibited", label: "Prohibited item" },
  { value: "misleading", label: "Misleading information" },
  { value: "other", label: "Other" },
];

export default function ListingDetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="dark flex min-h-screen items-center justify-center bg-background text-foreground">
          <p className="text-sm text-muted-foreground">Loading listing...</p>
        </main>
      }
    >
      <ListingDetailsContent />
    </Suspense>
  );
}

function ListingDetailsContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    ready,
    user,
    listings,
    wishlist,
    toggleWishlist,
    updateListing,
    addListingAction,
    addReport,
    notify,
  } = usePrototype();
  const listing = listings.find((item) => item.id === id);
  const [dialog, setDialog] = useState<Dialog>(null);
  const [proposal, setProposal] = useState("");
  const [reportReason, setReportReason] = useState<ReportReason>("spam");
  const [reportDescription, setReportDescription] = useState("");
  const saved = wishlist.includes(id);
  const isOwner = listing?.sellerId === user?.id;

  function recordAction(kind: ListingActionKind, message?: string) {
    if (!listing || !user) return;
    addListingAction({
      id: crypto.randomUUID(),
      listingId: listing.id,
      userId: user.id,
      kind,
      ...(message ? { message } : {}),
      createdAt: new Date().toISOString(),
    });
  }

  function confirmReservation() {
    if (!listing || !user) return;
    updateListing(listing.id, { status: "reserved" });
    recordAction("reservation");
    setDialog(null);
    notify("Item reserved successfully. This is a simulated reservation.");
  }

  function requestGiveaway() {
    recordAction("giveaway-request");
    setDialog(null);
    notify("Request sent successfully.");
  }

  function submitExchange(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = proposal.trim();
    if (!message) return;
    recordAction("exchange-proposal", message);
    setProposal("");
    setDialog(null);
    notify("Exchange proposal submitted.");
  }

  function submitReport(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!listing || !user) return;
    addReport({
      id: crypto.randomUUID(),
      listingId: listing.id,
      reporterId: user.id,
      reason: reportReason,
      ...(reportDescription.trim()
        ? { description: reportDescription.trim() }
        : {}),
      createdAt: new Date().toISOString(),
    });
    setReportDescription("");
    setDialog(null);
    notify("Report submitted successfully.");
  }

  function toggleSaved() {
    toggleWishlist(id);
    notify(saved ? "Removed from wishlist." : "Added to wishlist.");
  }

  if (!ready || !user) {
    return (
      <ProtectedShell>
        <div className="mx-auto max-w-4xl px-4 py-16 text-center text-sm text-muted-foreground">
          Loading listing...
        </div>
      </ProtectedShell>
    );
  }

  if (!listing) {
    return (
      <ProtectedShell>
        <section className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold">Listing not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            It may have been removed or the link may be incorrect.
          </p>
          <Button asChild className="mt-5">
            <Link href="/home">Back to marketplace</Link>
          </Button>
        </section>
      </ProtectedShell>
    );
  }

  const actionDisabled = isOwner || listing.status !== "available";

  return (
    <ProtectedShell>
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="flex min-h-72 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-card/60 sm:min-h-[480px]">
            {listing.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={listing.image}
                alt={listing.title}
                className="h-full max-h-[600px] w-full object-contain"
              />
            ) : (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No image provided
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground">
                  {listing.category}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground">
                  {getListingTypeLabel(listing.type)}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
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
              <h1 className="text-3xl font-semibold tracking-tight">
                {listing.title}
              </h1>
              <p className="mt-3 text-2xl font-semibold">{formatPrice(listing)}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-xl border border-white/[0.08] bg-card/50 p-4 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Condition</p>
                <p className="mt-1">{getConditionLabel(listing.condition)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="mt-1 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {listing.hostel}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Seller</p>
                <p className="mt-1">
                  {isOwner ? user.name : listing.sellerName ?? "Campus student"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Posted</p>
                <p className="mt-1">
                  {new Date(listing.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-semibold">Description</h2>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                {listing.description}
              </p>
            </div>

            {listing.type === "exchange" && listing.exchangeFor ? (
              <div className="rounded-xl border border-white/[0.08] bg-card/50 p-4">
                <p className="text-xs text-muted-foreground">
                  Looking for in exchange
                </p>
                <p className="mt-1 text-sm">{listing.exchangeFor}</p>
              </div>
            ) : null}

            {isOwner ? (
              <Button asChild variant="outline" className="w-full">
                <Link href={`/listings/${listing.id}/edit`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit your listing
                </Link>
              </Button>
            ) : (
              <div className="grid gap-2 sm:grid-cols-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialog("contact")}
                  className="sm:col-span-2"
                >
                  Contact Seller
                </Button>
                {listing.type === "sell" ? (
                  <Button
                    type="button"
                    disabled={actionDisabled}
                    onClick={() => setDialog("reserve")}
                    className="sm:col-span-2"
                  >
                    {listing.status === "available"
                      ? "Buy / Reserve"
                      : `Item ${listing.status}`}
                  </Button>
                ) : listing.type === "giveaway" ? (
                  <Button
                    type="button"
                    disabled={actionDisabled}
                    onClick={() => setDialog("giveaway")}
                    className="sm:col-span-2"
                  >
                    {listing.status === "available"
                      ? "Request Item"
                      : `Item ${listing.status}`}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    disabled={actionDisabled}
                    onClick={() => setDialog("exchange")}
                    className="sm:col-span-2"
                  >
                    {listing.status === "available"
                      ? "Propose Exchange"
                      : `Item ${listing.status}`}
                  </Button>
                )}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={toggleSaved}
                aria-pressed={saved}
                className="flex-1"
              >
                <Heart
                  className={`mr-2 h-4 w-4 ${saved ? "fill-rose-500 text-rose-500" : ""}`}
                />
                {saved ? "Saved" : "Add to wishlist"}
              </Button>
              {!isOwner ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setDialog("report")}
                  aria-label="Report listing"
                  title="Report listing"
                >
                  <ShieldAlert className="h-4 w-4" />
                  Report
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {dialog === "contact" ? (
        <Modal title="Contact seller" onClose={() => setDialog(null)}>
          <p className="text-sm text-muted-foreground">
            {isOwner
              ? "This is your listing."
              : "This prototype does not send messages. You can use the seller’s shared contact details to connect."}
          </p>
          {!isOwner ? (
            <div className="mt-4 rounded-lg border border-white/10 p-4 text-sm">
              <p>{listing.sellerId === user.id ? user.name : "Campus student"}</p>
              {listing.sellerId === user.id ? (
                <>
                  <p className="mt-1 text-muted-foreground">{user.email}</p>
                  {user.phone ? (
                    <p className="mt-1 text-muted-foreground">{user.phone}</p>
                  ) : null}
                </>
              ) : (
                <p className="mt-1 text-muted-foreground">
                  Seller contact details are not available in this prototype.
                </p>
              )}
            </div>
          ) : null}
        </Modal>
      ) : null}

      {dialog === "reserve" ? (
        <Modal
          title="Reserve this item?"
          onClose={() => setDialog(null)}
          footer={
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialog(null)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={confirmReservation}>
                Confirm Reservation
              </Button>
            </>
          }
        >
          <p className="font-medium">{listing.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatPrice(listing)}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            This only records a simulated reservation; no payment is taken.
          </p>
        </Modal>
      ) : null}

      {dialog === "giveaway" ? (
        <Modal
          title="Request this free item?"
          onClose={() => setDialog(null)}
          footer={
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialog(null)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={requestGiveaway}>
                Send request
              </Button>
            </>
          }
        >
          <p className="text-sm text-muted-foreground">
            Send a simulated request to the owner of “{listing.title}”.
          </p>
        </Modal>
      ) : null}

      {dialog === "exchange" ? (
        <Modal title="Propose an exchange" onClose={() => setDialog(null)}>
          <form onSubmit={submitExchange} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Offer an item or proposal in exchange for “{listing.title}”.
            </p>
            <label htmlFor="exchange-proposal" className="block text-sm">
              Your proposal
            </label>
            <textarea
              id="exchange-proposal"
              required
              maxLength={300}
              minLength={5}
              value={proposal}
              onChange={(event) => setProposal(event.target.value)}
              rows={3}
              className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm"
              placeholder="Describe what you would like to offer..."
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialog(null)}
              >
                Cancel
              </Button>
              <Button type="submit">Submit proposal</Button>
            </div>
          </form>
        </Modal>
      ) : null}

      {dialog === "report" ? (
        <Modal title="Report listing" onClose={() => setDialog(null)}>
          <form onSubmit={submitReport} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Help keep the campus marketplace useful and safe.
            </p>
            <label htmlFor="report-reason" className="block text-sm">
              Reason
            </label>
            <select
              id="report-reason"
              value={reportReason}
              onChange={(event) =>
                setReportReason(event.target.value as ReportReason)
              }
              className="h-10 w-full rounded-lg border border-white/10 bg-background px-3 text-sm"
            >
              {reportReasons.map((reason) => (
                <option key={reason.value} value={reason.value}>
                  {reason.label}
                </option>
              ))}
            </select>
            <label htmlFor="report-description" className="block text-sm">
              Additional details (optional)
            </label>
            <textarea
              id="report-description"
              maxLength={500}
              rows={3}
              value={reportDescription}
              onChange={(event) => setReportDescription(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-background px-3 py-2 text-sm"
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialog(null)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="destructive">
                Submit report
              </Button>
            </div>
          </form>
        </Modal>
      ) : null}
    </ProtectedShell>
  );
}
