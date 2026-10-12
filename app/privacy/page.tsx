import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { studio } from "@/src/data/studio";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${studio.name} handles information on ${studio.domain}.`,
  alternates: { canonical: "/privacy/" },
};

/*
 * Written to match what this site actually does: no forms, no cookies, no analytics,
 * fonts and images self-hosted. If any of that changes, update this page.
 * TODO: name the hosting provider and the email provider once chosen, and add the
 * country / governing law once UnU Games is registered. Have the text reviewed before launch.
 */
export default function PrivacyPage() {
  const mail = <a href={`mailto:${studio.email}`}>{studio.email}</a>;
  return (
    <LegalPage title="Privacy Policy" updated="October 12, 2026">
      <p>
        This policy explains what information {studio.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles when you
        visit {studio.domain}. It covers this website only; each of our games will come with its own privacy policy.
      </p>

      <h2>What this website collects</h2>
      <p>
        Very little. This website has no sign-up forms, no accounts, no cookies, and no analytics or advertising
        trackers. Fonts and images are served from our own domain, so loading a page does not send requests to third
        parties.
      </p>

      <h2>Server logs</h2>
      <p>
        Like any website, the service that hosts this site may automatically record technical information your browser
        sends with each request, such as your IP address, browser type, the page requested and the time. This is used
        only to deliver the site and keep it secure. We do not use it to identify you.
      </p>

      <h2>If you email us</h2>
      <p>
        When you write to {mail}, we receive your email address and whatever you include in your message. We use it only
        to reply to you and keep it only as long as needed for that conversation. We do not sell or share it.
      </p>

      <h2>Links to other sites</h2>
      <p>Links to other websites are covered by those websites&rsquo; own privacy policies.</p>

      <h2>Your choices</h2>
      <p>You can ask us what information we hold about you, or ask us to delete it, by writing to {mail}.</p>

      <h2>Changes</h2>
      <p>If this policy changes, we will update this page and the &ldquo;Last updated&rdquo; date above.</p>

      <h2>Contact</h2>
      <p>Questions about this policy: {mail}.</p>
    </LegalPage>
  );
}
