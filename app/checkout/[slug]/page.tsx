"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
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
    numericPrice: 9,
    duration: "2h 30min",
    stops: "5 tappe",
    image: "/places/giardino-aranci.webp",
    includes: [
      "Itinerario ordinato tappa per tappa",
      "Mappa mentale del percorso",
      "Suggerimenti su orari e momenti migliori",
      "Moodboard estetica del percorso",
      "Accesso permanente nella tua area personale",
    ],
  },
  {
    slug: "dark-academia-walk",
    title: "Dark academia walk",
    mood: "Curioso",
    vibe: "Dark academia",
    description:
      "Biblioteche, cortili silenziosi e luoghi con atmosfera letteraria per una giornata lenta e curiosa.",
    price: "€7",
    numericPrice: 7,
    duration: "2h",
    stops: "4 tappe",
    image: "/places/biblioteca-angelica.jpg",
    includes: [
      "Itinerario ordinato tappa per tappa",
      "Luoghi silenziosi e suggestivi",
      "Consigli per pause lettura e foto",
      "Moodboard dark academia",
      "Accesso permanente nella tua area personale",
    ],
  },
  {
    slug: "hidden-garden-route",
    title: "Giardini nascosti",
    mood: "Rilassato",
    vibe: "Hidden garden",
    description:
      "Una selezione di spazi verdi, cortili e pause tranquille per staccare dal ritmo della città.",
    price: "€8",
    numericPrice: 8,
    duration: "2h 15min",
    stops: "5 tappe",
    image: "/places/villa-borghese.jpg",
    includes: [
      "Itinerario rilassato e mobile-first",
      "Tappe verdi e poco caotiche",
      "Suggerimenti per pause lente",
      "Moodboard natural e quiet luxury",
      "Accesso permanente nella tua area personale",
    ],
  },
  {
    slug: "golden-hour-photo-walk",
    title: "Golden hour photo walk",
    mood: "Creativo",
    vibe: "Golden hour walk",
    description:
      "Un itinerario visivo pensato per foto, architetture, dettagli estetici e luce calda di fine giornata.",
    price: "€10",
    numericPrice: 10,
    duration: "3h",
    stops: "6 tappe",
    image: "/places/chiostro-bramante.png",
    includes: [
      "Percorso pensato per foto e contenuti",
      "Tappe ordinate per luce e atmosfera",
      "Suggerimenti per orari golden hour",
      "Moodboard visiva del percorso",
      "Accesso permanente nella tua area personale",
    ],
  },
  {
    slug: "neon-nightlife-route",
    title: "Neon nightlife route",
    mood: "Sociale",
    vibe: "Neon nightlife",
    description:
      "Una serata tra posti vivi, atmosfere notturne e tappe sociali da fare con amici o nuove conoscenze.",
    price: "€12",
    numericPrice: 12,
    duration: "3h 30min",
    stops: "5 tappe",
    image: "/places/galleria-sciarra.jpg",
    includes: [
      "Itinerario serale pronto da seguire",
      "Tappe sociali e fotogeniche",
      "Suggerimenti per iniziare e chiudere la serata",
      "Moodboard nightlife",
      "Accesso permanente nella tua area personale",
    ],
  },
];

