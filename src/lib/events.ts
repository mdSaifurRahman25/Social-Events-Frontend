import { isBefore, isValid, parseISO, startOfToday } from "date-fns";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const EVENT_TYPES = [
    "Donation",
    "Cleanup",
    "Plantation",
    "Winter Relief",
    "Food Drive",
    "Health Camp",
    "Education",
] as const;

export type EventItem = {
    id: string;
    title: string;
    type: string;
    date: string; // YYYY-MM-DD
    location: string;
    thumbnail: string;
    description: string;
    organizerName: string;
};

const str = (value: unknown, fallback = "") =>
    typeof value === "string" ? value : fallback;


const normalize = (raw: Record<string, unknown>): EventItem => ({
    id: String(raw._id ?? raw.id ?? ""),
    title: str(raw.title),
    type: str(raw.type),
    date: str(raw.date),
    location: str(raw.location),
    thumbnail: str(raw.thumbnail),
    description: str(raw.description),
    organizerName: str(raw.organizerName) || str(raw.organizerEmail) || "Community organizer",
});

/**
 * শুধু আজ বা আজকের পরের events, তারিখ অনুযায়ী আগে-পরে সাজানো।
 * Past events এখানেই বাদ পড়ে যায়।
 */
export const getUpcomingEvents = async (): Promise<EventItem[]> => {
    const res = await fetch(`${API_URL}/events`, { cache: "no-store" });
    if (!res.ok) {
        throw new Error(`Failed to load events (${res.status})`);
    }

    const json = await res.json();
    const list: Record<string, unknown>[] = Array.isArray(json)
        ? json
        : (json.events ?? json.data ?? []);

    const today = startOfToday();

    return list
        .map(normalize)
        .filter((event) => {
            const date = parseISO(event.date);
            return isValid(date) && !isBefore(date, today);
        })
        .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());
};