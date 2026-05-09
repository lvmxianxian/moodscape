"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

const vibes = [
  "Dolce vita",
  "Dark academia",
  "Quiet luxury",
  "Vintage film",
  "Neon nightlife",
  "Romantic ruins",
];

export default function CreateVibeListPage() {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("Roma");
  const [vibe, setVibe] = useState("Dolce vita");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("Pubblica");
  const [message, setMessage] = useState("");
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setCreatedId(null);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setMessage("Devi accedere per creare una Vibe List.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("vibe_lists")
      .insert({
        user_id: session.user.id,
        title,
        city,
        vibe,
        description,
        visibility,
      })
      .select("id")
      .single();

    if (error) {
      setMessage(error.message);
    } else {
      setCreatedId(data.id);
      setMessage("Vibe List creata davvero nel database ✓");
      setTitle("");
      setDescription("");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-10 text-[#0E3532]">
      <div className="mx-auto max-w-7xl">
        <section className="mt-8">
          <Link
            href="/vibe-lists"
            className="text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
          >
            ← Torna alle Vibe Lists
          </Link>

          <p className="mt-10 inline-flex rounded-full border border-[#D8B77A] bg-[#F8F2E8] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0E3532]">
            Crea Vibe List
          </p>

          <h1 className="mt-8 max-w-4xl font-serif text-5xl font-bold leading-tight tracking-tight text-[#2A160E] md:text-7xl">
            Costruisci una lista intorno a un’atmosfera.
          </h1>

          <div className="mt-6 flex max-w-3xl items-center gap-3">
            <div className="h-px flex-1 bg-[#C99A57]" />
            <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#425653]">
            Ora questo form salva davvero la lista su Supabase e la collega
            all’utente loggato.
          </p>
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
                placeholder="Es. Roma romantic ruins"
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
                placeholder="Descrivi che atmosfera deve avere questa lista..."
                rows={5}
                className="mt-2 w-full rounded-2xl border border-[#D8B77A]/50 bg-[#F4EFE5] px-4 py-3 text-[#0E3532] outline-none focus:border-[#C99A57]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-full bg-[#0E3532] px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5] disabled:opacity-60"
            >
              {loading ? "Creazione..." : "Crea lista reale"}
            </button>

            {message && (
              <div className="mt-5 rounded-2xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-4 text-sm font-bold text-[#2A160E]">
                {message}
              </div>
            )}

            {createdId && (
              <Link
                href={`/vibe-lists/${createdId}`}
                className="mt-4 block rounded-full border border-[#C99A57] bg-[#F4EFE5] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
              >
                Apri lista creata →
              </Link>
            )}
          </form>

          <aside className="rounded-[2rem] bg-[#0E3532] p-6 text-[#F4EFE5] shadow-xl shadow-[#0E3532]/10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D8B77A]">
              Anteprima
            </p>

            <div className="mt-6 rounded-[1.5rem] border border-[#D8B77A]/40 bg-[#F4EFE5]/10 p-5">
              <span className="rounded-full bg-[#F4EFE5] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0E3532]">
                {vibe}
              </span>

              <h2 className="mt-6 font-serif text-4xl font-bold">
                {title || "La tua nuova Vibe List"}
              </h2>

              <p className="mt-2 text-sm font-bold text-[#D8B77A]">
                {city} · {visibility}
              </p>

              <p className="mt-5 leading-7 text-[#F4EFE5]/75">
                {description ||
                  "Qui comparirà la descrizione della lista che stai creando."}
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}