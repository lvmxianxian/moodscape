import Link from "next/link";
import PlaceImage from "@/components/PlaceImage";

const routes = [
  {
    slug: "roma-romantica-tramonto",
    title: "Roma romantica al tramonto",
    vibe: "Dolce vita",
    mood: "Romantico",
    duration: "2h 30m",
    stops: 4,
    price: "€4,99",
    area: "Aventino · Trastevere",
    description:
      "Un percorso lento tra viste panoramiche, strade morbide e tappe perfette per una serata romantica.",
  },
  {
    slug: "dark-academia-walk",
    title: "Dark academia walk",
    vibe: "Dark academia",
    mood: "Introspettivo",
    duration: "2h",
    stops: 5,
    price: "€3,99",
    area: "Centro storico",
    description:
      "Biblioteche, cortili silenziosi, librerie e caffè raccolti per una giornata più intima e letteraria.",
  },
  {
    slug: "hidden-garden-route",
    title: "Hidden garden route",
    vibe: "Hidden garden",
    mood: "Rilassato",
    duration: "3h",
    stops: 4,
    price: "€4,99",
    area: "Pinciano · Villa Borghese",
    description:
      "Giardini, cortili verdi e luoghi tranquilli dove respirare lontano dal caos della città.",
  },
  {
    slug: "golden-hour-photo-walk",
    title: "Golden hour photo walk",
    vibe: "Golden hour walk",
    mood: "Creativo",
    duration: "1h 45m",
    stops: 3,
    price: "€2,99",
    area: "Villa Borghese · Pincio",
    description:
      "Un percorso fotografico pensato per la luce più bella della giornata, con tappe panoramiche e visuali.",
  },
  {
    slug: "neon-nightlife-route",
    title: "Neon nightlife route",
    vibe: "Neon nightlife",
    mood: "Sociale",
    duration: "3h",
    stops: 5,
    price: "€5,99",
    area: "Monti · Centro",
    description:
      "Una serata guidata tra luci, drink, locali e tappe sociali senza finire nel caos totale.",
  },
];

export default function RoutesPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-7xl">
        <section className="mx-auto max-w-md lg:max-w-7xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#7A7A73]">
                Percorsi Premium
              </p>

              <h1 className="mt-2 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Compra percorsi già pronti per la tua vibe.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#55554F]">
                Itinerari curati da MoodScape con tappe, durata, mood, vibe e
                suggerimenti per vivere la città senza dover decidere tutto da
                zero.
              </p>
            </div>

            <Link
              href="/premium"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111111] text-xl text-white shadow-sm"
            >
              ✦
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">{routes.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Percorsi
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">3-5</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Tappe
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">€2,99+</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Da
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 grid max-w-md gap-4 pb-10 md:grid-cols-2 lg:max-w-7xl lg:grid-cols-3">
          {routes.map((route) => (
            <article
              key={route.slug}
              className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
            >
              <PlaceImage
                imageUrl={null}
                name={route.title}
                vibe={route.vibe}
                className="h-56"
              />

              <div className="p-2 pt-5">
                <p className="text-sm font-semibold text-[#7A7A73]">
                  {route.area}
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                  {route.title}
                </h2>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#55554F]">
                  {route.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#55554F]">
                    {route.vibe}
                  </span>

                  <span className="rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#55554F]">
                    {route.duration}
                  </span>

                  <span className="rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#55554F]">
                    {route.stops} tappe
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                      Prezzo
                    </p>
                    <p className="mt-1 text-2xl font-bold">{route.price}</p>
                  </div>

                  <Link
                    href={`/routes/${route.slug}`}
                    className="rounded-full bg-[#111111] px-5 py-3 text-sm font-bold text-white"
                  >
                    Compra percorso
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}