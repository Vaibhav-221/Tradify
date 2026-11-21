"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";

import { ListingEditor } from "@/components/listing-editor";

export default function EditListingPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
          <p className="text-sm text-muted-foreground">Loading listing...</p>
        </main>
      }
    >
      <EditListingContent />
    </Suspense>
  );
}

function EditListingContent() {
  const { id } = useParams<{ id: string }>();
  return <ListingEditor editId={id} />;
}
