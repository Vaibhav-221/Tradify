"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { LogOut, Plus, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePrototype } from "@/components/prototype-provider";

const navigation = [
  { href: "/home", label: "Marketplace" },
  { href: "/my-listings", label: "My Listings" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/looking-for", label: "Looking For" },
  { href: "/profile", label: "Profile" },
  { href: "/admin", label: "Admin" },
];

export function ProtectedShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { ready, user, logout, notify } = usePrototype();
  const mobileNavigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  useEffect(() => {
    const navigationElement = mobileNavigationRef.current;
    const activeLink =
      navigationElement?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!navigationElement || !activeLink || !navigationElement.clientWidth) {
      return;
    }

    const navigationBounds = navigationElement.getBoundingClientRect();
    const activeBounds = activeLink.getBoundingClientRect();
    if (activeBounds.left < navigationBounds.left) {
      navigationElement.scrollLeft += activeBounds.left - navigationBounds.left;
    } else if (activeBounds.right > navigationBounds.right) {
      navigationElement.scrollLeft += activeBounds.right - navigationBounds.right;
    }
  }, [pathname, ready, user]);

  if (!ready || !user) {
    return (
      <main className="dark flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-sm text-muted-foreground">Loading your workspace...</p>
      </main>
    );
  }

  function handleLogout() {
    logout();
    notify("You have been logged out.");
    router.replace("/login");
  }

  return (
    <main className="dark min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/home" className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07]">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <span className="text-[17px] font-semibold tracking-[-0.02em]">
              Tradify
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden min-w-0 items-center gap-1 overflow-x-auto lg:flex"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors ${
                  pathname === item.href
                    ? "bg-white/[0.08] text-foreground"
                    : "text-muted-foreground hover:bg-white/[0.05] hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden max-w-32 truncate text-sm text-muted-foreground xl:block">
              {user.name}
            </span>
            <Button asChild size="sm" className="rounded-lg">
              <Link
                href="/create-listing"
                aria-label="Create Listing"
                title="Create Listing"
              >
                <Plus className="h-4 w-4" />
                <span className="sm:hidden">List</span>
                <span className="hidden sm:inline">Create Listing</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              aria-label="Log out"
              title="Log out"
              className="text-muted-foreground"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <nav
          ref={mobileNavigationRef}
          aria-label="Mobile navigation"
          className="scrollbar-none flex gap-1 overflow-x-auto border-t border-white/[0.06] px-4 py-2 lg:hidden"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs transition-colors ${
                pathname === item.href
                  ? "bg-white/[0.08] text-foreground"
                  : "text-muted-foreground hover:bg-white/[0.05] hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </main>
  );
}
