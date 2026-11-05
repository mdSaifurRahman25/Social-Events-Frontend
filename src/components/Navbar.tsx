"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    ChevronDown,
    CirclePlus,
    CircleCheck,
    LogOut,
    Menu,
    Settings2,
    UserRound,
    X,
} from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import { authClient } from "@/lib/auth-client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const MOBILE_MENU_ID = "mobile-menu";

// Shared style for the links inside the mobile menu
const mobileLinkClass =
    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-foreground transition hover:bg-muted active:scale-[0.99]";

const Navbar = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    // Close the mobile menu with the Escape key
    useEffect(() => {
        if (!menuOpen) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setMenuOpen(false);
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [menuOpen]);

    const handleSignout = async () => {
        setMenuOpen(false);

        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("You've been signed out.");
                    // Go home and refresh so the old session is cleared everywhere
                    router.push("/");
                    router.refresh();
                },
                onError: () => {
                    toast.error("Could not sign out. Please try again.");
                },
            },
        });
    };

    return (
        <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-border bg-background/40 px-6 py-4 backdrop-blur-md md:px-16 lg:px-24 xl:px-32">
            <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-r from-pink-500 to-pink-600 shadow-lg shadow-pink-600/15">
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
                <span className="flex flex-col">
                    <span className="text-xl font-semibold leading-tight tracking-tight text-foreground">
                        Kindred
                    </span>
                    <span className="text-[10px] leading-tight text-muted-foreground">
                        Small acts. Shared city.
                    </span>
                </span>
            </Link>

            {/* Desktop: centered link */}
            <Link
                href="/events"
                className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 text-sm font-medium text-foreground transition hover:text-primary sm:inline-flex"
            >
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
                    <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
                    <path d="M3 21v-5h5" />
                </svg>
                Upcoming Events
            </Link>

            <div className="flex items-center gap-3">
                <ThemeToggle />

                {/* Desktop: account area (hidden on mobile, the hamburger menu replaces it) */}
                <div className="hidden items-center gap-3 sm:flex">
                    {isPending ? (
                        <div
                            aria-hidden="true"
                            className="size-10 animate-pulse rounded-full bg-muted"
                        />
                    ) : user ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        type="button"
                                        title={user.name}
                                        aria-label={`Account menu for ${user.name}`}
                                        className="group flex items-center gap-1 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    >
                                        <Avatar>
                                            <AvatarImage
                                                referrerPolicy="no-referrer"
                                                src={user.image ?? undefined}
                                                alt={user.name}
                                            />
                                            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                    </button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel className="font-normal">
                                        <p className="truncate text-sm font-semibold text-foreground">
                                            {user.name}
                                        </p>
                                        <p className="truncate text-xs text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </DropdownMenuLabel>

                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild className="cursor-pointer gap-2.5">
                                        <Link href="/profile">
                                            <UserRound className="size-4 text-sky-500" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="cursor-pointer gap-2.5">
                                        <Link href="/events/create">
                                            <CirclePlus className="size-4 text-emerald-500" />
                                            Create Event
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="cursor-pointer gap-2.5">
                                        <Link href="/events/manage">
                                            <Settings2 className="size-4 text-violet-500" />
                                            Manage Events
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="cursor-pointer gap-2.5">
                                        <Link href="/events/joined">
                                            <CircleCheck className="size-4 text-emerald-500" />
                                            Joined Events
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem
                                        onSelect={handleSignout}
                                        className="cursor-pointer gap-2.5 text-destructive focus:bg-destructive/10 focus:text-destructive"
                                    >
                                        <LogOut className="size-4" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <button
                                type="button"
                                onClick={handleSignout}
                                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-4 py-2 text-sm font-medium text-destructive transition hover:border-destructive/40 hover:bg-destructive/10 active:scale-95"
                            >
                                <LogOut aria-hidden="true" className="size-4" />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/signup"
                                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-95"
                            >
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
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M19 8v6" />
                                    <path d="M22 11h-6" />
                                </svg>
                                Sign Up
                            </Link>
                            <Link
                                href="/signin"
                                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-pink-600 to-purple-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-pink-600/15 transition hover:opacity-90 active:scale-95"
                            >
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
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                    <path d="M10 17l5-5-5-5" />
                                    <path d="M15 12H3" />
                                </svg>
                                Login
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile: hamburger button */}
                <button
                    type="button"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    aria-controls={MOBILE_MENU_ID}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-background/40 text-foreground transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-95 sm:hidden"
                >
                    {menuOpen ? (
                        <X aria-hidden="true" className="size-5" />
                    ) : (
                        <Menu aria-hidden="true" className="size-5" />
                    )}
                </button>
            </div>

            {/* Mobile: dropdown panel under the header */}
            {menuOpen && (
                <nav
                    id={MOBILE_MENU_ID}
                    aria-label="Mobile menu"
                    className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-border bg-background px-4 pb-5 pt-3 shadow-lg sm:hidden"
                >
                    {isPending ? (
                        <div aria-hidden="true" className="space-y-3 py-2">
                            <div className="h-11 animate-pulse rounded-xl bg-muted" />
                            <div className="h-11 animate-pulse rounded-xl bg-muted" />
                        </div>
                    ) : (
                        <>
                            {user && (
                                <div className="mb-2 flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-3">
                                    <Avatar>
                                        <AvatarImage
                                            referrerPolicy="no-referrer"
                                            src={user.image ?? undefined}
                                            alt={user.name}
                                        />
                                        <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-foreground">
                                            {user.name}
                                        </p>
                                        <p className="truncate text-xs text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <Link href="/events" onClick={closeMenu} className={mobileLinkClass}>
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="size-4 text-pink-500"
                                >
                                    <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
                                    <path d="M21 3v5h-5" />
                                    <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
                                    <path d="M3 21v-5h5" />
                                </svg>
                                Upcoming Events
                            </Link>

                            {user ? (
                                <>
                                    <Link href="/profile" onClick={closeMenu} className={mobileLinkClass}>
                                        <UserRound aria-hidden="true" className="size-4 text-sky-500" />
                                        Profile
                                    </Link>
                                    <Link
                                        href="/events/create"
                                        onClick={closeMenu}
                                        className={mobileLinkClass}
                                    >
                                        <CirclePlus aria-hidden="true" className="size-4 text-emerald-500" />
                                        Create Event
                                    </Link>
                                    <Link
                                        href="/events/manage"
                                        onClick={closeMenu}
                                        className={mobileLinkClass}
                                    >
                                        <Settings2 aria-hidden="true" className="size-4 text-violet-500" />
                                        Manage Events
                                    </Link>
                                    <Link
                                        href="/events/joined"
                                        onClick={closeMenu}
                                        className={mobileLinkClass}
                                    >
                                        <CircleCheck aria-hidden="true" className="size-4 text-emerald-500" />
                                        Joined Events
                                    </Link>

                                    <div className="my-2 border-t border-border" />

                                    <button
                                        type="button"
                                        onClick={handleSignout}
                                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-destructive transition hover:bg-destructive/10 active:scale-[0.99]"
                                    >
                                        <LogOut aria-hidden="true" className="size-4" />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <div className="mt-3 grid grid-cols-2 gap-3">
                                    <Link
                                        href="/signup"
                                        onClick={closeMenu}
                                        className="inline-flex items-center justify-center rounded-full border border-border bg-background/40 px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-95"
                                    >
                                        Sign Up
                                    </Link>
                                    <Link
                                        href="/signin"
                                        onClick={closeMenu}
                                        className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-pink-600 to-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-pink-600/15 transition hover:opacity-90 active:scale-95"
                                    >
                                        Login
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </nav>
            )}
        </header>
    );
};

export default Navbar;