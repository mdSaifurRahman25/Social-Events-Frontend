import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CalendarCheck,
  Droplets,
  LifeBuoy,
  MapPin,
  TreePine,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

const pulseStats = [
  { value: "312", label: "Neighbours on the board", icon: UsersRound },
  { value: "9", label: "Districts covered", icon: MapPin },
  { value: "48", label: "Drives this season", icon: CalendarCheck },
];

type HeroCard = {
  title: string;
  detail: string;
  icon: LucideIcon;
  // Static class strings so Tailwind can detect them
  tile: string;
  iconColor: string;
  className: string;
};

// Static highlight cards shown on the right side of the banner
const heroCards: HeroCard[] = [
  {
    title: "Blood Donation",
    detail: "Camps run with certified medical staff",
    icon: Droplets,
    tile: "from-rose-500/30 to-rose-500/5",
    iconColor: "text-rose-600 dark:text-rose-300",
    className: "",
  },
  {
    title: "Tree Plantation",
    detail: "Native saplings along lakes and rivers",
    icon: TreePine,
    tile: "from-emerald-500/30 to-emerald-500/5",
    iconColor: "text-emerald-600 dark:text-emerald-300",
    className: "mt-10",
  },
];

const Banner = () => {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* ambient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-primary/12 via-background to-accent/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-10%] -z-10 size-[38rem] rounded-full bg-primary/10 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-28 xl:px-12">
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary">
            <Bell className="size-3.5" />
            Dhaka · Chattogram · Sylhet — 9 districts live
          </span>

          <h1 className="mt-7 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
            The street is the venue.
            <span className="mt-2 block bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Neighbours are the crew.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Kindred turns a jar of rice, an afternoon, and a group chat into
            something a whole street can turn up to. Post a drive, find people
            nearby who can help, and keep a record of what it added up to.
          </p>

          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/events"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-pink-600 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-600/20 transition hover:opacity-90 active:scale-95"
            >
              See what is on
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/events/create"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary active:scale-95"
            >
              Start a drive
            </Link>
          </div>

          <dl className="mt-12 grid w-full grid-cols-3 gap-4 border-t border-border pt-8">
            {pulseStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex flex-col gap-1">
                  <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <Icon className="size-3.5 text-primary" />
                    {stat.label}
                  </dt>
                  <dd className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {stat.value}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>

        {/* highlight card collage */}
        <div className="relative mx-auto w-full max-w-lg pb-10 lg:max-w-none">
          <div className="grid grid-cols-2 gap-4">
            {heroCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className={`rounded-3xl border border-border bg-card p-6 shadow-xl shadow-black/10 ${card.className}`}
                >
                  <span
                    className={`flex size-16 items-center justify-center rounded-2xl bg-linear-to-br ${card.tile}`}
                  >
                    <Icon
                      aria-hidden="true"
                      className={`size-8 ${card.iconColor}`}
                    />
                  </span>
                  <h3 className="mt-8 text-lg font-semibold text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {card.detail}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="absolute -bottom-2 left-1/2 w-60 -translate-x-1/2 rounded-3xl border border-border bg-card p-5 shadow-2xl shadow-black/20 sm:w-64">
            <div className="flex items-center gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500/30 to-cyan-500/5">
                <LifeBuoy
                  aria-hidden="true"
                  className="size-6 text-cyan-600 dark:text-cyan-300"
                />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Flood Relief
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Emergency help, village by village
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -left-3 top-1/3 hidden rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-lg backdrop-blur sm:block">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/12 text-primary">
                <UsersRound className="size-4" />
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">9 joined</p>
                <p className="text-xs text-muted-foreground">this week alone</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;