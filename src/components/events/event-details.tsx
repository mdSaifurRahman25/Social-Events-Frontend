"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { differenceInCalendarDays, format, isValid, parseISO } from "date-fns";
import {
    BadgeCheck,
    Calendar as CalendarIcon,
    CalendarClock,
    CircleCheck,
    Heart,
    LoaderCircle,
    Mail,
    MapPin,
    Share2,
    Tag,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import type { EventItem } from "@/lib/events";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// Organizer fields are optional: older events may not have them.
export type EventDetailsData = Omit<EventItem, "organizerName"> & {
    organizerId?: string;
    organizerName?: string;
    organizerEmail?: string;
    joinedByMe?: boolean;
};

// Timing label computed from the real event date
const getTimingLabel = (days: number | null) => {
    if (days === null) return "Date not available";
    if (days < 0) return "This event has ended";
    if (days === 0) return "Happening today";
    if (days === 1) return "Starts tomorrow";
    return `Starts in ${days} days`;
};

const EventDetails = ({ event }: { event: EventDetailsData }) => {
    const router = useRouter();
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const user = session?.user;

    const [joined, setJoined] = useState(event.joinedByMe ?? false);
    const [pending, setPending] = useState(false);

    const date = event.date ? parseISO(event.date) : null;
    const hasDate = date !== null && isValid(date);

    // Days until the event (negative once it has passed)
    const daysLeft = hasDate && date ? differenceInCalendarDays(date, new Date()) : null;
    const ended = daysLeft !== null && daysLeft < 0;

    const statusLine = ended
        ? "Joining is closed for this event"
        : !user
          ? "Sign in to join this drive"
          : joined
            ? "You are confirmed for this drive"
            : "Join to lend a hand at this drive";

    const handleToggleJoin = async () => {
        if (ended) return;

        if (!user) {
            toast.error("Please sign in to join this event.");
            router.push("/signin");
            return;
        }
        if (pending) return;

        const nextJoined = !joined;
        setPending(true);

        try {
            // Request a fresh token before every call
            const { data } = await authClient.token();
            if (!data?.token) {
                throw new Error("Could not get an auth token.");
            }

            // true -> join (POST), false -> leave (DELETE)
            const response = await fetch(
                `${API_URL}/events/${encodeURIComponent(event.id)}/join`,
                {
                    method: nextJoined ? "POST" : "DELETE",
                    headers: { Authorization: `Bearer ${data.token}` },
                },
            );

            if (!response.ok) {
                const body = await response.json().catch(() => null);
                throw new Error(body?.message ?? "Request failed.");
            }

            setJoined(nextJoined);

            if (nextJoined) {
                toast.success("You've joined this event. Thanks for showing up for your community!");
            } else {
                toast("You've left this event.");
            }
        } catch (err) {
            toast.error(
                err instanceof TypeError
                    ? "Could not reach the server. Please try again."
                    : err instanceof Error
                      ? err.message
                      : "Something went wrong. Please try again.",
            );
        } finally {
            setPending(false);
        }
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard");
        } catch {
            toast.error("Couldn't copy the link.");
        }
    };

    const organizerName = event.organizerName?.trim();
    const organizerEmail = event.organizerEmail?.trim();

    return (
        <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            {/* Hero */}
            <div className="relative h-64 overflow-hidden bg-linear-to-br from-pink-900 to-pink-950 sm:h-80">
                {event.thumbnail && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={event.thumbnail}
                        alt={event.title}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 size-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />

                {event.type && (
                    <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-background/85 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
                        <Tag aria-hidden="true" className="size-3" />
                        {event.type}
                    </span>
                )}

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                    <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        {event.title}
                    </h1>
                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/85">
                        {event.location && (
                            <span className="inline-flex items-center gap-1.5">
                                <MapPin aria-hidden="true" className="size-4 text-pink-300" />
                                {event.location}
                            </span>
                        )}
                        {hasDate && date && (
                            <span className="inline-flex items-center gap-1.5">
                                <CalendarIcon aria-hidden="true" className="size-4 text-pink-300" />
                                <time dateTime={event.date}>{format(date, "EEE, MMM d, yyyy")}</time>
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-8 p-5 sm:p-8">
                {/* Status + join bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-muted/40 p-4">
                    <div className="flex items-center gap-3">
                        <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <CalendarClock aria-hidden="true" className="size-5" />
                        </span>
                        <div>
                            {/* Depends on today's date, so server and browser may differ slightly */}
                            <p
                                suppressHydrationWarning
                                aria-live="polite"
                                className="text-sm font-semibold text-foreground"
                            >
                                {getTimingLabel(daysLeft)}
                            </p>
                            <p className="text-xs text-muted-foreground">{statusLine}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handleShare}
                            aria-label="Copy event link"
                            className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-primary/50 hover:text-primary active:scale-95"
                        >
                            <Share2 aria-hidden="true" className="size-4" />
                        </button>

                        <button
                            type="button"
                            onClick={handleToggleJoin}
                            disabled={pending || sessionPending || ended}
                            aria-pressed={joined}
                            className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 ${
                                joined
                                    ? "bg-emerald-600 shadow-emerald-600/20 hover:bg-emerald-700"
                                    : "bg-linear-to-r from-pink-500 to-pink-600 shadow-pink-600/15 hover:from-pink-600 hover:to-pink-700"
                            }`}
                        >
                            {pending ? (
                                <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                            ) : joined ? (
                                <CircleCheck aria-hidden="true" className="size-4" />
                            ) : (
                                <Heart aria-hidden="true" className="size-4" />
                            )}
                            {ended ? "Event ended" : joined ? "Joined (Click to Leave)" : "Join Event"}
                        </button>
                    </div>
                </div>

                {/* Details + organizer */}
                <div className="grid gap-8 lg:grid-cols-[1fr_18rem]">
                    <div>
                        <h2 className="text-xl font-semibold text-foreground">
                            About this Social Initiative
                        </h2>
                        {event.description ? (
                            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                                {event.description}
                            </p>
                        ) : (
                            <p className="mt-3 text-sm text-muted-foreground">
                                No description has been added for this event.
                            </p>
                        )}
                    </div>

                    <aside className="h-fit rounded-2xl border border-border p-5">
                        <p className="text-xs font-semibold text-muted-foreground">
                            Initiative organizer
                        </p>

                        {organizerName ? (
                            <>
                                <div className="mt-4 flex items-center gap-3">
                                    <span
                                        aria-hidden="true"
                                        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-pink-500 to-purple-600 text-lg font-semibold text-white"
                                    >
                                        {organizerName.charAt(0).toUpperCase()}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-foreground">
                                            {organizerName}
                                        </p>
                                        {organizerEmail && (
                                            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                                                <Mail aria-hidden="true" className="size-3 shrink-0" />
                                                <span className="truncate">{organizerEmail}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <p className="mt-5 flex items-center gap-1.5 border-t border-border pt-4 text-xs text-muted-foreground">
                                    <BadgeCheck aria-hidden="true" className="size-4 text-primary" />
                                    Kindred community organizer
                                </p>
                            </>
                        ) : (
                            <p className="mt-4 text-sm text-muted-foreground">
                                Organizer details are not available for this event.
                            </p>
                        )}
                    </aside>
                </div>
            </div>
        </article>
    );
};

export default EventDetails;