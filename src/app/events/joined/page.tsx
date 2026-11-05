"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, Compass, HeartHandshake, LogIn } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import JoinedEventCard, {
    type JoinedEvent,
} from "@/components/events/joined-event-card";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const primaryButton =
    "inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-pink-500 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-600/15 transition hover:from-pink-600 hover:to-pink-700 active:scale-95";

const JoinedEventsPage = () => {
    const { data: session, isPending } = authClient.useSession();
    const userId = session?.user?.id;

    const [events, setEvents] = useState<JoinedEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        if (isPending) return;

        // Logged out: nothing to fetch
        if (!userId) {
            setLoading(false);
            return;
        }

        let cancelled = false;

        const loadJoinedEvents = async () => {
            setLoading(true);
            setError(null);

            try {
                // Request a fresh token before every call
                const { data } = await authClient.token();
                if (!data?.token) {
                    throw new Error("Could not get an auth token.");
                }

                const response = await fetch(`${API_URL}/my-joined-events`, {
                    headers: { Authorization: `Bearer ${data.token}` },
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error("Could not load your joined events.");
                }

                const body = await response.json();
                if (!cancelled) setEvents(body.events ?? []);
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err instanceof TypeError
                            ? "Could not reach the server. Please try again."
                            : err instanceof Error
                              ? err.message
                              : "Something went wrong.",
                    );
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        loadJoinedEvents();

        return () => {
            cancelled = true;
        };
    }, [userId, isPending, attempt]);

    // Sort by event date, soonest first (YYYY-MM-DD compares correctly as a string)
    const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));

    return (
        <main className="mx-auto w-full max-w-7xl px-5 pb-24 pt-28 sm:px-8 lg:px-12">
            {/* Header */}
            <div className="border-b border-border pb-8">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <HeartHandshake aria-hidden="true" className="size-3.5" />
                    My Volunteer Commitments
                </span>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    Joined Events
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    Every drive you have signed up for, ordered by event date, so you always
                    know what is coming next.
                </p>
            </div>

            {/* Loading */}
            {(isPending || loading) && (
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="h-96 animate-pulse rounded-2xl bg-muted"
                        />
                    ))}
                </div>
            )}

            {/* Logged out */}
            {!isPending && !loading && !userId && (
                <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
                    <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <LogIn aria-hidden="true" className="size-6" />
                    </span>
                    <h2 className="mt-5 text-xl font-semibold text-foreground">
                        Sign in to see your events
                    </h2>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                        Your joined events are tied to your account.
                    </p>
                    <Link href="/signin" className={`mt-6 ${primaryButton}`}>
                        Sign In
                    </Link>
                </div>
            )}

            {/* Error */}
            {!isPending && !loading && userId && error && (
                <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
                    <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <AlertCircle aria-hidden="true" className="size-6" />
                    </span>
                    <h2 className="mt-5 text-xl font-semibold text-foreground">
                        Something went wrong
                    </h2>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                        {error}
                    </p>
                    <button
                        type="button"
                        onClick={() => setAttempt((n) => n + 1)}
                        className={`mt-6 ${primaryButton}`}
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Empty */}
            {!isPending && !loading && userId && !error && sorted.length === 0 && (
                <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
                    <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Compass aria-hidden="true" className="size-6" />
                    </span>
                    <h2 className="mt-5 text-xl font-semibold text-foreground">
                        You haven&apos;t joined any events yet
                    </h2>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                        Browse the upcoming drives and sign up for one that fits your schedule.
                    </p>
                    <Link href="/events" className={`mt-6 ${primaryButton}`}>
                        Browse Upcoming Events
                    </Link>
                </div>
            )}

            {/* List */}
            {!isPending && !loading && userId && !error && sorted.length > 0 && (
                <>
                    <p aria-live="polite" className="mt-6 text-sm text-muted-foreground">
                        You are volunteering at {sorted.length}{" "}
                        {sorted.length === 1 ? "event" : "events"}
                    </p>

                    <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {sorted.map((event) => (
                            <JoinedEventCard key={event.id} event={event} />
                        ))}
                    </div>
                </>
            )}
        </main>
    );
};

export default JoinedEventsPage;