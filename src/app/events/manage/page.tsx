"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { CalendarX, CirclePlus, Settings2 } from "lucide-react";
import type { EventItem } from "@/lib/events";
import ManageEventCard from "@/components/events/manage-event-card";

/* -------------------------------------------------------------------------- */
/*  DEMO DATA: DB connect করার সময় এই পুরো block মুছে দিন                      */
/*  (shape একই EventItem, তাই DB থেকে আসা data সরাসরি বসবে)                     */
/* -------------------------------------------------------------------------- */
const DEMO_EVENTS: EventItem[] = [
    {
        id: "demo-1",
        title: "Winter Clothes Drive – Mirpur 10",
        type: "Winter Relief",
        date: "2026-11-15",
        location: "Mirpur 10, Dhaka",
        thumbnail: "https://picsum.photos/seed/kindred-winter/1200/800",
        description:
            "Collecting and distributing warm jackets, sweaters, and shawls to underprivileged families, rickshaw pullers, and street vendors before the cold peaks.",
        organizerName: "Mirpur Youth Volunteers",
    },
    {
        id: "demo-2",
        title: "Community Blood Donation Camp",
        type: "Health Camp",
        date: "2026-11-22",
        location: "Mohammadpur Town Hall, Dhaka",
        thumbnail: "https://picsum.photos/seed/kindred-blood/1200/800",
        description:
            "A one-day camp with certified medical staff. Healthy adults aged 18 to 60 are welcome. Snacks and a donor card are provided to everyone who donates.",
        organizerName: "Mohammadpur Care Circle",
    },
    {
        id: "demo-3",
        title: "Riverbank Tree Plantation",
        type: "Plantation",
        date: "2026-12-05",
        location: "Buriganga Riverside, Dhaka",
        thumbnail: "https://picsum.photos/seed/kindred-trees/1200/800",
        description:
            "Join us to plant 300 native saplings along the riverbank. Tools and saplings are provided, so just bring water and a pair of gloves.",
        organizerName: "Green Dhaka Youth",
    },
];

const ManagePage = () => {
    // DB: DEMO_EVENTS-এর জায়গায় [] দিন, তারপর useEffect-এ fetch করে setEvents(...) করুন
    const [events, setEvents] = useState<EventItem[]>(DEMO_EVENTS);

    const handleDelete = async (id: string) => {
        // DB: এখানে DELETE API call করুন (ব্যর্থ হলে toast.error দিয়ে return করুন)
        setEvents((prev) => prev.filter((event) => event.id !== id));
        toast.success("Event deleted");
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

                <Link
                    href="/events/create"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-linear-to-r from-pink-500 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-600/15 transition hover:from-pink-600 hover:to-pink-700 active:scale-95"
                >
                    <CirclePlus aria-hidden="true" className="size-4" />
                    Create New Event
                </Link>
            </div>

            {/* Content */}
            {events.length > 0 ? (
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
            ) : (
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
                    <Link
                        href="/events/create"
                        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-pink-500 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-600/15 transition hover:from-pink-600 hover:to-pink-700 active:scale-95"
                    >
                        <CirclePlus aria-hidden="true" className="size-4" />
                        Create New Event
                    </Link>
                </div>
            )}
        </main>
    );
};

export default ManagePage;
