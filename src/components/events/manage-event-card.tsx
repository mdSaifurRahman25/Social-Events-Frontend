"use client";

import { useState } from "react";
import Link from "next/link";
import { format, isValid, parseISO } from "date-fns";
import { LoaderCircle, MapPin, SquarePen, Tag, Trash2, User } from "lucide-react";
import type { EventItem } from "@/lib/events";

type ManageEventCardProps = {
    event: EventItem;
    onDelete: (id: string) => void | Promise<void>;
};

const ManageEventCard = ({ event, onDelete }: ManageEventCardProps) => {
    const [confirming, setConfirming] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const date = parseISO(event.date);
    const hasDate = isValid(date);

    const handleConfirmDelete = async () => {
        setDeleting(true);
        try {
            await onDelete(event.id);
        } finally {
            setDeleting(false);
            setConfirming(false);
        }
    };

    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-pink-600/5">
            {/* Image + badges */}
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                {event.thumbnail && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={event.thumbnail}
                        alt={event.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="size-full object-cover transition duration-500 group-hover:scale-105"
                    />
                )}

                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-background/85 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
                    <Tag aria-hidden="true" className="size-3" />
                    {event.type}
                </span>

                {hasDate && (
                    <time
                        dateTime={event.date}
                        aria-label={format(date, "EEEE, MMMM d, yyyy")}
                        className="absolute bottom-3 right-3 flex min-w-12 flex-col items-center rounded-xl border border-border bg-background/90 px-3 py-1.5 backdrop-blur"
                    >
                        <span className="text-xs font-medium text-primary">
                            {format(date, "MMM")}
                        </span>
                        <span className="text-lg font-semibold leading-tight text-foreground">
                            {format(date, "d")}
                        </span>
                    </time>
                )}
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-1 text-lg font-semibold text-foreground">
                    {event.title}
                </h3>

                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin aria-hidden="true" className="size-3.5 shrink-0 text-primary" />
                    <span className="truncate">{event.location}</span>
                </p>

                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                </p>

                <div className="mt-auto pt-5">
                    <p className="mb-4 flex items-center gap-1.5 border-t border-border pt-4 text-xs text-muted-foreground">
                        <User aria-hidden="true" className="size-3.5 shrink-0" />
                        <span className="truncate">{event.organizerName}</span>
                    </p>

                    {confirming ? (
                        <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-medium text-foreground">
                                Delete this event?
                            </p>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setConfirming(false)}
                                    disabled={deleting}
                                    className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleConfirmDelete}
                                    disabled={deleting}
                                    className="inline-flex items-center gap-1.5 rounded-full bg-destructive px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {deleting && (
                                        <LoaderCircle
                                            aria-hidden="true"
                                            className="size-3.5 animate-spin"
                                        />
                                    )}
                                    Yes, delete
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link
                                href={`/events/${event.id}`}
                                className="inline-flex flex-1 items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/50 hover:bg-muted hover:text-primary active:scale-95"
                            >
                                View
                            </Link>

                            <Link
                                href={`/events/${event.id}/edit`}
                                aria-label={`Edit ${event.title}`}
                                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-600 transition hover:bg-purple-500/20 active:scale-95 dark:text-purple-300"
                            >
                                <SquarePen aria-hidden="true" className="size-3.5" />
                                Edit
                            </Link>

                            <button
                                type="button"
                                onClick={() => setConfirming(true)}
                                aria-label={`Delete ${event.title}`}
                                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive transition hover:bg-destructive/20 active:scale-95"
                            >
                                <Trash2 aria-hidden="true" className="size-3.5" />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};

export default ManageEventCard;
