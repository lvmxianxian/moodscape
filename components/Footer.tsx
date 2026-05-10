import Link from "next/link";

const links = [
  { href: "/explore", label: "Mood Check" },
  { href: "/feed", label: "Vibe Feed" },
  { href: "/map", label: "Vibe Map" },
  { href: "/vibe-lists", label: "Vibe Lists" },
  { href: "/premium", label: "Premium" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#D8B77A]/30 bg-[#F4EFE5] px-6 py-10 text-[#0E3532]">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="font-serif text-3xl font-bold text-[#2A160E]">
            MoodScape
          </p>

          <p className="mt-4 max-w-xl leading-7 text-[#425653]">
            Scopri luoghi, percorsi e liste in base a come ti senti e
            all’atmosfera che vuoi vivere.
          </p>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#C99A57]">
            Mood-based city discovery
          </p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#C99A57]">
            Navigazione
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-[#0E3532] transition hover:text-[#C99A57]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-[#D8B77A]/30 pt-6 text-xs text-[#425653] md:flex-row md:items-center md:justify-between">
        <p>© 2026 MoodScape. Demo MVP.</p>

        <p>
          Built with Next.js, Supabase, Vercel and OpenStreetMap.
        </p>
      </div>
    </footer>
  );
}