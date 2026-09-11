export type ServiceOffer = {
  readonly image: string;
  readonly title: string;
};

export const ServiceOffers: readonly ServiceOffer[] = [
  {
    image: "/services/real_arch.jpg",
    title: "Cloud Architecture & Design",
  },
  {
    image: "/services/real_migration.jpg",
    title: "Cloud Migration",
  },
  {
    image: "/services/real_opt.jpg",
    title: "Cloud Optimization",
  },
  {
    image: "/services/real_sec.jpg",
    title: "Cloud Security",
  },
  {
    image: "/services/real_managed.jpg",
    title: "Managed Cloud Services",
  },
  {
    image: "/services/real_ai.jpg",
    title: "AI Services",
  },
  {
    image: "/services/real_ml.jpg",
    title: "Machine Learning",
  },
  {
    image: "/services/real_custom.jpg",
    title: "Custom Solution Development",
  },
];
