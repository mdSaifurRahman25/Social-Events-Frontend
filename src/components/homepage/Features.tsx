import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CircleCheck,
  HandHeart,
  Radar,
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Post it in a minute",
    body: "Name the work, pick a date, drop in a photo. No forms that ask for your blood group when you only want to plant a tree.",
    icon: CalendarClock,
  },
  {
    step: "02",
    title: "Let nearby people find it",
    body: "We surface drives by area and date, so a drive in Lalmatia shows up to people who can actually walk there.",
    icon: Radar,
  },
  {
    step: "03",
    title: "Show up, sign on, chip in",
    body: "Join in one tap. Organisers see a live headcount and a list of who is coming, so nothing goes short-handed.",
    icon: HandHeart,
  },
  {
    step: "04",
    title: "Keep the record",
    body: "Hours, headcounts and photos stay attached to the drive afterwards. That is how a street proves what it did.",
    icon: CircleCheck,
  },
];

const Features = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-20 md:py-28 xl:px-12">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            How it works
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Four steps from idea to
            <span className="text-primary"> actual people turning up.</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Kindred was built for the drive that starts with one person saying
            &ldquo;we should do something&rdquo; and ends with thirty neighbours at
            the site by nine in the morning.
          </p>

          <Link
            href="/create-event"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
          >
            Organise your first drive
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <ol className="relative flex flex-col gap-6">
          {/* connector rail */}
          <span
            aria-hidden="true"
            className="absolute left-[27px] top-6 hidden h-[calc(100%-3rem)] w-px bg-linear-to-b from-primary/50 via-accent/40 to-transparent sm:block"
          />

          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.step}
                className="relative flex gap-5 rounded-2xl border border-border bg-card p-6 transition hover:border-primary/40"
              >
                <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {item.step}
                  </span>
                  <h3 className="mt-1.5 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Features;
