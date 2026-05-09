import Link from "next/link";

const moods = [
  "Stressato",
  "Curioso",
  "Romantico",
  "Energico",
  "Introspettivo",
  "Sociale",
];

const features = [
  { title: "Mood Check", href: "/explore" },
  { title: "Vibe Feed", href: "/feed" },
  { title: "Vibe Map", href: "/map" },
  { title: "Vibe Lists", href: "/vibe-lists" },
  { title: "Vibe Route", href: "/route" },
  { title: "Premium", href: "/premium" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F4EFE5] text-[#0E3532]">
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <div className="inline-flex items-center gap-3 rounded-full border border-[#D8B77A] bg-[#F8F2E8] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em]">
            <span className="h-3 w-3 rounded-full bg-[#C99A57]" />
            Progetto web e nuove tecnologie
          </div>

          <h1 className="mt-24 font-serif text-6xl font-bold leading-none tracking-tight text-[#2A160E] md:text-8xl">
            MOODSCAPE
          </h1>

          <div className="mt-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#C99A57]" />
            <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
          </div>

          <h2 className="mt-7 font-serif text-3xl font-bold text-[#0E3532] md:text-4xl">
            Rallenta senza sparire dal mondo
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-[120px_1fr]">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#D8B77A] bg-[#F8F2E8] text-4xl">
              ♡
            </div>

            <div className="border-l border-[#C99A57] pl-6">
              <p className="max-w-xl text-lg leading-8 text-[#425653]">
                La piattaforma B2C che aiuta le persone a scoprire posti,
                percorsi urbani, locali, eventi, attività e viaggi brevi in
                base a due elementi personali:
              </p>

              <ul className="mt-3 list-disc pl-6 text-lg font-bold text-[#0E3532]">
                <li>come si sentono</li>
                <li>che atmosfera vogliono vivere</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/explore"
              className="rounded-full bg-[#0E3532] px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-[#F4EFE5]"
            >
              Scegli il tuo mood
            </Link>

            <Link
              href="/feed"
              className="rounded-full border border-[#C99A57] bg-[#F8F2E8] px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-[#0E3532]"
            >
              Esplora
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] bg-[#0E3532] p-10 text-[#F4EFE5] shadow-2xl shadow-[#0E3532]/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(216,183,122,0.18),transparent_38%)]" />

            <div className="relative flex min-h-[520px] flex-col items-center justify-center text-center">
              <div className="text-8xl">☁️</div>
              <div className="mt-4 text-8xl">🎈</div>

              <h3 className="mt-10 font-serif text-5xl tracking-[0.16em]">
                MOODSCAPE
              </h3>

              <div className="mt-5 flex w-full items-center gap-3">
                <div className="h-px flex-1 bg-[#C99A57]" />
                <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
                <div className="h-px flex-1 bg-[#C99A57]" />
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.45em] text-[#D8B77A]">
                Viaggia secondo il tuo umore
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[2rem] bg-[#0E3532] px-8 py-5 text-center text-sm font-bold uppercase tracking-[0.22em] text-[#D8B77A]">
          Viaggia secondo il tuo umore
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6">
            <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
              Mood principali
            </h2>

            <div className="mt-5 flex flex-wrap gap-2">
              {moods.map((mood) => (
                <span
                  key={mood}
                  className="rounded-full border border-[#D8B77A] px-4 py-2 text-sm font-semibold"
                >
                  {mood}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6">
            <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
              Sezioni della demo
            </h2>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {features.map((feature) => (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className="rounded-2xl bg-[#F4EFE5] p-4 text-sm font-bold text-[#0E3532] transition hover:bg-[#0E3532] hover:text-[#F4EFE5]"
                >
                  {feature.title} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}