export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-24 text-center">
      <p className="rounded-full bg-pink-200/15 px-4 py-1.5 text-sm text-pink-100">
        Small acts. Shared city.
      </p>
      <h1 className="mt-4 text-4xl font-medium leading-12 sm:text-5xl sm:leading-17 md:text-6xl md:leading-21">
        Kindred
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Host a blood donation drive, plant trees, or join a neighbourhood cleanup
        near you.
      </p>
    </main>
  );
}
