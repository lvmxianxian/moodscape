"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PlaceImage from "@/components/PlaceImage";

type RoutePurchase = {
  route_slug: string;
  route_title: string;
  price: string;
  created_at: string;
};

type SavedRoute = {
  route_slug: string;
  route_title: string;
  created_at: string;
};

export default function MyRoutesPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [purchases, setPurchases] = useState<RoutePurchase[]>([]);
  const [savedRoutes, setSavedRoutes] = useState<SavedRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadMyRoutes() {
      setLoading(true);
      setMessage("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setEmail(null);
        setLoading(false);
        return;
      }

      setEmail(session.user.email ?? null);

      const { data: purchaseData, error: purchaseError } = await supabase
        .from("route_purchases")
        .select("route_slug,route_title,price,created_at")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (purchaseError) {
        setMessage(purchaseError.message);
        setLoading(false);
        return;
      }

      const { data: savedData, error: savedError } = await supabase
        .from("saved_routes")
        .select("route_slug,route_title,created_at")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (savedError) {
        setMessage(savedError.message);
        setLoading(false);
        return;
      }

      setPurchases(purchaseData ?? []);
      setSavedRoutes(savedData ?? []);
      setLoading(false);
    }

    loadMyRoutes();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          Caricamento percorsi...
        </div>
      </main>
    );
  }

  if (!email) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
        <div className="mx-auto max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-semibold text-[#7A7A73]">
            I miei percorsi
          </p>

          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight">
            Accedi per vedere i tuoi percorsi.
          </h1>

          <p className="mt-4 leading-7 text-[#55554F]">
            Qui troverai i percorsi acquistati e quelli salvati.
          </p>

          <div className="mt-6 grid gap-3">
            <Link
              href="/login"
              className="rounded-full bg-[#111111] px-6 py-4 text-center text-sm font-bold text-white"
            >
              Accedi
            </Link>

            <Link
              href="/signup"
              className="rounded-full bg-[#F1F1EE] px-6 py-4 text-center text-sm font-bold text-[#111111]"
            >
              Crea account
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-7xl">
        <section className="mx-auto max-w-md lg:max-w-7xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#7A7A73]">
                Area personale
              </p>

              <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                I miei percorsi.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#55554F]">
                Ritrova i percorsi che hai acquistato o salvato. Da qui puoi
                riaprirli e usarli quando vuoi.
              </p>
            </div>

            <Link
              href="/routes"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111111] text-xl text-white shadow-sm"
            >
              +
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">{purchases.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Acquistati
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">{savedRoutes.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Salvati
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">
                {purchases.length + savedRoutes.length}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Totale
              </p>
            </div>
          </div>

          {message && (
            <div className="mt-5 rounded-[1.5rem] bg-white p-4 text-sm font-semibold text-[#55554F] shadow-sm ring-1 ring-black/5">
              {message}
            </div>
          )}
        </section>

        <section className="mx-auto mt-8 max-w-md lg:max-w-7xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Percorsi acquistati
            </h2>

            <Link href="/routes" className="text-sm font-bold text-[#7A7A73]">
              Scopri percorsi
            </Link>
          </div>

          {purchases.length === 0 ? (
            <div className="mt-4 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="text-2xl font-bold tracking-tight">
                Non hai ancora acquistato percorsi.
              </h3>

              <p className="mt-3 leading-7 text-[#55554F]">
                Vai nella sezione Percorsi e acquista un itinerario pronto per
                la tua vibe.
              </p>

              <Link
                href="/routes"
                className="mt-5 inline-flex rounded-full bg-[#111111] px-6 py-3 text-sm font-bold text-white"
              >
                Vai ai percorsi
              </Link>
            </div>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {purchases.map((route) => (
                <Link
                  key={route.route_slug}
                  href={`/routes/${route.route_slug}`}
                  className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
                >
                  <PlaceImage
                    imageUrl={null}
                    name={route.route_title}
                    vibe="Percorso"
                    className="h-52"
                  />

                  <div className="p-2 pt-5">
                    <p className="text-sm font-semibold text-[#7A7A73]">
                      Acquistato · {route.price}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold tracking-tight">
                      {route.route_title}
                    </h3>

                    <p className="mt-5 text-sm font-bold text-[#111111]">
                      Apri percorso →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="mx-auto mt-8 max-w-md pb-10 lg:max-w-7xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Percorsi salvati
            </h2>

            <Link href="/routes" className="text-sm font-bold text-[#7A7A73]">
              Tutti
            </Link>
          </div>

          {savedRoutes.length === 0 ? (
            <div className="mt-4 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="text-2xl font-bold tracking-tight">
                Nessun percorso salvato.
              </h3>

              <p className="mt-3 leading-7 text-[#55554F]">
                Salva un percorso per ritrovarlo qui anche senza acquistarlo
                subito.
              </p>
            </div>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {savedRoutes.map((route) => (
                <Link
                  key={route.route_slug}
                  href={`/routes/${route.route_slug}`}
                  className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
                >
                  <PlaceImage
                    imageUrl={null}
                    name={route.route_title}
                    vibe="Salvato"
                    className="h-52"
                  />

                  <div className="p-2 pt-5">
                    <p className="text-sm font-semibold text-[#7A7A73]">
                      Percorso salvato
                    </p>

                    <h3 className="mt-2 text-2xl font-bold tracking-tight">
                      {route.route_title}
                    </h3>

                    <p className="mt-5 text-sm font-bold text-[#111111]">
                      Apri percorso →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}