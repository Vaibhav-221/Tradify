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

import { BrandLogo } from "@/components/brand-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/reveal";

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
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-2.5">
            <BrandLogo className="h-9 w-8" />

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
          <Reveal className="mx-auto max-w-4xl text-center">
            <Badge
              variant="secondary"
              className="mb-7 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5 text-primary" />
              Built for students, by students
            </Badge>

            <h1 className="text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-8xl">
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
                className="h-11 w-full rounded-lg border-border bg-secondary px-7 hover:bg-accent sm:w-auto"
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
          </Reveal>

          {/* Marketplace preview */}
          <Reveal className="mx-auto mt-20 max-w-5xl" delay={0.1}>
            <div className="relative rounded-2xl border border-border bg-card p-2">
              <div className="rounded-xl border border-border bg-surface-secondary p-5 sm:p-8">
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
                    className="border-border bg-secondary"
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
                      className="overflow-hidden border-border bg-background transition-colors duration-200 hover:border-primary/30"
                    >
                      <div className="flex h-28 items-center justify-center bg-secondary">
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
          </Reveal>
        </div>
      </section>

      <Separator className="bg-secondary" />

      {/* Features */}
      <section id="why-tradify" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge
              variant="outline"
              className="mb-5 border-border bg-secondary"
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
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <Reveal
                  key={feature.title}
                  className="h-full"
                  delay={index * 0.05}
                >
                  <Card className="group h-full border-border bg-card transition-colors duration-200 hover:border-primary/30">
                    <CardHeader>
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary transition-colors group-hover:bg-primary/10">
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
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        id="categories"
        className="border-y border-border bg-secondary py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <Badge
              variant="outline"
              className="mb-5 border-border bg-secondary"
            >
              Explore
            </Badge>

            <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Whatever you need.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              Discover useful items from students around your campus.
            </p>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {categories.map((category, index) => {
              const Icon = category.icon;

              return (
                <Reveal
                  key={category.title}
                  className="h-full"
                  delay={index * 0.04}
                >
                  <Card className="h-full border-border bg-card transition-colors hover:border-primary/30">
                    <CardContent className="flex flex-col items-center justify-center p-7 text-center">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-secondary">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </div>

                      <p className="text-sm font-medium tracking-tight">
                        {category.title}
                      </p>
                    </CardContent>
                  </Card>
                </Reveal>
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
                className="mb-5 border-border bg-secondary"
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
              {steps.map((step, index) => (
                <Reveal key={step.number} delay={index * 0.06}>
                  <Card className="border-border bg-card transition-colors hover:border-primary/30">
                    <CardContent className="flex gap-5 p-6 sm:p-7">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-xs font-semibold text-muted-foreground">
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
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-t border-border py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Card className="overflow-hidden border-border bg-card">
              <CardContent className="p-8 sm:p-12">
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                  <div>
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-primary/10">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>

                    <h2 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                      Built around your campus community.
                    </h2>

                    <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                      Tradify is designed around local student-to-student
                      exchanges, making it easier to discover items close to
                      you and connect with people from your campus.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-border bg-secondary p-5">
                      <Users className="mb-3 h-5 w-5 text-primary" />
                      <p className="text-sm font-semibold">Student focused</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Built around campus life.
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-secondary p-5">
                      <CircleDollarSign className="mb-3 h-5 w-5 text-primary" />
                      <p className="text-sm font-semibold">Better value</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Buy and sell locally.
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-secondary p-5">
                      <Repeat2 className="mb-3 h-5 w-5 text-primary" />
                      <p className="text-sm font-semibold">Easy exchange</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Trade with students.
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-secondary p-5">
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
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <Reveal className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Badge
            variant="secondary"
            className="mb-6 rounded-full border border-border bg-secondary"
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
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-2.5">
            <BrandLogo className="h-7 w-6" />

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