"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

type ReportTarget = "post" | "comment" | "place" | "event";

type ReportButtonProps = {
  targetType: ReportTarget;
  targetId: string;
  variant?: "link" | "ghost" | "block";
  className?: string;
  label?: string;
};

const reasons = [
  "Spam o pubblicità",
  "Contenuto offensivo",
  "Informazioni false",
  "Contenuto inappropriato",
  "Altro",
];

export default function ReportButton({
  targetType,
  targetId,
  variant = "link",
  className = "",
  label = "Segnala",
}: ReportButtonProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<string>(reasons[0]);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  function reset() {
    setReason(reasons[0]);
    setNote("");
    setMessage("");
    setDone(false);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setMessage("");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setMessage("Per segnalare devi prima accedere.");
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.from("community_reports").insert({
      user_id: session.user.id,
      target_type: targetType,
      target_id: targetId,
      reason,
      note: note.trim() || null,
    });

    if (error) {
      setMessage(error.message);
      setSubmitting(false);
      return;
    }

    setDone(true);
    setSubmitting(false);
  }

  const triggerClass =
    variant === "block"
      ? `block w-full rounded-full bg-[#F1F1EE] px-6 py-4 text-center text-sm font-bold text-[#111111] ${className}`
      : variant === "ghost"
        ? `rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#7A7A73] ${className}`
        : `text-xs font-bold text-[#7A7A73] underline-offset-4 hover:underline ${className}`;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          reset();
          setOpen(true);
        }}
        className={triggerClass}
      >
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 px-4 py-6 sm:items-center"
          role="dialog"
          aria-modal="true"
          onClick={() => {
            if (!submitting) setOpen(false);
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-xl"
          >
            {!done ? (
              <>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
                  Segnalazione
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#111111]">
                  Cosa non va?
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#55554F]">
                  Le segnalazioni vengono moderate dal team MoodScape. Non
                  inviarle per disaccordi personali.
                </p>

                <div className="mt-5 grid gap-2">
                  {reasons.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setReason(item)}
                      className={`rounded-full px-4 py-3 text-left text-sm font-bold ${
                        reason === item
                          ? "bg-[#111111] text-white"
                          : "bg-[#F7F7F5] text-[#111111]"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Aggiungi un dettaglio (opzionale)"
                  className="mt-4 w-full rounded-[1.5rem] bg-[#F7F7F5] px-4 py-3 text-sm leading-6 text-[#111111] outline-none ring-1 ring-black/5"
                  rows={3}
                />

                {message && (
                  <p className="mt-3 rounded-[1rem] bg-[#F7F7F5] p-3 text-sm font-semibold text-[#55554F]">
                    {message}
                  </p>
                )}

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    disabled={submitting}
                    className="rounded-full bg-[#F1F1EE] px-5 py-3 text-sm font-bold text-[#111111] disabled:opacity-60"
                  >
                    Annulla
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="rounded-full bg-[#111111] px-5 py-3 text-sm font-bold text-white disabled:opacity-60"
                  >
                    {submitting ? "Invio..." : "Invia"}
                  </button>
                </div>

                {message.includes("accedere") && (
                  <div className="mt-4 flex gap-2">
                    <Link
                      href="/login"
                      className="flex-1 rounded-full bg-[#111111] px-5 py-3 text-center text-sm font-bold text-white"
                    >
                      Accedi
                    </Link>
                    <Link
                      href="/signup"
                      className="flex-1 rounded-full bg-[#F1F1EE] px-5 py-3 text-center text-sm font-bold text-[#111111]"
                    >
                      Registrati
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9A9A92]">
                  Grazie
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#111111]">
                  Segnalazione inviata.
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#55554F]">
                  Il team MoodScape darà un&apos;occhiata. Se serve, ti
                  contatteremo via email.
                </p>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-5 w-full rounded-full bg-[#111111] px-5 py-3 text-sm font-bold text-white"
                >
                  Chiudi
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
