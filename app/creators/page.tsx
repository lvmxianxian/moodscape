import Link from "next/link";
import PlaceImage from "@/components/PlaceImage";

const creators = [
  {
    name: "Giulia Ferri",
    handle: "slowroma",
    username: "@slowroma",
    avatar: "🌙",
    city: "Roma",
    vibe: "Dolce vita",
    followers: "1.2k",
    lists: 12,
    saves: 486,
    bio: "Raccolgo posti lenti, romantici e cinematografici. Roma vista con calma, luce calda e camminate morbide.",
    featuredList: "Roma romantica ma senza cliché",
  },
  {
    name: "Lorenzo B.",
    handle: "bookishwalks",
    username: "@bookishwalks",
    avatar: "📚",
    city: "Roma",
    vibe: "Dark academia",
    followers: "842",
    lists: 9,
    saves: 312,
    bio: "Biblioteche, cortili silenziosi, librerie indipendenti e posti dove sparire un po’ con un libro.",
    featuredList: "Posti per sentirsi in una biblioteca segreta",
  },
  {
    name: "Sara Conti",
    handle: "hiddenverde",
    username: "@hiddenverde",
    avatar: "🌿",
    city: "Roma",
    vibe: "Hidden garden",
    followers: "679",
    lists: 7,
    saves: 251,
    bio: "Giardini nascosti, cortili verdi e micro-fughe urbane per respirare meglio dentro la città.",
    featuredList: "Giardini nascosti per decomprimere",
  },
  {
    name: "Andrea M.",
    handle: "afterdarkroma",
    username: "@afterdarkroma",
    avatar: "🪩",
    city: "Roma",
    vibe: "Neon nightlife",
    followers: "954",
    lists: 10,
    saves: 401,
    bio: "Serate, luci, drink e percorsi sociali per uscire senza finire per forza nel caos.",
    featuredList: "Quando vuoi uscire ma non sai che energia vuoi",
  },
  {
    name: "Marta V.",
    handle: "gallerymood",
    username: "@gallerymood",
    avatar: "🎨",
    city: "Roma",
    vibe: "Art gallery mood",
    followers: "738",
    lists: 8,
    saves: 296,
    bio: "Mostre, gallerie, musei piccoli e luoghi in cui cercare ispirazione senza fretta.",
    featuredList: "Pomeriggi da galleria d’arte",
  },
  {
    name: "Nina R.",
    handle: "goldenwalks",
    username: "@goldenwalks",
    avatar: "🌇",
    city: "Roma",
    vibe: "Golden hour walk",
    followers: "1.5k",
    lists: 15,
    saves: 622,
    bio: "Passeggiate al tramonto, viste morbide e percorsi da fare quando la città diventa dorata.",
    featuredList: "Golden hour walk a Roma",
  },
];

const trendingVibes = [
  "Dolce vita",
  "Dark academia",
  "Hidden garden",
  "Golden hour walk",
  "Art gallery mood",
  "Neon nightlife",
  "Cozy café",
  "Bookshop afternoon",
];

export default function CreatorsPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-7xl">
        <section className="mx-auto max-w-md lg:max-w-7xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#7A7A73]">
                Creator MoodScape
              </p>

              <h1 className="mt-2 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Profili da seguire per scoprire la città.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#55554F]">
                Creator locali, vibe curator e persone che trasformano luoghi,
                eventi e percorsi in raccolte da salvare.
              </p>
            </div>

            <Link
              href="/community"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111111] text-xl text-white shadow-sm"
            >
              ✦
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">{creators.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Creator
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">61</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Liste
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
              <p className="text-2xl font-bold">2.3k</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                Salvataggi
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {trendingVibes.map((vibe) => (
              <Link
                key={vibe}
                href={`/feed?vibe=${encodeURIComponent(vibe)}`}
                className="rounded-full bg-white px-4 py-3 text-sm font-bold text-[#111111] shadow-sm ring-1 ring-black/5"
              >
                {vibe}
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-md pb-10 lg:max-w-7xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Creator in evidenza
            </h2>

            <Link href="/community" className="text-sm font-bold text-[#7A7A73]">
              Community
            </Link>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {creators.map((creator) => (
              <Link
                key={creator.handle}
                href={`/u/${creator.handle}`}
                className="group overflow-hidden rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.35rem] bg-[#111111] text-2xl text-white">
                      {creator.avatar}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-xl font-bold tracking-tight">
                        {creator.name}
                      </h3>
                      <p className="mt-1 truncate text-sm font-semibold text-[#7A7A73]">
                        {creator.username} · {creator.city}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-[#F1F1EE] px-4 py-2 text-sm font-bold text-[#111111]">
                    Segui
                  </span>
                </div>

                <div className="mt-5">
                  <PlaceImage
                    imageUrl={null}
                    name={creator.featuredList}
                    vibe={creator.vibe}
                    className="h-52"
                  />
                </div>

                <p className="mt-5 line-clamp-3 text-sm leading-6 text-[#55554F]">
                  {creator.bio}
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  <div className="rounded-[1.25rem] bg-[#F7F7F5] p-3">
                    <p className="text-lg font-bold">{creator.followers}</p>
                    <p className="mt-1 text-xs font-bold text-[#7A7A73]">
                      follower
                    </p>
                  </div>

                  <div className="rounded-[1.25rem] bg-[#F7F7F5] p-3">
                    <p className="text-lg font-bold">{creator.lists}</p>
                    <p className="mt-1 text-xs font-bold text-[#7A7A73]">
                      liste
                    </p>
                  </div>

                  <div className="rounded-[1.25rem] bg-[#F7F7F5] p-3">
                    <p className="text-lg font-bold">{creator.saves}</p>
                    <p className="mt-1 text-xs font-bold text-[#7A7A73]">
                      save
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#55554F]">
                    {creator.vibe}
                  </span>

                  <span className="rounded-full bg-[#F7F7F5] px-3 py-2 text-xs font-bold text-[#55554F]">
                    Apri profilo →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}