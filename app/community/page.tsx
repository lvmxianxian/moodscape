"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import PlaceVisual from "@/components/PlaceVisual";

type CommunityList = {
  id: string;
  user_id: string;
  title: string;
  city: string;
  vibe: string;
  description: string | null;
  visibility: string;
  created_at: string;
};

type ListPlaceRow = {
  vibe_list_id: string;
  place_slug: string;
};

const communityPillars = [
  {
    title: "Persone reali",
    description:
      "MoodScape non parte solo da luoghi in catalogo: parte da persone che salvano, organizzano e condividono esperienze.",
  },
  {
    title: "Liste pubbliche",
    description:
      "Le Vibe Lists pubbliche diventano raccolte consultabili dalla community, costruite intorno ad atmosfere specifiche.",
  },
  {
    title: "Scoperta collettiva",
    description:
      "Ogni lista può diventare un modo per raccontare la città attraverso gusti, mood, percorsi e micro-esperienze personali.",
  },
];

const futureFeatures = [
  "Profili pubblici con username, bio e avatar.",
  "Follow tra utenti e creator locali.",
  "Like e salvataggio delle liste di altri utenti.",
  "Liste collaborative con più contributori.",
  "Suggerimento di nuovi luoghi da parte della community.",
  "Moderazione dei contenuti e segnalazioni.",
];

export default function CommunityPage() {
  const [lists, setLists] = useState<CommunityList[]>([]);
  const [listPlaceRows, setListPlaceRows] = useState<ListPlaceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadCommunity() {
      setLoading(true);
      setMessage("");

      const { data: listData, error: listError } = await supabase
        .from("vibe_lists")
        .select("id,user_id,title,city,vibe,description,visibility,created_at")
        .eq("visibility", "Pubblica")
        .order("created_at", { ascending: false });

      if (listError) {
        setMessage(listError.message);
        setLoading(false);
        return;
      }

      setLists(listData ?? []);

      const { data: placeRows, error: rowsError } = await supabase
        .from("vibe_list_places")
        .select("vibe_list_id,place_slug");

      if (rowsError) {
        setListPlaceRows([]);
      } else {
        setListPlaceRows(placeRows ?? []);
      }

      setLoading(false);
    }

    loadCommunity();
  }, []);

  const creatorCount = useMemo(() => {
    return new Set(lists.map((list) => list.user_id)).size;
  }, [lists]);

  const vibeCount = useMemo(() => {
    return new Set(lists.map((list) => list.vibe)).size;
  }, [lists]);

  function getPlaceCount(listId: string) {
    return listPlaceRows.filter((row) => row.vibe_list_id === listId).length;
  }

  function getCreatorLabel(userId: string) {
    return `Creator ${userId.slice(0, 4).toUpperCase()}`;
  }

  return (
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-10 text-[#0E3532]">
      <div className="mx-auto max-w-7xl">
        <section className="mt-8 rounded-[2rem] bg-[#0E3532] p-8 text-[#F4EFE5] shadow-2xl shadow-[#0E3532]/10">
          <p className="inline-flex rounded-full border border-[#D8B77A] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D8B77A]">
            Community
          </p>

          <h1 className="mt-8 max-w-5xl font-serif text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            MoodScape cresce con le persone che raccontano la città.
          </h1>

          <div className="mt-6 flex max-w-3xl items-center gap-3">
            <div className="h-px flex-1 bg-[#C99A57]" />
            <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
          </div>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#F4EFE5]/75">
            La community è il cuore del prodotto: utenti, creator locali e
            persone curiose possono creare liste, salvare luoghi e trasformare
            esperienze personali in percorsi condivisibili.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/vibe-lists/create"
              className="rounded-full bg-[#D8B77A] px-7 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
            >
              Crea una Vibe List
            </Link>

            <Link
              href="/vibe-lists"
              className="rounded-full border border-[#D8B77A] px-7 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
            >
              Esplora liste
            </Link>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5">
            <p className="font-serif text-5xl font-bold text-[#2A160E]">
              {lists.length}
            </p>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-[#C99A57]">
              Liste pubbliche
            </p>
            <p className="mt-3 leading-7 text-[#425653]">
              Raccolte create dagli utenti e visibili alla community.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5">
            <p className="font-serif text-5xl font-bold text-[#2A160E]">
              {creatorCount}
            </p>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-[#C99A57]">
              Creator attivi
            </p>
            <p className="mt-3 leading-7 text-[#425653]">
              Utenti che hanno già iniziato a costruire raccolte pubbliche.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5">
            <p className="font-serif text-5xl font-bold text-[#2A160E]">
              {vibeCount}
            </p>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-[#C99A57]">
              Vibe raccontate
            </p>
            <p className="mt-3 leading-7 text-[#425653]">
              Atmosfere diverse usate per organizzare la scoperta urbana.
            </p>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {communityPillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5"
            >
              <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
                {pillar.title}
              </h2>

              <p className="mt-4 leading-7 text-[#425653]">
                {pillar.description}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-14">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C99A57]">
                Community lists
              </p>

              <h2 className="mt-3 font-serif text-4xl font-bold text-[#2A160E]">
                Liste pubbliche create dagli utenti.
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-[#425653]">
                Questa sezione legge da Supabase le Vibe Lists pubbliche. È la
                prima base reale della parte community.
              </p>
            </div>

            <Link
              href="/vibe-lists/create"
              className="rounded-full bg-[#0E3532] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
            >
              Crea lista
            </Link>
          </div>

          {loading ? (
            <div className="mt-6 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 text-[#425653]">
              Caricamento community...
            </div>
          ) : message ? (
            <div className="mt-6 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 font-bold text-[#2A160E]">
              {message}
            </div>
          ) : lists.length === 0 ? (
            <div className="mt-6 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8">
              <h3 className="font-serif text-3xl font-bold text-[#2A160E]">
                Non ci sono ancora liste pubbliche.
              </h3>

              <p className="mt-4 max-w-xl leading-7 text-[#425653]">
                Crea una Vibe List pubblica per farla comparire nella sezione
                Community.
              </p>

              <Link
                href="/vibe-lists/create"
                className="mt-6 inline-flex rounded-full bg-[#0E3532] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
              >
                Crea la prima lista
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {lists.map((list) => (
                <Link
                  key={list.id}
                  href={`/vibe-lists/${list.id}`}
                  className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-5 shadow-xl shadow-[#0E3532]/5 transition hover:-translate-y-1 hover:border-[#C99A57]"
                >
                  <PlaceVisual vibe={list.vibe} className="h-44" />

                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                    {list.city} · {getPlaceCount(list.id)} luoghi
                  </p>

                  <h3 className="mt-3 font-serif text-3xl font-bold text-[#2A160E]">
                    {list.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-[#425653]">
                    {list.description || "Lista pubblica della community."}
                  </p>

                  <div className="mt-5 rounded-2xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-3">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                      Creator
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#0E3532]">
                      {getCreatorLabel(list.user_id)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="mt-14 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C99A57]">
                Roadmap community
              </p>

              <h2 className="mt-3 font-serif text-4xl font-bold text-[#2A160E]">
                Cosa aggiungeremo dopo.
              </h2>

              <p className="mt-4 leading-7 text-[#425653]">
                La pagina Community ora è reale come struttura e dati pubblici.
                Il blocco successivo trasforma questa sezione in una parte
                social completa.
              </p>
            </div>

            <div className="grid gap-3">
              {futureFeatures.map((feature) => (
                <div
                  key={feature}
                  className="rounded-2xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-4 text-sm font-bold text-[#0E3532]"
                >
                  ✓ {feature}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}