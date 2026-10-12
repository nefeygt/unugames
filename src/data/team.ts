/**
 * TEAM — only real people. No photos and no emails on cards: each person gets a
 * pixel avatar built from their initials (components/ui/pixel-avatar.tsx).
 * The Team section hides itself if this list is empty.
 */
export type Member = {
  name: string;
  role: string;
  /** Personal LinkedIn profile. A small icon-link appears on the card only when set. */
  linkedin?: string;
  /** Optional one-line blurb about what they focus on. Role-focused; no claims or credentials. */
  blurb?: string;
};

// Blurbs are launch drafts describing each role's focus; each member can rewrite theirs.
export const team: Member[] = [
  {
    name: "Ece",
    role: "Co-founder & Product Owner",
    linkedin: "https://www.linkedin.com/in/ece-tu%C4%9Fba-cebeci/",
    blurb: "Keeps every game small, focused and true to the feeling we're after.",
  },
  {
    name: "Efe",
    role: "Co-founder & Project Manager",
    linkedin: "https://www.linkedin.com/in/nefeygt/",
    blurb: "Turns ideas into milestones and keeps the studio moving, one build at a time.",
  },
  {
    name: "Bahadır",
    role: "Game Developer",
    linkedin: "https://www.linkedin.com/in/ilhan-bahad%C4%B1r-yava%C5%9F/",
    blurb: "Builds the moments that make a stroke feel just right, from first touch to burst.",
  },
  {
    name: "Onurcan",
    role: "SecOps",
    linkedin: "https://www.linkedin.com/in/onurcangnc/",
    blurb: "Keeps our builds, tools and infrastructure secure behind the scenes.",
  },
  {
    name: "Elifsu",
    role: "Brand Strategist",
    linkedin: "https://www.linkedin.com/in/elifsu-sahin/",
    blurb: "Shapes how UnU looks and speaks, so everything we make feels like us.",
  },
];
