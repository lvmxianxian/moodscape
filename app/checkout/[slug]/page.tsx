"use client";

import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PlaceImage from "@/components/PlaceImage";

const routes = [
  {
    slug: "roma-romantica-tramonto",
    title: "Roma romantica al tramonto",
    vibe: "Dolce vita",
    duration: "2h 30m",
    stops: "4 tappe",
    price: "€4,99",
    numericPrice: "4,99",
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
    numericPrice: "3,99",
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
    numericPrice: "4,99",
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
    numericPrice: "2,99",
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
    numericPrice: "5,99",
    area: "Monti · Centro",
    description:
      "Una serata guidata tra luci, drink, locali e tappe sociali senza finire nel caos totale.",
  },
];

export default function CheckoutPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const routeMatch = routes.find((item) => item.slug === params.slug);

  if (!routeMatch) {
    notFound();
  }

  const route = routeMatch;

  const [userId, setUserId] = useState<string | null>(null);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUserId(session?.user.id ?? null);
      setLoading(false);
    }

    loadSession();
  }, []);

  async function handleDemoPayment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!userId) {
      setMessage("Per acquistare un percorso devi prima accedere.");
      return;
    }

    if (!cardName || !cardNumber || !expiry || !cvc) {
      setMessage("Compila tutti i campi demo del pagamento.");
      return;
    }

    setPaying(true);
    setMessage("");

    const { error } = await supabase.from("route_purchases").upsert(
      {
        user_id: userId,
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
      setPaying(false);
      return;
    }

    router.push("/my-routes");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          Caricamento checkout...
        </div>
      </main>
    );
  }

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
          <div className="rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5">
            <PlaceImage
              imageUrl={null}
              name={route.title}
              vibe={route.vibe}
              className="min-h-[340px]"
            />

            <div className="p-3 pt-6">
              <p className="text-sm font-bold text-[#7A7A73]">
                Checkout percorso · {route.area}
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Completa l’acquisto.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-[#55554F]">
                Questa è una schermata checkout demo. Non inserire dati reali:
                serve solo a simulare il flusso di acquisto per la demo MVP.
              </p>
            </div>
          </div>

          <aside className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
              Carrello
            </p>

            <div className="mt-5 rounded-[1.5rem] bg-[#F7F7F5] p-4">
              <p className="text-sm font-bold text-[#7A7A73]">
                Percorso selezionato
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                {route.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#55554F]">
                {route.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-3 py-2 text-xs font-bold">
                  {route.duration}
                </span>

                <span className="rounded-full bg-white px-3 py-2 text-xs font-bold">
                  {route.stops}
                </span>

                <span className="rounded-full bg-white px-3 py-2 text-xs font-bold">
                  {route.vibe}
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-[1.5rem] bg-[#111111] p-5 text-white">
              <p className="text-sm font-bold text-white/50">Totale</p>
              <p className="mt-2 text-4xl font-bold">{route.price}</p>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Pagamento una tantum per sbloccare il percorso nella tua area
                personale.
              </p>
            </div>

            {!userId && (
              <div className="mt-4 rounded-[1.5rem] bg-[#F7F7F5] p-4">
                <p className="text-sm font-semibold leading-6 text-[#55554F]">
                  Accedi per completare l’acquisto.
                </p>

                <div className="mt-4 flex gap-2">
                  <Link
                    href="/login"
                    className="rounded-full bg-[#111111] px-5 py-3 text-sm font-bold text-white"
                  >
                    Accedi
                  </Link>

                  <Link
                    href="/signup"
                    className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#111111]"
                  >
                    Registrati
                  </Link>
                </div>
              </div>
            )}

            <form onSubmit={handleDemoPayment} className="mt-5 grid gap-3">
              <div>
                <label className="text-sm font-bold text-[#7A7A73]">
                  Nome sulla carta
                </label>
                <input
                  value={cardName}
                  onChange={(event) => setCardName(event.target.value)}
                  placeholder="Mario Rossi"
                  className="mt-2 w-full rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] px-4 py-4 text-sm font-semibold outline-none focus:border-[#111111]"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-[#7A7A73]">
                  Numero carta demo
                </label>
                <input
                  value={cardNumber}
                  onChange={(event) => setCardNumber(event.target.value)}
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                  className="mt-2 w-full rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] px-4 py-4 text-sm font-semibold outline-none focus:border-[#111111]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-bold text-[#7A7A73]">
                    Scadenza
                  </label>
                  <input
                    value={expiry}
                    onChange={(event) => setExpiry(event.target.value)}
                    placeholder="12/28"
                    className="mt-2 w-full rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] px-4 py-4 text-sm font-semibold outline-none focus:border-[#111111]"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-[#7A7A73]">
                    CVC
                  </label>
                  <input
                    value={cvc}
                    onChange={(event) => setCvc(event.target.value)}
                    placeholder="123"
                    inputMode="numeric"
                    className="mt-2 w-full rounded-[1.25rem] border border-black/10 bg-[#F7F7F5] px-4 py-4 text-sm font-semibold outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              {message && (
                <div className="rounded-[1.25rem] bg-[#F7F7F5] p-4 text-sm font-semibold leading-6 text-[#55554F]">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={paying}
                className="mt-2 rounded-full bg-[#111111] px-6 py-4 text-sm font-bold text-white disabled:opacity-60"
              >
                {paying ? "Pagamento demo..." : `Paga demo ${route.price}`}
              </button>

              <p className="text-xs font-semibold leading-5 text-[#7A7A73]">
                Demo MVP: nessun pagamento reale viene processato. In produzione
                questo flusso andrebbe sostituito con Stripe Checkout.
              </p>
            </form>
          </aside>
        </section>
      </div>
    </main>
  );
}