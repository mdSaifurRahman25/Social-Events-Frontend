import Link from "next/link";
import { format, isValid, parseISO } from "date-fns";
import {
    ArrowRight,
    CalendarCheck,
    CircleCheck,
    MapPin,
    Tag,
} from "lucide-react";
import type { EventItem } from "@/lib/events";

export type JoinedEvent = EventItem & {
    joinedAt: string; // ইউজার যেদিন join করেছে, YYYY-MM-DD
};

const JoinedEventCard = ({ event }: { event: JoinedEvent }) => {
    const date = parseISO(event.date);
    const joinedDate = parseISO(event.joinedAt);

    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-pink-600/5">
            {/* Image + badges */}
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                {event.thumbnail && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={event.thumbnail}
                        alt={event.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="size-full object-cover transition duration-500 group-hover:scale-105"
                    />
                )}

                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-background/85 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
                    <Tag aria-hidden="true" className="size-3" />
                    {event.type}
                </span>

                {isValid(date) && (
                    <time
                        dateTime={event.date}
                        aria-label={format(date, "EEEE, MMMM d, yyyy")}
                        className="absolute bottom-3 right-3 flex min-w-12 flex-col items-center rounded-xl border border-border bg-background/90 px-3 py-1.5 backdrop-blur"
                    >
                        <span className="text-xs font-medium text-primary">
                            {format(date, "MMM")}
                        </span>
                        <span className="text-lg font-semibold leading-tight text-foreground">
                            {format(date, "d")}
                        </span>
                    </time>
                )}
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-1 text-lg font-semibold text-foreground">
                    {event.title}
                </h3>

                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin aria-hidden="true" className="size-3.5 shrink-0 text-primary" />
                    <span className="truncate">{event.location}</span>
                </p>

                <p className="mt-3 flex items-start gap-1.5 text-sm leading-relaxed text-muted-foreground">
                    <CircleCheck
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-emerald-500"
                    />
                    You are a confirmed volunteer for this drive.
                </p>

                <div className="mt-auto pt-5">
                    {isValid(joinedDate) && (
                        <p className="mb-4 flex items-center gap-1.5 border-t border-border pt-4 text-xs font-medium text-primary">
                            <CalendarCheck aria-hidden="true" className="size-3.5" />
                            Joined {format(joinedDate, "EEE, MMM d, yyyy")}
                        </p>
                    )}

                    <Link
                        href={`/events/${event.id}`}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 active:scale-95"
                    >
                        View Event
                        <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default JoinedEventCard;