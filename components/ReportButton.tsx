"use client";

import { useState } from "react";

type ReportButtonProps = {
  type: "post" | "commento" | "luogo" | "evento";
  targetId: string;
  className?: string;
};

export default function ReportButton({ type, targetId, className = "" }: ReportButtonProps) {
  const [open, setOpen] = useState(false);
  const [reported, setReported] = useState(false);
  const [reason, setReason] = useState("");

  const reasons = [
    "Contenuto inappropriato",
    "Spam o pubblicità",
    "Informazioni false",
    "Incitamento all'odio",
    "Altro",
  ];

  function handleReport() {
    if (!reason) return;
    // In produzione: invio a Supabase tabella "reports"
    console.log("Segnalazione:", { type, targetId, reason });
    setReported(true);
    setOpen(false);
  }

  if (reported) {
    return (
      <span className={`text-xs font-semibold text-[#9A9A92] ${className}`}>
        Segnalato ✓
      </span>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="text-xs font-semibold text-[#9A9A92] transition hover:text-[#55554F]"
        aria-label={`Segnala ${type}`}
      >
        Segnala
      </button>

      {open && (
        <div className="absolute right-0 top-7 z-50 w-56 rounded-[1.5rem] bg-white p-4 shadow-xl ring-1 ring-black/10">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#9A9A92]">
            Motivo segnalazione
          </p>

          <div className="mt-3 flex flex-col gap-2">
            {reasons.map((r) => (
              <button
                key={r}
                onClick={() => setReason(r)}
                className={`rounded-full px-3 py-2 text-left text-xs font-semibold transition ${
                  reason === r
                    ? "bg-[#111111] text-white"
                    : "bg-[#F7F7F5] text-[#55554F] hover:bg-[#F1F1EE]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={handleReport}
              disabled={!reason}
              className="flex-1 rounded-full bg-[#111111] py-2 text-xs font-bold text-white disabled:opacity-40"
            >
              Invia
            </button>

            <button
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full bg-[#F7F7F5] py-2 text-xs font-bold text-[#111111]"
            >
              Annulla
            </button>
          </div>
        </div>
      )}
    </div>
  );
}