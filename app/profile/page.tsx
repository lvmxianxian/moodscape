import Link from "next/link";
import { places, vibeLists } from "@/lib/mock-data";

const user = {
  name: "Valeria",
  username: "@valeria.vibes",
  bio: "Esploratrice di posti romantici, librerie nascoste e vibe cinematografiche a Roma.",
  avatar: "🌙",
  followers: 128,
  following: 42,
};

const favoriteVibes = Array.from(new Set(places.map((place) => place.vibe))).slice(
  0,
  4,
);

const frequentMoods = Array.from(new Set(places.map((place) => place.mood))).slice(
  0,
  4,
);

const savedPlaces = places.slice(0, 3);
const createdLists = vibeLists.slice(0, 3);

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#F7F4EF] px-6 py-8 text-[#1A1A2E]">
      <div className="mx-auto max-w-6xl">
        <section className="mt-12 rounded-[2rem] bg-white p-6 shadow-xl shadow-black/5 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#EDE9FF] text-4xl">
                {user.avatar}
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5B4FCF]">
                  Profilo creator
                </p>

                <h1 className="mt-2 text-4xl font-bold tracking-tight">
                  {user.name}
                </h1>

                <p className="mt-1 text-sm font-semibold text-[#5B4FCF]">
                  {user.username}
                </p>

                <p className="mt-3 max-w-xl text-[#5A5A6E]">{user.bio}</p>
              </div>
            </div>

            <button className="rounded-full bg-[#5B4FCF] px-6 py-3 font-semibold text-white">
              Modifica profilo
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            <div className="rounded-3xl bg-[#F7F4EF] p-5">
              <p className="text-3xl font-bold">{savedPlaces.length}</p>
              <p className="mt-1 text-sm text-[#5A5A6E]">Luoghi salvati</p>
            </div>

            <div className="rounded-3xl bg-[#F7F4EF] p-5">
              <p className="text-3xl font-bold">{createdLists.length}</p>
              <p className="mt-1 text-sm text-[#5A5A6E]">Vibe Lists</p>
            </div>

            <div className="rounded-3xl bg-[#F7F4EF] p-5">
              <p className="text-3xl font-bold">{user.followers}</p>
              <p className="mt-1 text-sm text-[#5A5A6E]">Follower</p>
            </div>

            <div className="rounded-3xl bg-[#F7F4EF] p-5">
              <p className="text-3xl font-bold">{user.following}</p>
              <p className="mt-1 text-sm text-[#5A5A6E]">Following</p>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-black/5">
            <h2 className="text-2xl font-bold">Vibe preferite</h2>

            <div className="mt-5 flex flex-wrap gap-2">
              {favoriteVibes.map((vibe) => (
                <span
                  key={vibe}
                  className="rounded-full bg-[#1A1A2E] px-4 py-2 text-sm font-semibold text-white"
                >
                  {vibe}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-black/5">
            <h2 className="text-2xl font-bold">Mood frequenti</h2>

            <div className="mt-5 flex flex-wrap gap-2">
              {frequentMoods.map((mood) => (
                <span
                  key={mood}
                  className="rounded-full bg-[#EDE9FF] px-4 py-2 text-sm font-semibold text-[#5B4FCF]"
                >
                  {mood}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-black/5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">Liste create</h2>

              <Link
                href="/vibe-lists/create"
                className="text-sm font-semibold text-[#5B4FCF]"
              >
                Crea lista →
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              {createdLists.map((list) => (
                <div
                  key={list.title}
                  className="rounded-2xl border border-[#E8E1D8] p-4"
                >
                  <p className="font-bold">{list.title}</p>
                  <p className="mt-1 text-sm text-[#5A5A6E]">
                    {list.city} · {list.vibe} · {list.places} posti
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-lg shadow-black/5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">Luoghi salvati</h2>

              <Link
                href="/moodboard"
                className="text-sm font-semibold text-[#5B4FCF]"
              >
                Apri moodboard →
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              {savedPlaces.map((place) => (
                <Link
                  key={place.slug}
                  href={`/place/${place.slug}`}
                  className="block rounded-2xl border border-[#E8E1D8] p-4 transition hover:border-[#5B4FCF]"
                >
                  <p className="font-bold">{place.name}</p>
                  <p className="mt-1 text-sm text-[#5A5A6E]">
                    {place.area} · {place.mood} · {place.vibe}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] bg-[#1A1A2E] p-6 text-white shadow-xl shadow-black/10">
          <h2 className="text-2xl font-bold">Prossimo step reale</h2>

          <p className="mt-3 max-w-2xl leading-7 text-white/70">
            Quando aggiungeremo login e database, questa pagina userà i dati
            reali dell’utente: liste create, posti salvati, follower e preferenze
            personali.
          </p>
        </section>
      </div>
    </main>
  );
}