export default function CheckoutRoutePage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const route = useMemo(() => {
    return routes.find((item) => item.slug === params.slug) ?? null;
  }, [params.slug]);

  const discountApplied = discountCode.trim().toUpperCase() === "MOOD10";
  const discount = route && discountApplied ? 1 : 0;
  const subtotal = route?.numericPrice ?? 0;
  const total = Math.max(subtotal - discount, 0);

  async function handlePurchase(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!route) return;

    setLoading(true);
    setMessage("");

    if (!cardName.trim() || !cardNumber.trim() || !expiry.trim() || !cvv.trim()) {
      setMessage("Completa tutti i campi del pagamento demo.");
      setLoading(false);
      return;
    }

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        setMessage(userError.message);
        return;
      }

      if (!user) {
        router.push("/login");
        return;
      }

      const { error } = await supabase.from("route_purchases").upsert(
        {
          user_id: user.id,
          route_slug: route.slug,
          route_title: route.title,
          price: route.price,
        },
        {
          onConflict: "user_id,route_slug",
        },
      );

      if (error) {
        setMessage(error.message);
        return;
      }

      router.push("/my-routes");
      router.refresh();
    } catch (error) {
      console.error("Errore acquisto percorso:", error);
      setMessage(
        "Non siamo riusciti a completare il pagamento demo. Riprova tra poco.",
      );
    } finally {
      setLoading(false);
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
          href={`/routes/${route.slug}`}
          className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold shadow-sm ring-1 ring-black/5"
        >
          ← Torna al percorso
        </Link>

        <section className="mt-6 rounded-[2rem] bg-[#111111] p-6 text-white shadow-xl shadow-black/10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
            Checkout sicuro
          </p>

          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight">
            Completa il tuo acquisto.
          </h1>

          <p className="mt-4 text-sm leading-6 text-white/65">
            Pagamento demo per MVP: nessun addebito reale verrà effettuato.
            Il percorso verrà aggiunto alla tua area personale.
          </p>

          <div className="mt-5 rounded-[1.5rem] bg-white/10 p-4 ring-1 ring-white/10">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">
              Totale ordine
            </p>
            <p className="mt-2 text-5xl font-bold">€{total}</p>
          </div>
        </section>

        <section className="mt-4 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5">
          <div className="h-52 bg-[#F1F1EE]">
            <img
              src={route.image}
              alt={route.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A7A73]">
              Il tuo percorso
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight">
              {route.title}
            </h2>

            <p className="mt-2 text-sm font-semibold text-[#7A7A73]">
              {route.mood} · {route.vibe}
            </p>

            <p className="mt-4 text-sm leading-6 text-[#55554F]">
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
                <p className="mt-1 text-sm font-bold">{route.stops}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h2 className="text-lg font-bold tracking-tight">Cosa include</h2>

          <div className="mt-4 grid gap-3">
            {route.includes.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-[1.25rem] bg-[#F7F7F5] p-4 ring-1 ring-black/5"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#111111] text-xs font-bold text-white">
                  ✓
                </span>
                <p className="text-sm font-semibold leading-6 text-[#55554F]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <form
          onSubmit={handlePurchase}
          className="mt-4 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold tracking-tight">
                Metodo di pagamento
              </h2>
              <p className="mt-1 text-sm font-medium text-[#7A7A73]">
                Carta demo, nessun addebito reale.
              </p>
            </div>

            <div className="rounded-full bg-[#F7F7F5] px-4 py-2 text-xs font-bold text-[#111111] ring-1 ring-black/5">
              Demo
            </div>
          </div>

          <div className="mt-5 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-[#111111]">
                Nome sulla carta
              </span>
              <input
                value={cardName}
                onChange={(event) => setCardName(event.target.value)}
                placeholder="Valeria Marangella"
                className="rounded-[1.25rem] bg-[#F7F7F5] px-5 py-4 text-base outline-none ring-1 ring-black/5 focus:ring-[#111111]"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-[#111111]">
                Numero carta
              </span>
              <input
                value={cardNumber}
                onChange={(event) => setCardNumber(event.target.value)}
                inputMode="numeric"
                placeholder="4242 4242 4242 4242"
                className="rounded-[1.25rem] bg-[#F7F7F5] px-5 py-4 text-base outline-none ring-1 ring-black/5 focus:ring-[#111111]"
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#111111]">
                  Scadenza
                </span>
                <input
                  value={expiry}
                  onChange={(event) => setExpiry(event.target.value)}
                  placeholder="12/28"
                  className="rounded-[1.25rem] bg-[#F7F7F5] px-5 py-4 text-base outline-none ring-1 ring-black/5 focus:ring-[#111111]"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-[#111111]">CVV</span>
                <input
                  value={cvv}
                  onChange={(event) => setCvv(event.target.value)}
                  inputMode="numeric"
                  placeholder="123"
                  className="rounded-[1.25rem] bg-[#F7F7F5] px-5 py-4 text-base outline-none ring-1 ring-black/5 focus:ring-[#111111]"
                />
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-[#111111]">
                Codice sconto
              </span>
              <input
                value={discountCode}
                onChange={(event) => setDiscountCode(event.target.value)}
                placeholder="Prova MOOD10"
                className="rounded-[1.25rem] bg-[#F7F7F5] px-5 py-4 text-base outline-none ring-1 ring-black/5 focus:ring-[#111111]"
              />
            </label>
          </div>

          <section className="mt-6 rounded-[1.5rem] bg-[#F7F7F5] p-4 ring-1 ring-black/5">
            <div className="flex items-center justify-between text-sm font-semibold text-[#55554F]">
              <span>Subtotale</span>
              <span>{route.price}</span>
            </div>

            <div className="mt-3 flex items-center justify-between text-sm font-semibold text-[#55554F]">
              <span>Sconto</span>
              <span>{discountApplied ? "-€1" : "€0"}</span>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-4">
              <span className="text-base font-bold">Totale</span>
              <span className="text-2xl font-bold">€{total}</span>
            </div>
          </section>

          {message ? (
            <div className="mt-4 rounded-[1.25rem] bg-[#F7F7F5] p-4 text-sm font-semibold leading-6 text-[#55554F] ring-1 ring-black/5">
              {message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-full bg-[#111111] px-6 py-4 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Pagamento in corso..." : `Paga €${total}`}
          </button>

          <p className="mt-4 text-center text-xs font-semibold leading-5 text-[#7A7A73]">
            Questo è un checkout demo per la presentazione MVP. Non inserire
            dati reali della carta.
          </p>
        </form>
      </div>
    </main>
  );
}