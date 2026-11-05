"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { CalendarX, CirclePlus, Settings2, TriangleAlert } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import type { EventItem } from "@/lib/events";
import ManageEventCard from "@/components/events/manage-event-card";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type LoadStatus = "loading" | "ready" | "error";

const createButtonClass =
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-linear-to-r from-pink-500 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-600/15 transition hover:from-pink-600 hover:to-pink-700 active:scale-95";

const ManagePage = () => {
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const userId = session?.user?.id;

    const [events, setEvents] = useState<EventItem[]>([]);
    const [status, setStatus] = useState<LoadStatus>("loading");
    const [reloadKey, setReloadKey] = useState(0);

    // Load the events created by the logged-in user
    useEffect(() => {
        if (!userId) return;

        const controller = new AbortController();

        const loadEvents = async () => {
            try {
                // Fresh JWT for the Express backend
                const { data: tokenData } = await authClient.token();
                if (!tokenData?.token) {
                    throw new Error("Missing token.");
                }

                const res = await fetch(`${API_URL}/my-events`, {
                    cache: "no-store",
                    headers: { Authorization: `Bearer ${tokenData.token}` },
                    signal: controller.signal,
                });

                if (!res.ok) {
                    throw new Error("Failed to load events.");
                }

                const body = await res.json();
                setEvents(Array.isArray(body.events) ? body.events : []);
                setStatus("ready");
            } catch {
                // Ignore errors caused by the effect being cleaned up
                if (controller.signal.aborted) return;
                setStatus("error");
            }
        };

        loadEvents();

        return () => controller.abort();
    }, [userId, reloadKey]);

    const handleRetry = () => {
        setStatus("loading");
        setReloadKey((key) => key + 1);
    };

    const handleDelete = async (id: string) => {
        if (!userId) return;

        try {
            // Fresh JWT for the Express backend
            const { data: tokenData } = await authClient.token();
            if (!tokenData?.token) {
                throw new Error("Your session has expired. Please sign in again.");
            }

            const res = await fetch(`${API_URL}/events/${encodeURIComponent(id)}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${tokenData.token}` },
            });

            if (!res.ok) {
                const body = await res.json().catch(() => null);
                throw new Error(body?.message ?? "Could not delete the event.");
            }

            setEvents((prev) => prev.filter((event) => event.id !== id));
            toast.success("Event deleted");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Something went wrong.");
        }
    };

    const renderContent = () => {
        // Waiting for the session, or for the first fetch to finish
        if (sessionPending || (userId && status === "loading")) {
            return (
                <div
                    aria-hidden="true"
                    className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {[0, 1, 2].map((n) => (
                        <div key={n} className="h-80 animate-pulse rounded-2xl bg-muted" />
                    ))}
                </div>
            );
        }

        // Logged out
        if (!userId) {
            return (
                <div className="mt-10 flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-16 text-center">
                    <h2 className="text-xl font-semibold text-foreground">
                        Sign in to manage your events
                    </h2>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                        Your published events are linked to your account.
                    </p>
                    <Link href="/signin" className={`mt-6 ${createButtonClass}`}>
                        Login
                    </Link>
                </div>
            );
        }

        // Request failed
        if (status === "error") {
            return (
                <div
                    role="alert"
                    className="mt-10 flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-16 text-center"
                >
                    <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <TriangleAlert aria-hidden="true" className="size-6" />
                    </span>
                    <h2 className="mt-5 text-xl font-semibold text-foreground">
                        Couldn&apos;t load your events
                    </h2>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                        Something went wrong while contacting the server. Please try again.
                    </p>
                    <button
                        type="button"
                        onClick={handleRetry}
                        className="mt-6 inline-flex items-center rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition hover:border-primary/50 hover:text-primary"
                    >
                        Try again
                    </button>
                </div>
            );
        }

        // Loaded, but the user has no events
        if (events.length === 0) {
            return (
                <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
                    <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CalendarX aria-hidden="true" className="size-6" />
                    </span>
                    <h2 className="mt-5 text-xl font-semibold text-foreground">
                        You haven&apos;t published any events yet
                    </h2>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                        Start your first drive and it will show up here, ready to edit anytime.
                    </p>
                    <Link href="/events/create" className={`mt-6 ${createButtonClass}`}>
                        <CirclePlus aria-hidden="true" className="size-4" />
                        Create New Event
                    </Link>
                </div>
            );
        }

        return (
            <>
                <p aria-live="polite" className="mt-6 text-sm text-muted-foreground">
                    {events.length} {events.length === 1 ? "event" : "events"} published
                </p>

                <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <ManageEventCard
                            key={event.id}
                            event={event}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </>
        );
    };

    return (
        <main className="mx-auto w-full max-w-7xl px-5 pb-24 pt-28 sm:px-8 lg:px-12">
            {/* Header */}
            <div className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        <Settings2 aria-hidden="true" className="size-3.5" />
                        Organizer Dashboard
                    </span>
                    <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        Manage My Events
                    </h1>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                        Review, edit, or remove the drives you have published. Only you can
                        change the events you created.
                    </p>
                </div>

                <Link href="/events/create" className={createButtonClass}>
                    <CirclePlus aria-hidden="true" className="size-4" />
                    Create New Event
                </Link>
            </div>

            {renderContent()}
        </main>
    );
};

export default ManagePage;