"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/feed", label: "Feed" },
  { href: "/map", label: "Map" },
  { href: "/vibe-lists", label: "Vibe Lists" },
  { href: "/vibe-lists/create", label: "Crea lista" },
  { href: "/route", label: "Route" },
  { href: "/moodboard", label: "Moodboard" },
  { href: "/profile", label: "Profile" },
  { href: "/premium", label: "Premium" },
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Signup" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E1D8] bg-[#F7F4EF]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-[#1A1A2E]">
        <Link href="/" className="text-xl font-bold tracking-tight">
          MoodScape
        </Link>

        <div className="hidden items-center gap-5 text-sm font-semibold lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#4B4B5F] transition hover:text-[#5B4FCF]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link
            href="/premium"
            className="rounded-full bg-[#5B4FCF] px-4 py-2 text-sm font-semibold text-white"
          >
            Upgrade
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1A1A2E] shadow-sm lg:hidden"
        >
          {open ? "Chiudi" : "Menu"}
        </button>
      </nav>

      {open && (
        <div className="border-t border-[#E8E1D8] bg-[#F7F4EF] px-6 py-4 lg:hidden">
          <div className="mx-auto grid max-w-6xl gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#1A1A2E] shadow-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}