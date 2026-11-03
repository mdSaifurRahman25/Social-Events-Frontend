import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CreateEventForm from "@/components/events/create-event-form";

export const metadata: Metadata = {
    title: "Create an event | Kindred",
    description:
        "Organize a local relief effort, environmental cleanup, or community support drive.",
};

const CreateEventsPage = () => {
    return (
        <main className="mx-auto w-full max-w-2xl px-5 pb-20 pt-28 sm:px-8">
            <Link
                href="/events"
                className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
            >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Back to Upcoming Events
            </Link>

            <CreateEventForm />
        </main>
    );
};

export default CreateEventsPage;
