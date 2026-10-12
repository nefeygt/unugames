import Link from "next/link";
import { socialLinks, studio } from "@/src/data/studio";
import { team } from "@/src/data/team";
import { Logo } from "./ui/logo";

/** Links use "/#…" so the footer works on the legal pages as well as the home page. */
const SITE_LINKS = [
  { label: "Games", href: "/#games" },
  { label: "About", href: "/#about" },
  ...(team.length ? [{ label: "Team", href: "/#team" }] : []),
  { label: "Contact", href: "/#contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy/" },
  { label: "Terms of Use", href: "/terms/" },
];

export function Footer() {
  const social = socialLinks();
  const year = new Date().getFullYear(); // Baked in at build time.
  const linkClass = "rounded-md text-body transition-colors hover:text-teal-hover hover:underline underline-offset-4";

  return (
    <footer className="px-3 pb-6 sm:px-4">
      <div className="glass mx-auto max-w-[1160px] rounded-lg px-6 py-10 sm:px-10">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div className="max-w-xs">
            <Logo href="/" />
            <p className="mt-4 leading-relaxed">{studio.tagline}</p>
          </div>

          <nav aria-label="Site">
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-muted">Studio</h2>
            <ul className="mt-4 space-y-2.5">
              {SITE_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkClass}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-muted">Legal</h2>
            <ul className="mt-4 space-y-2.5">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-muted">Contact</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={`mailto:${studio.email}`} className={linkClass}>
                  {studio.email}
                </a>
              </li>
              {social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className={linkClass} target="_blank" rel="noopener noreferrer">
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-line pt-6 text-sm text-muted">
          © {year} {studio.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
