type PlaceVisualProps = {
  vibe: string;
  className?: string;
};

const visualByVibe: Record<string, { emoji: string; label: string; gradient: string }> = {
  "Dark academia": {
    emoji: "📚",
    label: "Quiet study",
    gradient: "from-[#0E3532] via-[#2A160E] to-[#0E3532]",
  },
  "Dolce vita": {
    emoji: "🍊",
    label: "Golden city",
    gradient: "from-[#D8B77A] via-[#F4EFE5] to-[#C99A57]",
  },
  "Neon nightlife": {
    emoji: "🪩",
    label: "Night lights",
    gradient: "from-[#0E3532] via-[#2A160E] to-[#C99A57]",
  },
  "Romantic ruins": {
    emoji: "🏛️",
    label: "Ancient romance",
    gradient: "from-[#2A160E] via-[#C99A57] to-[#F4EFE5]",
  },
  "Art gallery mood": {
    emoji: "🖼️",
    label: "Soft gallery",
    gradient: "from-[#F4EFE5] via-[#D8B77A] to-[#0E3532]",
  },
  "Vintage film": {
    emoji: "🎞️",
    label: "Old cinema",
    gradient: "from-[#2A160E] via-[#D8B77A] to-[#F4EFE5]",
  },
  "Golden hour walk": {
    emoji: "🌅",
    label: "Warm walk",
    gradient: "from-[#C99A57] via-[#F4EFE5] to-[#0E3532]",
  },
  "Old money": {
    emoji: "🥂",
    label: "Elegant pause",
    gradient: "from-[#0E3532] via-[#D8B77A] to-[#F4EFE5]",
  },
  "Rooftop sunset": {
    emoji: "🌇",
    label: "Skyline mood",
    gradient: "from-[#2A160E] via-[#C99A57] to-[#0E3532]",
  },
  "Hidden garden": {
    emoji: "🌿",
    label: "Secret green",
    gradient: "from-[#0E3532] via-[#425653] to-[#D8B77A]",
  },
  "Bookshop afternoon": {
    emoji: "☕",
    label: "Bookish calm",
    gradient: "from-[#2A160E] via-[#0E3532] to-[#D8B77A]",
  },
  "Indie sleaze": {
    emoji: "🕶️",
    label: "Weekend energy",
    gradient: "from-[#0E3532] via-[#C99A57] to-[#2A160E]",
  },
  "Spiritual retreat": {
    emoji: "🕯️",
    label: "Soft reset",
    gradient: "from-[#F4EFE5] via-[#D8B77A] to-[#0E3532]",
  },
  "Local authentic": {
    emoji: "🧿",
    label: "Local soul",
    gradient: "from-[#0E3532] via-[#425653] to-[#2A160E]",
  },
  // Vibe mancanti — aggiunti
  "Cozy café": {
    emoji: "☕",
    label: "Warm inside",
    gradient: "from-[#2A160E] via-[#D8B77A] to-[#C99A57]",
  },
  "Quiet luxury": {
    emoji: "🪞",
    label: "Still elegance",
    gradient: "from-[#F4EFE5] via-[#C99A57] to-[#0E3532]",
  },
  "Minimal chic": {
    emoji: "🪴",
    label: "Clean calm",
    gradient: "from-[#F4EFE5] via-[#D8B77A] to-[#F4EFE5]",
  },
  "Rainy day": {
    emoji: "🌧️",
    label: "Grey softness",
    gradient: "from-[#425653] via-[#0E3532] to-[#2A160E]",
  },
  "Slow morning": {
    emoji: "🌤️",
    label: "Gentle start",
    gradient: "from-[#F4EFE5] via-[#D8B77A] to-[#C99A57]",
  },
  "Secret garden": {
    emoji: "🌺",
    label: "Hidden bloom",
    gradient: "from-[#0E3532] via-[#425653] to-[#D8B77A]",
  },
  "Soft nightlife": {
    emoji: "🌙",
    label: "Gentle evening",
    gradient: "from-[#0E3532] via-[#2A160E] to-[#425653]",
  },
  "Museum date": {
    emoji: "🏺",
    label: "Art & quiet",
    gradient: "from-[#2A160E] via-[#C99A57] to-[#F4EFE5]",
  },
  "Sunset walk": {
    emoji: "🌄",
    label: "Evening glow",
    gradient: "from-[#C99A57] via-[#2A160E] to-[#0E3532]",
  },
  "City break": {
    emoji: "🏙️",
    label: "Urban escape",
    gradient: "from-[#0E3532] via-[#425653] to-[#C99A57]",
  },
  "Percorso": {
    emoji: "🗺️",
    label: "Itinerario",
    gradient: "from-[#0E3532] via-[#2A160E] to-[#D8B77A]",
  },
  "Salvato": {
    emoji: "🔖",
    label: "Salvato",
    gradient: "from-[#D8B77A] via-[#C99A57] to-[#0E3532]",
  },
};

export default function PlaceVisual({ vibe, className = "" }: PlaceVisualProps) {
  const visual =
    visualByVibe[vibe] ?? {
      emoji: "✨",
      label: "MoodScape",
      gradient: "from-[#0E3532] via-[#425653] to-[#D8B77A]",
    };

  return (
    <div
      className={`relative flex h-56 items-end overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${visual.gradient} p-4 ${className}`}
    >
      <div className="absolute left-6 top-6 text-5xl opacity-90">
        {visual.emoji}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(244,239,229,0.35),transparent_32%)]" />

      <div className="relative z-10 flex w-full items-end justify-between gap-3">
        <span className="rounded-full bg-[#F4EFE5] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0E3532]">
          {vibe}
        </span>

        <span className="hidden rounded-full border border-[#F4EFE5]/50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#F4EFE5] sm:inline-flex">
          {visual.label}
        </span>
      </div>
    </div>
  );
}