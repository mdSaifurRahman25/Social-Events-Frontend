// Demo data for the homepage "Community in Action" section.
// Remove this file and the `demoPreviousEvents` prop in src/app/page.tsx once
// the database fetch is wired up.

export type PreviousEvent = {
    id: string;
    title: string;
    location: string;
    image: {
        src: string;
        alt: string;
    };
};

export const demoPreviousEvents: PreviousEvent[] = [
    {
        id: "winter-clothes-drive",
        title: "Winter Clothes Drive",
        location: "Dhaka",
        image: {
            src: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800",
            alt: "Volunteers in white shirts stacking relief boxes marked AID and MEDICINE",
        },
    },
    {
        id: "night-blanket-relief",
        title: "Night Blanket Relief",
        location: "Motijheel",
        image: {
            src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80",
            alt: "Relief supplies being packed into cardboard boxes for distribution",
        },
    },
    {
        id: "plastic-free-initiative",
        title: "Plastic-Free Initiative",
        location: "Dhanmondi",
        image: {
            src: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80",
            alt: "Volunteer in a pink shirt standing at an event entrance",
        },
    },
    {
        id: "community-plantation",
        title: "Community Plantation",
        location: "Savar",
        image: {
            src: "https://images.pexels.com/photos/585418/pexels-photo-585418.jpeg?auto=compress&cs=tinysrgb&w=800",
            alt: "Hands holding a green sapling over dark soil",
        },
    },
    {
        id: "seedling-nursery-day",
        title: "Seedling Nursery Day",
        location: "Uttara",
        image: {
            src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
            alt: "Young seedlings growing in a seed tray",
        },
    },
    {
        id: "blood-donation-camp",
        title: "Blood Donation Camp",
        location: "Old Dhaka",
        image: {
            src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
            alt: "Hands painted red raised together in a circle",
        },
    },
];
