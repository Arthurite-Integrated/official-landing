import type {ApiEvent} from "#/lib/api/types.ts";

export interface EventInfo {
  readonly dates: string;
  readonly tagline: string;
  readonly location: string;
  readonly title: string;
  readonly subtitle: string;
  readonly introText: string;
  readonly ctaText: string;
  readonly ctaLink: string;
}

export interface EventTrack {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly iconType: "robotics" | "ai" | "quantum";
}

export interface EventStat {
  readonly value: string;
  readonly label: string;
  readonly highlight?: boolean;
}

export interface EventItem {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly date: string;
  readonly location: string;
  readonly category: string;
  readonly badge?: string;
  readonly imageSrc?: string;
  readonly fullContent?: string;
  readonly keyTakeaways?: readonly string[];
  readonly galleryImages: readonly string[];
}

export interface GalleryPhoto {
  readonly id: string;
  readonly title: string;
  readonly category: "One with AI 2026" | "Next-Gen AI 2025";
  readonly date: string;
  readonly imageSrc: string;
  readonly aspectClass: string;
}

export const EVENT_INFO: EventInfo = {
  dates: "2025 – 2026",
  tagline: "Cloud, AI and digital transformation — live in Nigeria",
  location: "Lagos, Nigeria",
  title: "ARTHURITE",
  subtitle: "EVENTS",
  introText: "Bringing together technology leaders, cloud practitioners, and innovators to explore the future of cloud and AI on AWS",
  ctaText: "Get in Touch",
  ctaLink: "/contact",
};

export const EVENT_TRACKS: readonly EventTrack[] = [
  {
    id: "genai",
    title: "Generative AI & AWS",
    description:
      "Explore how AWS services like Amazon Bedrock and SageMaker power the next generation of intelligent applications, from autonomous agents to real-time inference at enterprise scale.",
    iconType: "ai",
  },
  {
    id: "ev-mobility",
    title: "EV & Smart Mobility",
    description:
      "Discover how cloud-native architectures on AWS are accelerating the electric vehicle ecosystem — from connected vehicle platforms to predictive fleet management and charging infrastructure.",
    iconType: "robotics",
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    description:
      "Learn how African enterprises are migrating legacy workloads, modernising data platforms, and building resilient cloud-first operations with AWS as their foundation.",
    iconType: "quantum",
  },
];

export const EVENT_STATS: readonly EventStat[] = [
  {value: "2", label: "EVENTS"},
  {value: "100+", label: "ATTENDEES", highlight: true},
  {value: "Lagos", label: "LOCATION"},
  {value: "AWS", label: "POWERED BY"},
];

const ONE_WITH_AI_IMAGES = [
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2332_lya0sv?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2327_pxh5hk?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2319_ublwkb?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2286_cdml4q?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2354_vivrcb?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2267_w79lzp?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2315_konn3d?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2307_dzu4e5?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2163_hr3gdf?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2104_atwwsv?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2242_qgnapn?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2087_angqqa?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2357_hqk5zb?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2353_o67d9o?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2350_uxpw0f?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2318_znvs3y?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2346_ctclpo?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2210_ld8e1y?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2253_z5jnmi?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2231_muuzss?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2234_zqee7m?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2196_mqlc1p?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2228_ddtint?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2193_mrfmve?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2130_ue9l90?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2186_ycdxsr?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2337_sepz07?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2131_hyyw2z?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2114_tcy72l?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2086_djtlr8?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2107_juef8r?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2356_ddiz2l?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2295_ultcf6?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2297_taxhfg?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2281_s4293h?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2296_fbs0b1?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2145_vd6nmo?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2278_ltw7u0?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2237_xpyvfk?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2202_xblcrz?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2141_yhepad?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2205_ovww3h?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2175_es16md?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2134_c3z9vo?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2338_m9xnod?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2301_sabo9e?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2075_ewn5fk?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2343_xzmalw?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2325_rnbcrt?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/DSC_2264_azwotw?_a=BAMAROFG0",
] as const;

const NEXT_GEN_AI_IMAGES = [
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_0605_put1kc?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_5954_gtinyp?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_1001_rqmqax?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_5949_mvbfvk?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_0800_wji74n?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_5965_u8qabn?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_0842_fdjlyg?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_0589_wfcbyd?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_0682_vmda3o?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_5936_tazgmf?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_0992_q29ft9?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_0829_bs3niu?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_0620_kzpsa5?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_0644_n6uddu?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_0454_jrhlyf?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_0701_f2pw9f?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_0923_b5epdu?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_0480_aedpku?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_0687_rbddvn?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_0908_mtytwh?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_0863_thovcu?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_0550_b6wpfw?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_0526_apabd2?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_0574_qkjovl?_a=BAMAROFG0",
  "https://res.cloudinary.com/dq8fswidj/image/upload/c_limit,f_auto,q_auto,w_1200/IMG_0460_hvq98g?_a=BAMAROFG0",
] as const;

function formatEventDate(startsAt: string): string {
  const date = new Date(startsAt);
  if (Number.isNaN(date.getTime())) return startsAt;
  return date.toLocaleDateString("en-US", {day: "numeric", month: "long", year: "numeric"});
}

export function toEventItem(event: ApiEvent): EventItem {
  return {
    id: event.id,
    slug: event.id,
    title: event.title,
    description: event.description,
    date: formatEventDate(event.startsAt),
    location: event.location,
    category: "Event",
    imageSrc: event.coverImage,
    galleryImages: [],
  };
}

export const GALLERY_CATEGORIES = ["All", "One with AI 2026", "Next-Gen AI 2025"] as const;

const ONE_WITH_AI = "One with AI 2026" as const;
const NEXT_GEN_AI = "Next-Gen AI 2025" as const;

export const GALLERY_PHOTOS: readonly GalleryPhoto[] = [
  ...ONE_WITH_AI_IMAGES.map((src, index) => ({
    id: `owai-full-${index + 1}`,
    title: `One with AI — Event Highlight ${index + 1}`,
    category: ONE_WITH_AI,
    date: "Lagos, June 2026",
    imageSrc: src,
    aspectClass: index % 3 === 0 ? "aspect-[4/3]" : index % 3 === 1 ? "aspect-[16/10]" : "aspect-[3/4]",
  })),
  ...NEXT_GEN_AI_IMAGES.map((src, index) => ({
    id: `nga-full-${index + 1}`,
    title: `Next-Gen AI — Event Highlight ${index + 1}`,
    category: NEXT_GEN_AI,
    date: "Lagos, August 2025",
    imageSrc: src,
    aspectClass: index % 3 === 0 ? "aspect-[4/3]" : index % 3 === 1 ? "aspect-[16/10]" : "aspect-[3/4]",
  })),
];

export const CTA_CONTENT = {
  title: "Want to go deeper on cloud and AI topics?",
  buttonText: "Explore Blog",
  buttonLink: "/blog",
};

export * from "#/components/events/events-agenda-data.ts";
