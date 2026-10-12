import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Full-colour UnU Games lockup (brand/unugames-logo.svg, copied to public/ by `npm run brand:export`).
 * Intrinsic size 658×124; rendered 36 px tall.
 */
export function Logo({ href = "/", className }: { href?: string; className?: string }) {
  return (
    <Link href={href} className={cn("inline-flex shrink-0 items-center rounded-xl", className)}>
      <Image src="/brand/unugames-logo.svg" alt="UnU Games" width={191} height={36} priority className="h-9 w-auto" />
    </Link>
  );
}
