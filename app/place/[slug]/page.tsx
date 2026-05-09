import Link from "next/link";
import { notFound } from "next/navigation";
import { places } from "@/lib/mock-data";

export function generateStaticParams() {
  return places.map((place) => ({
    slug: place.slug,
  }));
}

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = places.find((item) => item.slug === slug);

  if (!place) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F7F4EF] px-6 py-8 text-[#1A1A2E]">
      <div className="mx-auto max-w-5xl">
        <section className="mt-10 overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-black/10">
          <div className="flex min-h-[280px] items-end bg-[#EDE9FF] p-6">
            <div>
              <span className="rounded-full bg-[#1A1A2E] px-4 py-2 text-xs font-semibold text-white">
                {place.vibe}
              </span>

              <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
                {place.name}
              </h1>

              <p className="mt-3 text-lg font-medium text-[#5B4FCF]">
                {place.city} · {place.mood}
              </p>
            </div>
          </div>

          <div className="grid gap-8 p-6 md:grid-cols-[1.4fr_0.6fr] md:p-8">
            <div>
              <h2 className="text-2xl font-bold">Perché andarci</h2>

              <p className="mt-4 text-lg leading-8 text-[#4B4B5F]">
                {place.longDescription}
              </p>

              <div className="mt-8 rounded-3xl bg-[#F7F4EF] p-5">
                <h3 className="font-bold">Descrizione breve</h3>

                <p className="mt-3 leading-7 text-[#5A5A6E]">
                  {place.description}
                </p>
              </div>

              <div className="mt-8 rounded-3xl bg-[#EDE9FF] p-5">
                <h3 className="font-bold text-[#5B4FCF]">
                  MoodScape insight
                </h3>

                <p className="mt-3 leading-7 text-[#4B4B5F]">
                  Questo luogo è consigliato per chi si sente{" "}
                  <strong>{place.mood.toLowerCase()}</strong> e vuole vivere
                  una vibe <strong>{place.vibe}</strong>.
                </p>
              </div>
            </div>

            <aside className="rounded-3xl border border-[#E8E1D8] p-5">
              <h2 className="text-xl font-bold">Info pratiche</h2>

              <div className="mt-5 space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-[#5B4FCF]">Area</p>
                  <p>{place.area}</p>
                </div>

                <div>
                  <p className="font-semibold text-[#5B4FCF]">Indirizzo</p>
                  <p>{place.address}</p>
                </div>

                <div>
                  <p className="font-semibold text-[#5B4FCF]">Prezzo</p>
                  <p>{place.price}</p>
                </div>

                <div>
                  <p className="font-semibold text-[#5B4FCF]">
                    Durata consigliata
                  </p>
                  <p>{place.time}</p>
                </div>

                <div>
                  <p className="font-semibold text-[#5B4FCF]">
                    Livello socialità
                  </p>
                  <p>{place.socialLevel}</p>
                </div>
              </div>

              <Link
                href="/moodboard"
                className="mt-8 block rounded-full bg-[#5B4FCF] px-6 py-3 text-center font-semibold text-white"
              >
                Salva nella moodboard
              </Link>

              <Link
                href="/map"
                className="mt-3 block rounded-full border border-[#E8E1D8] px-6 py-3 text-center font-semibold text-[#1A1A2E]"
              >
                Vedi sulla mappa
              </Link>

              <Link
                href="/feed"
                className="mt-3 block text-center text-sm font-semibold text-[#5B4FCF]"
              >
                ← Torna al feed
              </Link>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}