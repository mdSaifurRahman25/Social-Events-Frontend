import { Suspense } from "react";
import Banner from "@/components/homepage/Banner";
import Features from "@/components/homepage/Features";
import HighlightedEvents from "@/components/homepage/HighlightedEvents";
import PreviousEvents from "@/components/homepage/PreviousEvents";
import Subscriber from "@/components/homepage/Subscriber";

// Placeholder shown while the recent events load
const RecentEventsSkeleton = () => (
  <section className="border-y border-border bg-muted/30">
    <div className="mx-auto w-full max-w-7xl px-6 py-20 md:py-28 xl:px-12">
      <div className="h-10 w-72 animate-pulse rounded-2xl bg-muted" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-96 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Banner />
      <Features />
      <Suspense fallback={<RecentEventsSkeleton />}>
        <HighlightedEvents />
      </Suspense>
      <PreviousEvents />
      <Subscriber />
    </main>
  );
}