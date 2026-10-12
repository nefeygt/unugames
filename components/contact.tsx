import { socialLinks, studio } from "@/src/data/studio";
import { team } from "@/src/data/team";
import { ArrowUpRightIcon, MailIcon } from "./ui/icons";
import { PixelSprite, UNU_FACE } from "./ui/pixel";
import { SectionHeading } from "./ui/section-heading";

export function Contact() {
  const social = socialLinks();
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 sm:py-28">
      <div className="container">
        <div className="glass gloss relative overflow-hidden rounded-lg px-6 py-10 sm:px-12 sm:py-14">
          <div className="relative grid items-center gap-10 md:grid-cols-[1.5fr_1fr]">
            <div>
              <SectionHeading
                index={team.length ? 4 : 3}
                eyebrow="Contact"
                id="contact-title"
                title="Say hello"
                description="Email is the best way to reach us — players, press and partners alike."
                className="mb-8 sm:mb-8"
              />
              <div className="flex flex-wrap items-center gap-3">
                <a href={`mailto:${studio.email}`} className="btn btn-primary">
                  <MailIcon className="h-4 w-4" />
                  {studio.email}
                </a>
                {/* LinkedIn / Crunchbase appear here once their URLs are set in studio.ts. */}
                {social.map((s) => (
                  <a key={s.href} href={s.href} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                    {s.label}
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            <div className="hidden justify-center md:flex" aria-hidden>
              <div className="grid h-40 w-40 place-items-center rounded-[36px] bg-[linear-gradient(160deg,#e9f7fb,#bfe3ea_60%,#9fd3d6)] shadow-lift ring-1 ring-[#8fbfc4]">
                <PixelSprite rows={UNU_FACE} palette={{ X: "#17323f" }} className="w-[58%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
