import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Box,
  Check,
  ChevronRight,
  CircleDollarSign,
  Heart,
  Laptop,
  Repeat2,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const features = [
  {
    icon: Search,
    title: "Find what you need",
    description:
      "Search through items listed by students across your campus.",
  },
  {
    icon: Tag,
    title: "Sell your stuff",
    description:
      "Turn unused items into cash by listing them for other students.",
  },
  {
    icon: Repeat2,
    title: "Exchange easily",
    description:
      "      Have something to trade? Find students looking for exactly that.",
  },
  {
    icon: Heart,
    title: "Give it away",
    description:
      "Pass on things you no longer need instead of letting them sit unused.",
  },
];

const categories = [
  {
    icon: Laptop,
    title: "Electronics",
  },
  {
    icon: BookOpen,
    title: "Books & Notes",
  },
  {
    icon: ShoppingBag,
    title: "Fashion",
  },
  {
    icon: Box,
    title: "Hostel Essentials",
  },
];

const steps = [
  {
    number: "01",
    title: "Join your campus",
    description:
      "Create your account and become part of your campus marketplace.",
  },
  {
    number: "02",
    title: "Discover or list",
    description:
      "Find something useful or list an item you no longer need.",
  },
  {
    number: "03",
    title: "Connect & exchange",
    description:
      "Connect with another student and complete the exchange on campus.",
  },
];

