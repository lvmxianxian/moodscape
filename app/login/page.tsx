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
    <main className="min-h-screen bg-[#F7F4EF] px-6 py-8 text-[#1A1A2E]">
      <div className="mx-auto max-w-md">
        <section className="mt-12 rounded-[2rem] bg-white p-6 shadow-xl shadow-black/5">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B4FCF]">
            Login
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            Bentornata su MoodScape.
          </h1>

          <p className="mt-4 leading-7 text-[#5A5A6E]">
            Accedi per collegare progressivamente salvataggi, liste e profilo a
            un account reale.
          </p>

          <form onSubmit={handleLogin} className="mt-8">
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
                className="mt-2 w-full rounded-2xl border border-[#E8E1D8] bg-[#F7F4EF] px-4 py-3 outline-none focus:border-[#5B4FCF]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-full bg-[#5B4FCF] px-6 py-4 font-semibold text-white disabled:opacity-60"
            >
              {loading ? "Accesso..." : "Accedi"}
            </button>
          </form>

          {message && (
            <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">
              {message}
            </div>
          )}

          <p className="mt-6 text-sm text-[#5A5A6E]">
            Non hai ancora un account?{" "}
            <Link href="/signup" className="font-semibold text-[#5B4FCF]">
              Registrati
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}