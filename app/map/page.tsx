import Link from "next/link";

const places = [
  {
    name: "Giardino degli Aranci",
    slug: "giardino-aranci",
    city: "Roma",
    area: "Aventino",
    mood: "Romantico",
    vibe: "Dolce vita",
    type: "Vista panoramica",
    coordinates: "41.8841, 12.4807",
    description:
      "Un punto panoramico morbido e luminoso, perfetto per una passeggiata lenta o un tramonto.",
  },
  {
    name: "Biblioteca Angelica",
    slug: "biblioteca-angelica",
    city: "Roma",
    area: "Centro storico",
    mood: "Solo",
    vibe: "Dark academia",
    type: "Biblioteca",
    coordinates: "41.9005, 12.4735",
    description:
      "Scaffali antichi, luce morbida e atmosfera silenziosa per una giornata introspettiva.",
  },
  {
    name: "Galleria Sciarra",
    slug: "galleria-sciarra",
    city: "Roma",
    area: "Trevi",
    mood: "Curioso",
    vibe: "Quiet luxury",
    type: "Cortile storico",
    coordinates: "41.9009, 12.4824",
    description:
      "Una galleria nascosta e decorata, ideale per una pausa visiva nel centro.",
  },
  {
    name: "Neon Bar",
    slug: "neon-bar",
    city: "Roma",
    area: "Monti",
    mood: "In cerca di socialità",
    vibe: "Neon nightlife",
    type: "Locale serale",
    coordinates: "41.8947, 12.4923",
    description:
      "Luci colorate, musica e atmosfera serale per una vibe più sociale e notturna.",
  },
  {
    name: "Colosseo",
    slug: "colosseo",
    city: "Roma",
    area: "Centro",
    mood: "Curioso",
    vibe: "Romantic ruins",
    type: "Monumento",
    coordinates: "41.8902, 12.4922",
    description:
      "Rovine iconiche, atmosfera cinematografica e una tappa forte per percorsi storici.",
  },
  {
    name: "Villa Borghese",
    slug: "villa-borghese",
    city: "Roma",
    area: "Pinciano",
    mood: "Stressato",
    vibe: "Natura selvaggia",
    type: "Parco",
    coordinates: "41.9142, 12.4922",
    description:
      "Verde, respiro e camminate morbide per rallentare senza uscire dalla città.",
  },
];

const mapLayers = [
  "Tutte le vibe",
  "Dark academia",
  "Dolce vita",
  "Quiet luxury",
  "Neon nightlife",
  "Romantic ruins",
  "Natura selvaggia",
];

export default function MapPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-7xl">
        <section className="mx-auto max-w-md lg:max-w-7xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#7A7A73]">
                Vibe Map
              </p>

              <h1 className="mt-2 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Esplora la città per mood e atmosfera.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#55554F]">
                Una mappa visuale per scoprire luoghi, percorsi e vibe nella
                città. Puoi filtrare per atmosfera e suggerire nuovi posti alla
                community.
              </p>
            </div>

            <Link
              href="/submit-place"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111111] text-xl text-white shadow-sm"
              aria-label="Suggerisci un luogo"
            >
              +
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/submit-place"
              className="rounded-full bg-[#111111] px-5 py-3 text-sm font-bold text-white"
            >
              Suggerisci un luogo
            </Link>

            <Link
              href="/feed"
              className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#111111] shadow-sm ring-1 ring-black/5"
            >
              Apri il Feed
            </Link>

            <Link
              href="/routes"
              className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#111111] shadow-sm ring-1 ring-black/5"
            >
              Vedi percorsi
            </Link>
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            {mapLayers.map((layer) => (
              <span
                key={layer}
                className="shrink-0 rounded-full bg-white px-4 py-3 text-sm font-bold text-[#111111] shadow-sm ring-1 ring-black/5"
              >
                {layer}
              </span>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-6 grid max-w-md gap-5 lg:max-w-7xl lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-[#0E3532] p-5 text-white shadow-xl shadow-black/10">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute left-10 top-16 h-40 w-40 rounded-full border border-white" />
              <div className="absolute right-16 top-20 h-64 w-64 rounded-full border border-white" />
              <div className="absolute bottom-10 left-1/3 h-72 w-72 rounded-full border border-white" />
              <div className="absolute left-1/4 top-1/2 h-px w-2/3 rotate-12 bg-white" />
              <div className="absolute left-10 top-1/3 h-px w-4/5 -rotate-6 bg-white" />
            </div>

            <div className="relative z-10 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/50">
                  Roma · mappa demo
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">
                  Luoghi sulla Vibe Map
                </h2>
              </div>

              <span className="rounded-full bg-white px-4 py-3 text-sm font-bold text-[#111111]">
                {places.length} pin
              </span>
            </div>

            <div className="relative z-10 mt-8 grid gap-3 md:grid-cols-2">
              {places.map((place, index) => (
                <Link
                  key={place.slug}
                  href={`/place/${place.slug}`}
                  className="rounded-[1.5rem] bg-white/10 p-4 text-white ring-1 ring-white/10 backdrop-blur transition hover:bg-white hover:text-[#111111]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] opacity-60">
                        Pin {index + 1}
                      </p>

                      <h3 className="mt-2 text-xl font-bold tracking-tight">
                        {place.name}
                      </h3>

                      <p className="mt-1 text-sm font-semibold opacity-70">
                        {place.area} · {place.type}
                      </p>
                    </div>

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-[#111111]">
                      {index + 1}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/15 px-3 py-2 text-xs font-bold">
                      {place.mood}
                    </span>

                    <span className="rounded-full bg-white/15 px-3 py-2 text-xs font-bold">
                      {place.vibe}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
              Mappa collaborativa
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Suggerisci nuovi luoghi alla community.
            </h2>

            <p className="mt-4 text-base leading-7 text-[#55554F]">
              Nel PRD la Vibe Map è collaborativa: gli utenti possono proporre
              nuovi pin, mood, vibe e descrizioni. Questa sezione aggiunge il
              primo flusso demo per contribuire.
            </p>

            <Link
              href="/submit-place"
              className="mt-6 block rounded-full bg-[#111111] px-6 py-4 text-center text-sm font-bold text-white"
            >
              Suggerisci un luogo
            </Link>

            <div className="mt-6 grid gap-3">
              {places.slice(0, 4).map((place) => (
                <Link
                  key={place.slug}
                  href={`/place/${place.slug}`}
                  className="rounded-[1.5rem] bg-[#F7F7F5] p-4 transition hover:bg-[#111111] hover:text-white"
                >
                  <p className="text-base font-bold">{place.name}</p>
                  <p className="mt-1 text-sm font-semibold text-[#7A7A73]">
                    {place.city} · {place.area}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em]">
                    {place.vibe}
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        </section>

        <section className="mx-auto mt-6 grid max-w-md gap-4 pb-10 md:grid-cols-2 lg:max-w-7xl lg:grid-cols-3">
          {places.map((place) => (
            <Link
              key={place.slug}
              href={`/place/${place.slug}`}
              className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
            >
              <p className="text-sm font-bold text-[#7A7A73]">
                {place.city} · {place.area}
              </p>

              <h3 className="mt-2 text-2xl font-bold tracking-tight">
                {place.name}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#55554F]">
                {place.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#55554F]">
                  {place.mood}
                </span>

                <span className="rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#55554F]">
                  {place.vibe}
                </span>
              </div>

              <p className="mt-5 text-sm font-bold text-[#111111]">
                Apri luogo →
              </p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}