/**
 * TEAM — only real people, only the name and role they gave. No bios, no photos:
 * each person gets a pixel avatar generated from their name (see components/ui/pixel-avatar.tsx).
 * The Team section hides itself if this list is empty.
 */
export type Member = {
  name: string;
  role: string;
};

export const team: Member[] = [
  { name: "Ece", role: "Co-founder & Product Owner" },
  { name: "Efe", role: "Co-founder & Project Manager" },
  { name: "Bahadır", role: "Game Developer" },
  { name: "Onurcan", role: "SecOps" },
  { name: "Elifsu", role: "Brand Strategist" },
];
