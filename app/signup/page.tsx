"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(
        "Account creato. Controlla la tua email per confermare l’iscrizione.",
      );
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#F7F4EF] px-6 py-8 text-[#1A1A2E]">
      <div className="mx-auto max-w-md">
        <section className="mt-12 rounded-[2rem] bg-white p-6 shadow-xl shadow-black/5">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B4FCF]">
            Crea account
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            Entra in MoodScape.
          </h1>

          <p className="mt-4 leading-7 text-[#5A5A6E]">
            Crea un account demo per iniziare a collegare profilo, moodboard e
            Vibe Lists a un utente reale.
          </p>

          <form onSubmit={handleSignup} className="mt-8">
            <div>
              <label className="text-sm font-bold text-[#5B4FCF]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-[#E8E1D8] bg-[#F7F4EF] px-4 py-3 outline-none focus:border-[#5B4FCF]"
              />
            </div>

            <div className="mt-5">
              <label className="text-sm font-bold text-[#5B4FCF]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={6}
                className="mt-2 w-full rounded-2xl border border-[#E8E1D8] bg-[#F7F4EF] px-4 py-3 outline-none focus:border-[#5B4FCF]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-full bg-[#5B4FCF] px-6 py-4 font-semibold text-white disabled:opacity-60"
            >
              {loading ? "Creazione..." : "Crea account"}
            </button>
          </form>

          {message && (
            <div className="mt-5 rounded-2xl bg-[#EDE9FF] p-4 text-sm font-semibold text-[#5B4FCF]">
              {message}
            </div>
          )}

          <p className="mt-6 text-sm text-[#5A5A6E]">
            Hai già un account?{" "}
            <Link href="/login" className="font-semibold text-[#5B4FCF]">
              Accedi
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}