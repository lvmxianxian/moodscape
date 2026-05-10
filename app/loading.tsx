export default function LoadingPage() {
  return (
    <main className="min-h-screen bg-[#F4EFE5] px-6 py-16 text-[#0E3532]">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 shadow-2xl shadow-[#0E3532]/10">
        <p className="inline-flex rounded-full border border-[#D8B77A] bg-[#F4EFE5] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0E3532]">
          MoodScape
        </p>

        <h1 className="mt-8 max-w-3xl font-serif text-5xl font-bold leading-tight tracking-tight text-[#2A160E] md:text-7xl">
          Prepariamo la tua vibe.
        </h1>

        <div className="mt-6 flex max-w-3xl items-center gap-3">
          <div className="h-px flex-1 bg-[#C99A57]" />
          <div className="h-3 w-3 animate-pulse rounded-full bg-[#C99A57]" />
        </div>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#425653]">
          Stiamo caricando luoghi, mood e atmosfere.
        </p>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          <div className="h-24 animate-pulse rounded-3xl bg-[#F4EFE5]" />
          <div className="h-24 animate-pulse rounded-3xl bg-[#F4EFE5]" />
          <div className="h-24 animate-pulse rounded-3xl bg-[#F4EFE5]" />
        </div>
      </div>
    </main>
  );
}