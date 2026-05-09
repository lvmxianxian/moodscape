"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useMemo, useState } from "react";
import { places } from "@/lib/mock-data";

const vibes = [
  "Tutte",
  ...Array.from(new Set(places.map((place) => place.vibe))),
];

export default function MapClient() {
  const [activeVibe, setActiveVibe] = useState("Tutte");

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

  const filteredPlaces =
    activeVibe === "Tutte"
      ? places
      : places.filter((place) => place.vibe === activeVibe);

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

      <section className="mt-8 overflow-hidden rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-3 shadow-2xl shadow-[#0E3532]/10">
        <div className="h-[560px] overflow-hidden rounded-[1.5rem]">
          <MapContainer
            center={[41.9028, 12.4964]}
            zoom={12}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredPlaces.map((place) => {
              const position = [
                place.position[0],
                place.position[1],
              ] as [number, number];

              return (
                <Marker key={place.slug} position={position} icon={icon}>
                  <Popup>
                    <strong>{place.name}</strong>
                    <br />
                    {place.area}
                    <br />
                    <span style={{ color: "#0E3532", fontWeight: 700 }}>
                      {place.mood} · {place.vibe}
                    </span>
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
            className="rounded-[2rem] border border-[#D8B77A]/50 bg-[#F8F2E8] p-5 shadow-xl shadow-[#0E3532]/5"
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
          </article>
        ))}
      </section>
    </>
  );
}