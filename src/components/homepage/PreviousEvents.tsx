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

type PastEvent = {
  title: string;
  area: string;
  type: string;
  icon: LucideIcon;
  // Headline result, e.g. "380" + "saplings planted"
  value: string;
  label: string;
  extra: string;
  // Static class strings so Tailwind can detect them
  tile: string;
  iconColor: string;
};

/* -------------------------------------------------------------------------- */
/*  Static archive data: edit, add or remove items here                        */
/* -------------------------------------------------------------------------- */
const PAST_EVENTS: PastEvent[] = [
  {
    title: "Gulshan Green Corridor",
    area: "Gulshan, Dhaka",
    type: "Plantation",
    icon: TreePine,
    value: "380",
    label: "saplings planted",
    extra: "46 volunteers",
    tile: "from-emerald-500/25 to-emerald-500/5",
    iconColor: "text-emerald-600 dark:text-emerald-300",
  },
  {
    title: "Lalmatia Blood Bridge",
    area: "Lalmatia, Dhaka",
    type: "Donation",
    icon: Droplets,
    value: "52",
    label: "units collected",
    extra: "Blood donation drive",
    tile: "from-rose-500/25 to-rose-500/5",
    iconColor: "text-rose-600 dark:text-rose-300",
  },
  {
    title: "Uttara Evening Tutoring",
    area: "Uttara, Dhaka",
    type: "Education",
    icon: GraduationCap,
    value: "31",
    label: "learners taught",
    extra: "6 weeks of classes",
    tile: "from-violet-500/25 to-violet-500/5",
    iconColor: "text-violet-600 dark:text-violet-300",
  },
  {
    title: "Sabujbagh Canal Sweep",
    area: "Sabujbagh, Dhaka",
    type: "Cleanup",
    icon: Waves,
    value: "1.2 t",
    label: "waste diverted",
    extra: "Canal-side cleanup",
    tile: "from-sky-500/25 to-sky-500/5",
    iconColor: "text-sky-600 dark:text-sky-300",
  },
  {
    title: "Mohammadpur Ration Share",
    area: "Mohammadpur, Dhaka",
    type: "Food Drive",
    icon: Package,
    value: "180",
    label: "parcels packed",
    extra: "Ration distribution",
    tile: "from-orange-500/25 to-orange-500/5",
    iconColor: "text-orange-600 dark:text-orange-300",
  },
  {
    title: "Mirpur Health Week",
    area: "Mirpur, Dhaka",
    type: "Health Camp",
    icon: Stethoscope,
    value: "210",
    label: "people screened",
    extra: "Free health checkups",
    tile: "from-teal-500/25 to-teal-500/5",
    iconColor: "text-teal-600 dark:text-teal-300",
  },
  {
    title: "Banani Solar Clinic",
    area: "Banani, Dhaka",
    type: "Workshop",
    icon: Sun,
    value: "14 kW",
    label: "capacity installed",
    extra: "Rooftop solar workshop",
    tile: "from-amber-500/25 to-amber-500/5",
    iconColor: "text-amber-600 dark:text-amber-300",
  },
  {
    title: "Savar Flood Relief",
    area: "Savar, Dhaka",
    type: "Relief",
    icon: LifeBuoy,
    value: "9",
    label: "villages reached",
    extra: "Emergency relief boats",
    tile: "from-cyan-500/25 to-cyan-500/5",
    iconColor: "text-cyan-600 dark:text-cyan-300",
  },
  {
    title: "Shyamoli Street Library",
    area: "Shyamoli, Dhaka",
    type: "Education",
    icon: Library,
    value: "1,100",
    label: "books shared",
    extra: "Open-air reading corner",
    tile: "from-fuchsia-500/25 to-fuchsia-500/5",
    iconColor: "text-fuchsia-600 dark:text-fuchsia-300",
  },
];

const PreviousEvents = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-20 md:py-28 xl:px-12">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            The archive
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What we have already done
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Every card below is a drive that finished. Numbers are what people
            logged on the day, not a target we wrote afterwards.
          </p>
        </div>

        <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary md:self-auto">
          <CircleCheck aria-hidden="true" className="size-4" />
          {PAST_EVENTS.length} drives completed
        </span>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PAST_EVENTS.map((event) => {
          const Icon = event.icon;

          return (
            <li
              key={event.title}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-black/5"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`flex size-14 items-center justify-center rounded-2xl bg-linear-to-br ${event.tile}`}
                >
                  <Icon
                    aria-hidden="true"
                    className={`size-7 transition group-hover:scale-110 ${event.iconColor}`}
                  />
                </span>

                <span className="inline-flex items-center rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                  {event.type}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold leading-snug text-foreground">
                {event.title}
              </h3>

              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin aria-hidden="true" className="size-4 shrink-0 text-primary" />
                {event.area}
              </p>

              <div className="mt-6 flex items-end justify-between gap-3 border-t border-border pt-5">
                <div>
                  <p className="text-3xl font-bold leading-none tracking-tight text-foreground">
                    {event.value}
                  </p>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {event.label}
                  </p>
                </div>

                <p className="flex items-center gap-1.5 text-xs font-medium text-primary">
                  <CircleCheck aria-hidden="true" className="size-4 shrink-0" />
                  {event.extra}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default PreviousEvents;