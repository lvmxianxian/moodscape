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

type FeedPost = {
  id: string;
  creator: string;
  handle: string;
  avatar: string;
  city: string;
  vibe: string;
  title: string;
  text: string;
  placeCount: number;
  likes: number;
  comments: number;
  saves: number;
  time: string;
  href: string;
  commentsPreview: {
    author: string;
    text: string;
  }[];
};

const demoPosts: FeedPost[] = [
  {
    id: "demo-roma-lenta",
    creator: "Giulia Ferri",
    handle: "@slowroma",
    avatar: "🌙",
    city: "Roma",
    vibe: "Dolce vita",
    title: "Roma romantica ma senza cliché",
    text: "Ho raccolto posti dove Roma sembra più morbida: terrazze tranquille, luce calda, camminate lente e zero fretta. Perfetta per un pomeriggio in cui vuoi sentirti dentro un film.",
    placeCount: 5,
    likes: 128,
    comments: 18,
    saves: 46,
    time: "2h fa",
    href: "/feed?vibe=Dolce%20vita",
    commentsPreview: [
      {
        author: "Valeria",
        text: "Questa è esattamente la vibe che cercavo per domenica.",
      },
      {
        author: "Marta",
        text: "Aggiungerei anche il Gianicolo al tramonto.",
      },
    ],
  },
  {
    id: "demo-dark-academia",
    creator: "Lorenzo B.",
    handle: "@bookishwalks",
    avatar: "📚",
    city: "Roma",
    vibe: "Dark academia",
    title: "Posti per sentirsi in una biblioteca segreta",
    text: "Non solo biblioteche: anche cortili, chiese silenziose, caffè con luce bassa e strade dove camminare con una playlist malinconica.",
    placeCount: 7,
    likes: 203,
    comments: 31,
    saves: 82,
    time: "5h fa",
    href: "/feed?vibe=Dark%20academia",
    commentsPreview: [
      {
        author: "Nina",
        text: "Mood perfetto per studiare ma anche per sparire un po’.",
      },
      {
        author: "Ale",
        text: "Biblioteca Angelica è fortissima per questa lista.",
      },
    ],
  },
  {
    id: "demo-hidden-gardens",
    creator: "Sara Conti",
    handle: "@hiddenverde",
    avatar: "🌿",
    city: "Roma",
    vibe: "Hidden garden",
    title: "Giardini nascosti per decomprimere",
    text: "Piccoli spazi verdi dove puoi respirare, stare in silenzio e sentirti lontana dalla città anche se sei ancora al centro.",
    placeCount: 4,
    likes: 96,
    comments: 12,
    saves: 39,
    time: "ieri",
    href: "/feed?vibe=Hidden%20garden",
    commentsPreview: [
      {
        author: "Chiara",
        text: "Vorrei una funzione per salvare questi percorsi per mood.",
      },
      {
        author: "Leo",
        text: "Questa è la parte migliore di MoodScape secondo me.",
      },
    ],
  },
  {
    id: "demo-nightlife",
    creator: "Andrea M.",
    handle: "@afterdarkroma",
    avatar: "🪩",
    city: "Roma",
    vibe: "Neon nightlife",
    title: "Quando vuoi uscire ma non sai che energia vuoi",
    text: "Ho messo insieme posti per serate più sociali: luci, drink, musica, ma senza dover per forza finire in un locale caotico.",
    placeCount: 6,
    likes: 151,
    comments: 24,
    saves: 57,
    time: "1 giorno fa",
    href: "/feed?vibe=Neon%20nightlife",
    commentsPreview: [
      {
        author: "Sofia",
        text: "Mi piace che non sia solo nightlife aggressiva.",
      },
      {
        author: "Gio",
        text: "Serve una lista simile anche per Milano.",
      },
    ],
  },
];

const activeCreators = [
  {
    name: "Giulia Ferri",
    handle: "@slowroma",
    avatar: "🌙",
    bio: "Liste lente, romantiche e cinematografiche.",
    followers: "1.2k",
    vibe: "Dolce vita",
  },
  {
    name: "Lorenzo B.",
    handle: "@bookishwalks",
    avatar: "📚",
    bio: "Dark academia, librerie e camminate introspettive.",
    followers: "842",
    vibe: "Dark academia",
  },
  {
    name: "Sara Conti",
    handle: "@hiddenverde",
    avatar: "🌿",
    bio: "Giardini, cortili e micro-fughe urbane.",
    followers: "679",
    vibe: "Hidden garden",
  },
  {
    name: "Andrea M.",
    handle: "@afterdarkroma",
    avatar: "🪩",
    bio: "Serate, luci, energia e posti sociali.",
    followers: "954",
    vibe: "Neon nightlife",
  },
];

