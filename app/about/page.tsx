import Link from "next/link";

const values = [
  {
    title: "Mood-first",
    description:
      "MoodScape parte da come ti senti, non solo da dove vuoi andare.",
  },
  {
    title: "Scoperta visiva",
    description:
      "Luoghi, eventi e liste sono organizzati come board e feed da esplorare.",
  },
  {
    title: "Community locale",
    description:
      "Creator e utenti condividono vibe, percorsi e raccolte per vivere meglio la città.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-[#111111] shadow-sm ring-1 ring-black/5"
        >
          ← Home
        </Link>

        <section className="mt-6 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
          <p className="text-sm font-semibold text-[#7A7A73]">About</p>

          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            MoodScape è una piattaforma per scoprire luoghi, eventi e community
            partendo dal tuo mood.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#55554F]">
            L’idea nasce da una domanda semplice: invece di chiedere solo “dove
            vuoi andare?”, cosa succede se partiamo da “come ti senti?”.
            MoodScape trasforma mood e vibe in consigli visivi, liste,
            esperienze locali e contenuti condivisi dalla community.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-[1.5rem] bg-[#F7F7F5] p-5"
              >
                <h2 className="text-xl font-bold tracking-tight">
                  {value.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#55554F]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-2xl font-bold tracking-tight">
              Cosa puoi fare
            </h2>

            <p className="mt-4 leading-8 text-[#55554F]">
              Puoi scegliere mood e vibe, scoprire luoghi nel Feed, salvarli
              nella Moodboard, creare Vibe Lists, seguire creator, leggere la
              Community, partecipare a eventi e visualizzare i posti sulla
              mappa.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-2xl font-bold tracking-tight">
              Stato del progetto
            </h2>

            <p className="mt-4 leading-8 text-[#55554F]">
              MoodScape è una demo MVP: alcune funzioni sono già collegate a
              Supabase, mentre altre aree possono essere ampliate con dati,
              creator, eventi e immagini reali.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}