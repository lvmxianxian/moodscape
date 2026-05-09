"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    router.push("/profile");
  }

  return (
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-16 text-[#0E3532]">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="flex flex-col justify-center">
          <p className="inline-flex w-fit rounded-full border border-[#D8B77A] bg-[#F8F2E8] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0E3532]">
            Login
          </p>

          <h1 className="mt-8 max-w-xl font-serif text-5xl font-bold leading-tight tracking-tight text-[#2A160E] md:text-7xl">
            Bentornata su MoodScape.
          </h1>

          <div className="mt-6 flex max-w-lg items-center gap-3">
            <div className="h-px flex-1 bg-[#C99A57]" />
            <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
          </div>

          <p className="mt-6 max-w-lg text-lg leading-8 text-[#425653]">
            Accedi per collegare salvataggi, moodboard, liste e profilo al tuo
            account reale.
          </p>
        </section>

        <section className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-6 shadow-2xl shadow-[#0E3532]/10">
          <div className="rounded-[1.5rem] bg-[#0E3532] p-6 text-[#F4EFE5]">
            <h2 className="font-serif text-3xl font-bold">Accedi</h2>

            <p className="mt-3 leading-7 text-[#F4EFE5]/75">
              Inserisci email e password per entrare nel tuo spazio personale.
            </p>

            <form onSubmit={handleLogin} className="mt-8">
              <div>
                <label className="text-sm font-bold uppercase tracking-[0.14em] text-[#D8B77A]">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-[#D8B77A]/40 bg-[#F4EFE5] px-4 py-3 text-[#0E3532] outline-none focus:border-[#C99A57]"
                />
              </div>

              <div className="mt-5">
                <label className="text-sm font-bold uppercase tracking-[0.14em] text-[#D8B77A]">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-[#D8B77A]/40 bg-[#F4EFE5] px-4 py-3 text-[#0E3532] outline-none focus:border-[#C99A57]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-full bg-[#D8B77A] px-6 py-4 text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532] disabled:opacity-60"
              >
                {loading ? "Accesso..." : "Accedi"}
              </button>
            </form>

            {message && (
              <div className="mt-5 rounded-2xl border border-[#D8B77A]/40 bg-[#F4EFE5] p-4 text-sm font-bold text-[#2A160E]">
                {message}
              </div>
            )}

            <p className="mt-6 text-sm text-[#F4EFE5]/75">
              Non hai ancora un account?{" "}
              <Link href="/signup" className="font-bold text-[#D8B77A]">
                Registrati
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}