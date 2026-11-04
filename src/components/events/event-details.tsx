"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format, isValid, parseISO } from "date-fns";
import {
    BadgeCheck,
    Calendar as CalendarIcon,
    CircleCheck,
    Heart,
    LoaderCircle,
    Mail,
    MapPin,
    Share2,
    Tag,
    Users,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import type { EventItem } from "@/lib/events";

// Organizer and volunteer fields are optional: the backend may not send them yet.
export type EventDetailsData = Omit<EventItem, "organizerName"> & {
    organizerName?: string;
    organizerEmail?: string;
    volunteersJoined?: number;
    joinedByMe?: boolean;
};

const EventDetails = ({ event }: { event: EventDetailsData }) => {
    const router = useRouter();
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const user = session?.user;

    const [joined, setJoined] = useState(event.joinedByMe ?? false);
    // null means the server did not send a volunteer count
    const [count, setCount] = useState<number | null>(
        typeof event.volunteersJoined === "number" ? event.volunteersJoined : null
    );
    const [pending, setPending] = useState(false);

    const date = event.date ? parseISO(event.date) : null;
    const hasDate = date !== null && isValid(date);

    const handleToggleJoin = async () => {
        if (!user) {
            toast.error("Please sign in to join this event.");
            router.push("/signin");
            return;
        }
        if (pending) return;

        const nextJoined = !joined;
        setPending(true);

        try {
            // DB: এখানে join / leave API call করুন (JWT সহ)। ব্যর্থ হলে throw করুন।
            // nextJoined === true  -> join, false -> leave

            setJoined(nextJoined);
            setCount((c) => (c === null ? c : Math.max(0, c + (nextJoined ? 1 : -1))));

            if (nextJoined) {
                toast.success("You've joined this event. Thanks for showing up for your community!");
            } else {
                toast("You've left this event.");
            }
        } catch {
            toast.error("Something went wrong. Please try again.");
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
                {/* Join bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-muted/40 p-4">
                    <div className="flex items-center gap-3">
                        <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Users aria-hidden="true" className="size-5" />
                        </span>
                        <div>
                            <p aria-live="polite" className="text-sm font-semibold text-foreground">
                                {count === null
                                    ? "Volunteer count not available"
                                    : `${count} ${count === 1 ? "Volunteer" : "Volunteers"} Joined`}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {joined
                                    ? "You are confirmed for this drive"
                                    : ""}
                            </p>
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
                            disabled={pending || sessionPending}
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
                            {joined ? "Joined (Click to Leave)" : "Join Event"}
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