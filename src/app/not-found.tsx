import type { Metadata } from "next";
import Link from "next/link";
import { CalendarSearch, House } from "lucide-react";

export const metadata: Metadata = {
    title: "Page not found | Kindred",
};

const NotFound = () => {
    return (
        <main className="mx-auto flex w-full max-w-2xl flex-col items-center px-5 pb-24 pt-32 text-center sm:px-8">
            {/* Brand gradient 404 */}
            <p
                aria-hidden="true"
                className="bg-linear-to-r from-pink-500 to-purple-600 bg-clip-text text-8xl font-bold tracking-tight text-transparent sm:text-9xl"
            >
                404
            </p>

            <div className="mt-8 w-full rounded-2xl border border-border bg-card px-6 py-10 shadow-sm sm:px-10">
                <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CalendarSearch aria-hidden="true" className="size-6" />
                </span>

                <h1 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    We couldn&apos;t find that page
                </h1>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    The link may be broken, or the page may have been moved or removed.
                    Head back to the upcoming drives to keep exploring.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                        href="/events"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-pink-500 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-600/15 transition hover:from-pink-600 hover:to-pink-700 active:scale-95 sm:w-auto"
                    >
                        <CalendarSearch aria-hidden="true" className="size-4" />
                        Browse upcoming events
                    </Link>

                    <Link
                        href="/"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:border-primary/50 hover:text-primary active:scale-95 sm:w-auto"
                    >
                        <House aria-hidden="true" className="size-4" />
                        Go to home
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default NotFound;