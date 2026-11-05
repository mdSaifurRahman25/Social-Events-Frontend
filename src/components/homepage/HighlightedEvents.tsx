import Link from "next/link";
import { ArrowUpRight, CalendarX2, MapPin, TriangleAlert } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type RecentEvent = {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  thumbnail: string;
  description: string;
};

const badgeTone: Record<string, string> = {
  Cleanup: "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-300",
  Plantation: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  Donation: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-300",
  Education: "border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-300",
  "Health Camp": "border-teal-500/30 bg-teal-500/10 text-teal-600 dark:text-teal-300",
  "Winter Relief": "border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-300",
  "Food Drive": "border-orange-500/30 bg-orange-500/10 text-orange-600 dark:text-orange-300",
};

const fallbackTone = "border-border bg-muted text-muted-foreground";

const dayFormat = new Intl.DateTimeFormat("en-GB", { day: "2-digit", timeZone: "UTC" });
const monthFormat = new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "UTC" });
const weekdayFormat = new Intl.DateTimeFormat("en-GB", { weekday: "long", timeZone: "UTC" });

// Returns the latest events, or null when the server cannot be reached
const getRecentEvents = async (): Promise<RecentEvent[] | null> => {
  try {
    const response = await fetch(`${API_URL}/recent-events`, { cache: "no-store" });
    if (!response.ok) return null;

    const body = await response.json();
    return Array.isArray(body?.events) ? body.events : null;
  } catch {
    return null;
  }
};

const MessageCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof TriangleAlert;
  title: string;
  description: string;
}) => (
  <div className="mt-12 flex flex-col items-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
    <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
      <Icon aria-hidden="true" className="size-6" />
    </span>
    <h3 className="mt-5 text-xl font-semibold text-foreground">{title}</h3>
    <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
      {description}
    </p>
  </div>
);

const HighlightedEvents = async () => {
  const events = await getRecentEvents();

  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:py-28 xl:px-12">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              On the calendar
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Drives you can still join (Recent Events)
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The latest drives posted by the community. Open one to see the
              details and sign on.
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

        {events === null && (
          <MessageCard
            icon={TriangleAlert}
            title="Couldn't load recent events"
            description="We couldn't reach the server right now. Please try again in a moment."
          />
        )}

        {events !== null && events.length === 0 && (
          <MessageCard
            icon={CalendarX2}
            title="No events yet"
            description="Nothing has been posted so far. Be the first to open a drive."
          />
        )}

        {events !== null && events.length > 0 && (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const date = new Date(`${event.date}T00:00:00Z`);
              const hasDate = !Number.isNaN(date.getTime());

              return (
                <li
                  key={event.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-black/5"
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-linear-to-br from-pink-900 to-pink-950">
                    {event.thumbnail && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={event.thumbnail}
                        alt={event.title}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 size-full object-cover"
                      />
                    )}
                    <span
                      className={`absolute left-4 top-4 inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium backdrop-blur ${
                        badgeTone[event.type] ?? fallbackTone
                      }`}
                    >
                      {event.type}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start gap-3">
                      {hasDate && (
                        <div className="flex w-14 shrink-0 flex-col items-center rounded-xl border border-border bg-muted/60 py-1.5">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                            {monthFormat.format(date)}
                          </span>
                          <span className="text-xl font-bold leading-tight text-foreground">
                            {dayFormat.format(date)}
                          </span>
                        </div>
                      )}

                      <div className="min-w-0">
                        {hasDate && (
                          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            {weekdayFormat.format(date)}
                          </p>
                        )}
                        <h3 className="mt-1 text-lg font-semibold leading-snug text-foreground">
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {event.description}
                    </p>

                    <ul className="mt-5 flex flex-col gap-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <MapPin className="size-4 shrink-0 text-primary" />
                        {event.location}
                      </li>
                    </ul>

                    <Link
                      href={`/events/${event.id}`}
                      className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/85 active:scale-95 [&]:mt-6"
                    >
                      View Event
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default HighlightedEvents;