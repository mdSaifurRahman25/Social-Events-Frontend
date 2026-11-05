import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EditEventForm from "@/components/events/edit-event-form";

export const metadata: Metadata = {
    title: "Edit event | Kindred",
};

type PageProps = {
    params: Promise<{ id: string }>;
};

const EditContent = async ({ params }: PageProps) => {
    const { id } = await params;

    return <EditEventForm id={id} />;
};

const EditEventPage = ({ params }: PageProps) => {
    return (
        <main className="mx-auto w-full max-w-2xl px-5 pb-20 pt-28 sm:px-8">
            <Link
                href="/events/manage"
                className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
            >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Back to Manage Events
            </Link>

            <Suspense
                fallback={<div className="h-96 animate-pulse rounded-2xl bg-muted" />}
            >
                <EditContent params={params} />
            </Suspense>
        </main>
    );
};

export default EditEventPage;