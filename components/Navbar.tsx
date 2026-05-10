"use client";

import Link from "next/link";
import { useState } from "react";
import AuthButton from "./AuthButton";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/demo", label: "Demo" },
  { href: "/community", label: "Community" },
  { href: "/explore", label: "Mood Check" },
  { href: "/feed", label: "Feed" },
  { href: "/map", label: "Map" },
  { href: "/vibe-lists", label: "Vibe Lists" },
];

const secondaryLinks = [
  { href: "/moodboard", label: "Moodboard" },
  { href: "/profile", label: "Profile" },
  { href: "/premium", label: "Premium" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#D8B77A]/30 bg-[#F4EFE5]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-[#0E3532]">
        <Link href="/" className="text-xl font-bold tracking-tight">
          MoodScape
        </Link>

        <div className="hidden items-center gap-5 text-sm font-semibold xl:flex">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#0E3532]/70 transition hover:text-[#C99A57]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          {secondaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-[#D8B77A]/50 bg-[#F8F2E8] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0E3532] transition hover:border-[#C99A57]"
            >
              {link.label}
            </Link>
          ))}

          <AuthButton />
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-full border border-[#D8B77A] bg-[#F8F2E8] px-4 py-2 text-sm font-semibold text-[#0E3532] xl:hidden"
        >
          {open ? "Chiudi" : "Menu"}
        </button>
      </nav>

      {open && (
        <div className="border-t border-[#D8B77A]/30 bg-[#F4EFE5] px-6 py-4 xl:hidden">
          <div className="mx-auto grid max-w-6xl gap-3">
            {[...primaryLinks, ...secondaryLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-[#D8B77A]/40 bg-[#F8F2E8] px-4 py-3 text-sm font-semibold text-[#0E3532]"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/vibe-lists/create"
              onClick={() => setOpen(false)}
              className="rounded-2xl bg-[#0E3532] px-4 py-3 text-sm font-bold text-[#F4EFE5]"
            >
              Crea Vibe List
            </Link>

            <div className="pt-2">
              <AuthButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}