"use client";

import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Subscriber = () => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <section className="relative overflow-hidden">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/10 via-background to-background"
            />

            <div className="relative mx-auto w-full max-w-3xl px-6 py-16 text-center md:py-24">
                <p className="text-sm font-semibold uppercase tracking-widest text-green-500">
                    Stay Connected
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                    Subscribe to Local Cause Alerts
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    Get notified when new winter drives, blanket distributions, or emergency
                    cleanups are organized in your neighborhood.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mx-auto mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
                >
                    <Input
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        aria-label="Email address"
                        className="h-11 flex-1 rounded-xl px-4 text-sm"
                    />
                    <Button
                        type="submit"
                        className="h-11 rounded-xl px-6 text-sm font-semibold"
                    >
                        Subscribe
                    </Button>
                </form>

                <p className="mt-4 text-xs text-muted-foreground">
                    No spam guaranteed. Unsubscribe at any time.
                </p>
            </div>
        </section>
    );
};

export default Subscriber;
