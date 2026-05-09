import Link from "next/link";

const moods = [
  "Stressato",
  "Annoiato",
  "Curioso",
  "Romantico",
  "Energico",
  "In cerca di socialità",
];

const vibes = [
  "Dark academia",
  "Dolce vita",
  "Quiet luxury",
  "Vintage film",
  "Neon nightlife",
  "Romantic ruins",
];

const features = [
  {
    title: "Mood Check",
    href: "/explore",
    description: "Scegli come ti senti e che atmosfera vuoi seguire.",
  },
  {
    title: "Vibe Feed",
    href: "/feed",
    description: "Scopri luoghi consigliati in base a mood e vibe.",
  },
  {
    title: "Vibe Map",
    href: "/map",
    description: "Esplora i posti su una mappa reale con filtri estetici.",
  },
  {
    title: "Vibe Lists",
    href: "/vibe-lists",
    description: "Sfoglia raccolte di luoghi costruite intorno a una vibe.",
  },
  {
    title: "Vibe Route",
    href: "/route",
    description: "Guarda un itinerario demo con tappe e tempi stimati.",
  },
  {
    title: "Premium",
    href: "/premium",
    description: "Visualizza la pagina demo del modello freemium.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F7F4EF] text-[#1A1A2E]">
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#5B4FCF]">
            Mood-based city discovery
          </p>

          <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Trova posti in base a come ti senti.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-[#4B4B5F]">
            MoodScape ti aiuta a scoprire luoghi, percorsi e vibe nella tua
            città partendo dal tuo mood e dall’atmosfera che vuoi vivere.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/explore"
              className="rounded-full bg-[#5B4FCF] px-7 py-3 text-center font-semibold text-white shadow-lg shadow-[#5B4FCF]/20"
            >
              Scegli il tuo mood
            </Link>

            <Link
              href="/feed"
              className="rounded-full border border-[#D8D2F0] bg-white px-7 py-3 text-center font-semibold text-[#1A1A2E]"
            >
              Esplora il feed
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-5 shadow-2xl shadow-black/10">
          <div className="rounded-[1.5rem] bg-[#EDE9FF] p-5">
            <p className="text-sm font-semibold text-[#5B4FCF]">
              Come ti senti oggi?
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {moods.map((mood) => (
                <div
                  key={mood}
                  className="rounded-2xl bg-white px-4 py-3 text-sm font-medium"
                >
                  {mood}
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm font-semibold text-[#5B4FCF]">
              Che vibe vuoi seguire?
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {vibes.map((vibe) => (
                <span
                  key={vibe}
                  className="rounded-full bg-[#1A1A2E] px-4 py-2 text-xs font-medium text-white"
                >
                  {vibe}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-black/5">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B4FCF]">
            Demo app
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
            Tutte le sezioni della demo.
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-[#5A5A6E]">
            Questa versione è ancora una demo con dati finti, ma mostra il
            flusso principale dell’app: mood, feed, mappa, liste, route,
            moodboard, profilo e premium.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="rounded-3xl border border-[#E8E1D8] bg-[#F7F4EF] p-5 transition hover:-translate-y-1 hover:border-[#5B4FCF]"
              >
                <h3 className="text-xl font-bold">{feature.title}</h3>

                <p className="mt-3 text-sm leading-6 text-[#5A5A6E]">
                  {feature.description}
                </p>

                <p className="mt-5 text-sm font-semibold text-[#5B4FCF]">
                  Apri sezione →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}