// Demo data for the homepage "Recent Upcoming Events" section.
// Remove this file and the `demoEvents` prop in src/app/page.tsx once the
// database fetch is wired up.

export type HighlightedEvent = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: {
    src: string;
    alt: string;
  };
  tone: string;
};

export const demoEvents: HighlightedEvent[] = [
  {
    id: "winter-clothes-distribution",
    title: "Winter Clothes Distribution",
    description:
      "Collect and sort warm clothing for families facing the coldest weeks of the season.",
    location: "Riverside Community Center",
    date: "2026-11-14",
    image: {
      src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
      alt: "Demo event photo for Winter Clothes Distribution",
    },
    tone: "bg-linear-to-br from-pink-900/40 to-card",
  },
  {
    id: "blanket-distribution",
    title: "Blanket Distribution for the Needy",
    description:
      "Deliver blankets and essentials to shelters and street-side communities before nightfall.",
    location: "Old Town Square",
    date: "2026-11-18",
    image: {
      src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
      alt: "Demo event photo for Blanket Distribution for the Needy",
    },
    tone: "bg-linear-to-br from-purple-900/40 to-card",
  },
  {
    id: "urban-tree-plantation",
    title: "Urban Tree Plantation",
    description:
      "Plant native saplings along the river walk and learn how to care for them through the first year.",
    location: "Green Valley Park",
    date: "2026-11-21",
    image: {
      src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
      alt: "Demo event photo for Urban Tree Plantation",
    },
    tone: "bg-linear-to-br from-slate-800/60 to-card",
  },
  {
    id: "neighborhood-cleanup",
    title: "Neighborhood Cleanup",
    description:
      "Clear litter from streets, parks, and waterways with gloves, bags, and tools provided on site.",
    location: "Harbor Street Gate",
    date: "2026-11-25",
    image: {
      src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
      alt: "Demo event photo for Neighborhood Cleanup",
    },
    tone: "bg-linear-to-br from-pink-900/30 to-slate-900",
  },
  {
    id: "community-health-camp",
    title: "Community Health Camp",
    description:
      "Free basic checkups and health awareness sessions run by volunteer doctors and nurses.",
    location: "Lakeside Public School",
    date: "2026-12-02",
    image: {
      src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
      alt: "Demo event photo for Community Health Camp",
    },
    tone: "bg-linear-to-br from-purple-900/30 to-slate-900",
  },
  {
    id: "food-drive-for-families",
    title: "Food Drive for Families",
    description:
      "Pack and hand out ration bags to households that need steady meals through the winter months.",
    location: "Central Market Hall",
    date: "2026-12-06",
    image: {
      src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
      alt: "Demo event photo for Food Drive for Families",
    },
    tone: "bg-linear-to-br from-slate-800/60 to-card",
  },
];
