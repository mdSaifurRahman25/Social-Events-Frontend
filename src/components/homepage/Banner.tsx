import Link from "next/link";

const stats = [
    { value: "1,450+", label: "Active Volunteers", tone: "text-primary" },
    { value: "180+", label: "Events Completed", tone: "text-accent" },
    { value: "24,000+", label: "Lives Impacted", tone: "text-primary" },
    { value: "100%", label: "Community Driven", tone: "text-accent" },
];

const Banner = () => {
    return (
        <section className="flex w-full flex-col items-center gap-10 px-6 pb-16 text-center md:pb-20">
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-center text-xs font-medium text-primary sm:text-sm">
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4 shrink-0"
                >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                Community-driven social service platform
            </span>

            <div className="flex flex-col items-center gap-6">
                <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
                    Gather for Good.{" "}
                    <span className="text-primary">Transform Your Neighborhood.</span>
                </h1>

                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Create, discover, and join local social service drives in your
                    neighborhood. From winter clothes drives to urban tree plantations and
                    cleanups.
                </p>
            </div>

            <div className="flex w-full max-w-xs flex-col items-stretch gap-4 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
                <Link
                    href="/events"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-pink-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-600/15 transition hover:opacity-90 active:scale-95"
                >
                    Explore Upcoming Events
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>

                <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:bg-muted hover:text-primary active:scale-95"
                >
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4 text-primary"
                    >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    Create an Event
                </Link>
            </div>

            <ul className="grid w-full max-w-3xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                {stats.map((stat) => (
                    <li
                        key={stat.label}
                        className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm sm:p-5"
                    >
                        <p className={`text-xl font-semibold sm:text-2xl ${stat.tone}`}>
                            {stat.value}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Banner;
