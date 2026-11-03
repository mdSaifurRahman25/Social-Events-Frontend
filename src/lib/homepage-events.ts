// Demo data for the homepage "What's On" section.
// Swap for the backend fetch once the database is wired up.
//
// Event types follow EVENT_TYPES from the backend contract:
// ["Cleanup","Plantation","Donation","Education","Health Camp","Blood Donation","Others"]

export type EventType =
  | "Cleanup"
  | "Plantation"
  | "Donation"
  | "Education"
  | "Health Camp"
  | "Blood Donation"
  | "Others";

export type HomepageEvent = {
  id: string;
  title: string;
  summary: string;
  area: string;
  date: string;
  time: string;
  type: EventType;
  slots: number;
  art: "blood" | "tree" | "river" | "food" | "health" | "school" | "solar" | "flood";
};

export const homepageEvents: HomepageEvent[] = [
  {
    id: "lalmatia-blood-bridge",
    title: "Lalmatia Blood Bridge",
    summary:
      "A half-day collection desk for students and staff of three schools. Donors are registered, briefed, and looked after until they finish.",
    area: "Lalmatia, Dhaka",
    date: "2026-11-12",
    time: "9:00 AM – 2:00 PM",
    type: "Blood Donation",
    slots: 28,
    art: "blood",
  },
  {
    id: "gulshan-green-corridor",
    title: "Gulshan Green Corridor",
    summary:
      "We are putting back 400 native saplings along the lake walk. Bring a bucket; we bring the shovels, the water, and the snacks.",
    area: "Gulshan Lake Park",
    date: "2026-11-15",
    time: "7:30 AM – 11:00 AM",
    type: "Plantation",
    slots: 45,
    art: "tree",
  },
  {
    id: "sabujbagh-canals",
    title: "Sabujbagh Canal Sweep",
    summary:
      "A canal-side cleanup with waste sorting at three stations. Masks, gloves, grabbers and tea are provided.",
    area: "Sabujbagh, Dhaka",
    date: "2026-11-19",
    time: "6:30 AM – 10:00 AM",
    type: "Cleanup",
    slots: 60,
    art: "river",
  },
  {
    id: "mohammadpur-rations",
    title: "Mohammadpur Ration Share",
    summary:
      "We pack two weeks of staple food into family parcels and hand them over at the community centre. Weighing and packing from 11 AM.",
    area: "Mohammadpur Community Centre",
    date: "2026-11-22",
    time: "11:00 AM – 4:00 PM",
    type: "Donation",
    slots: 32,
    art: "food",
  },
  {
    id: "mirpur-health-week",
    title: "Mirpur Health Week",
    summary:
      "Free screening for blood pressure, diabetes and eye health, run by volunteer doctors who keep a patient register for follow-up.",
    area: "Mirpur Ten Community Clinic",
    date: "2026-11-26",
    time: "8:30 AM – 3:00 PM",
    type: "Health Camp",
    slots: 40,
    art: "health",
  },
  {
    id: "uttara-tutoring",
    title: "Uttara Evening Tutoring",
    summary:
      "Six weeks of evening tuition for students in grades six to eight. Volunteers teach maths, science or English, one subject each.",
    area: "Uttara Model School",
    date: "2026-11-29",
    time: "4:00 PM – 7:00 PM",
    type: "Education",
    slots: 18,
    art: "school",
  },
  {
    id: "banani-solar-clinic",
    title: "Banani Solar Clinic",
    summary:
      "We are fitting rooftop solar to a community clinic that still loses power during load-shedding, and training their staff to maintain it.",
    area: "Banani, Dhaka",
    date: "2026-12-03",
    time: "10:00 AM – 5:00 PM",
    type: "Others",
    slots: 12,
    art: "solar",
  },
  {
    id: "savar-flood-relief",
    title: "Savar Flood Relief",
    summary:
      "Boats carrying dry rations, oral saline and blankets to villages cut off by the embankment breach. Boats leave the ghat at dawn.",
    area: "Savar Ghat, Dhaka",
    date: "2026-12-07",
    time: "5:30 AM – 1:00 PM",
    type: "Donation",
    slots: 24,
    art: "flood",
  },
];
