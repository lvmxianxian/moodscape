"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type DbPlace = {
  slug: string;
  name: string;
  city: string;
  area: string;
  mood: string;
  vibe: string;
  description: string;
  latitude: number;
  longitude: number;
};

export default function MapClient() {
  const searchParams = useSearchParams();
  const highlightedPlace = searchParams.get("place");

  const [places, setPlaces] = useState<DbPlace[]>([]);
  const [activeVibe, setActiveVibe] = useState("Tutte");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadPlaces() {
      const { data, error } = await supabase
        .from("places")
        .select("slug,name,city,area,mood,vibe,description,latitude,longitude")
        .order("created_at", { ascending: true });

      if (error) {
        setMessage(error.message);
      } else {
        setPlaces(data ?? []);
      }

      setLoading(false);
    }

    loadPlaces();
  }, []);

  const vibes = useMemo(
    () => ["Tutte", ...Array.from(new Set(places.map((place) => place.vibe)))],
    [places],
  );

  const icon = useMemo(
    () =>
      L.divIcon({
        className: "",
        html: '<div style="width: 34px; height: 34px; border-radius: 999px; background: #0E3532; border: 3px solid #D8B77A; box-shadow: 0 8px 20px rgba(14,53,50,.35);"></div>',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      }),
    [],
  );

  const highlightedIcon = useMemo(
    () =>
      L.divIcon({
        className: "",
        html: '<div style="width: 42px; height: 42px; border-radius: 999px; background: #D8B77A; border: 4px solid #0E3532; box-shadow: 0 10px 24px rgba(14,53,50,.45);"></div>',
        iconSize: [42, 42],
        iconAnchor: [21, 21],
      }),
    [],
  );

  const filteredPlaces =
    activeVibe === "Tutte"
      ? places
      : places.filter((place) => place.vibe === activeVibe);

  const mapCenter = useMemo(() => {
    const selected = places.find((place) => place.slug === highlightedPlace);

    if (selected) {
      return [selected.latitude, selected.longitude] as [number, number];
    }

    return [41.9028, 12.4964] as [number, number];
  }, [places, highlightedPlace]);

  if (loading) {
    return (
      <section className="mt-10 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 text-[#425653] shadow-xl shadow-[#0E3532]/5">
        Caricamento luoghi sulla mappa...
      </section>
    );
  }

  if (message) {
    return (
      <section className="mt-10 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-8 font-bold text-[#2A160E] shadow-xl shadow-[#0E3532]/5">
        {message}
      </section>
    );
  }

  return (
    <>
      <section className="mt-10 flex flex-wrap gap-2">
        {vibes.map((vibe) => (
          <button
            key={vibe}
            onClick={() => setActiveVibe(vibe)}
            className={`rounded-full border px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] ${
              activeVibe === vibe
                ? "border-[#0E3532] bg-[#0E3532] text-[#F4EFE5]"
                : "border-[#D8B77A] bg-[#F8F2E8] text-[#0E3532]"
            }`}
          >
            {vibe}
          </button>
        ))}
      </section>

      {highlightedPlace && (
        <section className="mt-6 rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-5 shadow-xl shadow-[#0E3532]/5">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#C99A57]">
            Luogo evidenziato
          </p>

          <p className="mt-2 text-[#425653]">
            Stai visualizzando sulla mappa il luogo selezionato dal dettaglio.
          </p>
        </section>
      )}

      <section className="mt-8 overflow-hidden rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-3 shadow-2xl shadow-[#0E3532]/10">
        <div className="h-[560px] overflow-hidden rounded-[1.5rem]">
          <MapContainer
            center={mapCenter}
            zoom={highlightedPlace ? 14 : 12}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredPlaces.map((place) => {
              const position = [
                place.latitude,
                place.longitude,
              ] as [number, number];

              const isHighlighted = highlightedPlace === place.slug;

              return (
                <Marker
                  key={place.slug}
                  position={position}
                  icon={isHighlighted ? highlightedIcon : icon}
                >
                  <Popup>
                    <strong>{place.name}</strong>
                    <br />
                    {place.area}
                    <br />
                    <span style={{ color: "#0E3532", fontWeight: 700 }}>
                      {place.mood} · {place.vibe}
                    </span>
                    <br />
                    <a href={`/place/${place.slug}`}>Apri dettaglio</a>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {filteredPlaces.map((place) => (
          <article
            key={place.slug}
            className={`rounded-[2rem] border bg-[#F8F2E8] p-5 shadow-xl shadow-[#0E3532]/5 ${
              highlightedPlace === place.slug
                ? "border-[#0E3532]"
                : "border-[#D8B77A]/50"
            }`}
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#C99A57]">
              {place.area}
            </p>

            <h2 className="mt-3 font-serif text-2xl font-bold text-[#2A160E]">
              {place.name}
            </h2>

            <p className="mt-3 text-sm font-semibold text-[#0E3532]">
              {place.mood} · {place.vibe}
            </p>

            <p className="mt-4 text-sm leading-6 text-[#425653]">
              {place.description}
            </p>

            <Link
              href={`/place/${place.slug}`}
              className="mt-5 inline-flex text-sm font-bold uppercase tracking-[0.14em] text-[#0E3532]"
            >
              Apri dettaglio →
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}