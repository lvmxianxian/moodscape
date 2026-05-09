"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SavePlaceButton({ placeSlug }: { placeSlug: string }) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function checkSavedPlace() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("saved_places")
        .select("id")
        .eq("user_id", session.user.id)
        .eq("place_slug", placeSlug)
        .maybeSingle();

      setSaved(Boolean(data));
      setLoading(false);
    }

    checkSavedPlace();
  }, [placeSlug]);

  async function handleSave() {
    setLoading(true);
    setMessage("");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setMessage("Devi accedere per salvare questo luogo.");
      setLoading(false);
      return;
    }

    if (saved) {
      const { error } = await supabase
        .from("saved_places")
        .delete()
        .eq("user_id", session.user.id)
        .eq("place_slug", placeSlug);

      if (error) {
        setMessage(error.message);
      } else {
        setSaved(false);
        setMessage("Rimosso dalla moodboard.");
      }

      setLoading(false);
      return;
    }

    const { error } = await supabase.from("saved_places").insert({
      user_id: session.user.id,
      place_slug: placeSlug,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setSaved(true);
      setMessage("Salvato nella moodboard.");
    }

    setLoading(false);
  }

  return (
    <div>
      <button
        onClick={handleSave}
        disabled={loading}
        className={`mt-8 block w-full rounded-full px-6 py-3 text-center font-semibold text-white disabled:opacity-60 ${
          saved ? "bg-[#1A1A2E]" : "bg-[#5B4FCF]"
        }`}
      >
        {loading ? "Caricamento..." : saved ? "Salvato ✓" : "Salva nella moodboard"}
      </button>

      {message && (
        <p className="mt-3 text-center text-sm font-semibold text-[#5B4FCF]">
          {message}
        </p>
      )}
    </div>
  );
}