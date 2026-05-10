"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { vibeLists } from "@/lib/mock-data";
import PlaceImage from "@/components/PlaceImage";

type DbVibeList = {
  id: string;
  title: string;
  city: string;
  vibe: string;
  description: string | null;
  visibility: string;
  created_at: string;
};

export default function VibeListsPage() {
  const [dbLists, setDbLists] = useState<DbVibeList[]>([]);
  const [savedDemoTitles, setSavedDemoTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadLists() {
      const { data, error } = await supabase
        .from("vibe_lists")
        .select("id,title,city,vibe,description,visibility,created_at")
        .order("created_at", { ascending: false });

      if (error) {
        setMessage(error.message);
      } else {
        setDbLists(data ?? []);
      }

      setLoading(false);
    }

    loadLists();
  }, []);

  function toggleSaveDemo(title: string) {
    setSavedDemoTitles((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title],
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-7xl">
        <section className="mx-auto max-w-md lg:max-w-7xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#7A7A73]">
                Raccolte MoodScape
              </p>

              <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Vibe Lists.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#55554F]">
                Board visive di luoghi organizzate per atmosfera, mood e città.
                Puoi creare liste personali o scoprire raccolte pubbliche.
              </p>
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
              <p className="text-2xl font-bold">{dbLists.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Reali
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">{vibeLists.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Demo
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">
                {new Set(dbLists.map((list) => list.vibe)).size}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Vibe
              </p>
            </div>
          </div>

          <Link
            href="/vibe-lists/create"
            className="mt-5 flex items-center justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-bold text-white"
          >
            Crea nuova Vibe List
          </Link>
        </section>

        <section className="mx-auto mt-8 max-w-md lg:max-w-7xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Liste reali</h2>

            <Link
              href="/community"
              className="text-sm font-bold text-[#7A7A73]"
            >
              Community
            </Link>
          </div>

          {loading ? (
            <div className="mt-4 rounded-[2rem] bg-white p-6 text-[#7A7A73] shadow-sm ring-1 ring-black/5">
              Caricamento liste...
            </div>
          ) : message ? (
            <div className="mt-4 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="text-xl font-bold">Errore</h3>
              <p className="mt-2 text-[#55554F]">{message}</p>
            </div>
          ) : dbLists.length === 0 ? (
            <div className="mt-4 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="text-2xl font-bold tracking-tight">
                Non ci sono ancora liste reali.
              </h3>

              <p className="mt-3 leading-7 text-[#55554F]">
                Crea una lista pubblica o privata per iniziare a costruire la
                tua prima board.
              </p>

              <Link
                href="/vibe-lists/create"
                className="mt-5 inline-flex rounded-full bg-[#111111] px-6 py-3 text-sm font-bold text-white"
              >
                Crea lista
              </Link>
            </div>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dbLists.map((list) => (
                <Link
                  key={list.id}
                  href={`/vibe-lists/${list.id}`}
                  className="group overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
                >
                  <PlaceImage
                    imageUrl={null}
                    name={list.title}
                    vibe={list.vibe}
                    className="h-56"
                  />

                  <div className="p-2 pt-5">
                    <p className="text-sm font-semibold text-[#7A7A73]">
                      {list.city} · {list.visibility}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold tracking-tight">
                      {list.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#55554F]">
                      {list.description || "Lista creata dalla community."}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#55554F]">
                        {list.vibe}
                      </span>

                      <span className="rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#55554F]">
                        Apri →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="mx-auto mt-8 max-w-md pb-10 lg:max-w-7xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Liste demo</h2>

            <p className="text-sm font-bold text-[#7A7A73]">
              Ispirazione iniziale
            </p>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vibeLists.map((list) => {
              const saved = savedDemoTitles.includes(list.title);

              return (
                <article
                  key={list.title}
                  className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5"
                >
                  <PlaceImage
                    imageUrl={null}
                    name={list.title}
                    vibe={list.vibe}
                    className="h-56"
                  />

                  <div className="p-2 pt-5">
                    <p className="text-sm font-semibold text-[#7A7A73]">
                      {list.city} · {list.places} luoghi
                    </p>

                    <h3 className="mt-2 text-2xl font-bold tracking-tight">
                      {list.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#55554F]">
                      {list.description}
                    </p>

                    <button
                      onClick={() => toggleSaveDemo(list.title)}
                      className={`mt-5 w-full rounded-full px-5 py-3 text-sm font-bold ${
                        saved
                          ? "bg-[#F1F1EE] text-[#111111]"
                          : "bg-[#111111] text-white"
                      }`}
                    >
                      {saved ? "Lista salvata ✓" : "Salva lista demo"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}