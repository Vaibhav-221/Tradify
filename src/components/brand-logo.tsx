import Image from "next/image";

import { cn } from "@/lib/utils";

export function BrandLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/Tradifylogo.png"
      alt=""
      width={1280}
      height={1440}
      sizes="48px"
      className={cn(
        "brand-logo shrink-0 object-contain mix-blend-screen",
        className,
      )}
    />
  );
}
