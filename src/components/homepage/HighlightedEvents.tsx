import Image from "next/image";
import Link from "next/link";
import type { HighlightedEvent } from "@/lib/demo-events";

const monthFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "UTC",
});

const dayFormatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    timeZone: "UTC",
});

type HighlightedEventsProps = {
    events: HighlightedEvent[];
};

const HighlightedEvents = ({ events }: HighlightedEventsProps) => {
    return (
        <section className="mx-auto w-full max-w-7xl px-6 py-16 md:py-20">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="flex flex-col gap-3">
                    <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                        Recent <span className="text-primary">Upcoming Events</span>
                    </h2>
                    <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                        Join the latest six community drives happening across the city.
                    </p>
                </div>

                <Link
                    href="/events"
                    className="inline-flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-primary transition hover:opacity-80 md:self-auto"
                >
                    View All Events
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => {
                    const date = new Date(event.date);

                    return (
                        <li
                            key={event.id}
                            className={`flex flex-col overflow-hidden rounded-2xl border border-border shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md ${event.tone}`}
                        >
                            <div className="relative aspect-4/3 w-full overflow-hidden">
                                <Image
                                    src={event.image.src}
                                    alt={event.image.alt}
                                    fill
                                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-cover"
                                />
                                <div className="absolute left-4 top-4 flex flex-col items-center rounded-xl bg-background/90 px-3 py-2 text-center text-foreground shadow-md backdrop-blur">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                                        {monthFormatter.format(date)}
                                    </span>
                                    <span className="text-xl font-semibold leading-none">
                                        {dayFormatter.format(date)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col gap-3 p-6">
                                <h3 className="text-lg font-semibold text-foreground">
                                    {event.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {event.description}
                                </p>

                                <p className="mt-auto flex items-center gap-2 pt-2 text-sm text-muted-foreground">
                                    <svg
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="size-4 shrink-0 text-primary"
                                    >
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    {event.location}
                                </p>

                                <Link
                                    href="/events"
                                    className="mt-2 inline-flex items-center justify-center rounded-full bg-linear-to-r from-pink-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-600/15 transition hover:opacity-90 active:scale-95"
                                >
                                    View Event
                                </Link>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default HighlightedEvents;
