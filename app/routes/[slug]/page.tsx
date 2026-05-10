import Link from "next/link";
import { notFound } from "next/navigation";
import PlaceImage from "@/components/PlaceImage";

const routes = [
  {
    slug: "roma-romantica-tramonto",
    title: "Roma romantica al tramonto",
    vibe: "Dolce vita",
    mood: "Romantico",
    duration: "2h 30m",
    stops: ["Giardino degli Aranci", "Aventino", "Trastevere", "Vista finale al tramonto"],
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
    stops: ["Biblioteca Angelica", "Centro storico", "Caffè raccolto", "Libreria indipendente", "Cortile silenzioso"],
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
    stops: ["Villa Borghese", "Pinciano", "Giardino nascosto", "Pausa verde"],
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
    stops: ["Pincio", "Villa Borghese", "Spot fotografico finale"],
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
    stops: ["Monti", "Neon Bar", "Drink stop", "Passeggiata serale", "Tappa social finale"],
    price: "€5,99",
    area: "Monti · Centro",
    description:
      "Una serata guidata tra luci, drink, locali e tappe sociali senza finire nel caos totale.",
  },
];

type PageProps = {
  params: {
    slug: string;
  };
};

export default function RouteDetailPage({ params }: PageProps) {
  const route = routes.find((item) => item.slug === params.slug);

  if (!route) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/routes"
          className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-[#111111] shadow-sm ring-1 ring-black/5"
        >
          ← Torna ai percorsi
        </Link>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5">
            <PlaceImage
              imageUrl={null}
              name={route.title}
              vibe={route.vibe}
              className="min-h-[360px]"
            />

            <div className="p-3 pt-6">
              <p className="text-sm font-bold text-[#7A7A73]">
                {route.area} · {route.vibe}
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                {route.title}
              </h1>

              <p className="mt-5 text-base leading-7 text-[#55554F]">
                {route.description}
              </p>
            </div>
          </div>

          <aside className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
              Acquisto percorso
            </p>

            <div className="mt-5 grid gap-3">
              <div className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
                <p className="text-sm font-bold text-[#7A7A73]">Prezzo</p>
                <p className="mt-1 text-3xl font-bold">{route.price}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
                  <p className="text-sm font-bold text-[#7A7A73]">Durata</p>
                  <p className="mt-1 text-lg font-bold">{route.duration}</p>
                </div>

                <div className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
                  <p className="text-sm font-bold text-[#7A7A73]">Tappe</p>
                  <p className="mt-1 text-lg font-bold">{route.stops.length}</p>
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
                <p className="text-sm font-bold text-[#7A7A73]">Mood</p>
                <p className="mt-1 text-lg font-bold">{route.mood}</p>
              </div>
            </div>

            <button className="mt-5 w-full rounded-full bg-[#111111] px-6 py-4 text-sm font-bold text-white">
              Acquista percorso
            </button>

            <p className="mt-4 text-sm leading-6 text-[#55554F]">
              Demo MVP: il pulsante simula l’acquisto. In una versione reale si
              collegherebbe a Stripe o a un sistema di pagamento.
            </p>

            <Link
              href="/premium"
              className="mt-4 block rounded-full bg-[#F1F1EE] px-6 py-4 text-center text-sm font-bold text-[#111111]"
            >
              Vedi Premium
            </Link>
          </aside>
        </section>

        <section className="mt-5 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
            Tappe incluse
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {route.stops.map((stop, index) => (
              <div
                key={stop}
                className="rounded-[1.5rem] bg-[#F7F7F5] p-4"
              >
                <p className="text-sm font-bold text-[#7A7A73]">
                  Tappa {index + 1}
                </p>
                <p className="mt-1 text-lg font-bold">{stop}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}