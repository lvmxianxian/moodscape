import Link from "next/link";

const demoFlow = [
  {
    step: "01",
    title: "Scegli mood e vibe",
    description:
      "Dalla home o dalla pagina Mood Check l’utente sceglie come si sente e che atmosfera vuole vivere.",
    href: "/explore",
  },
  {
    step: "02",
    title: "Scopri luoghi filtrati",
    description:
      "Il Vibe Feed legge i luoghi da Supabase e li filtra in base alla combinazione mood + vibe.",
    href: "/feed",
  },
  {
    step: "03",
    title: "Salva luoghi personali",
    description:
      "Dal dettaglio luogo l’utente può salvare un posto nella propria Moodboard personale.",
    href: "/moodboard",
  },
  {
    step: "04",
    title: "Crea Vibe Lists",
    description:
      "L’utente può creare liste, modificarle, eliminarle e aggiungere luoghi reali alle proprie raccolte.",
    href: "/vibe-lists",
  },
  {
    step: "05",
    title: "Esplora la mappa",
    description:
      "La Vibe Map mostra i luoghi su coordinate reali usando Leaflet e OpenStreetMap.",
    href: "/map",
  },
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Supabase Auth",
  "Supabase Database",
  "Vercel",
  "Leaflet",
  "OpenStreetMap",
];

const realFeatures = [
  "Login e signup con Supabase",
  "Salvataggio luoghi per utente",
  "Moodboard personale reale",
  "Vibe Lists create su database",
  "Modifica ed eliminazione liste",
  "Aggiunta luoghi alle liste",
  "Feed filtrato da mood e vibe",
  "Mappa con coordinate reali",
  "Profilo collegato ai dati utente",
];

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-10 text-[#0E3532]">
      <div className="mx-auto max-w-7xl">
        <section className="mt-8 rounded-[2rem] bg-[#0E3532] p-8 text-[#F4EFE5] shadow-2xl shadow-[#0E3532]/10">
          <p className="inline-flex rounded-full border border-[#D8B77A] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D8B77A]">
            Demo MVP
          </p>

          <h1 className="mt-8 max-w-5xl font-serif text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            MoodScape è una piattaforma per scoprire luoghi in base a mood e
            atmosfera.
          </h1>

          <div className="mt-6 flex max-w-3xl items-center gap-3">
            <div className="h-px flex-1 bg-[#C99A57]" />
            <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
          </div>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#F4EFE5]/75">
            Questa pagina riassume il progetto, le funzionalità già operative e
            il percorso migliore per presentare la demo.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="rounded-full bg-[#D8B77A] px-7 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
            >
              Avvia demo
            </Link>

            <Link
              href="/feed"
              className="rounded-full border border-[#D8B77A] px-7 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
            >
              Apri Feed
            </Link>
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C99A57]">
              Cosa funziona davvero
            </p>

            <h2 className="mt-3 font-serif text-4xl font-bold text-[#2A160E]">
              Funzionalità reali
            </h2>

            <div className="mt-6 grid gap-3">
              {realFeatures.map((feature) => (
                <div
                  key={feature}
                  className="rounded-2xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-4 text-sm font-bold text-[#0E3532]"
                >
                  ✓ {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C99A57]">
              Stack tecnico
            </p>

            <h2 className="mt-3 font-serif text-4xl font-bold text-[#2A160E]">
              Tecnologie usate
            </h2>

            <div className="mt-6 flex flex-wrap gap-2">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#D8B77A] bg-[#F4EFE5] px-4 py-2 text-sm font-bold text-[#0E3532]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-[1.5rem] bg-[#0E3532] p-5 text-[#F4EFE5]">
              <h3 className="font-serif text-2xl font-bold text-[#D8B77A]">
                Valore del progetto
              </h3>

              <p className="mt-3 leading-7 text-[#F4EFE5]/75">
                MoodScape combina scoperta urbana, personalizzazione emotiva,
                contenuti salvabili e mappe interattive. L’idea centrale è
                partire non solo da “dove vuoi andare”, ma da “come ti senti”.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C99A57]">
            Percorso consigliato
          </p>

          <h2 className="mt-3 font-serif text-4xl font-bold text-[#2A160E]">
            Come presentare la demo
          </h2>

          <div className="mt-6 grid gap-5">
            {demoFlow.map((item) => (
              <Link
                key={item.step}
                href={item.href}
                className="grid gap-4 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-5 shadow-xl shadow-[#0E3532]/5 transition hover:-translate-y-1 hover:border-[#C99A57] md:grid-cols-[120px_1fr_auto] md:items-center"
              >
                <p className="font-serif text-5xl font-bold text-[#C99A57]">
                  {item.step}
                </p>

                <div>
                  <h3 className="font-serif text-3xl font-bold text-[#2A160E]">
                    {item.title}
                  </h3>

                  <p className="mt-2 leading-7 text-[#425653]">
                    {item.description}
                  </p>
                </div>

                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]">
                  Apri →
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5">
          <h2 className="font-serif text-4xl font-bold text-[#2A160E]">
            Prossime evoluzioni
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              "Profilo utente completo con username, bio e avatar.",
              "Premium reale con Stripe e paywall sulle funzioni avanzate.",
              "AI Route Generator per creare itinerari personalizzati.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-5 leading-7 text-[#425653]"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}