export default function Home() {
  return (
    <main className="dark min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-300px] h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[160px]" />
        <div className="absolute bottom-[-300px] right-[-200px] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[140px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] shadow-sm transition-colors group-hover:bg-white/[0.12]">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>

            <span className="text-[17px] font-semibold tracking-[-0.02em]">
              Tradify
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="#how-it-works"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              How it works
            </Link>

            <Link
              href="#categories"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Categories
            </Link>

            <Link
              href="#why-tradify"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Why Tradify
            </Link>
          </nav>

          <Button asChild size="sm" className="rounded-lg">
            <Link href="/login">
              Get Started
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-6 sm:pb-32 sm:pt-32 lg:px-8 lg:pt-40">
          <div className="mx-auto max-w-4xl text-center">
            <Badge
              variant="secondary"
              className="mb-7 rounded-full border border-white/[0.08] bg-white/[0.05] px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5 text-primary" />
              Built for students, by students
            </Badge>

            <h1 className="text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-8xl">
              Your campus.
              <br />
              <span className="text-muted-foreground">
                Your marketplace.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-lg">
              Buy, sell, exchange, or give away things with students around
              you. Tradify makes campus commerce simple, local, and trusted.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-11 w-full rounded-lg px-7 sm:w-auto"
              >
                <Link href="/login">
                  Get Started
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 w-full rounded-lg border-white/10 bg-white/[0.03] px-7 hover:bg-white/[0.07] sm:w-auto"
              >
                <Link href="#how-it-works">
                  See how it works
                  <ChevronRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-primary" />
                Campus focused
              </div>

              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-primary" />
                Student friendly
              </div>

              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-primary" />
                Simple & local
              </div>
            </div>
          </div>

          {/* Marketplace preview */}
          <div className="mx-auto mt-20 max-w-5xl">
            <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.025] p-2 shadow-2xl shadow-black/40 backdrop-blur">
              <div className="rounded-xl border border-white/[0.07] bg-card/80 p-5 sm:p-8">
                <div className="mb-7 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Campus Marketplace
                    </p>

                    <h2 className="mt-1.5 text-lg font-semibold tracking-tight">
                      Discover something useful
                    </h2>
                  </div>

                  <Badge
                    variant="outline"
                    className="border-white/10 bg-white/[0.03]"
                  >
                    Your Campus
                  </Badge>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["MacBook Stand", "₹450", "Electronics"],
                    ["DSA Notes", "₹120", "Books"],
                    ["Study Lamp", "FREE", "Hostel"],
                    ["Cycle", "₹2,500", "Transport"],
                  ].map(([name, price, category]) => (
                    <Card
                      key={name}
                      className="overflow-hidden border-white/[0.07] bg-background/60 transition-all duration-200 hover:-translate-y-1 hover:border-white/15"
                    >
                      <div className="flex h-28 items-center justify-center bg-white/[0.025]">
                        <Box className="h-8 w-8 text-muted-foreground/40" />
                      </div>

                      <CardContent className="p-4">
                        <p className="truncate text-sm font-medium">
                          {name}
                        </p>

                        <div className="mt-2.5 flex items-center justify-between">
                          <span className="text-sm font-semibold">
                            {price}
                          </span>

                          <span className="text-[11px] text-muted-foreground">
                            {category}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-white/[0.07]" />

      {/* Features */}
      <section id="why-tradify" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge
              variant="outline"
              className="mb-5 border-white/10 bg-white/[0.03]"
            >
              Everything students need
            </Badge>

            <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
              One place for everything
              <br className="hidden sm:block" />
              <span className="text-muted-foreground">
                around your campus.
              </span>
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
              Whether you&apos;re looking for something or getting rid of
              something, Tradify keeps the entire process simple.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="group border-white/[0.07] bg-card/50 transition-all duration-200 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-card"
                >
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] transition-colors group-hover:bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>

                    <CardTitle className="text-base tracking-tight">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        id="categories"
        className="border-y border-white/[0.07] bg-white/[0.015] py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge
              variant="outline"
              className="mb-5 border-white/10 bg-white/[0.03]"
            >
              Explore
            </Badge>

            <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Whatever you need.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              Discover useful items from students around your campus.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Card
                  key={category.title}
                  className="group cursor-pointer border-white/[0.07] bg-card/50 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:bg-card"
                >
                  <CardContent className="flex flex-col items-center justify-center p-7 text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] transition-colors group-hover:bg-primary/10">
                      <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                    </div>

                    <p className="text-sm font-medium tracking-tight">
                      {category.title}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <Badge
                variant="outline"
                className="mb-5 border-white/10 bg-white/[0.03]"
              >
                Simple by design
              </Badge>

              <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
                From unused to useful
                <br />
                <span className="text-muted-foreground">
                  in three steps.
                </span>
              </h2>

              <p className="mt-5 max-w-md leading-7 text-muted-foreground">
                No complicated process. Find something, connect with another
                student, and make it happen on campus.
              </p>

              <Button asChild className="mt-8 rounded-lg">
                <Link href="/login">
                  Start exploring
                  <ArrowUpRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-3">
              {steps.map((step) => (
                <Card
                  key={step.number}
                  className="border-white/[0.07] bg-card/50 transition-colors hover:border-white/[0.12]"
                >
                  <CardContent className="flex gap-5 p-6 sm:p-7">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xs font-semibold text-muted-foreground">
                      {step.number}
                    </div>

                    <div>
                      <h3 className="font-semibold tracking-tight">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-t border-white/[0.07] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-white/[0.08] bg-card">
            <CardContent className="p-8 sm:p-12">
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                <div>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.07] bg-primary/10">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>

                  <h2 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                    Built around your campus community.
                  </h2>

                  <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                    Tradify is designed around local student-to-student
                    exchanges, making it easier to discover items close to you
                    and connect with people from your campus.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-5">
                    <Users className="mb-3 h-5 w-5 text-primary" />
                    <p className="text-sm font-semibold">Student focused</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Built around campus life.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-5">
                    <CircleDollarSign className="mb-3 h-5 w-5 text-primary" />
                    <p className="text-sm font-semibold">Better value</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Buy and sell locally.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-5">
                    <Repeat2 className="mb-3 h-5 w-5 text-primary" />
                    <p className="text-sm font-semibold">Easy exchange</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Trade with students.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-5">
                    <ShieldCheck className="mb-3 h-5 w-5 text-primary" />
                    <p className="text-sm font-semibold">Campus first</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Local by design.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[130px]" />
        </div>

        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Badge
            variant="secondary"
            className="mb-6 rounded-full border border-white/[0.08] bg-white/[0.05]"
          >
            Your campus marketplace
          </Badge>

          <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
            Got something to sell?
            <br />
            <span className="text-muted-foreground">
              Looking for something?
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-muted-foreground">
            Join Tradify and start discovering what your campus has to offer.
          </p>

          <Button asChild size="lg" className="mt-9 h-11 rounded-lg px-8">
            <Link href="/login">
              Get Started
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.07]">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </div>

            <span className="text-sm font-semibold">Tradify</span>
          </div>

          <p className="text-xs text-muted-foreground">
            A marketplace built for campus life.
          </p>

          <p className="text-xs text-muted-foreground">
            © 2026 Tradify. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}