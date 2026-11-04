import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EventDetails, {
    type EventDetailsData,
} from "@/components/events/event-details";

export const metadata: Metadata = {
    title: "Event details | Kindred",
};

/* -------------------------------------------------------------------------- */
/*  DEMO DATA: DB connect করার সময় এই block মুছে দিন                            */
/* -------------------------------------------------------------------------- */
const DEMO_EVENT: EventDetailsData = {
    id: "demo-1",
    title: "Winter Clothes Distribution",
    type: "Winter Relief",
    date: "2026-11-15",
    location: "Mirpur 10, Dhaka",
    thumbnail: "https://picsum.photos/seed/kindred-winter-detail/1600/900",
    description:
        "Collecting and distributing warm jackets, sweaters, and shawls to underprivileged families, rickshaw pullers, and children facing a harsh winter.\n\nWe need volunteers to sort donations, pack bundles, and hand them out in the neighbourhood. No experience is needed, just a willingness to help.",
    organizerName: "Mirpur Youth Volunteers",
    organizerEmail: "organizer@example.com",
    volunteersJoined: 0,
    joinedByMe: false,
};

type PageProps = {
    params: Promise<{ id: string }>;
};

// params আর ডেটা আনার কাজ এখানে, <Suspense>-এর ভেতরে চলে
const EventContent = async ({ params }: PageProps) => {
    const { id } = await params;

    // DB: এখানে id দিয়ে event fetch করুন, না পেলে notFound() ডাকুন।
    // এই লাইনটা বদলে fetch-এর ফলাফল বসান।
    const event: EventDetailsData = { ...DEMO_EVENT, id };

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

            <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-muted" />}>
                <EventContent params={params} />
            </Suspense>
        </main>
    );
};

export default SingleEventDetailsPage;
