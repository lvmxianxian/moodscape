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
    <main className="min-h-screen bg-[#F7F4EF] px-6 py-8 text-[#1A1A2E]">
      <div className="mx-auto max-w-6xl">
        <section className="mt-8">
          <Link
            href="/vibe-lists"
            className="text-sm font-semibold text-[#5B4FCF]"
          >
            ← Torna alle Vibe Lists
          </Link>

          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.25em] text-[#5B4FCF]">
            Crea Vibe List
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Costruisci una lista intorno a un’atmosfera.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5A5A6E]">
            Le Vibe Lists sono raccolte di luoghi create dagli utenti intorno a
            una vibe specifica. In questa demo il form non salva ancora su
            database, ma simula il flusso reale.
          </p>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] bg-white p-6 shadow-xl shadow-black/5"
          >
            <div>
              <label className="text-sm font-bold text-[#5B4FCF]">
                Titolo lista
              </label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Es. Roma romantic ruins"
                className="mt-2 w-full rounded-2xl border border-[#E8E1D8] bg-[#F7F4EF] px-4 py-3 outline-none focus:border-[#5B4FCF]"
              />
            </div>

            <div className="mt-5">
              <label className="text-sm font-bold text-[#5B4FCF]">Città</label>
              <input
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#E8E1D8] bg-[#F7F4EF] px-4 py-3 outline-none focus:border-[#5B4FCF]"
              />
            </div>

            <div className="mt-5">
              <label className="text-sm font-bold text-[#5B4FCF]">
                Vibe principale
              </label>
              <select
                value={vibe}
                onChange={(event) => setVibe(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#E8E1D8] bg-[#F7F4EF] px-4 py-3 outline-none focus:border-[#5B4FCF]"
              >
                {vibes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <label className="text-sm font-bold text-[#5B4FCF]">
                Visibilità
              </label>
              <select
                value={visibility}
                onChange={(event) => setVisibility(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#E8E1D8] bg-[#F7F4EF] px-4 py-3 outline-none focus:border-[#5B4FCF]"
              >
                <option>Pubblica</option>
                <option>Privata</option>
              </select>
            </div>

            <div className="mt-5">
              <label className="text-sm font-bold text-[#5B4FCF]">
                Descrizione
              </label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Descrivi che atmosfera deve avere questa lista..."
                rows={5}
                className="mt-2 w-full rounded-2xl border border-[#E8E1D8] bg-[#F7F4EF] px-4 py-3 outline-none focus:border-[#5B4FCF]"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-[#5B4FCF] px-6 py-4 font-semibold text-white"
            >
              Crea lista demo
            </button>
          </form>

          <aside className="rounded-[2rem] bg-[#1A1A2E] p-6 text-white shadow-xl shadow-black/10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/50">
              Anteprima
            </p>

            <div className="mt-6 rounded-[1.5rem] bg-white/10 p-5">
              <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#1A1A2E]">
                {vibe}
              </span>

              <h2 className="mt-6 text-3xl font-bold">
                {title || "La tua nuova Vibe List"}
              </h2>

              <p className="mt-2 text-sm font-semibold text-white/60">
                {city} · {visibility}
              </p>

              <p className="mt-5 leading-7 text-white/75">
                {description ||
                  "Qui comparirà la descrizione della lista che stai creando."}
              </p>
            </div>

            {created && (
              <div className="mt-6 rounded-3xl bg-[#5B4FCF] p-5">
                <p className="font-bold">Lista creata nella demo ✓</p>
                <p className="mt-2 text-sm text-white/80">
                  Nel prossimo step collegheremo questo flusso a login, profilo
                  utente e database.
                </p>
              </div>
            )}

            <Link
              href="/vibe-lists"
              className="mt-6 block rounded-full bg-white px-6 py-3 text-center font-semibold text-[#1A1A2E]"
            >
              Torna alle Vibe Lists
            </Link>
          </aside>
        </section>
      </div>
    </main>
  );
}