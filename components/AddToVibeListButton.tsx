"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type DbVibeList = {
  id: string;
  title: string;
  city: string;
  vibe: string;
};

export default function AddToVibeListButton({
  placeSlug,
}: {
  placeSlug: string;
}) {
  const [lists, setLists] = useState<DbVibeList[]>([]);
  const [selectedListId, setSelectedListId] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadLists() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setEmail(null);
        setLoading(false);
        return;
      }

      setEmail(session.user.email ?? null);

      const { data, error } = await supabase
        .from("vibe_lists")
        .select("id,title,city,vibe")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        setMessage(error.message);
      } else {
        setLists(data ?? []);

        if (data && data.length > 0) {
          setSelectedListId(data[0].id);
        }
      }

      setLoading(false);
    }

    loadLists();
  }, []);

  async function handleAddToList() {
    setSaving(true);
    setMessage("");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setMessage("Devi accedere per aggiungere questo luogo a una lista.");
      setSaving(false);
      return;
    }

    if (!selectedListId) {
      setMessage("Crea prima una Vibe List.");
      setSaving(false);
      return;
    }

    const { error } = await supabase.from("vibe_list_places").insert({
      vibe_list_id: selectedListId,
      place_slug: placeSlug,
    });

    if (error) {
      if (error.message.toLowerCase().includes("duplicate")) {
        setMessage("Questo luogo è già dentro la lista.");
      } else {
        setMessage(error.message);
      }
    } else {
      setMessage("Luogo aggiunto alla Vibe List ✓");
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <div className="mt-5 rounded-3xl border border-[#D8B77A]/50 bg-[#F8F2E8] p-4 text-sm text-[#425653]">
        Caricamento liste...
      </div>
    );
  }

  if (!email) {
    return (
      <div className="mt-5 rounded-3xl border border-[#D8B77A]/50 bg-[#F8F2E8] p-4">
        <p className="text-sm font-bold text-[#2A160E]">
          Accedi per aggiungere questo luogo a una Vibe List.
        </p>
      </div>
    );
  }

  if (lists.length === 0) {
    return (
      <div className="mt-5 rounded-3xl border border-[#D8B77A]/50 bg-[#F8F2E8] p-4">
        <p className="text-sm font-bold text-[#2A160E]">
          Non hai ancora Vibe Lists.
        </p>

        <a
          href="/vibe-lists/create"
          className="mt-3 inline-flex text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
        >
          Crea una lista →
        </a>
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-3xl border border-[#D8B77A]/50 bg-[#F8F2E8] p-4">
      <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
        Aggiungi a una Vibe List
      </label>

      <select
        value={selectedListId}
        onChange={(event) => setSelectedListId(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-[#D8B77A]/50 bg-[#F4EFE5] px-4 py-3 text-sm font-bold text-[#0E3532] outline-none"
      >
        {lists.map((list) => (
          <option key={list.id} value={list.id}>
            {list.title} · {list.vibe}
          </option>
        ))}
      </select>

      <button
        onClick={handleAddToList}
        disabled={saving}
        className="mt-3 w-full rounded-full bg-[#0E3532] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5] disabled:opacity-60"
      >
        {saving ? "Aggiunta..." : "Aggiungi alla lista"}
      </button>

      {message && (
        <p className="mt-3 text-center text-sm font-bold text-[#0E3532]">
          {message}
        </p>
      )}
    </div>
  );
}