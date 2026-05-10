import Link from "next/link";

const sections = [
  {
    title: "Dati dell’account",
    description:
      "Se crei un account, MoodScape può usare email e identificativo utente per permetterti di accedere, salvare luoghi, creare liste e partecipare agli eventi.",
  },
  {
    title: "Interazioni salvate",
    description:
      "Like, commenti, follow, luoghi salvati, eventi salvati e partecipazioni possono essere memorizzati per mantenere attive le tue preferenze anche dopo il refresh.",
  },
  {
    title: "Dati dei contenuti",
    description:
      "Le informazioni su luoghi, eventi, vibe e liste sono usate per mostrare feed, mappe, community e raccomandazioni.",
  },
  {
    title: "Condivisione",
    description:
      "Questa demo non vende dati personali. Alcuni contenuti pubblici, come liste pubbliche o commenti, possono essere visibili nella community.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-[#111111] shadow-sm ring-1 ring-black/5"
        >
          ← Home
        </Link>

        <section className="mt-6 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
          <p className="text-sm font-semibold text-[#7A7A73]">Privacy</p>

          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Privacy Policy.
          </h1>

          <p className="mt-6 text-base leading-8 text-[#55554F]">
            Questa pagina descrive in modo semplice come MoodScape gestisce i
            dati all’interno della demo MVP. Non è un documento legale
            definitivo: prima di pubblicare il prodotto in modo commerciale,
            andrebbe revisionato e adattato.
          </p>

          <div className="mt-8 grid gap-4">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-[1.5rem] bg-[#F7F7F5] p-5"
              >
                <h2 className="text-xl font-bold tracking-tight">
                  {section.title}
                </h2>
                <p className="mt-3 leading-7 text-[#55554F]">
                  {section.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] bg-[#111111] p-5 text-white">
            <h2 className="text-xl font-bold tracking-tight">
              Contatti e richieste
            </h2>
            <p className="mt-3 leading-7 text-white/70">
              Per una versione reale del prodotto, questa sezione dovrebbe
              includere un indirizzo email di contatto, informazioni sul
              titolare del trattamento e modalità per richiedere modifica o
              cancellazione dei dati.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}