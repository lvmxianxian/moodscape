import Link from "next/link";

const links = [
  { href: "/feed", label: "Feed" },
  { href: "/community", label: "Community" },
  { href: "/events", label: "Eventi" },
  { href: "/map", label: "Mappa" },
  { href: "/vibe-lists", label: "Vibe Lists" },
  { href: "/profile", label: "Profilo" },
];

function LogoMark() {
  return (
    <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-[#0E3532]">
      <img
        src="/logo-mark.png"
        alt="MoodScape"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-[#F7F7F5] px-5 py-10 text-[#111111]">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="flex items-center gap-3">
                <LogoMark />

                <div>
                  <p className="text-xl font-bold tracking-tight">MoodScape</p>
                  <p className="mt-1 text-sm font-medium text-[#7A7A73]">
                    Scoperta basata sul mood
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#55554F]">
                Scopri luoghi, eventi, liste e community in base a come ti
                senti e all’atmosfera che vuoi vivere.
              </p>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#7A7A73]">
                Navigazione
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full bg-[#F7F7F5] px-4 py-3 text-sm font-bold text-[#111111] transition hover:bg-[#111111] hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-black/5 pt-5 text-sm font-medium text-[#7A7A73] md:flex-row md:items-center md:justify-between">
            <p>© 2026 MoodScape. Demo MVP.</p>
            <p>Creato con Next.js, Supabase, Vercel e OpenStreetMap.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}