"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import PlaceImage from "@/components/PlaceImage";

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
  baseLikes: number;
  baseComments: number;
  baseSaves: number;
  time: string;
  href: string;
  imageUrl?: string | null;
  commentsPreview: {
    author: string;
    text: string;
  }[];
};

type CommunityComment = {
  id: string;
  post_id: string;
  author_name: string;
  body: string;
  created_at: string;
};

type CommunityLike = {
  post_id: string;
  user_id: string;
};

type CommunitySave = {
  post_id: string;
  user_id: string;
};

type CommunityFollow = {
  creator_handle: string;
  follower_id: string;
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
    text: "Terrazze tranquille, luce calda, camminate lente e posti dove Roma sembra più morbida.",
    placeCount: 5,
    baseLikes: 128,
    baseComments: 18,
    baseSaves: 46,
    time: "2h",
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
    text: "Cortili, chiese silenziose, caffè con luce bassa e strade dove camminare con una playlist malinconica.",
    placeCount: 7,
    baseLikes: 203,
    baseComments: 31,
    baseSaves: 82,
    time: "5h",
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
    text: "Piccoli spazi verdi dove respirare, stare in silenzio e sentirti lontana dalla città anche se sei ancora al centro.",
    placeCount: 4,
    baseLikes: 96,
    baseComments: 12,
    baseSaves: 39,
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
    text: "Posti per serate sociali: luci, drink, musica, ma senza finire per forza in un locale caotico.",
    placeCount: 6,
    baseLikes: 151,
    baseComments: 24,
    baseSaves: 57,
    time: "1g",
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
  },
  {
    name: "Lorenzo B.",
    handle: "@bookishwalks",
    avatar: "📚",
    bio: "Dark academia, librerie e camminate introspettive.",
    followers: "842",
  },
  {
    name: "Sara Conti",
    handle: "@hiddenverde",
    avatar: "🌿",
    bio: "Giardini, cortili e micro-fughe urbane.",
    followers: "679",
  },
];

const recentActivity = [
  "Giulia ha aggiunto Giardino degli Aranci a Roma romantica.",
  "Lorenzo ha commentato una lista Dark academia.",
  "Sara ha salvato una lista Hidden garden.",
  "Andrea ha creato una nuova lista nightlife.",
];

