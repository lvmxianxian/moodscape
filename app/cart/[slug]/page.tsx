"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import PlaceImage from "@/components/PlaceImage";

const routes = [
  {
    slug: "roma-romantica-tramonto",
    title: "Roma romantica al tramonto",
    vibe: "Dolce vita",
    duration: "2h 30m",
    stops: "4 tappe",
    price: "€4,99",
    area: "Aventino · Trastevere",
    description:
      "Un percorso lento tra viste panoramiche, strade morbide e tappe perfette per una serata romantica.",
  },
  {
    slug: "dark-academia-walk",
    title: "Dark academia walk",
    vibe: "Dark academia",
    duration: "2h",
    stops: "5 tappe",
    price: "€3,99",
    area: "Centro storico",
    description:
      "Biblioteche, cortili silenziosi, librerie e caffè raccolti per una giornata più intima e letteraria.",
  },
  {
    slug: "hidden-garden-route",
    title: "Hidden garden route",
    vibe: "Hidden garden",
    duration: "3h",
    stops: "4 tappe",
    price: "€4,99",
    area: "Pinciano · Villa Borghese",
    description:
      "Giardini, cortili verdi e luoghi tranquilli dove respirare lontano dal caos della città.",
  },
  {
    slug: "golden-hour-photo-walk",
    title: "Golden hour photo walk",
    vibe: "Golden hour walk",
    duration: "1h 45m",
    stops: "3 tappe",
    price: "€2,99",
    area: "Villa Borghese · Pincio",
    description:
      "Un percorso fotografico pensato per la luce più bella della giornata, con tappe panoramiche e visuali.",
  },
  {
    slug: "neon-nightlife-route",
    title: "Neon nightlife route",
    vibe: "Neon nightlife",
    duration: "3h",
    stops: "5 tappe",
    price: "€5,99",
    area: "Monti · Centro",
    description:
      "Una serata guidata tra luci, drink, locali e tappe sociali senza finire nel caos totale.",
  },
];

export default function CartPage() {
  const params = useParams<{ slug: string }>();

  const routeMatch = routes.find((item) => item.slug === params.slug);

  if (!routeMatch) {
    notFound();
  }

  const route = routeMatch;

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-6xl">
        <Link
          href={`/routes/${route.slug}`}
          className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-[#111111] shadow-sm ring-1 ring-black/5"
        >
          ← Torna al percorso
        </Link>

        <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_420px]">
          <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5">
            <PlaceImage
              imageUrl={null}
              name={route.title}
              vibe={route.vibe}
              className="min-h-[340px]"
            />

            <div className="p-3 pt-6">
              <p className="text-sm font-bold text-[#7A7A73]">
                Carrello MoodScape
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Il tuo carrello.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-[#55554F]">
                Controlla il percorso selezionato prima di passare al checkout.
                In questa demo puoi acquistare un percorso alla volta.
              </p>
            </div>
          </div>

          <aside className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
              Riepilogo ordine
            </p>

            <div className="mt-5 rounded-[1.5rem] bg-[#F7F7F5] p-4">
              <p className="text-sm font-bold text-[#7A7A73]">
                Percorso nel carrello
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                {route.title}
              </h2>

              <p className="mt-2 text-sm font-semibold text-[#7A7A73]">
                {route.area} · {route.vibe}
              </p>

              <p className="mt-4 text-sm leading-6 text-[#55554F]">
                {route.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-[#111111]">
                  {route.duration}
                </span>

                <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-[#111111]">
                  {route.stops}
                </span>

                <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-[#111111]">
                  Digitale
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-[1.5rem] bg-[#111111] p-5 text-white">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-bold text-white/50">Subtotale</p>
                <p className="text-xl font-bold">{route.price}</p>
              </div>

              <div className="mt-3 flex items-center justify-between gap-4">
                <p className="text-sm font-bold text-white/50">Commissioni</p>
                <p className="text-xl font-bold">€0,00</p>
              </div>

              <div className="mt-5 border-t border-white/10 pt-5">
                <p className="text-sm font-bold text-white/50">Totale</p>
                <p className="mt-2 text-4xl font-bold">{route.price}</p>
              </div>
            </div>

            <Link
              href={`/checkout/${route.slug}`}
              className="mt-5 block rounded-full bg-[#111111] px-6 py-4 text-center text-sm font-bold text-white"
            >
              Procedi al checkout
            </Link>

            <Link
              href="/routes"
              className="mt-3 block rounded-full bg-[#F1F1EE] px-6 py-4 text-center text-sm font-bold text-[#111111]"
            >
              Continua a esplorare
            </Link>

            <p className="mt-4 text-xs font-semibold leading-5 text-[#7A7A73]">
              Demo MVP: il carrello è simulato e contiene un solo percorso alla
              volta. Il pagamento viene completato nella schermata checkout.
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
}