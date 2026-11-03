import Link from "next/link";
import {
  Compass,
  Heart,
  MapPin,
  Send,
  Sprout,
  UsersRound,
} from "lucide-react";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/mdSaifurRahman25",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mdsaifurrahman25",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "X",
    href: "https://x.com/mdsaifurrahman25",
    path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/mdsaifurrahman25",
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
];

const moveLinks = [
  { label: "Upcoming drives", href: "/events" },
  { label: "Open a drive", href: "/create-event" },
  { label: "Drives I run", href: "/manage-events" },
  { label: "Drives I joined", href: "/joined-events" },
  { label: "Your profile", href: "/profile" },
];

const programmeLines = [
  { label: "Blood donation desks", icon: Send },
  { label: "Canal and river sweeps", icon: Compass },
  { label: "Native sapling drives", icon: Sprout },
  { label: "Community health camps", icon: UsersRound },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-card">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 size-[32rem] -translate-x-1/2 rounded-full bg-accent/8 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-16 md:py-20 xl:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr_0.95fr] lg:gap-10">
          {/* Brand + pitch */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-linear-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-600/20">
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
              <span className="flex flex-col leading-tight">
                <span className="text-xl font-bold tracking-tight text-foreground">
                  Kindred
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Small acts. Shared city.
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
              A noticeboard for the work a street can actually do. Post a drive
              in the morning and the people who can make it will know about it
              by lunch.
            </p>

            <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0 text-primary" />
              Dhaka, Bangladesh · running in nine districts
            </p>

            <ul className="mt-7 flex items-center gap-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Move around */}
          <nav aria-labelledby="footer-move">
            <h2
              id="footer-move"
              className="text-xs font-bold uppercase tracking-[0.2em] text-foreground"
            >
              Get around
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {moveLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
                  >
                    <span className="h-px w-3 bg-border transition-all group-hover:w-5 group-hover:bg-primary" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Programme */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
              What we run
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {programmeLines.map((line) => {
                const Icon = line.icon;
                return (
                  <li
                    key={line.label}
                    className="inline-flex items-center gap-2.5 text-sm text-muted-foreground"
                  >
                    <Icon className="size-4 shrink-0 text-primary" />
                    {line.label}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 rounded-2xl border border-border bg-background/60 p-5">
              <p className="text-sm font-semibold text-foreground">
                Nothing here is paid for.
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Every organiser, cook, driver and pair of hands is a volunteer.
                So is the platform.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-7 text-sm text-muted-foreground sm:flex-row">
          <p>© 2026 Kindred. Built by volunteers, for volunteers.</p>
          <p className="inline-flex items-center gap-1.5">
            Made with
            <Heart className="size-3.5 fill-primary text-primary" />
            on the Mirpur 10 footpath
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
