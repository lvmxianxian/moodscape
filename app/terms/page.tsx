import Link from "next/link";

const terms = [
  {
    title: "Uso della piattaforma",
    description:
      "MoodScape è pensato per scoprire luoghi, eventi, liste e contenuti community. Gli utenti devono usare il servizio in modo rispettoso e non abusivo.",
  },
  {
    title: "Contenuti della community",
    description:
      "Commenti, liste e interazioni pubbliche devono rispettare le altre persone. Contenuti offensivi, falsi o dannosi possono essere rimossi in una versione reale del prodotto.",
  },
  {
    title: "Luoghi ed eventi",
    description:
      "Informazioni su luoghi, prezzi, date e disponibilità possono cambiare. Prima di partecipare a un evento o visitare un luogo, è sempre bene verificare le informazioni aggiornate.",
  },
  {
    title: "Account",
    description:
      "Alcune funzioni richiedono login, come salvare luoghi, commentare, seguire creator o partecipare agli eventi.",
  },
  {
    title: "Limitazione della demo",
    description:
      "Questa versione è un MVP dimostrativo. Alcune funzioni sono simulate o semplificate rispetto a un prodotto commerciale completo.",
  },
];

export default function TermsPage() {
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
          <p className="text-sm font-semibold text-[#7A7A73]">
            Termini di utilizzo
          </p>

          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Terms & Conditions.
          </h1>

          <p className="mt-6 text-base leading-8 text-[#55554F]">
            Questi termini descrivono le regole base per l’uso della demo di
            MoodScape. Non sono un documento legale definitivo e dovrebbero
            essere revisionati prima di un lancio pubblico o commerciale.
          </p>

          <div className="mt-8 grid gap-4">
            {terms.map((term) => (
              <div
                key={term.title}
                className="rounded-[1.5rem] bg-[#F7F7F5] p-5"
              >
                <h2 className="text-xl font-bold tracking-tight">
                  {term.title}
                </h2>
                <p className="mt-3 leading-7 text-[#55554F]">
                  {term.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] bg-[#111111] p-5 text-white">
            <h2 className="text-xl font-bold tracking-tight">
              Nota importante
            </h2>
            <p className="mt-3 leading-7 text-white/70">
              Per una versione reale, questa pagina dovrebbe includere dettagli
              su responsabilità, proprietà intellettuale, cancellazione account,
              pagamenti, rimborsi e legge applicabile.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}