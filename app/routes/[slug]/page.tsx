"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import PlaceImage from "@/components/PlaceImage";
import { supabase } from "@/lib/supabase";

const routes = [
  {
    slug: "roma-romantica-tramonto",
    title: "Roma romantica al tramonto",
    mood: "Romantico",
    vibe: "Dolce vita",
    description:
      "Un percorso morbido tra viste panoramiche, scorci iconici e tappe perfette per una serata romantica.",
    price: "€9",
    duration: "2h 30min",
    stops: [
      "Giardino degli Aranci",
      "Aventino",
      "Trastevere",
      "Belvedere serale",
      "Drink finale",
    ],
    image: "/places/giardino-aranci.webp",
  },
  {
    slug: "dark-academia-walk",
    title: "Dark academia walk",
    mood: "Curioso",
    vibe: "Dark academia",
    description:
      "Biblioteche, cortili silenziosi e luoghi con atmosfera letteraria per una giornata lenta e curiosa.",
    price: "€7",
    duration: "2h",
    stops: [
      "Biblioteca Angelica",
      "Centro storico",
      "Caffè letterario",
      "Cortile nascosto",
    ],
    image: "/places/biblioteca-angelica.jpg",
  },
  {
    slug: "hidden-garden-route",
    title: "Giardini nascosti",
    mood: "Rilassato",
    vibe: "Hidden garden",
    description:
      "Una selezione di spazi verdi, cortili e pause tranquille per staccare dal ritmo della città.",
    price: "€8",
    duration: "2h 15min",
    stops: [
      "Villa Borghese",
      "Giardino segreto",
      "Passeggiata lenta",
      "Pausa verde",
      "Vista finale",
    ],
    image: "/places/villa-borghese.jpg",
  },
  {
    slug: "golden-hour-photo-walk",
    title: "Golden hour photo walk",
    mood: "Creativo",
    vibe: "Golden hour walk",
    description:
      "Un itinerario visivo pensato per foto, architetture, dettagli estetici e luce calda di fine giornata.",
    price: "€10",
    duration: "3h",
    stops: [
      "Chiostro del Bramante",
      "Scorcio architettonico",
      "Piazza nascosta",
      "Golden hour spot",
      "Galleria",
      "Vista finale",
    ],
    image: "/places/chiostro-bramante.png",
  },
  {
    slug: "neon-nightlife-route",
    title: "Neon nightlife route",
    mood: "Sociale",
    vibe: "Neon nightlife",
    description:
      "Una serata tra posti vivi, atmosfere notturne e tappe sociali da fare con amici o nuove conoscenze.",
    price: "€12",
    duration: "3h 30min",
    stops: [
      "Galleria Sciarra",
      "Aperitivo",
      "Locale notturno",
      "Passeggiata neon",
      "Chiusura serata",
    ],
    image: "/places/galleria-sciarra.jpg",
  },
];

