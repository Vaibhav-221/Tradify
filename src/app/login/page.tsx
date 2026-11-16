import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M21.805 12.23c0-.79-.065-1.55-.207-2.28H12v4.32h5.51a4.7 4.7 0 0 1-2.045 3.086v2.56h3.31c1.937-1.784 3.03-4.414 3.03-7.686Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.77 0 5.09-.917 6.785-2.485l-3.31-2.56c-.918.615-2.09.98-3.475.98-2.675 0-4.94-1.805-5.75-4.23H2.83v2.64A10.25 10.25 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.25 13.705A6.16 6.16 0 0 1 5.93 12c0-.592.108-1.168.32-1.705v-2.64H2.83A10.02 10.02 0 0 0 1.75 12c0 1.615.387 3.14 1.08 4.345l3.42-2.64Z"
        fill="#FBBC05"
      />
      <path
        d="M12 6.065c1.507 0 2.86.518 3.925 1.533l2.94-2.94C17.085 3.055 14.765 2 12 2a10.25 10.25 0 0 0-9.17 5.655l3.42 2.64c.81-2.425 3.075-4.23 5.75-4.23Z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function LoginPage() {
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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] transition-colors group-hover:bg-white/[0.12]">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>

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
              <Sparkles className="h-5 w-5 text-primary" />
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
                Sign in or create an account
              </CardTitle>

              <CardDescription className="text-muted-foreground">
                Choose how you'd like to continue.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Google */}
              <Button
                variant="outline"
                className="h-11 w-full justify-center gap-3 border-white/10 bg-white/[0.03] font-medium hover:bg-white/[0.07]"
              >
                <GoogleIcon />
                Continue with Google
              </Button>

              {/* GitHub */}
              <Button
                variant="outline"
                className="h-11 w-full justify-center gap-3 border-white/10 bg-white/[0.03] font-medium hover:bg-white/[0.07]"
              >
                <svg
                  className="h-[18px] w-[18px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.604-3.369-1.342-3.369-1.342-.455-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.56 9.56 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.203 2.394.1 2.647.64.698 1.028 1.591 1.028 2.682 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.579.688.481A10.002 10.002 0 0 0 22 12C22 6.477 17.523 2 12 2Z" />
                </svg>
                Continue with GitHub
              </Button>

              <div className="flex items-center gap-3 py-3">
                <Separator className="flex-1 bg-white/[0.08]" />

                <span className="text-xs text-muted-foreground">
                  OR CONTINUE WITH EMAIL
                </span>

                <Separator className="flex-1 bg-white/[0.08]" />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email address
                </label>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    id="email"
                    type="email"
                    placeholder="you@college.edu"
                    className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.03] pl-10 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              <Button className="h-11 w-full rounded-lg">
                Continue
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>

              <p className="pt-3 text-center text-xs leading-5 text-muted-foreground">
                By continuing, you agree to Tradify's{" "}
                <Link
                  href="#"
                  className="text-foreground underline underline-offset-4 hover:text-primary"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="text-foreground underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
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
