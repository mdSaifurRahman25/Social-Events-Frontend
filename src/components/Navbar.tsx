import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";

const Navbar = () => {
  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-border bg-background/40 px-6 py-4 backdrop-blur-md md:px-16 lg:px-24 xl:px-32">
      <Link href="/" className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-linear-to-r from-pink-500 to-pink-600 shadow-lg shadow-pink-600/15">
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
        <Link
          href="/login"
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
      </div>
    </header>
  );
};

export default Navbar;
