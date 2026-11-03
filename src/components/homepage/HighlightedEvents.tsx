import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, UsersRound } from "lucide-react";
import {
  BloodDonationArt,
  FloodReliefArt,
  FoodReliefArt,
  HealthCampArt,
  LiteracyClassArt,
  RiverCleanupArt,
  SolarWorkshopArt,
  TreePlantationArt,
} from "@/components/illustrations";
import type { EventType, HomepageEvent } from "@/lib/homepage-events";

const artByKey = {
  blood: BloodDonationArt,
  tree: TreePlantationArt,
  river: RiverCleanupArt,
  food: FoodReliefArt,
  health: HealthCampArt,
  school: LiteracyClassArt,
  solar: SolarWorkshopArt,
  flood: FloodReliefArt,
};

const badgeTone: Record<EventType, string> = {
  Cleanup: "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-300",
  Plantation: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  Donation: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-300",
  Education: "border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-300",
  "Health Camp": "border-teal-500/30 bg-teal-500/10 text-teal-600 dark:text-teal-300",
  "Blood Donation": "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-300",
  Others: "border-border bg-muted text-muted-foreground",
};

const dayFormat = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  timeZone: "UTC",
});

const monthFormat = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  timeZone: "UTC",
});

const weekdayFormat = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  timeZone: "UTC",
});

type HighlightedEventsProps = {
  events: HomepageEvent[];
};

const HighlightedEvents = ({ events }: HighlightedEventsProps) => {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:py-28 xl:px-12">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              On the calendar
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Drives you can still join
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Everything below is happening in the next few weeks and still has
              room for hands. Sign on before the headcount fills.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary md:self-auto"
          >
            All upcoming drives
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const date = new Date(`${event.date}T00:00:00Z`);
            const Art = artByKey[event.art];

            return (
              <li
                key={event.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-black/5"
              >
                <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                  <Art className="h-full w-full" />
                  <span
                    className={`absolute left-4 top-4 inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium backdrop-blur ${badgeTone[event.type]}`}
                  >
                    {event.type}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex w-14 shrink-0 flex-col items-center rounded-xl border border-border bg-muted/60 py-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                        {monthFormat.format(date)}
                      </span>
                      <span className="text-xl font-bold leading-tight text-foreground">
                        {dayFormat.format(date)}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {weekdayFormat.format(date)}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold leading-snug text-foreground">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {event.summary}
                  </p>

                  <ul className="mt-5 flex flex-col gap-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <MapPin className="size-4 shrink-0 text-primary" />
                      {event.area}
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="size-4 shrink-0 text-primary" />
                      {event.time}
                    </li>
                    <li className="flex items-center gap-2">
                      <UsersRound className="size-4 shrink-0 text-primary" />
                      {event.slots} places left
                    </li>
                  </ul>

                  <Link
                    href="/events"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/85 active:scale-95"
                  >
                    Reserve a place
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default HighlightedEvents;
