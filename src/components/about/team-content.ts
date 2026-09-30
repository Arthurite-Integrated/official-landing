export type TeamMember = {
  readonly id: string;
  readonly initials: string;
  readonly name: string;
  /** Path under `public/`, e.g. "/about/team/ada.jpg". Null shows the initials panel until the photo is added. */
  readonly photo: string | null;
  readonly position: string;
  readonly quote: string;
};

export const TeamMembers: readonly TeamMember[] = [
  {
    id: "paul-aderoju",
    name: "Paul Aderoju",
    position: "Senior Solutions Architect & Head of Technical Team",
    initials: "PA",
    photo: "/about/team/paul-aderoju.png",
    quote:
      "My time at Arthurite has been a transformative chapter in my career, giving me the opportunity to work at the intersection of cloud, AI, and business while contributing to solutions that create meaningful value for customers. It has challenged me to grow as a technologist, leader, and problem-solver, and I'm grateful for the people, experiences, and opportunities that have shaped my journey.",
  },
  {
    id: "ayomikun-ayobami",
    name: "Ayomikun Ayobami",
    position: "Senior Solution Engineer",
    initials: "AA",
    photo: "/about/team/ayomikun-ayobami.jpg",
    quote:
      "My time at Arthurite has been a rewarding experience, giving me the opportunity to contribute to meaningful projects, work with great people, and be part of building solutions that create real value for clients.",
  },
  {
    id: "delightsome-asolo",
    name: "Delightsome Asolo",
    position: "Cloud Engineer",
    initials: "DA",
    photo: "/about/team/delightsome-asolo.jpg",
    quote:
      "Working with the team at Arthurite has been an amazing experience. It's a lean team, but the quality of work, collaboration, and commitment to excellence are anything but small.",
  },
  {
    id: "dumuhere-prince",
    name: "Dumuhere Prince",
    position: "Cloud Engineer",
    initials: "DP",
    photo: "/about/team/dumuhere-prince.png",
    quote:
      "As a Cloud Engineer at Arthurite Integrated, Prince builds reliable cloud and AI systems on AWS to help businesses run smoothly and embrace modern technology.",
  },
  {
    id: "sufyan-zakariyya-sani",
    name: "Sufyan Zakariyya Sani",
    position: "Solutions Engineer",
    initials: "SZS",
    photo: "/about/team/sufyan-zakariyya-sani.jpg",
    quote:
      "What I value most about working at Arthurite is the endless opportunity for professional development and the sheer amount of knowledge I've gained.",
  },
  {
    id: "ejibode-ibraheem-adewale",
    name: "Ejibode Ibraheem Adewale",
    position: "Solutions Engineer",
    initials: "EIA",
    photo: "/about/team/ejibode-ibraheem-adewale.jpg",
    quote:
      "My time at Arthurite has been a rewarding journey filled with growth, learning, meaningful experiences, and the opportunity to work alongside an amazing team.",
  },
  {
    id: "akande-olalekan-toheeb",
    name: "Akande Olalekan Toheeb",
    position: "Solutions Engineer",
    initials: "AOT",
    photo: "/about/team/akande-olalekan-toheeb.png",
    quote:
      "I have always dreamt of a company where I can earn and grow at the same time. Arthurite Integrated provided that for me. It's a great opportunity to work for this amazing company.",
  },
  {
    id: "adekunle-kehinde-fisayo",
    name: "Adekunle Kehinde Fisayo",
    position: "Web Engineer",
    initials: "AKF",
    photo: "/about/team/adekunle-kehinde-fisayo.jpg",
    quote:
      "Arthurite has given me the opportunity to learn, grow, earn AWS certifications, and apply my skills to real-world client projects, making my time here both challenging and rewarding.",
  },
  {
    id: "dauda-lawal",
    name: "Dauda Lawal",
    position: "Web Developer",
    initials: "DL",
    photo: "/about/team/dauda-lawal.png",
    quote:
      "Working at Arthurite Integrated has been an opportunity to turn ideas into practical digital solutions, collaborate with a talented team, and continuously grow at the intersection of Web development, Cloud technology, AI and Innovation.",
  },
  {
    id: "bello-abake-mardiyat",
    name: "Bello Abake Mardiyat",
    position: "Social Media Manager",
    initials: "BAM",
    photo: "/about/team/bello-abake-mardiyat.jpg",
    quote:
      "Being part of Arthurite Integrated has been a really valuable experience for me. I've had the chance to learn, grow my skills, work on exciting projects, and collaborate with amazing people. I'm grateful for the lessons, the opportunities, and the growth that came with being part of the team.",
  },
];
