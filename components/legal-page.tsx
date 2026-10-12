import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "./footer";
import { ArrowLeftIcon } from "./ui/icons";
import { Logo } from "./ui/logo";
import { SkyBackground } from "./sky-background";

/** Shared shell for /privacy and /terms: simple header, readable prose column, footer. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <SkyBackground />
      <header className="px-3 pt-3 sm:px-4">
        <div className="glass glass-strong mx-auto flex h-14 max-w-[1160px] items-center justify-between rounded-[22px] pl-4 pr-2">
          <Logo href="/" />
          <Link href="/" className="menu-item text-sm">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </header>
      <main id="main" className="container max-w-3xl py-14 sm:py-20">
        <div className="glass rounded-lg px-6 py-10 sm:px-12 sm:py-14">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-teal">Legal</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-muted">Last updated: {updated}</p>
          <article className="prose prose-lg mt-10 max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:font-semibold prose-a:underline-offset-4">
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