const recentActivity = [
  "Giulia ha aggiunto Giardino degli Aranci a Roma romantica.",
  "Lorenzo ha commentato una lista Dark academia.",
  "Sara ha salvato una lista Hidden garden.",
  "Andrea ha creato una nuova lista nightlife.",
  "Marta ha suggerito un nuovo posto per Golden hour walk.",
  "Valeria ha salvato un luogo nella moodboard.",
];

const futureActions = [
  "Follow reale tra utenti",
  "Like persistenti su liste e post",
  "Commenti salvati nel database",
  "Liste collaborative",
  "Richieste alla community tipo “dove vado oggi?”",
  "Moderazione e segnalazioni",
];

export default function CommunityPage() {
  const [lists, setLists] = useState<CommunityList[]>([]);
  const [listPlaceRows, setListPlaceRows] = useState<ListPlaceRow[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [followedCreators, setFollowedCreators] = useState<string[]>([]);
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [localComments, setLocalComments] = useState<
    Record<string, { author: string; text: string }[]>
  >({});
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

  const realPosts: FeedPost[] = lists.map((list) => ({
    id: list.id,
    creator: getCreatorLabel(list.user_id),
    handle: `@creator${list.user_id.slice(0, 4).toLowerCase()}`,
    avatar: "✦",
    city: list.city,
    vibe: list.vibe,
    title: list.title,
    text:
      list.description ||
      "Una Vibe List pubblica creata dalla community di MoodScape.",
    placeCount: getPlaceCount(list.id),
    likes: 24 + getPlaceCount(list.id) * 7,
    comments: 3 + getPlaceCount(list.id),
    saves: 8 + getPlaceCount(list.id) * 2,
    time: "oggi",
    href: `/vibe-lists/${list.id}`,
    commentsPreview: [
      {
        author: "MoodScape user",
        text: "Questa lista ha una vibe molto chiara.",
      },
      {
        author: "Local explorer",
        text: "La salverei per il weekend.",
      },
    ],
  }));

  const feedPosts = [...realPosts, ...demoPosts];

  const creatorCount = useMemo(() => {
    const realCreators = new Set(lists.map((list) => list.user_id)).size;
    return realCreators + activeCreators.length;
  }, [lists]);

  const vibeCount = useMemo(() => {
    return new Set(feedPosts.map((post) => post.vibe)).size;
  }, [feedPosts]);

  const trendingVibes = useMemo(() => {
    const counts = new Map<string, number>();

    feedPosts.forEach((post) => {
      counts.set(post.vibe, (counts.get(post.vibe) ?? 0) + 1);
    });

    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7);
  }, [feedPosts]);

  function getPlaceCount(listId: string) {
    return listPlaceRows.filter((row) => row.vibe_list_id === listId).length;
  }

  function getCreatorLabel(userId: string) {
    return `Creator ${userId.slice(0, 4).toUpperCase()}`;
  }

  function toggleLike(postId: string) {
    setLikedPosts((current) =>
      current.includes(postId)
        ? current.filter((id) => id !== postId)
        : [...current, postId],
    );
  }

  function toggleSave(postId: string) {
    setSavedPosts((current) =>
      current.includes(postId)
        ? current.filter((id) => id !== postId)
        : [...current, postId],
    );
  }

  function toggleFollow(handle: string) {
    setFollowedCreators((current) =>
      current.includes(handle)
        ? current.filter((id) => id !== handle)
        : [...current, handle],
    );
  }

  function submitComment(postId: string) {
    const text = commentDrafts[postId]?.trim();

    if (!text) return;

    setLocalComments((current) => ({
      ...current,
      [postId]: [
        ...(current[postId] ?? []),
        {
          author: "Tu",
          text,
        },
      ],
    }));

    setCommentDrafts((current) => ({
      ...current,
      [postId]: "",
    }));
  }

  return (
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-10 text-[#0E3532]">
      <div className="mx-auto max-w-7xl">
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[2rem] bg-[#0E3532] p-8 text-[#F4EFE5] shadow-2xl shadow-[#0E3532]/10">
            <p className="inline-flex rounded-full border border-[#D8B77A] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D8B77A]">
              Community social
            </p>

            <h1 className="mt-8 max-w-4xl font-serif text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              Il feed dove le persone raccontano la città per mood.
            </h1>

            <div className="mt-6 flex max-w-3xl items-center gap-3">
              <div className="h-px flex-1 bg-[#C99A57]" />
              <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
            </div>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#F4EFE5]/75">
              MoodScape non è solo una directory di posti: è una community dove
              utenti e creator pubblicano Vibe Lists, commentano esperienze,
              salvano idee e seguono atmosfere.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-[#D8B77A]/30 bg-[#F4EFE5]/10 p-4">
                <p className="font-serif text-4xl font-bold text-[#D8B77A]">
                  {feedPosts.length}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[#F4EFE5]/75">
                  Post nel feed
                </p>
              </div>

              <div className="rounded-3xl border border-[#D8B77A]/30 bg-[#F4EFE5]/10 p-4">
                <p className="font-serif text-4xl font-bold text-[#D8B77A]">
                  {creatorCount}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[#F4EFE5]/75">
                  Creator
                </p>
              </div>

              <div className="rounded-3xl border border-[#D8B77A]/30 bg-[#F4EFE5]/10 p-4">
                <p className="font-serif text-4xl font-bold text-[#D8B77A]">
                  {vibeCount}
                </p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[#F4EFE5]/75">
                  Vibe attive
                </p>
              </div>
            </div>

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
              Cosa sta succedendo
            </p>

            <div className="mt-5 grid gap-3">
              {recentActivity.map((activity) => (
                <div
                  key={activity}
                  className="rounded-2xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-4 text-sm font-semibold leading-6 text-[#425653]"
                >
                  {activity}
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-5 shadow-xl shadow-[#0E3532]/5">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0E3532] text-2xl text-[#F4EFE5]">
                +
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C99A57]">
                  Crea nella community
                </p>

                <h2 className="font-serif text-3xl font-bold text-[#2A160E]">
                  Condividi una lista come se fosse un post.
                </h2>

                <p className="mt-2 leading-7 text-[#425653]">
                  Racconta una giornata, una zona, una vibe o un percorso. Gli
                  altri utenti potranno salvarlo, commentarlo e seguirti.
                </p>
              </div>
            </div>

            <Link
              href="/vibe-lists/create"
              className="rounded-full bg-[#0E3532] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
            >
              Crea Vibe List
            </Link>
          </div>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_350px]">
          <div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C99A57]">
                Feed
              </p>

              <h2 className="mt-3 font-serif text-4xl font-bold text-[#2A160E]">
                Post, liste e commenti dalla community.
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-[#425653]">
                Alcuni contenuti sono demo per mostrare il social già vissuto;
                le Vibe Lists pubbliche reali compaiono automaticamente in alto
                quando vengono create.
              </p>
            </div>

            {loading ? (
              <div className="mt-6 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 text-[#425653]">
                Caricamento feed community...
              </div>
            ) : message ? (
              <div className="mt-6 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 font-bold text-[#2A160E]">
                {message}
              </div>
            ) : (
              <div className="mt-6 grid gap-6">
                {feedPosts.map((post) => {
                  const liked = likedPosts.includes(post.id);
                  const saved = savedPosts.includes(post.id);
                  const followed = followedCreators.includes(post.handle);
                  const extraComments = localComments[post.id] ?? [];
                  const allPreviewComments = [
                    ...post.commentsPreview,
                    ...extraComments,
                  ];

                  return (
                    <article
                      key={post.id}
                      className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-5 shadow-xl shadow-[#0E3532]/5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0E3532] text-xl text-[#F4EFE5]">
                            {post.avatar}
                          </div>

                          <div>
                            <p className="font-bold text-[#2A160E]">
                              {post.creator}
                            </p>

                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                              {post.handle} · {post.city} · {post.time}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleFollow(post.handle)}
                          className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] ${
                            followed
                              ? "bg-[#D8B77A] text-[#0E3532]"
                              : "bg-[#0E3532] text-[#F4EFE5]"
                          }`}
                        >
                          {followed ? "Segui già" : "Segui"}
                        </button>
                      </div>

                      <div className="mt-5 grid gap-5 md:grid-cols-[280px_1fr]">
                        <Link href={post.href}>
                          <PlaceVisual vibe={post.vibe} className="h-60" />
                        </Link>

                        <div>
                          <Link href={post.href}>
                            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                              {post.vibe} · {post.placeCount} luoghi
                            </p>

                            <h3 className="mt-3 font-serif text-3xl font-bold text-[#2A160E]">
                              {post.title}
                            </h3>

                            <p className="mt-4 leading-7 text-[#425653]">
                              {post.text}
                            </p>
                          </Link>

                          <div className="mt-5 flex flex-wrap gap-2">
                            <span className="rounded-full border border-[#D8B77A] bg-[#F4EFE5] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0E3532]">
                              {post.likes + (liked ? 1 : 0)} likes
                            </span>

                            <span className="rounded-full border border-[#D8B77A] bg-[#F4EFE5] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0E3532]">
                              {post.comments + extraComments.length} commenti
                            </span>

                            <span className="rounded-full border border-[#D8B77A] bg-[#F4EFE5] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0E3532]">
                              {post.saves + (saved ? 1 : 0)} salvataggi
                            </span>
                          </div>

                          <div className="mt-5 flex flex-wrap gap-3">
                            <button
                              onClick={() => toggleLike(post.id)}
                              className={`rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] ${
                                liked
                                  ? "bg-[#2A160E] text-[#F4EFE5]"
                                  : "border border-[#C99A57] bg-[#F4EFE5] text-[#0E3532]"
                              }`}
                            >
                              {liked ? "Liked ✓" : "Like"}
                            </button>

                            <button
                              onClick={() => toggleSave(post.id)}
                              className={`rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] ${
                                saved
                                  ? "bg-[#D8B77A] text-[#0E3532]"
                                  : "border border-[#C99A57] bg-[#F4EFE5] text-[#0E3532]"
                              }`}
                            >
                              {saved ? "Salvato ✓" : "Salva"}
                            </button>

                            <Link
                              href={post.href}
                              className="rounded-full bg-[#0E3532] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
                            >
                              Apri
                            </Link>

                            <button className="rounded-full border border-[#C99A57] bg-[#F4EFE5] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]">
                              Condividi
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 rounded-[1.5rem] border border-[#D8B77A]/50 bg-[#F4EFE5] p-4">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                          Commenti
                        </p>

                        <div className="mt-4 grid gap-3">
                          {allPreviewComments.map((comment, index) => (
                            <div
                              key={`${post.id}-${comment.author}-${index}`}
                              className="rounded-2xl bg-[#F8F2E8] p-3"
                            >
                              <p className="text-sm font-bold text-[#2A160E]">
                                {comment.author}
                              </p>

                              <p className="mt-1 text-sm leading-6 text-[#425653]">
                                {comment.text}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                          <input
                            value={commentDrafts[post.id] ?? ""}
                            onChange={(event) =>
                              setCommentDrafts((current) => ({
                                ...current,
                                [post.id]: event.target.value,
                              }))
                            }
                            placeholder="Scrivi un commento..."
                            className="min-w-0 flex-1 rounded-full border border-[#D8B77A]/60 bg-[#F4EFE5] px-5 py-3 text-sm text-[#0E3532] outline-none"
                          />

                          <button
                            onClick={() => submitComment(post.id)}
                            className="rounded-full bg-[#0E3532] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
                          >
                            Pubblica
                          </button>
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
                Creator da seguire
              </p>

              <div className="mt-5 grid gap-4">
                {activeCreators.map((creator) => {
                  const followed = followedCreators.includes(creator.handle);

                  return (
                    <article
                      key={creator.handle}
                      className="rounded-2xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0E3532] text-lg text-[#F4EFE5]">
                          {creator.avatar}
                        </div>

                        <div>
                          <p className="font-bold text-[#2A160E]">
                            {creator.name}
                          </p>
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                            {creator.handle}
                          </p>
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-[#425653]">
                        {creator.bio}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#0E3532]">
                          {creator.followers} follower
                        </span>

                        <button
                          onClick={() => toggleFollow(creator.handle)}
                          className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] ${
                            followed
                              ? "bg-[#D8B77A] text-[#0E3532]"
                              : "bg-[#0E3532] text-[#F4EFE5]"
                          }`}
                        >
                          {followed ? "Segui già" : "Segui"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C99A57]">
                Trending vibes
              </p>

              <div className="mt-5 grid gap-3">
                {trendingVibes.map(([vibe, count]) => (
                  <Link
                    key={vibe}
                    href={`/feed?vibe=${encodeURIComponent(vibe)}`}
                    className="flex items-center justify-between rounded-2xl border border-[#D8B77A]/50 bg-[#F4EFE5] px-4 py-3"
                  >
                    <span className="font-bold text-[#0E3532]">{vibe}</span>
                    <span className="text-sm font-bold text-[#C99A57]">
                      {count} post
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] bg-[#0E3532] p-6 text-[#F4EFE5] shadow-xl shadow-[#0E3532]/10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D8B77A]">
                Roadmap social
              </p>

              <h2 className="mt-3 font-serif text-3xl font-bold">
                Funzioni social vere.
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