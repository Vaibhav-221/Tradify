"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { CircleUserRound, Heart, Plus } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { usePrototype } from "@/components/prototype-provider";

const navigation = [
  { href: "/home", label: "Marketplace" },
  { href: "/my-listings", label: "My Listings" },
  { href: "/wishlist", label: "Favorites" },
  { href: "/looking-for", label: "Looking For" },
  { href: "/admin", label: "Admin" },
];

export function ProtectedShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { ready, user } = usePrototype();
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

  return (
    <main className="dark min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/home" className="flex shrink-0 items-center gap-2.5">
            <BrandLogo className="h-9 w-8" />
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
                {item.href === "/wishlist" ? (
                  <Heart aria-hidden="true" className="mr-1.5 inline h-3.5 w-3.5" />
                ) : null}
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
              asChild
              variant={pathname === "/profile" ? "secondary" : "ghost"}
              size="icon"
            >
              <Link
                href="/profile"
                aria-current={pathname === "/profile" ? "page" : undefined}
                aria-label="Profile"
                title="Profile"
                className="text-muted-foreground"
              >
                <CircleUserRound className="h-4 w-4" />
              </Link>
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
              {item.href === "/wishlist" ? (
                <Heart aria-hidden="true" className="mr-1.5 inline h-3.5 w-3.5" />
              ) : null}
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </main>
  );
}