export default function RouteDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const [saved, setSaved] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [message, setMessage] = useState("");

  const route = useMemo(() => {
    return routes.find((item) => item.slug === params.slug) ?? null;
  }, [params.slug]);

  useEffect(() => {
    async function checkSaved() {
      if (!route) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("saved_routes")
        .select("id")
        .eq("user_id", user.id)
        .eq("route_slug", route.slug)
        .maybeSingle();

      setSaved(Boolean(data));
    }

    checkSaved();
  }, [route]);

  async function handleSave() {
    if (!route) return;

    setLoadingSave(true);
    setMessage("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      if (saved) {
        const { error } = await supabase
          .from("saved_routes")
          .delete()
          .eq("user_id", user.id)
          .eq("route_slug", route.slug);

        if (error) {
          setMessage(error.message);
          return;
        }

        setSaved(false);
        setMessage("Percorso rimosso dai salvati.");
        return;
      }

      const { error } = await supabase.from("saved_routes").upsert(
        {
          user_id: user.id,
          route_slug: route.slug,
          route_title: route.title,
        },
        {
          onConflict: "user_id,route_slug",
        },
      );

      if (error) {
        setMessage(error.message);
        return;
      }

      setSaved(true);
      setMessage("Percorso salvato.");
    } catch (error) {
      console.error("Errore salvataggio percorso:", error);
      setMessage("Non siamo riusciti a salvare il percorso. Riprova.");
    } finally {
      setLoadingSave(false);
    }
  }

  if (!route) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
        <div className="mx-auto max-w-md">
          <Link
            href="/routes"
            className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold shadow-sm ring-1 ring-black/5"
          >
            ← Percorsi
          </Link>

          <section className="mt-6 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h1 className="text-2xl font-bold tracking-tight">
              Percorso non trovato
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#7A7A73]">
              Il percorso che stai cercando non è disponibile.
            </p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-md pb-10">
        <Link
          href="/routes"
          className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold shadow-sm ring-1 ring-black/5"
        >
          ← Percorsi
        </Link>

        <section className="mt-6 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5">
          <div className="h-64 bg-[#F1F1EE]">
            <PlaceImage
              imageUrl={route.image}
              name={route.title}
              vibe={route.vibe}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A7A73]">
              Percorso premium
            </p>

            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight">
              {route.title}
            </h1>

            <p className="mt-3 text-sm font-semibold text-[#7A7A73]">
              {route.mood} · {route.vibe}
            </p>

            <p className="mt-4 text-base leading-7 text-[#55554F]">
              {route.description}
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-[1rem] bg-[#F7F7F5] px-3 py-3 ring-1 ring-black/5">
                <p className="text-xs font-semibold text-[#7A7A73]">Prezzo</p>
                <p className="mt-1 text-sm font-bold">{route.price}</p>
              </div>

              <div className="rounded-[1rem] bg-[#F7F7F5] px-3 py-3 ring-1 ring-black/5">
                <p className="text-xs font-semibold text-[#7A7A73]">Durata</p>
                <p className="mt-1 text-sm font-bold">{route.duration}</p>
              </div>

              <div className="rounded-[1rem] bg-[#F7F7F5] px-3 py-3 ring-1 ring-black/5">
                <p className="text-xs font-semibold text-[#7A7A73]">Tappe</p>
                <p className="mt-1 text-sm font-bold">{route.stops.length}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <Link
                href={`/checkout/${route.slug}`}
                className="flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-bold text-white"
              >
                Acquista percorso
              </Link>

              <button
                type="button"
                onClick={handleSave}
                disabled={loadingSave}
                className="w-full rounded-full bg-[#F7F7F5] px-6 py-4 text-sm font-bold text-[#111111] ring-1 ring-black/5 disabled:opacity-50"
              >
                {loadingSave
                  ? "Salvataggio..."
                  : saved
                    ? "Percorso salvato"
                    : "Salva percorso"}
              </button>
            </div>

            {message ? (
              <div className="mt-4 rounded-[1.25rem] bg-[#F7F7F5] p-4 text-sm font-semibold leading-6 text-[#55554F] ring-1 ring-black/5">
                {message}
              </div>
            ) : null}
          </div>
        </section>

        <section className="mt-4 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h2 className="text-lg font-bold tracking-tight">
            Tappe del percorso
          </h2>

          <div className="mt-4 grid gap-3">
            {route.stops.map((stop, index) => (
              <div
                key={`${stop}-${index}`}
                className="flex items-center gap-4 rounded-[1.25rem] bg-[#F7F7F5] p-4 ring-1 ring-black/5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#111111] text-sm font-bold text-white">
                  {index + 1}
                </div>

                <div>
                  <p className="text-sm font-bold text-[#111111]">{stop}</p>
                  <p className="mt-1 text-xs font-semibold text-[#7A7A73]">
                    Tappa consigliata
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-[2rem] bg-[#111111] p-6 text-white shadow-xl shadow-black/10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
            Come funziona
          </p>

          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            Acquista il percorso e ritrovalo nella tua area personale.
          </h2>

          <p className="mt-4 text-sm leading-6 text-white/65">
            Il checkout è in modalità demo per l’MVP: nessun pagamento reale
            viene effettuato. Dopo la conferma, il percorso viene aggiunto a “I
            miei percorsi”.
          </p>

          <Link
            href={`/checkout/${route.slug}`}
            className="mt-5 flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-bold text-[#111111]"
          >
            Vai al checkout
          </Link>
        </section>
      </div>
    </main>
  );
}