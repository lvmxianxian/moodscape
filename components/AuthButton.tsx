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
        className="rounded-full bg-[#1A1A2E] px-4 py-2 text-sm font-semibold text-white"
      >
        Logout
      </button>
    );
  }

  return (
    <Link
      href="/login"
      className="rounded-full bg-[#5B4FCF] px-4 py-2 text-sm font-semibold text-white"
    >
      Login
    </Link>
  );
}