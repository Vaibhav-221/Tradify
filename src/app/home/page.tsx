"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, Plus, Search, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getCurrentUser, logoutUser } from "@/lib/storage";
import type { UserSession } from "@/lib/types";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserSession | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

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

  function handleLogout() {
    logoutUser();
    router.replace("/login");
  }

  if (checkingSession) {
    return (
      <main className="dark flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-sm text-muted-foreground">Loading marketplace...</p>
      </main>
    );
  }

  return (
    <main className="dark min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/home" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07]">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <span className="text-[17px] font-semibold tracking-[-0.02em]">
              Tradify
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-white/10"
            >
              <Link href="/create-listing">
                <Plus className="mr-1.5 h-4 w-4" />
                Create Listing
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground"
            >
              <LogOut className="mr-1.5 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="mb-2 text-sm text-primary">
            Welcome back, {user?.name}
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.04em]">
            Find what you need on campus.
          </h1>
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            aria-label="Search marketplace"
            placeholder="Search for books, electronics, furniture..."
            className="h-14 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-12 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/50"
          />
        </div>

        <div className="mt-10 rounded-2xl border border-white/[0.08] bg-card/50 p-8 text-center">
          <h2 className="text-lg font-semibold">Marketplace coming next</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your session is active. Listings and marketplace filters will be
            added in Milestone 2.
          </p>
        </div>
      </section>
    </main>
  );
}
