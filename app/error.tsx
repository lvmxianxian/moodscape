"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-16 text-[#0E3532]">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 shadow-2xl shadow-[#0E3532]/10">
        <p className="inline-flex rounded-full border border-[#D8B77A] bg-[#F4EFE5] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0E3532]">
          Errore
        </p>

        <h1 className="mt-8 max-w-3xl font-serif text-5xl font-bold leading-tight tracking-tight text-[#2A160E] md:text-7xl">
          Qualcosa non ha seguito la vibe giusta.
        </h1>

        <div className="mt-6 flex max-w-3xl items-center gap-3">
          <div className="h-px flex-1 bg-[#C99A57]" />
          <div className="h-3 w-3 rounded-full bg-[#C99A57]" />
        </div>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#425653]">
          Si è verificato un errore durante il caricamento della pagina. Puoi
          riprovare oppure tornare alla home.
        </p>

        {error?.message && (
          <div className="mt-6 rounded-2xl border border-[#D8B77A]/50 bg-[#F4EFE5] p-4 text-sm font-bold text-[#2A160E]">
            {error.message}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="rounded-full bg-[#0E3532] px-7 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#F4EFE5]"
          >
            Riprova
          </button>

          <a
            href="/"
            className="rounded-full border border-[#C99A57] bg-[#F4EFE5] px-7 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
          >
            Torna alla home
          </a>
        </div>
      </div>
    </main>
  );
}