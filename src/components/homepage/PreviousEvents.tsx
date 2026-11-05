"use client";

import { useState } from "react";
import {
  CircleCheck,
  Droplets,
  GraduationCap,
  Library,
  LifeBuoy,
  MapPin,
  Package,
  Stethoscope,
  Sun,
  TreePine,
  Waves,
  type LucideIcon,
} from "lucide-react";

type GalleryEvent = {
  title: string;
  area: string;
  type: string;
  icon: LucideIcon;
  // Direct image link (images.unsplash.com/...). Cards with an empty link are not shown.
  image: string;
  // Headline result, e.g. "380" + "saplings planted"
  value: string;
  label: string;
  extra: string;
};

/* -------------------------------------------------------------------------- */
/*  Static gallery data: add a photo link to show more cards                   */
/* -------------------------------------------------------------------------- */
const GALLERY_EVENTS: GalleryEvent[] = [
  {
    title: "Gulshan Green Corridor",
    area: "Gulshan, Dhaka",
    type: "Plantation",
    icon: TreePine,
    image:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop&q=80",
    value: "380",
    label: "saplings planted",
    extra: "46 volunteers",
  },
  {
    title: "Buriganga Riverbank Plantation",
    area: "Buriganga Riverside, Dhaka",
    type: "Plantation",
    icon: TreePine,
    image:
      "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800&auto=format&fit=crop&q=80",
    value: "300",
    label: "native saplings planted",
    extra: "Tools provided",
  },
  {
    title: "Sabujbagh Canal Sweep",
    area: "Sabujbagh, Dhaka",
    type: "Cleanup",
    icon: Waves,
    image:
      "https://images.unsplash.com/photo-1667848324774-b78aa9e22304?w=800&auto=format&fit=crop&q=80",
    value: "1.2 t",
    label: "waste diverted",
    extra: "Canal-side cleanup",
  },
  {
    title: "Lalmatia Blood Bridge",
    area: "Lalmatia, Dhaka",
    type: "Donation",
    icon: Droplets,
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop&q=80",
    value: "52",
    label: "units collected",
    extra: "Blood donation drive",
  },

  // The drives below have no photo yet, so they stay hidden.
  // Paste a direct image link into `image` to show them.
  {
    title: "Uttara Evening Tutoring",
    area: "Uttara, Dhaka",
    type: "Education",
    icon: GraduationCap,
    image: "",
    value: "31",
    label: "learners taught",
    extra: "6 weeks of classes",
  },
  {
    title: "Mohammadpur Ration Share",
    area: "Mohammadpur, Dhaka",
    type: "Food Drive",
    icon: Package,
    image: "",
    value: "180",
    label: "parcels packed",
    extra: "Ration distribution",
  },
  {
    title: "Mirpur Health Week",
    area: "Mirpur, Dhaka",
    type: "Health Camp",
    icon: Stethoscope,
    image: "",
    value: "210",
    label: "people screened",
    extra: "Free health checkups",
  },
  {
    title: "Banani Solar Clinic",
    area: "Banani, Dhaka",
    type: "Workshop",
    icon: Sun,
    image: "",
    value: "14 kW",
    label: "capacity installed",
    extra: "Rooftop solar workshop",
  },
  {
    title: "Savar Flood Relief",
    area: "Savar, Dhaka",
    type: "Relief",
    icon: LifeBuoy,
    image: "",
    value: "9",
    label: "villages reached",
    extra: "Emergency relief boats",
  },
  {
    title: "Shyamoli Street Library",
    area: "Shyamoli, Dhaka",
    type: "Education",
    icon: Library,
    image: "",
    value: "1,100",
    label: "books shared",
    extra: "Open-air reading corner",
  },
];

const PHOTO_EVENTS = GALLERY_EVENTS.filter(
  (event) => event.image.trim() !== "",
);

// A card whose photo fails to load is hidden instead of showing a broken image
const GalleryCard = ({ event }: { event: GalleryEvent }) => {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <li className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-black/5">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.image}
          alt={event.title}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-border bg-background/85 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
          {event.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug text-foreground">
          {event.title}
        </h3>

        <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin aria-hidden="true" className="size-4 shrink-0 text-primary" />
          {event.area}
        </p>

        <div className="mt-auto border-t border-border pt-4 [&]:mt-5">
          <p className="text-2xl font-bold leading-none tracking-tight text-foreground">
            {event.value}
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground">{event.label}</p>

          <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary">
            <CircleCheck aria-hidden="true" className="size-4 shrink-0" />
            {event.extra}
          </p>
        </div>
      </div>
    </li>
  );
};

const PreviousEvents = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-20 md:py-28 xl:px-12">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Gallery
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          What we have already done
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Moments from drives that have already finished. The numbers are what
          people logged on the day, not a target we wrote afterwards.
        </p>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PHOTO_EVENTS.map((event) => (
          <GalleryCard key={event.title} event={event} />
        ))}
      </ul>
    </section>
  );
};

export default PreviousEvents;