"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

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
  const [created, setCreated] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreated(true);
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
            Le Vibe Lists sono raccolte di luoghi create dagli utenti intorno a
            una vibe specifica. In questa demo il form non salva ancora su
            database, ma simula il flusso reale.
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
              className="mt-6 w-full rounded-full bg-[#0E3532] px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
            >
              Crea lista demo
            </button>
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

            {created && (
              <div className="mt-6 rounded-3xl bg-[#D8B77A] p-5 text-[#0E3532]">
                <p className="font-bold">Lista creata nella demo ✓</p>
                <p className="mt-2 text-sm">
                  Nel prossimo step collegheremo questo flusso a login, profilo
                  utente e database.
                </p>
              </div>
            )}

            <Link
              href="/vibe-lists"
              className="mt-6 block rounded-full bg-[#F4EFE5] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
            >
              Torna alle Vibe Lists
            </Link>
          </aside>
        </section>
      </div>
    </main>
  );
}