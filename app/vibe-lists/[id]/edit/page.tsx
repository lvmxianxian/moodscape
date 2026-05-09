"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const vibes = [
  "Dolce vita",
  "Dark academia",
  "Quiet luxury",
  "Vintage film",
  "Neon nightlife",
  "Romantic ruins",
];

type DbVibeList = {
  id: string;
  user_id: string;
  title: string;
  city: string;
  vibe: string;
  description: string | null;
  visibility: string;
};

export default function EditVibeListPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [listOwnerId, setListOwnerId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("Roma");
  const [vibe, setVibe] = useState("Dolce vita");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("Pubblica");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadList() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setCurrentUserId(session?.user.id ?? null);

      const { data } = await supabase
        .from("vibe_lists")
        .select("id,user_id,title,city,vibe,description,visibility")
        .eq("id", params.id)
        .maybeSingle();

      if (data) {
        const list = data as DbVibeList;

        setListOwnerId(list.user_id);
        setTitle(list.title);
        setCity(list.city);
        setVibe(list.vibe);
        setDescription(list.description ?? "");
        setVisibility(list.visibility);
      }

      setLoading(false);
    }

    loadList();
  }, [params.id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    if (!currentUserId || currentUserId !== listOwnerId) {
      setMessage("Non puoi modificare questa lista.");
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from("vibe_lists")
      .update({
        title,
        city,
        vibe,
        description,
        visibility,
      })
      .eq("id", params.id)
      .eq("user_id", currentUserId);

    if (error) {
      setMessage(error.message);
      setSaving(false);
      return;
    }

    router.push(`/vibe-lists/${params.id}`);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F4EFE5] px-6 py-16 text-[#0E3532]">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8">
          Caricamento lista...
        </div>
      </main>
    );
  }

  if (!currentUserId) {
    return (
      <main className="min-h-screen bg-[#F4EFE5] px-6 py-16 text-[#0E3532]">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 shadow-xl shadow-[#0E3532]/5">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C99A57]">
            Modifica lista
          </p>

          <h1 className="mt-5 font-serif text-4xl font-bold text-[#2A160E] md:text-6xl">
            Accedi per modificare questa lista.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#425653]">
            Solo il creator della Vibe List può modificarla.
          </p>

          <Link
            href="/login"
            className="mt-8 inline-flex rounded-full bg-[#0E3532] px-7 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
          >
            Accedi
          </Link>
        </div>
      </main>
    );
  }

  if (currentUserId !== listOwnerId) {
    return (
      <main className="min-h-screen bg-[#F4EFE5] px-6 py-16 text-[#0E3532]">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 shadow-xl shadow-[#0E3532]/5">
          <h1 className="font-serif text-4xl font-bold text-[#2A160E]">
            Non puoi modificare questa lista.
          </h1>

          <p className="mt-5 leading-7 text-[#425653]">
            Puoi modificare solo le Vibe Lists create dal tuo account.
          </p>

          <Link
            href="/vibe-lists"
            className="mt-8 inline-flex rounded-full bg-[#0E3532] px-7 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
          >
            Torna alle Vibe Lists
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-10 text-[#0E3532]">
      <div className="mx-auto max-w-7xl">
        <Link
          href={`/vibe-lists/${params.id}`}
          className="text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
        >
          ← Torna alla lista
        </Link>

        <section className="mt-8">
          <p className="inline-flex rounded-full border border-[#D8B77A] bg-[#F8F2E8] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0E3532]">
            Modifica Vibe List
          </p>

          <h1 className="mt-8 max-w-4xl font-serif text-5xl font-bold leading-tight tracking-tight text-[#2A160E] md:text-7xl">
            Aggiorna atmosfera, titolo e descrizione.
          </h1>

          <div className="mt-6 flex max-w-3xl items-center gap-3">
            <div className="h-px flex-1 bg-[#C99A57]" />
            <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-xl shadow-[#0E3532]/5"
          >
            <div>
              <label className="text-sm font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                Titolo lista
              </label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-[#D8B77A]/50 bg-[#F4EFE5] px-4 py-3 text-[#0E3532] outline-none focus:border-[#C99A57]"
              />
            </div>

            <div className="mt-5">
              <label className="text-sm font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                Città
              </label>
              <input
                value={city}
                onChange={(event) => setCity(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-[#D8B77A]/50 bg-[#F4EFE5] px-4 py-3 text-[#0E3532] outline-none focus:border-[#C99A57]"
              />
            </div>

            <div className="mt-5">
              <label className="text-sm font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                Vibe principale
              </label>
              <select
                value={vibe}
                onChange={(event) => setVibe(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#D8B77A]/50 bg-[#F4EFE5] px-4 py-3 text-[#0E3532] outline-none focus:border-[#C99A57]"
              >
                {vibes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <label className="text-sm font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                Visibilità
              </label>
              <select
                value={visibility}
                onChange={(event) => setVisibility(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#D8B77A]/50 bg-[#F4EFE5] px-4 py-3 text-[#0E3532] outline-none focus:border-[#C99A57]"
              >
                <option>Pubblica</option>
                <option>Privata</option>
              </select>
            </div>

            <div className="mt-5">
              <label className="text-sm font-bold uppercase tracking-[0.14em] text-[#C99A57]">
                Descrizione
              </label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={5}
                className="mt-2 w-full rounded-2xl border border-[#D8B77A]/50 bg-[#F4EFE5] px-4 py-3 text-[#0E3532] outline-none focus:border-[#C99A57]"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="mt-6 w-full rounded-full bg-[#0E3532] px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5] disabled:opacity-60"
            >
              {saving ? "Salvataggio..." : "Salva modifiche"}
            </button>

            {message && (
              <div className="mt-5 rounded-2xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-4 text-sm font-bold text-[#2A160E]">
                {message}
              </div>
            )}
          </form>

          <aside className="rounded-[2rem] bg-[#0E3532] p-6 text-[#F4EFE5] shadow-xl shadow-[#0E3532]/10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D8B77A]">
              Anteprima aggiornata
            </p>

            <div className="mt-6 rounded-[1.5rem] border border-[#D8B77A]/40 bg-[#F4EFE5]/10 p-5">
              <span className="rounded-full bg-[#F4EFE5] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0E3532]">
                {vibe}
              </span>

              <h2 className="mt-6 font-serif text-4xl font-bold">
                {title || "Titolo lista"}
              </h2>

              <p className="mt-2 text-sm font-bold text-[#D8B77A]">
                {city} · {visibility}
              </p>

              <p className="mt-5 leading-7 text-[#F4EFE5]/75">
                {description || "Descrizione della lista."}
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}