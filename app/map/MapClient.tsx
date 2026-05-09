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
        html: '<div style="width: 34px; height: 34px; border-radius: 999px; background: #5B4FCF; border: 3px solid white; box-shadow: 0 8px 20px rgba(91,79,207,.35);"></div>',
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
      <section className="mt-8 flex flex-wrap gap-2">
        {vibes.map((vibe) => (
          <button
            key={vibe}
            onClick={() => setActiveVibe(vibe)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              activeVibe === vibe
                ? "bg-[#5B4FCF] text-white"
                : "bg-white text-[#1A1A2E]"
            }`}
          >
            {vibe}
          </button>
        ))}
      </section>

      <section className="mt-8 overflow-hidden rounded-[2rem] bg-white p-3 shadow-xl shadow-black/10">
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
                    <span style={{ color: "#5B4FCF", fontWeight: 700 }}>
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
          <article key={place.slug} className="rounded-3xl bg-white p-5">
            <p className="text-sm font-semibold text-[#5B4FCF]">
              {place.area}
            </p>

            <h2 className="mt-2 text-xl font-bold">{place.name}</h2>

            <p className="mt-3 text-sm text-[#5A5A6E]">
              {place.mood} · {place.vibe}
            </p>
          </article>
        ))}
      </section>
    </>
  );
}