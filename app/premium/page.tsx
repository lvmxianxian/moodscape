import Link from "next/link";

const freeFeatures = [
  "Mood Check base",
  "Vibe Feed con luoghi filtrati",
  "Moodboard personale",
  "Vibe Lists personali",
  "Mappa dei luoghi",
];

const premiumFeatures = [
  "AI Route Generator",
  "Percorsi personalizzati per mood",
  "Liste collaborative",
  "Eventi consigliati in base alla vibe",
  "Creator e community tools avanzati",
  "Accesso anticipato a nuove funzioni",
];

const plans = [
  {
    name: "Free",
    price: "€0",
    description: "Per esplorare luoghi, salvare posti e creare prime liste.",
    features: freeFeatures,
    href: "/signup",
    cta: "Inizia gratis",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "€4,99",
    description:
      "Per trasformare mood, eventi e community in percorsi personalizzati.",
    features: premiumFeatures,
    href: "/signup",
    cta: "Prova Premium",
    highlighted: true,
  },
];

export default function PremiumPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-7xl">
        <section className="mx-auto max-w-md lg:max-w-7xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#7A7A73]">
                MoodScape Premium
              </p>

              <h1 className="mt-2 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Percorsi, eventi e vibe più personali.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#55554F]">
                Premium è la parte avanzata di MoodScape: itinerari generati,
                suggerimenti più precisi, strumenti community e funzioni per
                vivere la città in modo più personalizzato.
              </p>
            </div>

            <Link
              href="/profile"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm ring-1 ring-black/5"
            >
              ✦
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">AI</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Route
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">Mood</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Matching
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">Pro</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Tools
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 grid max-w-md gap-4 lg:max-w-7xl lg:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-[2rem] p-5 shadow-sm ring-1 ${
                plan.highlighted
                  ? "bg-[#111111] text-white ring-[#111111]"
                  : "bg-white text-[#111111] ring-black/5"
              }`}
            >
              <p
                className={`text-sm font-bold uppercase tracking-[0.16em] ${
                  plan.highlighted ? "text-white/50" : "text-[#7A7A73]"
                }`}
              >
                Piano
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                {plan.name}
              </h2>

              <div className="mt-5 flex items-end gap-2">
                <p className="text-5xl font-bold">{plan.price}</p>
                <p
                  className={`pb-2 text-sm font-semibold ${
                    plan.highlighted ? "text-white/50" : "text-[#7A7A73]"
                  }`}
                >
                  / mese
                </p>
              </div>

              <p
                className={`mt-5 leading-7 ${
                  plan.highlighted ? "text-white/70" : "text-[#55554F]"
                }`}
              >
                {plan.description}
              </p>

              <div className="mt-6 grid gap-3">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className={`rounded-[1.25rem] p-4 text-sm font-semibold ${
                      plan.highlighted
                        ? "bg-white/10 text-white"
                        : "bg-[#F7F7F5] text-[#111111]"
                    }`}
                  >
                    ✓ {feature}
                  </div>
                ))}
              </div>

              <Link
                href={plan.href}
                className={`mt-6 flex items-center justify-center rounded-full px-6 py-4 text-sm font-bold ${
                  plan.highlighted
                    ? "bg-white text-[#111111]"
                    : "bg-[#111111] text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </section>

        <section className="mx-auto mt-8 grid max-w-md gap-5 pb-10 lg:max-w-7xl lg:grid-cols-[1fr_1fr_1fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-2xl font-bold tracking-tight">
              Route Generator
            </h2>
            <p className="mt-3 leading-7 text-[#55554F]">
              Crea un percorso partendo da mood, tempo disponibile, zona,
              budget e livello di socialità.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-2xl font-bold tracking-tight">
              Eventi su misura
            </h2>
            <p className="mt-3 leading-7 text-[#55554F]">
              Ricevi eventi e attività consigliati in base alla vibe che vuoi
              vivere oggi o nel weekend.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-2xl font-bold tracking-tight">
              Community avanzata
            </h2>
            <p className="mt-3 leading-7 text-[#55554F]">
              Strumenti per creator, liste collaborative, salvataggi evoluti e
              funzioni social più profonde.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}