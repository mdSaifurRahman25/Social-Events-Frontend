import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CircleAlert, SearchX, TriangleAlert } from "lucide-react";
import EventDetails, {
    type EventDetailsData,
} from "@/components/events/event-details";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const metadata: Metadata = {
    title: "Event details | Kindred",
};

type PageProps = {
    params: Promise<{ id: string }>;
};

type StateMessageProps = {
    icon: "invalid" | "missing" | "error";
    title: string;
    description: string;
};

const ICONS = {
    invalid: CircleAlert,
    missing: SearchX,
    error: TriangleAlert,
};

const StateMessage = ({ icon, title, description }: StateMessageProps) => {
    const Icon = ICONS[icon];

    return (
        <div
            role="alert"
            className="flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-16 text-center shadow-sm"
        >
            <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon aria-hidden="true" className="size-7" />
            </span>
            <h1 className="mt-5 text-xl font-semibold text-foreground">{title}</h1>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {description}
            </p>
            <Link
                href="/events"
                className="mt-6 inline-flex items-center rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition hover:border-primary/50 hover:text-primary"
            >
                Browse upcoming events
            </Link>
        </div>
    );
};

const EventContent = async ({ params }: PageProps) => {
    const { id } = await params;

    const jwtToken = await auth.api.getToken({
        headers: await headers(),
    });

    let response: Response;

    try {
        response = await fetch(`${API_URL}/events/${encodeURIComponent(id)}`, {
            headers: {
                authorization: `Bearer ${jwtToken?.token}`,
            },
            cache: "no-store",
        });
    } catch {
        return (
            <StateMessage
                icon="error"
                title="Can't reach the server"
                description="We couldn't load this event right now. Please check your connection and try again."
            />
        );
    }

    if (response.status === 400) {
        return (
            <StateMessage
                icon="invalid"
                title="Invalid event ID"
                description="The link you followed doesn't point to a valid event. Check the address and try again."
            />
        );
    }

    if (response.status === 404) {
        return (
            <StateMessage
                icon="missing"
                title="Event not found"
                description="This event doesn't exist or may have been removed."
            />
        );
    }

    if (!response.ok) {
        return (
            <StateMessage
                icon="error"
                title="Couldn't load this event"
                description="The server ran into a problem. Please try again in a moment."
            />
        );
    }

    let result: Record<string, unknown> | null = null;

    try {
        const body = await response.json();
        result = body?.result ?? null;
    } catch {
        result = null;
    }

    if (!result || !result._id) {
        return (
            <StateMessage
                icon="missing"
                title="No event data"
                description="The server didn't return any details for this event."
            />
        );
    }

    const event = { ...result, id: String(result._id) } as EventDetailsData;

    return <EventDetails key={event.id} event={event} />;
};

const SingleEventDetailsPage = ({ params }: PageProps) => {
    return (
        <main className="mx-auto w-full max-w-4xl px-5 pb-20 pt-28 sm:px-8">
            <Link
                href="/events"
                className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
            >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Back to Upcoming Events
            </Link>

            <Suspense
                fallback={<div className="h-96 animate-pulse rounded-2xl bg-muted" />}
            >
                <EventContent params={params} />
            </Suspense>
        </main>
    );
};

export default SingleEventDetailsPage;