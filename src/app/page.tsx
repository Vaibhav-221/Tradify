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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const features = [
  {
    icon: Search,
    title: "Find what you need",
    description: "Search through items listed by students across your campus.",
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
      "Have something to trade? Find students looking for exactly that.",
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
    description: "Find something useful or list an item you no longer need.",
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
    <main className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>

            <span className="text-lg font-bold tracking-tight">Unexa</span>
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
              href="#why-unexa"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Why Unexa
            </Link>
          </nav>

          <Button asChild size="sm">
            <Link href="/login">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 sm:pb-32 sm:pt-28 lg:px-8 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <Badge
              variant="secondary"
              className="mb-6 rounded-full px-4 py-1.5 text-xs"
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Built for students, by students
            </Badge>

            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Your campus.
              <br />
              <span className="text-muted-foreground">Your marketplace.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-lg">
              Buy, sell, exchange, or give away things with students around you.
              Unexa makes campus commerce simple, local, and trusted.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full px-7 sm:w-auto">
                <Link href="/login">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href="#how-it-works">
                  See how it works
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
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

          {/* Hero visual */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="relative rounded-2xl border border-border/60 bg-card/50 p-2 shadow-2xl shadow-black/20">
              <div className="rounded-xl border border-border/50 bg-background p-5 sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Campus Marketplace
                    </p>
                    <h2 className="mt-1 text-lg font-semibold">
                      Discover something useful
                    </h2>
                  </div>

                  <Badge variant="outline">Your Campus</Badge>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["MacBook Stand", "₹450", "Electronics"],
                    ["DSA Notes", "₹120", "Books"],
                    ["Study Lamp", "FREE", "Hostel"],
                    ["Cycle", "₹2,500", "Transport"],
                  ].map(([name, price, category]) => (
                    <Card
                      key={name}
                      className="overflow-hidden border-border/60 bg-card"
                    >
                      <div className="flex h-28 items-center justify-center bg-muted/40">
                        <Box className="h-8 w-8 text-muted-foreground/60" />
                      </div>

                      <CardContent className="p-4">
                        <p className="truncate text-sm font-medium">{name}</p>

                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-semibold">{price}</span>

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

      <Separator />

      {/* Features */}
      <section id="why-unexa" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4">
              Everything students need
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              One place for everything
              <br className="hidden sm:block" /> around your campus.
            </h2>

            <p className="mt-4 text-muted-foreground">
              Whether you're looking for something or getting rid of something,
              Unexa keeps the entire process simple.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="border-border/60 bg-card/50 transition-colors hover:bg-card"
                >
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>

                    <CardTitle className="text-base">{feature.title}</CardTitle>
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
        className="border-y border-border/40 bg-muted/20 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">
              Explore
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Whatever you need.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Discover useful items from students around your campus.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Card
                  key={category.title}
                  className="group cursor-pointer border-border/60 bg-background transition-all hover:-translate-y-1 hover:border-primary/40"
                >
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-primary/10">
                      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                    </div>

                    <p className="text-sm font-medium">{category.title}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                Simple by design
              </Badge>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                From unused to useful
                <br />
                in three steps.
              </h2>

              <p className="mt-5 max-w-md leading-7 text-muted-foreground">
                No complicated process. Find something, connect with another
                student, and make it happen on campus.
              </p>

              <Button asChild className="mt-7">
                <Link href="/login">
                  Start exploring
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {steps.map((step) => (
                <Card key={step.number} className="border-border/60 bg-card/50">
                  <CardContent className="flex gap-5 p-6 sm:p-7">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-xs font-semibold text-muted-foreground">
                      {step.number}
                    </div>

                    <div>
                      <h3 className="font-semibold">{step.title}</h3>

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

      {/* Trust section */}
      <section className="border-t border-border/40 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-border/60 bg-card">
            <CardContent className="p-8 sm:p-12">
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                <div>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Built around your campus community.
                  </h2>

                  <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                    Unexa is designed around local student-to-student exchanges,
                    making it easier to discover items close to you and connect
                    with people from your campus.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border/60 bg-muted/30 p-5">
                    <Users className="mb-3 h-5 w-5 text-primary" />
                    <p className="text-sm font-semibold">Student focused</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Built around campus life.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-muted/30 p-5">
                    <CircleDollarSign className="mb-3 h-5 w-5 text-primary" />
                    <p className="text-sm font-semibold">Better value</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Buy and sell locally.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-muted/30 p-5">
                    <Repeat2 className="mb-3 h-5 w-5 text-primary" />
                    <p className="text-sm font-semibold">Easy exchange</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Trade with students.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-muted/30 p-5">
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
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Badge variant="secondary" className="mb-5">
            Your campus marketplace
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Got something to sell?
            <br />
            Looking for something?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Join Unexa and start discovering what your campus has to offer.
          </p>

          <Button asChild size="lg" className="mt-8 px-8">
            <Link href="/login">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-3.5 w-3.5" />
            </div>

            <span className="text-sm font-semibold">Unexa</span>
          </div>

          <p className="text-xs text-muted-foreground">
            A marketplace built for campus life.
          </p>

          <p className="text-xs text-muted-foreground">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Unexa</p>
          </p>
        </div>
      </footer>
    </main>
  );
}
