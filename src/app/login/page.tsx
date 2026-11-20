"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePrototype } from "@/components/prototype-provider";

export default function LoginPage() {
  const router = useRouter();
  const { ready, user, login } = usePrototype();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && user) router.replace("/home");
  }, [ready, user, router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const trimmedIdentifier = identifier.trim();
    if (!trimmedIdentifier) {
      setError("Enter your Student ID or email.");
      return;
    }

    if (trimmedIdentifier.includes("@") &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedIdentifier)) {
      setError("Enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const isEmail = trimmedIdentifier.includes("@");
    try {
      login({
        id: "user-001",
        name: "Vaibhav Singh",
        email: isEmail ? trimmedIdentifier : "student@college.edu",
        studentId: isEmail ? "STU001" : trimmedIdentifier,
        branch: "Computer Science & Engineering",
        year: "3rd Year",
        hostel: "Hostel A",
        loggedIn: true,
      });
      router.push("/home");
    } catch {
      setError("Unable to save the demo session. Check browser storage and try again.");
    }
  }

  return (
    <main className="dark relative min-h-screen overflow-hidden bg-background font-sans text-foreground">
      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-260px] h-[600px] w-[850px] -translate-x-1/2 rounded-full bg-primary/10 blur-[160px]" />

        <div className="absolute bottom-[-250px] right-[-150px] h-[450px] w-[450px] rounded-full bg-primary/5 blur-[140px]" />
      </div>

      {/* Header */}
      <header className="absolute left-0 right-0 top-0 z-10">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-2.5">
            <BrandLogo className="h-9 w-8" />

            <span className="text-[17px] font-semibold tracking-[-0.02em]">
              Tradify
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </header>

      {/* Login */}
      <section className="flex min-h-screen items-center justify-center px-4 pb-10 pt-28 sm:px-6">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-lg">
              <BrandLogo className="h-10 w-9" />
            </div>

            <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Welcome to Tradify
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              Join your campus marketplace and start discovering useful things
              around you.
            </p>
          </div>

          <Card className="border-white/[0.08] bg-card/70 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <CardHeader className="space-y-2 pb-5">
              <CardTitle className="text-xl tracking-tight">
                Sign in to Tradify
              </CardTitle>

              <CardDescription className="text-muted-foreground">
                Use your Student ID or campus email.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="space-y-2">
                  <label htmlFor="identifier" className="text-sm font-medium">
                    Student ID / Email
                  </label>

                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="identifier"
                      value={identifier}
                      onChange={(event) => setIdentifier(event.target.value)}
                      placeholder="STU001 or you@college.edu"
                      autoComplete="username"
                      className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.03] pl-10 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter at least 6 characters"
                      autoComplete="current-password"
                      className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.03] px-10 text-sm outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {error ? (
                  <p
                    role="alert"
                    className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-red-300"
                  >
                    {error}
                  </p>
                ) : null}

                <Button type="submit" className="h-11 w-full rounded-lg">
                  Continue
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </form>

              <p className="pt-3 text-center text-xs leading-5 text-muted-foreground">
                This is a simulated sign-in. Do not use a real password or
                sensitive credentials.
              </p>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Tradify is built for student-to-student commerce on campus.
          </p>
        </div>
      </section>
    </main>
  );
}
