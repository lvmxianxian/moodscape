"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import PlaceImage from "@/components/PlaceImage";
import { supabase } from "@/lib/supabase";
import ReportButton from "@/components/ReportButton";

const routes = [
  {
    slug: "roma-romantica-tramonto",
    title: "Roma romantica al tramonto",
    vibe: "Dolce vita",
    mood: "Romantico",
    duration: "2h 30m",
    stops: [
      "Giardino degli Aranci",
      "Aventino",
      "Trastevere",
      "Vista finale al tramonto",
    ],
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
    stops: [
      "Biblioteca Angelica",
      "Centro storico",
      "Caffè raccolto",
      "Libreria indipendente",
      "Cortile silenzioso",
    ],
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
    stops: [
      "Monti",
      "Neon Bar",
      "Drink stop",
      "Passeggiata serale",
      "Tappa social finale",
    ],
    price: "€5,99",
    area: "Monti · Centro",
    description:
      "Una serata guidata tra luci, drink, locali e tappe sociali senza finire nel caos totale.",
  },
];

type RoutePurchase = {
  route_slug: string;
  user_id: string;
};

type SavedRoute = {
  route_slug: string;
  user_id: string;
};

export default function RouteDetailPage() {
  const params = useParams<{ slug: string }>();

  const routeMatch = routes.find((item) => item.slug === params.slug);

  if (!routeMatch) {
    notFound();
  }

  const route = routeMatch;

  const [userId, setUserId] = useState<string | null>(null);
  const [purchases, setPurchases] = useState<RoutePurchase[]>([]);
  const [savedRoutes, setSavedRoutes] = useState<SavedRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    async function loadRouteState() {
      setLoading(true);
      setActionMessage("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUserId(session?.user.id ?? null);

      if (!session) {
        setPurchases([]);
        setSavedRoutes([]);
        setLoading(false);
        return;
      }

      const { data: purchaseData } = await supabase
        .from("route_purchases")
        .select("route_slug,user_id")
        .eq("route_slug", route.slug)
        .eq("user_id", session.user.id);

      const { data: savedData } = await supabase
        .from("saved_routes")
        .select("route_slug,user_id")
        .eq("route_slug", route.slug)
        .eq("user_id", session.user.id);

      setPurchases(purchaseData ?? []);
      setSavedRoutes(savedData ?? []);
      setLoading(false);
    }

    loadRouteState();
  }, [route.slug]);

  const purchased = useMemo(() => {
    return Boolean(
      userId &&
        purchases.some(
          (purchase) =>
            purchase.user_id === userId && purchase.route_slug === route.slug,
        ),
    );
  }, [purchases, route.slug, userId]);

  const saved = useMemo(() => {
    return Boolean(
      userId &&
        savedRoutes.some(
          (savedRoute) =>
            savedRoute.user_id === userId &&
            savedRoute.route_slug === route.slug,
        ),
    );
  }, [route.slug, savedRoutes, userId]);

  function requireLogin() {
    if (!userId) {
      setActionMessage(
        "Per acquistare o salvare un percorso devi prima accedere.",
      );
      return false;
    }

    setActionMessage("");
    return true;
  }

  async function buyRoute() {
    if (!requireLogin() || !userId) return;

    if (purchased) {
      setActionMessage("Hai già acquistato questo percorso.");
      return;
    }

    const newPurchase = {
      user_id: userId,
      route_slug: route.slug,
      route_title: route.title,
      price: route.price,
    };

    const { error } = await supabase.from("route_purchases").insert(newPurchase);

    if (error) {
      setActionMessage(error.message);
      return;
    }

    setPurchases((current) => [
      ...current,
      { user_id: userId, route_slug: route.slug },
    ]);

    setActionMessage("Percorso acquistato. Lo trovi nei tuoi percorsi.");
  }

  async function toggleSavedRoute() {
    if (!requireLogin() || !userId) return;

    if (saved) {
      const { error } = await supabase
        .from("saved_routes")
        .delete()
        .eq("user_id", userId)
        .eq("route_slug", route.slug);

      if (error) {
        setActionMessage(error.message);
        return;
      }

      setSavedRoutes((current) =>
        current.filter(
          (savedRoute) =>
            !(
              savedRoute.user_id === userId &&
              savedRoute.route_slug === route.slug
            ),
        ),
      );

      setActionMessage("Percorso rimosso dai salvati.");
      return;
    }

    const newSavedRoute = {
      user_id: userId,
      route_slug: route.slug,
      route_title: route.title,
    };

    const { error } = await supabase.from("saved_routes").insert(newSavedRoute);

    if (error) {
      setActionMessage(error.message);
      return;
    }

    setSavedRoutes((current) => [
      ...current,
      { user_id: userId, route_slug: route.slug },
    ]);

    setActionMessage("Percorso salvato.");
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

            {!userId && (
              <div className="mt-5 rounded-[1.5rem] bg-[#F7F7F5] p-4">
                <p className="text-sm font-semibold leading-6 text-[#55554F]">
                  Accedi per acquistare o salvare questo percorso.
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

            {actionMessage && (
              <div className="mt-5 rounded-[1.5rem] bg-[#F7F7F5] p-4 text-sm font-semibold leading-6 text-[#55554F]">
                {actionMessage}
              </div>
            )}

            <ReportButton
              targetType="place"
              targetId={route.slug}
              label="Segnala percorso"
            />

            <Link
              href={`/checkout/${route.slug}`}
              className="mt-5 block rounded-full bg-[#111111] px-6 py-4 text-center text-sm font-bold text-white"
            >
              Vai al checkout
            </Link>

            <button
              onClick={buyRoute}
              disabled={loading || purchased}
              className={`mt-3 w-full rounded-full px-6 py-4 text-sm font-bold disabled:cursor-not-allowed ${
                purchased
                  ? "bg-[#F1F1EE] text-[#111111]"
                  : "bg-[#F1F1EE] text-[#111111]"
              }`}
            >
              {purchased ? "Percorso acquistato ✓" : "Acquista senza checkout demo"}
            </button>

            <button
              onClick={toggleSavedRoute}
              disabled={loading}
              className="mt-3 w-full rounded-full bg-[#F1F1EE] px-6 py-4 text-sm font-bold text-[#111111] disabled:opacity-60"
            >
              {saved ? "Percorso salvato ✓" : "Salva percorso"}
            </button>

            <Link
              href="/my-routes"
              className="mt-3 block rounded-full bg-[#F1F1EE] px-6 py-4 text-center text-sm font-bold text-[#111111]"
            >
              I miei percorsi
            </Link>

            <p className="mt-4 text-sm leading-6 text-[#55554F]">
              Demo MVP: il checkout simula il carrello e il pagamento con carta.
              In una versione reale verrebbe collegato a Stripe Checkout.
            </p>
          </aside>
        </section>

        <section className="mt-5 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
            Tappe incluse
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {route.stops.map((stop, index) => (
              <div key={stop} className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
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