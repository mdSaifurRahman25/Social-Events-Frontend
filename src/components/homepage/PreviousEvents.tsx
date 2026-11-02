import Image from "next/image";
import type { PreviousEvent } from "@/lib/demo-previous-events";

type PreviousEventsProps = {
    events: PreviousEvent[];
};

const PreviousEvents = ({ events }: PreviousEventsProps) => {
    return (
        <section className="mx-auto w-full max-w-7xl px-6 py-16 md:py-20">
            <div className="flex flex-col gap-3">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                    Community in <span className="text-primary">Action</span>
                </h2>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                    Moments from volunteer drives, relief distributions, and green initiatives across Dhaka and beyond.
                </p>
            </div>

            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                    <li
                        key={event.id}
                        className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                    >
                        <div className="relative aspect-4/3 w-full overflow-hidden">
                            <Image
                                src={event.image.src}
                                alt={event.image.alt}
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                className="object-cover"
                            />
                        </div>

                        <div className="flex flex-col gap-1 p-5">
                            <h3 className="text-base font-semibold text-green-500">
                                {event.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{event.location}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default PreviousEvents;
