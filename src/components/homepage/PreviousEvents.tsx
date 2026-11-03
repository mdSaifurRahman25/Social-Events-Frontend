import {
  BloodDonationArt,
  FloodReliefArt,
  FoodReliefArt,
  HealthCampArt,
  LiteracyClassArt,
  RiverCleanupArt,
  SolarWorkshopArt,
  StreetLibraryArt,
  TreePlantationArt,
} from "@/components/illustrations";

const galleryItems = [
  {
    art: TreePlantationArt,
    caption: "Gulshan Green Corridor",
    detail: "380 saplings · 46 volunteers",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    art: BloodDonationArt,
    caption: "Lalmatia Blood Bridge",
    detail: "52 units collected",
    span: "",
  },
  {
    art: LiteracyClassArt,
    caption: "Uttara Evening Tutoring",
    detail: "6 weeks · 31 learners",
    span: "",
  },
  {
    art: RiverCleanupArt,
    caption: "Sabujbagh Canal Sweep",
    detail: "1.2 tonnes diverted",
    span: "",
  },
  {
    art: FoodReliefArt,
    caption: "Mohammadpur Ration Share",
    detail: "180 parcels packed",
    span: "",
  },
  {
    art: HealthCampArt,
    caption: "Mirpur Health Week",
    detail: "210 people screened",
    span: "",
  },
  {
    art: SolarWorkshopArt,
    caption: "Banani Solar Clinic",
    detail: "14 kW installed",
    span: "",
  },
  {
    art: FloodReliefArt,
    caption: "Savar Flood Relief",
    detail: "9 villages reached",
    span: "",
  },
  {
    art: StreetLibraryArt,
    caption: "Shyamoli Street Library",
    detail: "1,100 books shared",
    span: "sm:col-span-2",
  },
];

const PreviousEvents = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-20 md:py-28 xl:px-12">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          The archive
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          What we have already done
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Every tile below is a drive that finished. Numbers are what people
          logged in on the day, not a target we wrote afterwards.
        </p>
      </div>

      <ul className="mt-12 grid auto-rows-[190px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {galleryItems.map((item) => {
          const Art = item.art;
          return (
            <li
              key={item.caption}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card ${item.span}`}
            >
              <Art className="h-full w-full transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-4 pt-10">
                <p className="text-sm font-semibold text-white">{item.caption}</p>
                <p className="mt-0.5 text-xs text-white/70">{item.detail}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default PreviousEvents;
