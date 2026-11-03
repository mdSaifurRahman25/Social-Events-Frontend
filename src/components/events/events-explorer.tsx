"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarX, CirclePlus, Search, X } from "lucide-react";
import { EVENT_TYPES, type EventItem } from "@/lib/events";
import EventCard from "@/components/events/event-card";

const ALL = "All";
const FILTERS = [ALL, ...EVENT_TYPES];

const EventsExplorer = ({ events }: { events: EventItem[] }) => {
    const [activeType, setActiveType] = useState<string>(ALL);
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();

        return events.filter((event) => {
            if (activeType !== ALL && event.type !== activeType) return false;
            if (!q) return true;

            return [event.title, event.location, event.description, event.organizerName]
                .join(" ")
                .toLowerCase()
                .includes(q);
        });
    }, [events, activeType, query]);

    const resetFilters = () => {
        setActiveType(ALL);
        setQuery("");
    };

    /* ----- No upcoming Event ----- */
    if (events.length === 0) {
        return (
            <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CalendarX aria-hidden="true" className="size-6" />
                </span>
                <h2 className="mt-5 text-xl font-semibold text-foreground">
                    No upcoming events yet
                </h2>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Be the first to organize a drive in your area. Past events are hidden
                    automatically.
                </p>
                <Link
                    href="/events/create"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-pink-500 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-600/15 transition hover:from-pink-600 hover:to-pink-700 active:scale-95"
                >
                    <CirclePlus aria-hidden="true" className="size-4" />
                    Create Event
                </Link>
            </div>
        );
    }

    return (
        <div className="mt-8">
            {/* Toolbar: type filter + search */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by event type">
                    {FILTERS.map((type) => {
                        const active = activeType === type;
                        return (
                            <button
                                key={type}
                                type="button"
                                aria-pressed={active}
                                onClick={() => setActiveType(type)}
                                className={
                                    active
                                        ? "rounded-full border border-transparent bg-linear-to-r from-pink-500 to-pink-600 px-4 py-1.5 text-sm font-medium text-white shadow-md shadow-pink-600/15"
                                        : "rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground transition hover:border-primary/50 hover:text-primary"
                                }
                            >
                                {type}
                            </button>
                        );
                    })}
                </div>

                <div className="relative w-full lg:max-w-xs">
                    <Search
                        aria-hidden="true"
                        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by title or area"
                        aria-label="Search events"
                        className="w-full rounded-xl border border-border bg-muted/40 py-3 pl-11 pr-10 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery("")}
                            aria-label="Clear search"
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition hover:text-foreground"
                        >
                            <X aria-hidden="true" className="size-4" />
                        </button>
                    )}
                </div>
            </div>

            <p aria-live="polite" className="mt-5 text-sm text-muted-foreground">
                Showing {filtered.length} of {events.length}{" "}
                {events.length === 1 ? "event" : "events"}
            </p>

            {/* Grid / no-match state */}
            {filtered.length > 0 ? (
                <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            ) : (
                <div className="mt-5 flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-14 text-center">
                    <h2 className="text-lg font-semibold text-foreground">
                        No events match your search
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Try a different keyword or event type.
                    </p>
                    <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-5 inline-flex items-center justify-center rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/50 hover:bg-muted hover:text-primary active:scale-95"
                    >
                        Reset filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default EventsExplorer;