"use client";

import { FormEvent, useState } from "react";
import { Trash2 } from "lucide-react";

import { Modal } from "@/components/modal";
import { ProtectedShell } from "@/components/protected-shell";
import { usePrototype } from "@/components/prototype-provider";
import { Button } from "@/components/ui/button";
import { LISTING_CATEGORIES } from "@/lib/marketplace";
import type { LookingForRequest } from "@/lib/types";

export default function LookingForPage() {
  const {
    user,
    lookingForRequests,
    addLookingForRequest,
    deleteLookingForRequest,
    notify,
  } = usePrototype();
  const [pendingDelete, setPendingDelete] =
    useState<LookingForRequest | null>(null);

  const requests = lookingForRequests.filter(
    (request) => request.userId === user?.id,
  );

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;
    const formData = new FormData(event.currentTarget);
    const value = (name: string) => {
      const field = formData.get(name);
      return typeof field === "string" ? field.trim() : "";
    };
    const title = value("title");
    const description = value("description");
    const category = value("category");
    const hostel = value("hostel");
    const budgetValue = value("budget");
    const budget = budgetValue ? Number(budgetValue) : undefined;

    if (
      !title ||
      description.length < 10 ||
      !LISTING_CATEGORIES.includes(
        category as (typeof LISTING_CATEGORIES)[number],
      ) ||
      !hostel ||
      (budgetValue &&
        (budget === undefined || !Number.isFinite(budget) || budget < 0))
    ) {
      notify("Please enter valid details for your request.");
      return;
    }

    addLookingForRequest({
      id: crypto.randomUUID(),
      userId: user.id,
      title,
      description,
      category,
      ...(budget !== undefined ? { budget } : {}),
      hostel,
      createdAt: new Date().toISOString(),
    });
    event.currentTarget.reset();
    notify("Looking For request posted.");
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    deleteLookingForRequest(pendingDelete.id);
    setPendingDelete(null);
    notify("Request deleted.");
  }

  return (
    <ProtectedShell>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-sm text-primary">Find something specific</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Looking For
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Post what you need; requests stay in this browser prototype.
          </p>

          <form
            onSubmit={submitRequest}
            className="mt-7 space-y-4 rounded-2xl border border-white/[0.08] bg-card/50 p-5"
          >
            <div className="space-y-2">
              <label htmlFor="request-title" className="text-sm font-medium">
                What are you looking for?
              </label>
              <input
                id="request-title"
                name="title"
                required
                maxLength={100}
                className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm"
                placeholder="e.g. Second-hand mechanical keyboard"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="request-description"
                className="text-sm font-medium"
              >
                Details
              </label>
              <textarea
                id="request-description"
                name="description"
                required
                minLength={10}
                maxLength={800}
                rows={3}
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm"
                placeholder="Add details that could help a student respond."
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="request-category" className="text-sm font-medium">
                  Category
                </label>
                <select
                  id="request-category"
                  name="category"
                  required
                  defaultValue=""
                  className="h-10 w-full rounded-lg border border-white/10 bg-background px-3 text-sm"
                >
                  <option value="">Choose category</option>
                  {LISTING_CATEGORIES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="request-budget" className="text-sm font-medium">
                  Maximum budget (₹)
                </label>
                <input
                  id="request-budget"
                  name="budget"
                  type="number"
                  min="0"
                  step="0.01"
                  className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm"
                  placeholder="Optional"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="request-hostel" className="text-sm font-medium">
                Hostel / location
              </label>
              <input
                id="request-hostel"
                name="hostel"
                required
                maxLength={60}
                defaultValue={user?.hostel}
                className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm"
              />
            </div>
            <Button type="submit">Post request</Button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Your requests</h2>
          {requests.length ? (
            <div className="mt-5 space-y-3">
              {requests.map((request) => (
                <article
                  key={request.id}
                  className="rounded-xl border border-white/[0.08] bg-card/50 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{request.title}</h3>
                      <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
                        {request.description}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Delete ${request.title}`}
                      onClick={() => setPendingDelete(request)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    {request.category} ·{" "}
                    {request.budget === undefined
                      ? "No budget specified"
                      : `Up to ₹${request.budget}`}{" "}
                    · {request.hostel}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-white/[0.12] px-6 py-10 text-center">
              <p className="font-medium">You haven’t posted any requests.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Submit the form to add your first request.
              </p>
            </div>
          )}
        </div>
      </section>

      {pendingDelete ? (
        <Modal
          title="Delete request?"
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
              <Button type="button" variant="destructive" onClick={confirmDelete}>
                Delete request
              </Button>
            </>
          }
        >
          <p className="text-sm text-muted-foreground">
            “{pendingDelete.title}” will be removed from your requests.
          </p>
        </Modal>
      ) : null}
    </ProtectedShell>
  );
}
