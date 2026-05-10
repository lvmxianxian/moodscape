import PlaceVisual from "@/components/PlaceVisual";

type PlaceImageProps = {
  imageUrl?: string | null;
  name: string;
  vibe: string;
  className?: string;
};

export default function PlaceImage({
  imageUrl,
  name,
  vibe,
  className = "",
}: PlaceImageProps) {
  if (!imageUrl) {
    return <PlaceVisual vibe={vibe} className={className} />;
  }

  return (
    <div
      className={`relative flex h-56 items-end overflow-hidden rounded-[1.5rem] bg-[#0E3532] ${className}`}
    >
      <img
        src={imageUrl}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0E3532]/80 via-[#0E3532]/20 to-transparent" />

      <div className="relative z-10 flex w-full items-end justify-between gap-3 p-4">
        <span className="rounded-full bg-[#F4EFE5] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0E3532]">
          {vibe}
        </span>

        <span className="hidden rounded-full border border-[#F4EFE5]/60 bg-[#0E3532]/35 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#F4EFE5] backdrop-blur sm:inline-flex">
          Foto reale
        </span>
      </div>
    </div>
  );
}