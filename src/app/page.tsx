import Banner from "@/components/homepage/Banner";
import Features from "@/components/homepage/Features";
import HighlightedEvents from "@/components/homepage/HighlightedEvents";
import PreviousEvents from "@/components/homepage/PreviousEvents";
import Subscriber from "@/components/homepage/Subscriber";
import { demoEvents } from "@/lib/demo-events";
import { demoPreviousEvents } from "@/lib/demo-previous-events";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col pt-24 md:pt-28">
      <Banner />
      <Features />
      <HighlightedEvents events={demoEvents} />
      <PreviousEvents events={demoPreviousEvents} />
      <Subscriber />
    </main>
  );
}
