import Link from "next/link";
import { places } from "@/lib/mock-data";

export default function FeedPage() {
  return (
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-10 text-[#0E3532]">
      <div className="mx-auto max-w-7xl">
        <section className="mt-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#D8B77A] bg-[#F8F2E8] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em]">
            <span className="h-3 w-3 rounded-full bg-[#C99A57]" />
            Vibe Feed
          </div>

          <h1 className="mt-10 max-w-4xl font-serif text-5xl font-bold leading-none tracking-tight text-[#2A160E] md:text-7xl">
            Posti scelti secondo il tuo umore.
          </h1>

          <div className="mt-6 flex max-w-3xl items-center gap-3">
            <div className="h-px flex-1 bg-[#C99A57]" />
            <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
          </div>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#425653]">
            Una selezione di luoghi, atmosfere e percorsi urbani costruiti
            intorno a mood personali e vibe estetiche.
          </p>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {places.map((place) => (
            <Link
              key={place.slug}
              href={`/place/${place.slug}`}
              className="group overflow-hidden rounded-[2rem] border border-[#D8B77A]/40 bg-[#F8F2E8] p-4 shadow-xl shadow-[#0E3532]/5 transition hover:-translate-y-1 hover:border-[#C99A57]"
            >
              <div className="flex h-56 items-end rounded-[1.5rem] bg-[#0E3532] p-4">
                <span className="rounded-full bg-[#F4EFE5] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0E3532]">
                  {place.vibe}
                </span>
              </div>

              <div className="mt-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-serif text-2xl font-bold text-[#2A160E]">
                    {place.name}
                  </h2>

                  <span className="rounded-full border border-[#D8B77A] px-3 py-1 text-xs font-bold text-[#0E3532]">
                    {place.price}
                  </span>
                </div>

                <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                  {place.city} · {place.mood} · {place.time}
                </p>

                <p className="mt-4 text-sm leading-6 text-[#425653]">
                  {place.description}
                </p>

                <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532] transition group-hover:text-[#C99A57]">
                  Apri dettaglio →
                </p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}