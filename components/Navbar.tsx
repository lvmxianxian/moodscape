"use client";

import Link from "next/link";
import { useState } from "react";
import AuthButton from "./AuthButton";

type NavLink = {
  href: string;
  label: string;
  description?: string;
};

const mainLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/feed", label: "Feed" },
  { href: "/community", label: "Community" },
  { href: "/events", label: "Eventi" },
  { href: "/map", label: "Mappa" },
];

const menuLinks: NavLink[] = [
  { href: "/explore", label: "Mood Check", description: "Scegli mood e vibe" },
  { href: "/vibe-lists", label: "Vibe Lists", description: "Raccolte e board" },
  { href: "/moodboard", label: "Moodboard", description: "Luoghi salvati" },
  {
    href: "/profile",
    label: "Profilo",
    description: "Il tuo spazio personale",
  },
  { href: "/premium", label: "Premium", description: "Funzioni avanzate" },
  { href: "/demo", label: "Demo", description: "Presentazione MVP" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#F7F7F5]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-[#111111]">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#111111] text-lg text-white">
            🌙
          </div>

          <div>
            <p className="text-base font-bold leading-none tracking-tight">
              MoodScape
            </p>
            <p className="mt-1 hidden text-xs font-medium text-[#7A7A73] sm:block">
              Scoperta basata sul mood
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 rounded-full bg-white p-1 shadow-sm ring-1 ring-black/5 lg:flex">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#55554F] transition hover:bg-[#111111] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <AuthButton />

          <button
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg shadow-sm ring-1 ring-black/5"
            aria-label="Apri menu"
          >
            {open ? "×" : "☰"}
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg shadow-sm ring-1 ring-black/5 lg:hidden"
          aria-label="Apri menu"
        >
          {open ? "×" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="border-t border-black/5 bg-[#F7F7F5] px-5 py-5">
          <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[...mainLinks, ...menuLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:ring-black/10"
              >
                <p className="text-base font-bold text-[#111111]">
                  {link.label}
                </p>

                {link.description && (
                  <p className="mt-2 text-sm font-medium text-[#7A7A73]">
                    {link.description}
                  </p>
                )}
              </Link>
            ))}

            <Link
              href="/vibe-lists/create"
              onClick={() => setOpen(false)}
              className="rounded-[1.5rem] bg-[#111111] p-5 text-white shadow-sm"
            >
              <p className="text-base font-bold">Crea Vibe List</p>
              <p className="mt-2 text-sm font-medium text-white/60">
                Pubblica una nuova raccolta
              </p>
            </Link>

            <div className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-black/5 lg:hidden">
              <AuthButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}