"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthButton() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user.email ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setEmail(null);
    window.location.href = "/";
  }

  if (email) {
    return (
      <button
        onClick={handleLogout}
        className="rounded-full bg-[#0E3532] px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#F4EFE5] transition hover:bg-[#2A160E]"
      >
        Logout
      </button>
    );
  }

  return (
    <Link
      href="/login"
      className="rounded-full bg-[#0E3532] px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#F4EFE5] transition hover:bg-[#2A160E]"
    >
      Login
    </Link>
  );
}