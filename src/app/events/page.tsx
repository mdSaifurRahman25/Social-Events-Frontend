import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, CirclePlus, TriangleAlert } from "lucide-react";
import { getUpcomingEvents, type EventItem } from "@/lib/events";
import EventsExplorer from "@/components/events/events-explorer";

export const metadata: Metadata = {
    title: "Upcoming Events | Kindred",
    description:
        "Find a community drive near you. Events that have already passed are hidden automatically.",
};


const EventsContent = async () => {
    let events: EventItem[] = [];
    let failed = false;

    try {
        events = await getUpcomingEvents();
    } catch (error) {
        console.error(error);
        failed = true;
    }

    if (failed) {
        return (
            <div
                role="alert"
                className="mt-10 flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-5"
            >
                <TriangleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-destructive" />
                <div>
                    <h2 className="text-base font-semibold text-foreground">
                        Couldn&apos;t load events
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Check that the backend is running and the API URL is correct, then
                        refresh the page.
                    </p>
                </div>
            </div>
        );
    }

    return <EventsExplorer events={events} />;
};


const EventsSkeleton = () => (
    <div className="mt-8" aria-busy="true" aria-label="Loading events">
        <div className="h-10 w-full max-w-md animate-pulse rounded-full bg-muted" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-border">
                    <div className="h-52 animate-pulse bg-muted" />
                    <div className="space-y-3 p-5">
                        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                        <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);


const EventsPage = () => {
    return (
        <main className="mx-auto w-full max-w-7xl px-5 pb-24 pt-28 sm:px-8 lg:px-12">
            {/* Header */}
            <div className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        <CalendarDays aria-hidden="true" className="size-3.5" />
                        Happening soon
                    </span>
                    <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        Upcoming Events
                    </h1>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                        Find a drive near you and show up. Events that have already passed are
                        hidden automatically, so everything here still needs a hand.
                    </p>
                </div>

                <Link
                    href="/events/create"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-linear-to-r from-pink-500 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-600/15 transition hover:from-pink-600 hover:to-pink-700 active:scale-95"
                >
                    <CirclePlus aria-hidden="true" className="size-4" />
                    Create Event
                </Link>
            </div>

            {/* Content */}
            <Suspense fallback={<EventsSkeleton />}>
                <EventsContent />
            </Suspense>
        </main>
    );
};

export default EventsPage;