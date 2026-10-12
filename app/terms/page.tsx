import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { studio } from "@/src/data/studio";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms for using ${studio.domain}.`,
  alternates: { canonical: "/terms/" },
};

/*
 * TODO: add a governing-law clause once UnU Games is registered in a country,
 * and have the text reviewed before launch.
 */
export default function TermsPage() {
  const mail = <a href={`mailto:${studio.email}`}>{studio.email}</a>;
  return (
    <LegalPage title="Terms of Use" updated="October 12, 2026">
      <p>
        These terms apply to your use of {studio.domain}, run by {studio.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;).
        By using the website you agree to them. If you do not agree, please do not use the website.
      </p>

      <h2>Our content</h2>
      <p>
        The text, graphics, logos, game names and game screenshots on this website belong to {studio.legalName}. You are
        welcome to link to the site and to share it, but please do not copy or reuse its content for other purposes
        without asking us first.
      </p>

      <h2>Games in development</h2>
      <p>
        Games shown here are in development. Their names, features and release dates may change. Platforms marked
        &ldquo;planned&rdquo; describe what we intend, not a promise that a game will be released there.
      </p>

      <h2>No warranty</h2>
      <p>
        We try to keep this website accurate and available, but it is provided &ldquo;as is&rdquo;, without guarantees
        of any kind. To the extent the law allows, we are not liable for any loss arising from your use of it.
      </p>

      <h2>Links to other sites</h2>
      <p>We are not responsible for the content or practices of websites we link to.</p>

      <h2>Changes</h2>
      <p>We may update these terms. The &ldquo;Last updated&rdquo; date above shows when they last changed.</p>

      <h2>Contact</h2>
      <p>Questions about these terms: {mail}.</p>
    </LegalPage>
  );
}
