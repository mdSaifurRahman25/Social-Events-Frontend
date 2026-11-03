"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Subscriber = () => {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (done) {
      toast.info("You are already on the list.", {
        description: "We will write when the next drive is posted.",
      });
      return;
    }

    setPending(true);

    // No backend yet — this is a front-end only round trip.
    await new Promise((resolve) => setTimeout(resolve, 700));

    setPending(false);
    setDone(true);
    setEmail("");

    toast.success("That is you on the list.", {
      description: "We will email you when a drive near you goes up.",
    });
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-20 md:pb-28 xl:px-12">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-linear-to-br from-primary/15 via-card to-accent/15 px-6 py-14 md:px-14 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-primary/20 blur-3xl"
        />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/60 px-3.5 py-1.5 text-xs font-medium text-primary backdrop-blur">
              The Thursday dispatch
            </span>

            <h2 className="mt-6 max-w-xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              One email a week. Only the drives near you.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
              No newsletters about causes you cannot act on. Just dates, places
              and the number of places still open, filtered to the areas you
              actually live in.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background/70 p-6 backdrop-blur">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label htmlFor="dispatch-email" className="text-sm font-medium text-foreground">
                Email address
              </label>
              <input
                id="dispatch-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                disabled={pending}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-pink-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 active:scale-95 disabled:pointer-events-none disabled:opacity-60"
              >
                {pending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Signing you up
                  </>
                ) : done ? (
                  <>
                    <Check className="size-4" />
                    You are on the list
                  </>
                ) : (
                  <>
                    Send me the dispatch
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
              <p className="text-xs text-muted-foreground">
                Unsubscribe in one click. We never pass your address on.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscriber;
