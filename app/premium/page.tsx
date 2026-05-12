import Link from "next/link";

const premiumFeatures = [
  {
    title: "Vibe Route AI",
    description:
      "Trasforma una Vibe List in un itinerario più intelligente, con tappe ordinate e tempi stimati.",
  },
  {
    title: "Vibe Lists illimitate",
    description:
      "Crea tutte le raccolte che vuoi, senza limite di liste personali o pubbliche.",
  },
  {
    title: "Filtri granulari",
    description:
      "Raffina la scoperta per budget, tempo, zona, compagnia e atmosfera.",
  },
  {
    title: "Moodboard avanzata",
    description:
      "Organizza luoghi, percorsi e vibe per mood, estetica e privacy.",
  },
  {
    title: "Salvataggio offline",
    description:
      "Tieni a portata di mano i percorsi anche quando sei in giro.",
  },
  {
    title: "Layer tematici sulla mappa",
    description:
      "Sblocca livelli speciali per vibe, creator, percorsi e luoghi nascosti.",
  },
];

const plans = [
  {
    name: "Free",
    price: "€0",
    period: "per sempre",
    description: "Per scoprire luoghi, salvare vibe e provare la community.",
    features: [
      "Accesso al Feed",
      "Esplorazione della mappa",
      "Vibe Lists base",
      "Moodboard base",
      "Eventi e community",
    ],
    cta: "Continua gratis",
    href: "/feed",
    featured: false,
  },
  {
    name: "Premium",
    price: "€4,99",
    period: "al mese",
    description:
      "Per chi vuole percorsi, filtri avanzati e una moodboard più potente.",
    features: [
      "Vibe Route AI",
      "Vibe Lists illimitate",
      "Filtri granulari",
      "Moodboard avanzata",
      "Salvataggio offline",
      "Layer tematici mappa",
    ],
    cta: "Attiva Premium",
    href: "/routes",
    featured: true,
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
                Percorsi, filtri e moodboard avanzata a €4,99/mese.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#55554F]">
                Premium rende MoodScape più utile quando vuoi trasformare
                l’ispirazione in un’esperienza concreta: itinerari, percorsi,
                filtri granulari e strumenti personali più potenti.
              </p>
            </div>

            <Link
              href="/routes"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111111] text-xl text-white shadow-sm"
            >
              ✦
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-[2rem] p-6 shadow-sm ring-1 ${
                  plan.featured
                    ? "bg-[#111111] text-white ring-black/10"
                    : "bg-white text-[#111111] ring-black/5"
                }`}
              >
                <p
                  className={`text-sm font-bold uppercase tracking-[0.16em] ${
                    plan.featured ? "text-white/50" : "text-[#7A7A73]"
                  }`}
                >
                  {plan.name}
                </p>

                <div className="mt-4 flex items-end gap-2">
                  <p className="text-5xl font-bold tracking-tight">
                    {plan.price}
                  </p>
                  <p
                    className={`pb-2 text-sm font-bold ${
                      plan.featured ? "text-white/50" : "text-[#7A7A73]"
                    }`}
                  >
                    {plan.period}
                  </p>
                </div>

                <p
                  className={`mt-4 text-base leading-7 ${
                    plan.featured ? "text-white/70" : "text-[#55554F]"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mt-6 grid gap-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className={`rounded-[1.25rem] px-4 py-3 text-sm font-bold ${
                        plan.featured
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
                  className={`mt-6 block rounded-full px-6 py-4 text-center text-sm font-bold ${
                    plan.featured
                      ? "bg-white text-[#111111]"
                      : "bg-[#111111] text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-md pb-10 lg:max-w-7xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Cosa sblocchi
            </h2>

            <Link href="/routes" className="text-sm font-bold text-[#7A7A73]">
              Vedi percorsi
            </Link>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {premiumFeatures.map((feature) => (
              <article
                key={feature.title}
                className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#111111] text-xl text-white">
                  ✦
                </div>

                <h3 className="mt-5 text-2xl font-bold tracking-tight">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#55554F]">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#7A7A73]">
              Demo MVP
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Pagamento simulato, esperienza credibile.
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-[#55554F]">
              In questa versione non c’è ancora Stripe reale. La pagina serve a
              mostrare il modello freemium previsto dal PRD e indirizzare
              l’utente verso i percorsi acquistabili.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/routes"
                className="rounded-full bg-[#111111] px-6 py-4 text-sm font-bold text-white"
              >
                Compra un percorso
              </Link>

              <Link
                href="/my-routes"
                className="rounded-full bg-[#F1F1EE] px-6 py-4 text-sm font-bold text-[#111111]"
              >
                I miei percorsi
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}