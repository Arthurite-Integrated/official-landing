import {Facebook, Instagram, Linkedin, Youtube} from "lucide-react";
import type {ComponentType} from "react";

import {XLogo} from "#/components/layout/x-logo.tsx";

type FooterLink = {
  readonly label: string;
  readonly link: string;
};

type FooterLinkGroup = {
  readonly links: readonly FooterLink[];
  readonly title: string;
};

type CompanyFact = {
  readonly label: string;
  readonly value: string;
};

type FooterSocial = {
  readonly icon: ComponentType<{readonly className?: string}>;
  readonly name: string;
  readonly url: string;
};

export const CONTACT_EMAIL = "info@arthuriteintegrated.com";

export const HEAD_OFFICE_ADDRESS = "No 2 Nnobi Street, Kilo, Surulere, Lagos State";

export const CompanyFacts: readonly CompanyFact[] = [
  {label: "Offices", value: "04"},
  {label: "Continents", value: "03"},
  {label: "Founded", value: "2018"},
];

export const FooterLinkGroups: readonly FooterLinkGroup[] = [
  {
    title: "Services",
    links: [
      {label: "Cloud Consulting", link: "/services"},
      {label: "Custom Business Solutions", link: "/services"},
      {label: "Technical Assessments", link: "/services"},
      {label: "Migration", link: "/services"},
      {label: "DevOps & Architecting on AWS", link: "/services"},
      {label: "AWS Training for Clients", link: "/services"},
    ],
  },
  {
    title: "Company",
    links: [
      {label: "About", link: "/about"},
      {label: "Events", link: "/events"},
      {label: "AWS Workshops", link: "/events"},
      {label: "Blog", link: "/blog"},
      {label: "Partner with Us", link: "/contact"},
    ],
  },
  {
    title: "Get Involved",
    links: [
      {label: "Careers", link: "/careers"},
      {label: "Internship Opportunities", link: "/careers"},
      {label: "Volunteer at Our Events", link: "/events"},
    ],
  },
];

export const FooterOffices: readonly string[] = ["Lagos", "London", "Accra", "Qatar"];

export const FooterSocials: readonly FooterSocial[] = [
  {icon: XLogo, name: "X", url: "https://x.com/Arthurite_IX"},
  {icon: Linkedin, name: "LinkedIn", url: "https://www.linkedin.com/company/arthurite-integrated"},
  {icon: Instagram, name: "Instagram", url: "https://www.instagram.com/arthuriteintegrated/"},
  {icon: Facebook, name: "Facebook", url: "https://www.facebook.com/61571518378679"},
  {icon: Youtube, name: "YouTube", url: "https://www.youtube.com/channel/UCjxoAJUkhFt3LlYvnF-4u2g"},
];
