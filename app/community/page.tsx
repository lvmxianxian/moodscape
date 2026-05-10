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

const communityStories = [
  {
    creator: "Local curator",
    handle: "@slowroma",
    vibe: "Dolce vita",
    text: "Ho creato una lista per giornate lente, panorami morbidi e posti dove Roma sembra un film.",
  },
  {
    creator: "Urban explorer",
    handle: "@hiddenwalks",
    vibe: "Hidden garden",
    text: "La parte più bella della città è spesso quella che non trovi subito: cortili, giardini, angoli silenziosi.",
  },
  {
    creator: "Night mood",
    handle: "@afterdark",
    vibe: "Neon nightlife",
    text: "MoodScape dovrebbe aiutarti a scegliere una serata non solo per zona, ma per energia emotiva.",
  },
];

const futureActions = [
  "Seguire creator e profili locali",
  "Mettere like alle Vibe Lists",
  "Commentare esperienze e percorsi",
  "Creare liste collaborative",
  "Suggerire nuovi luoghi alla community",
  "Moderare contenuti e segnalazioni",
];

export default function CommunityPage() {
  const [lists, setLists] = useState<CommunityList[]>([]);
  const [listPlaceRows, setListPlaceRows] = useState<ListPlaceRow[]>([]);
  const [likedLists, setLikedLists] = useState<string[]>([]);
  const [followedCreators, setFollowedCreators] = useState<string[]>([]);
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

      const { data: placeRows } = await supabase
        .from("vibe_list_places")
        .select("vibe_list_id,place_slug");

      setListPlaceRows(placeRows ?? []);
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

  const trendingVibes = useMemo(() => {
    const counts = new Map<string, number>();

    lists.forEach((list) => {
      counts.set(list.vibe, (counts.get(list.vibe) ?? 0) + 1);
    });

    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [lists]);

  function getPlaceCount(listId: string) {
    return listPlaceRows.filter((row) => row.vibe_list_id === listId).length;
  }

  function getCreatorLabel(userId: string) {
    return `Creator ${userId.slice(0, 4).toUpperCase()}`;
  }

  function toggleLike(listId: string) {
    setLikedLists((current) =>
      current.includes(listId)
        ? current.filter((id) => id !== listId)
        : [...current, listId],
    );
  }

  function toggleFollow(userId: string) {
    setFollowedCreators((current) =>
      current.includes(userId)
        ? current.filter((id) => id !== userId)
        : [...current, userId],
    );
  }

  const featuredLists = lists.slice(0, 6);

  return (
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-10 text-[#0E3532]">
      <div className="mx-auto max-w-7xl">
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-[#0E3532] p-8 text-[#F4EFE5] shadow-2xl shadow-[#0E3532]/10">
            <p className="inline-flex rounded-full border border-[#D8B77A] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D8B77A]">
              Community
            </p>

            <h1 className="mt-8 max-w-4xl font-serif text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              Un social per scoprire la città attraverso mood, vibe e persone.
            </h1>

            <div className="mt-6 flex max-w-3xl items-center gap-3">
              <div className="h-px flex-1 bg-[#C99A57]" />
              <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
            </div>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#F4EFE5]/75">
              La community è il cuore di MoodScape: utenti e creator possono
              costruire Vibe Lists, condividere luoghi, seguire atmosfere e
              trasformare esperienze personali in percorsi urbani.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/vibe-lists/create"
                className="rounded-full bg-[#D8B77A] px-7 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
              >
                Crea un post-lista
              </Link>

              <Link
                href="/feed"
                className="rounded-full border border-[#D8B77A] px-7 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
              >
                Scopri luoghi
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C99A57]">
              Community pulse
            </p>

            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-5">
                <p className="font-serif text-5xl font-bold text-[#2A160E]">
                  {lists.length}
                </p>
                <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                  Liste pubbliche
                </p>
              </div>

              <div className="rounded-3xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-5">
                <p className="font-serif text-5xl font-bold text-[#2A160E]">
                  {creatorCount}
                </p>
                <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                  Creator attivi
                </p>
              </div>

              <div className="rounded-3xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-5">
                <p className="font-serif text-5xl font-bold text-[#2A160E]">
                  {vibeCount}
                </p>
                <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                  Vibe raccontate
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0E3532] text-2xl text-[#F4EFE5]">
              🌙
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C99A57]">
                Crea nella community
              </p>

              <h2 className="mt-2 font-serif text-3xl font-bold text-[#2A160E]">
                Racconta una vibe, non solo un posto.
              </h2>

              <p className="mt-3 leading-7 text-[#425653]">
                Nel social di MoodScape un post può diventare una Vibe List:
                una raccolta di luoghi legata a un mood, una città o
                un’esperienza personale.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/vibe-lists/create"
                  className="rounded-full bg-[#0E3532] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
                >
                  Crea Vibe List
                </Link>

                <Link
                  href="/moodboard"
                  className="rounded-full border border-[#C99A57] bg-[#F4EFE5] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
                >
                  Apri moodboard
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C99A57]">
                  Social feed
                </p>

                <h2 className="mt-3 font-serif text-4xl font-bold text-[#2A160E]">
                  Post dalla community.
                </h2>
              </div>

              <Link
                href="/vibe-lists"
                className="hidden rounded-full border border-[#C99A57] bg-[#F8F2E8] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532] md:inline-flex"
              >
                Tutte le liste
              </Link>
            </div>

            {loading ? (
              <div className="mt-6 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 text-[#425653]">
                Caricamento feed community...
              </div>
            ) : message ? (
              <div className="mt-6 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 font-bold text-[#2A160E]">
                {message}
              </div>
            ) : featuredLists.length === 0 ? (
              <div className="mt-6 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8">
                <h3 className="font-serif text-3xl font-bold text-[#2A160E]">
                  Ancora nessun post pubblico.
                </h3>

                <p className="mt-4 max-w-xl leading-7 text-[#425653]">
                  Crea una Vibe List pubblica per farla comparire nel feed
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
              <div className="mt-6 grid gap-6">
                {featuredLists.map((list) => {
                  const liked = likedLists.includes(list.id);
                  const followed = followedCreators.includes(list.user_id);
                  const placeCount = getPlaceCount(list.id);

                  return (
                    <article
                      key={list.id}
                      className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-5 shadow-xl shadow-[#0E3532]/5"
                    >
                      <div className="flex flex-col gap-5 md:flex-row">
                        <Link
                          href={`/vibe-lists/${list.id}`}
                          className="md:w-72"
                        >
                          <PlaceVisual vibe={list.vibe} className="h-56" />
                        </Link>

                        <div className="flex-1">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0E3532] text-lg text-[#F4EFE5]">
                                ✦
                              </div>

                              <div>
                                <p className="font-bold text-[#2A160E]">
                                  {getCreatorLabel(list.user_id)}
                                </p>
                                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                                  {list.city} · {list.vibe}
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() => toggleFollow(list.user_id)}
                              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] ${
                                followed
                                  ? "bg-[#D8B77A] text-[#0E3532]"
                                  : "bg-[#0E3532] text-[#F4EFE5]"
                              }`}
                            >
                              {followed ? "Segui già ✓" : "Segui"}
                            </button>
                          </div>

                          <Link href={`/vibe-lists/${list.id}`}>
                            <h3 className="mt-5 font-serif text-3xl font-bold text-[#2A160E]">
                              {list.title}
                            </h3>

                            <p className="mt-3 leading-7 text-[#425653]">
                              {list.description ||
                                "Una raccolta pubblica creata dalla community di MoodScape."}
                            </p>
                          </Link>

                          <div className="mt-5 flex flex-wrap gap-2">
                            <span className="rounded-full border border-[#D8B77A] bg-[#F4EFE5] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0E3532]">
                              {placeCount} luoghi
                            </span>

                            <span className="rounded-full border border-[#D8B77A] bg-[#F4EFE5] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0E3532]">
                              {list.visibility}
                            </span>

                            <span className="rounded-full border border-[#D8B77A] bg-[#F4EFE5] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0E3532]">
                              Community post
                            </span>
                          </div>

                          <div className="mt-6 flex flex-wrap gap-3">
                            <button
                              onClick={() => toggleLike(list.id)}
                              className={`rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] ${
                                liked
                                  ? "bg-[#2A160E] text-[#F4EFE5]"
                                  : "border border-[#C99A57] bg-[#F4EFE5] text-[#0E3532]"
                              }`}
                            >
                              {liked ? "Salvata ✓" : "Salva"}
                            </button>

                            <Link
                              href={`/vibe-lists/${list.id}`}
                              className="rounded-full bg-[#0E3532] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
                            >
                              Apri lista
                            </Link>

                            <button className="rounded-full border border-[#C99A57] bg-[#F4EFE5] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]">
                              Commenta
                            </button>

                            <button className="rounded-full border border-[#C99A57] bg-[#F4EFE5] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]">
                              Condividi
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <section className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C99A57]">
                Trending vibes
              </p>

              {trendingVibes.length === 0 ? (
                <p className="mt-4 leading-7 text-[#425653]">
                  Le vibe più usate compariranno qui quando ci saranno liste
                  pubbliche.
                </p>
              ) : (
                <div className="mt-5 grid gap-3">
                  {trendingVibes.map(([vibe, count]) => (
                    <Link
                      key={vibe}
                      href={`/feed?vibe=${encodeURIComponent(vibe)}`}
                      className="flex items-center justify-between rounded-2xl border border-[#D8B77A]/50 bg-[#F4EFE5] px-4 py-3"
                    >
                      <span className="font-bold text-[#0E3532]">{vibe}</span>
                      <span className="text-sm font-bold text-[#C99A57]">
                        {count}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C99A57]">
                Creator stories
              </p>

              <div className="mt-5 grid gap-4">
                {communityStories.map((story) => (
                  <article
                    key={story.handle}
                    className="rounded-2xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-4"
                  >
                    <p className="font-bold text-[#2A160E]">
                      {story.creator}
                    </p>

                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                      {story.handle} · {story.vibe}
                    </p>

                    <p className="mt-3 text-sm leading-6 text-[#425653]">
                      {story.text}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] bg-[#0E3532] p-6 text-[#F4EFE5] shadow-xl shadow-[#0E3532]/10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D8B77A]">
                Social roadmap
              </p>

              <h2 className="mt-3 font-serif text-3xl font-bold">
                Prossime funzioni community.
              </h2>

              <div className="mt-5 grid gap-3">
                {futureActions.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-2xl border border-[#D8B77A]/30 bg-[#F4EFE5]/10 p-3 text-sm font-semibold text-[#F4EFE5]/85"
                  >
                    ✓ {feature}
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}