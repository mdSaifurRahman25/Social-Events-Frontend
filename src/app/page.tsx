import Banner from "@/components/homepage/Banner";
import Features from "@/components/homepage/Features";
import HighlightedEvents from "@/components/homepage/HighlightedEvents";
import PreviousEvents from "@/components/homepage/PreviousEvents";
import Subscriber from "@/components/homepage/Subscriber";
import { homepageEvents } from "@/lib/homepage-events";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Banner />
      <Features />
      <HighlightedEvents events={homepageEvents} />
      <PreviousEvents />
      <Subscriber />
    </main>
  );
}
