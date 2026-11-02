import Link from "next/link";
import {
    Bell,
    Check,
    Heart,
    HeartPulse,
    MapPin,
    Shirt,
    TreePine,
    Trash,
    Utensils,
    UsersRound,
} from "lucide-react";

const exploreLinks = [
    { label: "Upcoming Events", href: "/events" },
    { label: "Create an Event", href: "/create-event" },
    { label: "Manage My Events", href: "/manage-events" },
    { label: "My Joined Events", href: "/joined-events" },
];

const activeCauses = [
    { label: "Winter Clothes & Blanket Relief", icon: Shirt },
    { label: "City Clean-up & Waste Segregation", icon: Trash },
    { label: "Urban Tree Plantation Drives", icon: TreePine },
    { label: "Underprivileged Meal Sharing", icon: Utensils },
    { label: "Free Medical & Health Camps", icon: HeartPulse },
];

const Footer = () => {
    return (
        <footer className="relative z-10 overflow-hidden border-t border-border bg-card">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-linear-to-b from-primary/10 via-transparent to-transparent"
            />

            <div className="relative mx-auto w-full max-w-7xl px-6 py-16 md:px-12 md:py-20">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-full bg-linear-to-r from-pink-500 to-pink-600 shadow-lg shadow-pink-600/15">
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="size-5"
                            >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                        </span>
                        <span className="text-xl font-semibold tracking-tight text-foreground">
                            Kindred
                        </span>
                    </Link>

                    <button
                        type="button"
                        aria-label="Notifications"
                        className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                    >
                        <Bell className="size-4" />
                    </button>
                </div>

                <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground">
                            Explore Platform
                        </h2>

                        <ul className="mt-6 space-y-3">
                            {exploreLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-3 text-sm text-muted-foreground transition hover:text-primary"
                                    >
                                        <span className="size-1.5 rounded-full bg-primary/60 transition group-hover:bg-primary" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <p className="mt-10 max-w-md text-sm leading-7 text-muted-foreground">
                            A community-driven event management platform empowering everyday
                            citizens to create, join, and track impactful social development
                            drives.
                        </p>

                        <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            <MapPin className="size-3.5 text-primary" />
                            Dhaka, Bangladesh • Nationwide Impact
                        </p>
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground">
                            Active Causes
                        </h2>

                        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                            {activeCauses.map((cause) => {
                                const Icon = cause.icon;
                                return (
                                    <li key={cause.label} className="flex items-center gap-3">
                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            <Icon className="size-4" />
                                        </span>
                                        <span className="inline-flex items-center gap-2 text-sm leading-6 text-muted-foreground">
                                            <Check className="size-3.5 shrink-0 text-primary" />
                                            {cause.label}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="mt-12 grid gap-10 sm:grid-cols-2">
                            <div>
                                <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground">
                                    Community Spirit
                                </h2>
                                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                                    Every small action counts. Connect with local volunteers, turn
                                    compassion into direct community aid, and be the change your city
                                    needs.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground">
                                    Volunteer Driven
                                </h2>
                                <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                                    <UsersRound className="size-4 text-primary" />
                                    100% Volunteer Driven
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-border pt-7 text-sm text-muted-foreground sm:flex-row sm:items-center">
                    <p>
                        © 2026 Kindred. Built with care for community service and social
                        development.
                    </p>
                    <p className="inline-flex items-center gap-2">
                        Made with
                        <Heart className="size-4 fill-primary text-primary" />
                        for a better tomorrow
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
