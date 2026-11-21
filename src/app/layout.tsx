import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { AnimationProvider } from "@/components/animation-provider";
import { PrototypeProvider } from "@/components/prototype-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tradify — Campus Marketplace",
  description: "Buy, sell, exchange, and give away items with students on campus.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <AnimationProvider>
          <PrototypeProvider>{children}</PrototypeProvider>
        </AnimationProvider>
        <Script
          id="theme-preference"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `try{var root=document.documentElement;var theme=localStorage.getItem("tradify_theme");if(theme==="light"||theme==="dark"){root.dataset.theme=theme;root.classList.toggle("dark",theme==="dark")}}catch{}`,
          }}
        />
      </body>
    </html>
  );
}
