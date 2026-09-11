export type ClientCaseStudy = {
  readonly authorCompany: string;
  readonly authorName: string;
  readonly authorRole: string;
  readonly ctaLabel: string;
  readonly ctaUrl: string;
  readonly id: string;
  readonly quote: string;
};

export const ClientCaseStudies: readonly ClientCaseStudy[] = [
  {
    // card 1 — long
    authorCompany: "PayFlex Africa",
    authorName: "Adebayo Ogunlesi",
    authorRole: "CEO & Co-Founder",
    ctaLabel: "Read Story",
    ctaUrl: "/contact",
    id: "payflex-story",
    quote:
      "It's all about building trust with the cloud foundation. Arthurite migrated our entire payment pipeline to AWS with absolutely zero downtime — during our highest transaction period of the year. We went from worrying about infrastructure every single day to focusing entirely on product. Our uptime is now 99.99%, our engineers are happier, and our customers never notice a blip. That kind of reliability is the difference between retaining clients and losing them.",
  },
  {
    // card 2 — short
    authorCompany: "Boundless Tech",
    authorName: "Nneka Eze",
    authorRole: "Chief Creative Officer",
    ctaLabel: "Read Story",
    ctaUrl: "/contact",
    id: "boundless-story",
    quote: "For a fast-growing agency, Arthurite is a powerful amplifier. We ship twice as fast without an in-house DevOps team.",
  },
  {
    // card 3 — medium (same as card 4)
    authorCompany: "Carbon Financial",
    authorName: "Fatima Al-Hassan",
    authorRole: "Head of Infrastructure",
    ctaLabel: "Read Article",
    ctaUrl: "/contact",
    id: "carbon-story",
    quote:
      "Arthurite embeds enterprise-grade security directly into our deployment pipeline. It accelerates our release velocity while keeping every customer's financial data fully protected and audit-ready.",
  },
  {
    // card 4 — medium (same as card 3)
    authorCompany: "Kuda Digital Bank",
    authorName: "Kofi Mensah",
    authorRole: "VP of Cloud Systems",
    ctaLabel: "Read Article",
    ctaUrl: "/contact",
    id: "kuda-story",
    quote:
      "Arthurite helped us move beyond isolated cloud experiments toward a unified, scalable AWS environment. Our teams now ship new features with the confidence that infrastructure will hold at any scale.",
  },
];
