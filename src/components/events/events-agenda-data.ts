export interface Speaker {
  readonly id: string;
  readonly initials: string;
  readonly name: string;
  readonly role: string;
  readonly timeSlot: string;
  readonly imageSrc?: string;
}

export interface AgendaSession {
  readonly time: string;
  readonly title: string;
  readonly track: string;
  readonly speaker: string;
}

export interface AgendaDay {
  readonly dayNumber: number;
  readonly date: string;
  readonly title: string;
  readonly sessions: readonly AgendaSession[];
}

export const FEATURED_SPEAKERS: readonly Speaker[] = [
  {
    id: "sp1",
    initials: "AO",
    name: "Dr. Arthur Okon",
    role: "Chief Cloud Architect, Arthurite",
    timeSlot: "Keynote - Day 1",
    imageSrc: "/services/real_arch.jpg",
  },
  {
    id: "sp2",
    initials: "CN",
    name: "Chidi Nnamdi",
    role: "Head of AI Solutions",
    timeSlot: "11:30 AM - Day 1",
    imageSrc: "/services/real_ai.jpg",
  },
  {
    id: "sp3",
    initials: "FA",
    name: "Folake Adebayo",
    role: "AWS Enterprise Strategist",
    timeSlot: "02:00 PM - Day 2",
    imageSrc: "/services/real_sec.jpg",
  },
  {
    id: "sp4",
    initials: "EI",
    name: "Emmanuel Ibrahim",
    role: "Principal Security Engineer",
    timeSlot: "10:15 AM - Day 3",
    imageSrc: "/services/real_ml.jpg",
  },
];

export const EVENT_AGENDA: readonly AgendaDay[] = [
  {
    dayNumber: 1,
    date: "Sep 10",
    title: "Day 1 - Cloud & AI Summit",
    sessions: [
      {
        time: "09:00 AM - 10:30 AM",
        title: "Opening Keynote: Next-Gen AWS Cloud & GenAI",
        track: "Keynote",
        speaker: "Dr. Arthur Okon",
      },
      {
        time: "11:00 AM - 12:30 PM",
        title: "Building Production Agents with Amazon Bedrock",
        track: "Artificial Intelligence",
        speaker: "Chidi Nnamdi",
      },
    ],
  },
  {
    dayNumber: 2,
    date: "Sep 11",
    title: "Day 2 - Security & Serverless Architecture",
    sessions: [
      {
        time: "10:00 AM - 11:30 AM",
        title: "Zero-Trust Architecture on AWS Cloud",
        track: "Security",
        speaker: "Emmanuel Ibrahim",
      },
      {
        time: "01:30 PM - 03:00 PM",
        title: "Optimizing Enterprise Workloads & FinOps",
        track: "Cloud Ops",
        speaker: "Folake Adebayo",
      },
    ],
  },
  {
    dayNumber: 3,
    date: "Sep 12",
    title: "Day 3 - Workshops & Quantum Tech",
    sessions: [
      {
        time: "10:00 AM - 12:00 PM",
        title: "Quantum Computing: Emerging Frameworks",
        track: "Quantum Computing",
        speaker: "Arthurite Research Team",
      },
    ],
  },
];
