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
    id: "sp-mildred",
    initials: "MNE",
    name: "Mildred N. Ekanem",
    role: "Speaker, One with AI 2026",
    timeSlot: "Session",
    imageSrc: "https://arthuriteevents.com/wp-content/uploads/2026/06/IMG-20260608-WA0147.jpg",
  },
  {
    id: "sp-alexander",
    initials: "AL",
    name: "Dr. Alexander Lenk",
    role: "Speaker, One with AI 2026",
    timeSlot: "Session",
    imageSrc: "https://arthuriteevents.com/wp-content/uploads/2026/05/image-1242.png",
  },
  {
    id: "sp-otunba",
    initials: "OOJ",
    name: "Otunba Osanipin J.O",
    role: "Speaker, One with AI 2026",
    timeSlot: "Session",
    imageSrc: "https://arthuriteevents.com/wp-content/uploads/2026/05/image-1243.png",
  },
  {
    id: "sp-akin",
    initials: "AA",
    name: "Akin Akingbogun",
    role: "Speaker, One with AI 2026",
    timeSlot: "Session",
    imageSrc: "https://arthuriteevents.com/wp-content/uploads/2026/06/image-1287.png",
  },
  {
    id: "sp-engr-adigun",
    initials: "EAI",
    name: "Engr. Adigun Ibrahim Olalekan",
    role: "Speaker, One with AI 2026",
    timeSlot: "Session",
    imageSrc: "https://arthuriteevents.com/wp-content/uploads/2026/06/image-1301.png",
  },
  {
    id: "sp-adetayo",
    initials: "AB",
    name: "Adetayo Bamiduro",
    role: "Speaker, One with AI 2026",
    timeSlot: "Session",
    imageSrc: "https://arthuriteevents.com/wp-content/uploads/2026/06/image-1243-2.png",
  },
  {
    id: "sp-ebere",
    initials: "EN",
    name: "Ebere Nkoro",
    role: "Speaker, One with AI 2026",
    timeSlot: "Session",
    imageSrc: "https://arthuriteevents.com/wp-content/uploads/2026/06/image-1243-1.png",
  },
  {
    id: "sp-chiagoziem",
    initials: "CE",
    name: "Engr. Chiagoziem Ezechi",
    role: "Speaker, One with AI 2026",
    timeSlot: "Session",
    imageSrc: "https://arthuriteevents.com/wp-content/uploads/2026/06/image-1243.png",
  },
  {
    id: "sp-adebusola",
    initials: "AF",
    name: "Adebusola Fasanya",
    role: "Speaker, One with AI 2026",
    timeSlot: "Session",
    imageSrc: "https://arthuriteevents.com/wp-content/uploads/2026/06/1780394651193-1-1.png",
  },
  {
    id: "sp-engr-dapo",
    initials: "EDA",
    name: "Engr. Dapo Adesina",
    role: "Speaker, One with AI 2026",
    timeSlot: "Session",
    imageSrc: "https://arthuriteevents.com/wp-content/uploads/2026/05/image-1244.png",
  },
  {
    id: "sp-bala",
    initials: "BF",
    name: "Bala Fayam",
    role: "Speaker, One with AI 2026",
    timeSlot: "Session",
    imageSrc: "https://arthuriteevents.com/wp-content/uploads/2026/05/image-1247.png",
  },
  {
    id: "sp-ahmad",
    initials: "AID",
    name: "Ahmad Ibrahim D.",
    role: "Speaker, One with AI 2026",
    timeSlot: "Session",
    imageSrc: "https://arthuriteevents.com/wp-content/uploads/2026/05/image-1246.png",
  },
];

export const EVENT_AGENDA: readonly AgendaDay[] = [
  {
    dayNumber: 1,
    date: "Jun 11",
    title: "One with AI — Powering Mobility & EV Ecosystems with AWS",
    sessions: [
      {
        time: "09:00 AM – 09:30 AM",
        title: "Welcome & Opening Remarks",
        track: "Keynote",
        speaker: "Paul Aderoju",
      },
      {
        time: "09:30 AM – 10:30 AM",
        title: "AI-Powered EV Fleet Management on AWS IoT Core",
        track: "AI & EV Mobility",
        speaker: "Ayomikun Ayobami",
      },
      {
        time: "10:45 AM – 11:45 AM",
        title: "Predictive Maintenance for Electric Vehicles with AWS SageMaker",
        track: "Machine Learning",
        speaker: "Delightsome Asolo",
      },
      {
        time: "12:00 PM – 01:00 PM",
        title: "GenAI Across the EV Customer Journey",
        track: "Generative AI",
        speaker: "Paul Aderoju",
      },
    ],
  },
  {
    dayNumber: 2,
    date: "Aug 22",
    title: "Next-Gen Intelligence: Driving Digital Transformation with AWS & GenAI",
    sessions: [
      {
        time: "09:00 AM – 09:30 AM",
        title: "Welcome & The State of Cloud in Africa",
        track: "Keynote",
        speaker: "Paul Aderoju",
      },
      {
        time: "09:30 AM – 10:30 AM",
        title: "GenAI Workflow Automation with Amazon Bedrock",
        track: "Generative AI",
        speaker: "Ayomikun Ayobami",
      },
      {
        time: "10:45 AM – 11:45 AM",
        title: "Modernising Enterprise Data Platforms on AWS",
        track: "Data & Analytics",
        speaker: "Delightsome Asolo",
      },
      {
        time: "12:00 PM – 01:00 PM",
        title: "Digital Transformation Case Studies from Nigerian Enterprises",
        track: "Panel Discussion",
        speaker: "Arthurite Team",
      },
    ],
  },
];
