"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      "Account creato. Se la conferma email è attiva, controlla la posta prima di accedere.",
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
        <section className="w-full rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
          <Link
            href="/"
            className="inline-flex rounded-full bg-[#F7F7F5] px-5 py-3 text-sm font-bold text-[#111111]"
          >
            ← Home
          </Link>

          <div className="mt-8 flex h-16 w-16 items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#0E3532]">
            <img
              src="/logo-mark.png"
              alt="MoodScape"
              className="h-full w-full object-cover"
            />
          </div>

          <p className="mt-6 text-sm font-semibold text-[#7A7A73]">
            Crea il tuo spazio
          </p>

          <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight">
            Registrati su MoodScape.
          </h1>

          <p className="mt-4 leading-7 text-[#55554F]">
            Salva luoghi, costruisci moodboard, crea Vibe Lists e partecipa alla
            community.
          </p>

          <form onSubmit={handleSignup} className="mt-7 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-[#111111]">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="nome@email.com"
                className="rounded-[1.25rem] bg-[#F7F7F5] px-5 py-4 text-base outline-none ring-1 ring-black/5 focus:ring-[#111111]"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-[#111111]">
                Password
              </span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Minimo 6 caratteri"
                className="rounded-[1.25rem] bg-[#F7F7F5] px-5 py-4 text-base outline-none ring-1 ring-black/5 focus:ring-[#111111]"
              />
            </label>

            {message && (
              <div className="rounded-[1.25rem] bg-[#F7F7F5] p-4 text-sm font-semibold leading-6 text-[#55554F]">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#111111] px-6 py-4 text-sm font-bold text-white disabled:opacity-50"
            >
              {loading ? "Creazione account..." : "Crea account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm font-medium text-[#7A7A73]">
            Hai già un account?{" "}
            <Link href="/login" className="font-bold text-[#111111]">
              Accedi
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}