export default function CommunityPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [lists, setLists] = useState<CommunityList[]>([]);
  const [listPlaceRows, setListPlaceRows] = useState<ListPlaceRow[]>([]);

  const [likes, setLikes] = useState<CommunityLike[]>([]);
  const [saves, setSaves] = useState<CommunitySave[]>([]);
  const [comments, setComments] = useState<CommunityComment[]>([]);
  const [follows, setFollows] = useState<CommunityFollow[]>([]);

  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    async function loadCommunity() {
      setLoading(true);
      setMessage("");
      setActionMessage("");

      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUserId(session?.user.id ?? null);
      setUserEmail(session?.user.email ?? null);

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

      const { data: likeData } = await supabase
        .from("community_likes")
        .select("post_id,user_id");

      const { data: saveData } = await supabase
        .from("community_saves")
        .select("post_id,user_id");

      const { data: commentData } = await supabase
        .from("community_comments")
        .select("id,post_id,author_name,body,created_at")
        .order("created_at", { ascending: true });

      const { data: followData } = await supabase
        .from("community_follows")
        .select("creator_handle,follower_id");

      setLikes(likeData ?? []);
      setSaves(saveData ?? []);
      setComments(commentData ?? []);
      setFollows(followData ?? []);

      setLoading(false);
    }

    loadCommunity();
  }, []);

  function getPlaceCount(listId: string) {
    return listPlaceRows.filter((row) => row.vibe_list_id === listId).length;
  }

  function getCreatorLabel(userId: string) {
    return `Creator ${userId.slice(0, 4).toUpperCase()}`;
  }

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
    baseLikes: 24 + getPlaceCount(list.id) * 7,
    baseComments: 3 + getPlaceCount(list.id),
    baseSaves: 8 + getPlaceCount(list.id) * 2,
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

  const trendingVibes = useMemo(() => {
    const counts = new Map<string, number>();

    feedPosts.forEach((post) => {
      counts.set(post.vibe, (counts.get(post.vibe) ?? 0) + 1);
    });

    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [feedPosts]);

  function requireLogin() {
    if (!userId) {
      setActionMessage("Per interagire con la community devi prima accedere.");
      return false;
    }

    setActionMessage("");
    return true;
  }

  function isLiked(postId: string) {
    return Boolean(userId && likes.some((like) => like.post_id === postId && like.user_id === userId));
  }

  function isSaved(postId: string) {
    return Boolean(userId && saves.some((save) => save.post_id === postId && save.user_id === userId));
  }

  function isFollowing(handle: string) {
    return Boolean(
      userId &&
        follows.some(
          (follow) =>
            follow.creator_handle === handle && follow.follower_id === userId,
        ),
    );
  }

  function getLikeCount(post: FeedPost) {
    return post.baseLikes + likes.filter((like) => like.post_id === post.id).length;
  }

  function getSaveCount(post: FeedPost) {
    return post.baseSaves + saves.filter((save) => save.post_id === post.id).length;
  }

  function getPostComments(postId: string) {
    return comments.filter((comment) => comment.post_id === postId);
  }

  async function toggleLike(postId: string) {
    if (!requireLogin() || !userId) return;

    const liked = isLiked(postId);

    if (liked) {
      const { error } = await supabase
        .from("community_likes")
        .delete()
        .eq("user_id", userId)
        .eq("post_id", postId);

      if (error) {
        setActionMessage(error.message);
        return;
      }

      setLikes((current) =>
        current.filter(
          (like) => !(like.user_id === userId && like.post_id === postId),
        ),
      );
    } else {
      const newLike = {
        user_id: userId,
        post_id: postId,
      };

      const { error } = await supabase.from("community_likes").insert(newLike);

      if (error) {
        setActionMessage(error.message);
        return;
      }

      setLikes((current) => [...current, newLike]);
    }
  }

  async function toggleSave(postId: string) {
    if (!requireLogin() || !userId) return;

    const saved = isSaved(postId);

    if (saved) {
      const { error } = await supabase
        .from("community_saves")
        .delete()
        .eq("user_id", userId)
        .eq("post_id", postId);

      if (error) {
        setActionMessage(error.message);
        return;
      }

      setSaves((current) =>
        current.filter(
          (save) => !(save.user_id === userId && save.post_id === postId),
        ),
      );
    } else {
      const newSave = {
        user_id: userId,
        post_id: postId,
      };

      const { error } = await supabase.from("community_saves").insert(newSave);

      if (error) {
        setActionMessage(error.message);
        return;
      }

      setSaves((current) => [...current, newSave]);
    }
  }

  async function toggleFollow(handle: string) {
    if (!requireLogin() || !userId) return;

    const followed = isFollowing(handle);

    if (followed) {
      const { error } = await supabase
        .from("community_follows")
        .delete()
        .eq("follower_id", userId)
        .eq("creator_handle", handle);

      if (error) {
        setActionMessage(error.message);
        return;
      }

      setFollows((current) =>
        current.filter(
          (follow) =>
            !(follow.follower_id === userId && follow.creator_handle === handle),
        ),
      );
    } else {
      const newFollow = {
        follower_id: userId,
        creator_handle: handle,
      };

      const { error } = await supabase
        .from("community_follows")
        .insert(newFollow);

      if (error) {
        setActionMessage(error.message);
        return;
      }

      setFollows((current) => [...current, newFollow]);
    }
  }

  async function submitComment(postId: string) {
    if (!requireLogin() || !userId) return;

    const text = commentDrafts[postId]?.trim();

    if (!text) return;

    const authorName = userEmail?.split("@")[0] || "Utente MoodScape";

    const { data, error } = await supabase
      .from("community_comments")
      .insert({
        user_id: userId,
        post_id: postId,
        author_name: authorName,
        body: text,
      })
      .select("id,post_id,author_name,body,created_at")
      .single();

    if (error) {
      setActionMessage(error.message);
      return;
    }

    if (data) {
      setComments((current) => [...current, data]);
    }

    setCommentDrafts((current) => ({
      ...current,
      [postId]: "",
    }));

    setActionMessage("");
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-7xl">
        <section className="mx-auto max-w-md lg:max-w-7xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#7A7A73]">
                Social MoodScape
              </p>

              <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Feed della community.
              </h1>
            </div>

            <Link
              href="/vibe-lists/create"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111111] text-xl text-white shadow-sm"
            >
              +
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">{feedPosts.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Post
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">{activeCreators.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Creator
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">{trendingVibes.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Vibe
              </p>
            </div>
          </div>

          {!userId && (
            <div className="mt-5 rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-sm font-semibold leading-6 text-[#55554F]">
                Puoi leggere il feed senza account. Per mettere like, salvare,
                commentare o seguire creator devi accedere.
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
                  className="rounded-full bg-[#F1F1EE] px-5 py-3 text-sm font-bold text-[#111111]"
                >
                  Registrati
                </Link>
              </div>
            </div>
          )}

          {actionMessage && (
            <div className="mt-5 rounded-[1.5rem] bg-white p-4 text-sm font-semibold leading-6 text-[#55554F] shadow-sm ring-1 ring-black/5">
              {actionMessage}
            </div>
          )}

          <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
            {trendingVibes.map(([vibe, count]) => (
              <Link
                key={vibe}
                href={`/feed?vibe=${encodeURIComponent(vibe)}`}
                className="shrink-0 rounded-full bg-white px-5 py-3 text-sm font-bold shadow-sm ring-1 ring-black/5"
              >
                {vibe} · {count}
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-6 grid max-w-md gap-6 lg:max-w-7xl lg:grid-cols-[1fr_360px]">
          <div className="grid gap-5">
            {loading && (
              <div className="rounded-[2rem] bg-white p-6 text-[#7A7A73] shadow-sm ring-1 ring-black/5">
                Caricamento community...
              </div>
            )}

            {!loading && message && (
              <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
                <h2 className="text-2xl font-bold">
                  Non riesco a caricare il feed.
                </h2>
                <p className="mt-3 text-[#55554F]">{message}</p>
              </div>
            )}

            {!loading &&
              !message &&
              feedPosts.map((post) => {
                const liked = isLiked(post.id);
                const saved = isSaved(post.id);
                const followed = isFollowing(post.handle);
                const realComments = getPostComments(post.id);
                const allPreviewComments = [
                  ...post.commentsPreview,
                  ...realComments.map((comment) => ({
                    author: comment.author_name,
                    text: comment.body,
                  })),
                ];

                return (
                  <article
                    key={post.id}
                    className="overflow-hidden rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-black/5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111111] text-xl text-white">
                          {post.avatar}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-bold">{post.creator}</p>
                          <p className="truncate text-sm font-medium text-[#7A7A73]">
                            {post.handle} · {post.city} · {post.time}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleFollow(post.handle)}
                        className={`rounded-full px-4 py-2 text-sm font-bold ${
                          followed
                            ? "bg-[#F1F1EE] text-[#111111]"
                            : "bg-[#111111] text-white"
                        }`}
                      >
                        {followed ? "Segui già" : "Segui"}
                      </button>
                    </div>

                    <Link href={post.href} className="mt-4 block">
                      <PlaceImage
                        imageUrl={post.imageUrl}
                        name={post.title}
                        vibe={post.vibe}
                        className="h-72"
                      />
                    </Link>

                    <div className="pt-5">
                      <Link href={post.href}>
                        <p className="text-sm font-bold text-[#7A7A73]">
                          {post.vibe} · {post.placeCount} luoghi
                        </p>

                        <h2 className="mt-2 text-2xl font-bold tracking-tight">
                          {post.title}
                        </h2>

                        <p className="mt-3 text-base leading-7 text-[#55554F]">
                          {post.text}
                        </p>
                      </Link>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`rounded-full px-4 py-3 text-sm font-bold ${
                            liked
                              ? "bg-[#111111] text-white"
                              : "bg-[#F7F7F5] text-[#111111]"
                          }`}
                        >
                          {getLikeCount(post)} like
                        </button>

                        <button
                          onClick={() => toggleSave(post.id)}
                          className={`rounded-full px-4 py-3 text-sm font-bold ${
                            saved
                              ? "bg-[#111111] text-white"
                              : "bg-[#F7F7F5] text-[#111111]"
                          }`}
                        >
                          {getSaveCount(post)} salvataggi
                        </button>

                        <Link
                          href={post.href}
                          className="rounded-full bg-[#F7F7F5] px-4 py-3 text-sm font-bold text-[#111111]"
                        >
                          Apri
                        </Link>
                      </div>

                      <div className="mt-5 rounded-[1.5rem] bg-[#F7F7F5] p-4">
                        <p className="text-sm font-bold text-[#7A7A73]">
                          Commenti ·{" "}
                          {post.baseComments + realComments.length}
                        </p>

                        <div className="mt-4 grid gap-3">
                          {allPreviewComments.map((comment, index) => (
                            <div key={`${post.id}-${comment.author}-${index}`}>
                              <p className="text-sm font-bold">
                                {comment.author}
                              </p>
                              <p className="mt-1 text-sm leading-6 text-[#55554F]">
                                {comment.text}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 flex gap-2">
                          <input
                            value={commentDrafts[post.id] ?? ""}
                            onChange={(event) =>
                              setCommentDrafts((current) => ({
                                ...current,
                                [post.id]: event.target.value,
                              }))
                            }
                            placeholder={
                              userId
                                ? "Scrivi un commento..."
                                : "Accedi per commentare"
                            }
                            className="min-w-0 flex-1 rounded-full bg-white px-4 py-3 text-sm outline-none ring-1 ring-black/5"
                          />

                          <button
                            onClick={() => submitComment(post.id)}
                            className="rounded-full bg-[#111111] px-5 py-3 text-sm font-bold text-white"
                          >
                            Pubblica
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
          </div>

          <aside className="space-y-5">
            <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
              <h2 className="text-xl font-bold tracking-tight">
                Creator da seguire
              </h2>

              <div className="mt-4 grid gap-3">
                {activeCreators.map((creator) => {
                  const followed = isFollowing(creator.handle);

                  return (
                    <article
                      key={creator.handle}
                      className="rounded-[1.5rem] bg-[#F7F7F5] p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111111] text-lg text-white">
                          {creator.avatar}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate font-bold">{creator.name}</p>
                          <p className="truncate text-sm font-medium text-[#7A7A73]">
                            {creator.handle}
                          </p>
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-[#55554F]">
                        {creator.bio}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-bold text-[#7A7A73]">
                          {creator.followers} follower
                        </span>

                        <button
                          onClick={() => toggleFollow(creator.handle)}
                          className={`rounded-full px-4 py-2 text-sm font-bold ${
                            followed
                              ? "bg-white text-[#111111]"
                              : "bg-[#111111] text-white"
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

            <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
              <h2 className="text-xl font-bold tracking-tight">
                Attività recenti
              </h2>

              <div className="mt-4 grid gap-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity}
                    className="rounded-[1.25rem] bg-[#F7F7F5] p-4 text-sm font-medium leading-6 text-[#55554F]"
                  >
                    {activity}
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