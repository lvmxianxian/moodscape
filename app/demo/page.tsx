import Link from "next/link";

const demoFlow = [
  {
    step: "01",
    title: "Home",
    description:
      "L’utente sceglie mood e vibe. La home mostra solo le vibe principali e permette di aprire le altre.",
    href: "/",
  },
  {
    step: "02",
    title: "Feed",
    description:
      "MoodScape mostra luoghi coerenti con la combinazione scelta, con card visive e dettagli rapidi.",
    href: "/feed",
  },
  {
    step: "03",
    title: "Dettaglio luogo",
    description:
      "Ogni luogo ha descrizione, mood, vibe, info pratiche, salvataggio e aggiunta alle Vibe Lists.",
    href: "/place/giardino-aranci",
  },
  {
    step: "04",
    title: "Moodboard",
    description:
      "I luoghi salvati finiscono in una raccolta personale collegata all’account.",
    href: "/moodboard",
  },
  {
    step: "05",
    title: "Vibe Lists",
    description:
      "Le liste funzionano come board visive, simili a raccolte Pinterest, ma organizzate per mood.",
    href: "/vibe-lists",
  },
  {
    step: "06",
    title: "Community",
    description:
      "La community mostra post, creator, commenti, salvataggi e vibe di tendenza.",
    href: "/community",
  },
  {
    step: "07",
    title: "Eventi",
    description:
      "La sezione eventi aggiunge il lato Eventbrite: date, disponibilità, prezzo e CTA Partecipa.",
    href: "/events",
  },
  {
    step: "08",
    title: "Mappa",
    description:
      "La mappa mostra i luoghi geolocalizzati e permette di esplorarli per vibe.",
    href: "/map",
  },
];

const pillars = [
  {
    title: "Pinterest",
    description:
      "Board visive, salvataggi, moodboard e Vibe Lists organizzate per ispirazione.",
  },
  {
    title: "Instagram",
    description:
      "Feed social, creator, commenti, like demo, profili e contenuti community.",
  },
  {
    title: "Eventbrite",
    description:
      "Eventi, date, posti disponibili, prezzo, organizzatore e pulsante Partecipa.",
  },
];

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-7xl">
        <section className="mx-auto max-w-md lg:max-w-7xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#7A7A73]">
                Demo MVP
              </p>

              <h1 className="mt-2 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Come presentare MoodScape.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#55554F]">
                Questa pagina raccoglie il percorso migliore per spiegare il
                progetto: scelta del mood, scoperta dei luoghi, salvataggi,
                community, eventi e mappa.
              </p>
            </div>

            <Link
              href="/"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm ring-1 ring-black/5"
            >
              ↗
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5"
              >
                <p className="text-lg font-bold">{pillar.title}</p>
                <p className="mt-2 hidden text-sm leading-6 text-[#55554F] md:block">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-md lg:max-w-7xl">
          <div className="rounded-[2rem] bg-[#111111] p-6 text-white shadow-xl shadow-black/10 md:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/50">
              Elevator pitch
            </p>

            <h2 className="mt-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              MoodScape trasforma “come mi sento?” in luoghi, eventi e
              community da vivere.
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-7 text-white/70">
              Invece di partire solo da categoria, prezzo o zona, MoodScape
              parte dallo stato emotivo e dall’aesthetic desiderata. Da lì crea
              un feed di posti, board, eventi e contenuti social.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="rounded-full bg-white px-6 py-4 text-center text-sm font-bold text-[#111111]"
              >
                Avvia demo
              </Link>

              <Link
                href="/community"
                className="rounded-full bg-white/10 px-6 py-4 text-center text-sm font-bold text-white"
              >
                Apri community
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-md pb-10 lg:max-w-7xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Percorso consigliato
            </h2>

            <Link href="/feed" className="text-sm font-bold text-[#7A7A73]">
              Vai al Feed
            </Link>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {demoFlow.map((item) => (
              <Link
                key={item.step}
                href={item.href}
                className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
              >
                <p className="text-sm font-bold text-[#7A7A73]">
                  {item.step}
                </p>

                <h3 className="mt-3 text-2xl font-bold tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#55554F]">
                  {item.description}
                </p>

                <p className="mt-5 text-sm font-bold text-[#111111]">
                  Apri →
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}