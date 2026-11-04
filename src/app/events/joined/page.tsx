"use client";

import Link from "next/link";
import { Compass, HeartHandshake } from "lucide-react";
import JoinedEventCard, {
    type JoinedEvent,
} from "@/components/events/joined-event-card";

/* -------------------------------------------------------------------------- */
/*  DEMO DATA: DB connect করার সময় এই পুরো block মুছে দিন                       */
/*  (joinedAt = ইউজার যেদিন join করেছে, YYYY-MM-DD)                              */
/* -------------------------------------------------------------------------- */
const DEMO_JOINED_EVENTS: JoinedEvent[] = [
    {
        id: "demo-1",
        title: "Winter Clothes Distribution",
        type: "Winter Relief",
        date: "2026-11-15",
        location: "Mirpur 10, Dhaka",
        thumbnail: "https://picsum.photos/seed/kindred-joined-1/1200/800",
        description:
            "Collecting and distributing warm jackets, sweaters, and shawls to underprivileged families.",
        organizerName: "Mirpur Youth Volunteers",
        joinedAt: "2026-10-28",
    },
    {
        id: "demo-2",
        title: "Community Blood Donation Camp",
        type: "Health Camp",
        date: "2026-11-22",
        location: "Mohammadpur Town Hall, Dhaka",
        thumbnail: "https://picsum.photos/seed/kindred-joined-2/1200/800",
        description:
            "A one-day camp with certified medical staff. Healthy adults aged 18 to 60 are welcome.",
        organizerName: "Mohammadpur Care Circle",
        joinedAt: "2026-11-01",
    },
    {
        id: "demo-3",
        title: "Riverbank Tree Plantation",
        type: "Plantation",
        date: "2026-12-05",
        location: "Buriganga Riverside, Dhaka",
        thumbnail: "https://picsum.photos/seed/kindred-joined-3/1200/800",
        description:
            "Join us to plant 300 native saplings along the riverbank. Tools and saplings are provided.",
        organizerName: "Green Dhaka Youth",
        joinedAt: "2026-11-03",
    },
];

const JoinedEventsPage = () => {
    // DB: এই লাইনটা বদলে useState<JoinedEvent[]>([]) + useEffect-এ fetch করে set করুন
    const events = DEMO_JOINED_EVENTS;

    // event-এর তারিখ অনুযায়ী আগে-পরে সাজানো (YYYY-MM-DD string তুলনাতেই ঠিক চলে)
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

            {/* Content */}
            {sorted.length > 0 ? (
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
            ) : (
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
                    <Link
                        href="/events"
                        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-pink-500 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-600/15 transition hover:from-pink-600 hover:to-pink-700 active:scale-95"
                    >
                        Browse Upcoming Events
                    </Link>
                </div>
            )}
        </main>
    );
};

export default JoinedEventsPage;