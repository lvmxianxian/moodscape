import Link from "next/link";
import { notFound } from "next/navigation";
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
    posts: [
      {
        title: "Roma romantica ma senza cliché",
        vibe: "Dolce vita",
        description:
          "Terrazze tranquille, luce calda, camminate lente e posti dove Roma sembra più morbida.",
      },
      {
        title: "Passeggiata morbida all’Aventino",
        vibe: "Golden hour walk",
        description:
          "Un percorso breve per quando vuoi un tramonto bello senza correre.",
      },
      {
        title: "Caffè silenziosi per un pomeriggio lento",
        vibe: "Cozy café",
        description:
          "Posti raccolti dove leggere, scrivere o parlare piano.",
      },
    ],
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
    posts: [
      {
        title: "Posti per sentirsi in una biblioteca segreta",
        vibe: "Dark academia",
        description:
          "Cortili, chiese silenziose e caffè con luce bassa per giornate introspettive.",
      },
      {
        title: "Bookshop afternoon",
        vibe: "Bookshop afternoon",
        description:
          "Librerie e caffè dove passare un pomeriggio lento.",
      },
      {
        title: "Roma da leggere",
        vibe: "Vintage film",
        description:
          "Luoghi che sembrano usciti da un romanzo o da un film analogico.",
      },
    ],
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
    posts: [
      {
        title: "Giardini nascosti per decomprimere",
        vibe: "Hidden garden",
        description:
          "Piccoli spazi verdi dove respirare anche restando in città.",
      },
      {
        title: "Domenica soft nel verde",
        vibe: "Slow morning",
        description:
          "Luoghi per una mattina lenta, senza rumore e senza programma rigido.",
      },
      {
        title: "Secret garden route",
        vibe: "Secret garden",
        description:
          "Un percorso verde per chi ama scoprire angoli nascosti.",
      },
    ],
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
    posts: [
      {
        title: "Quando vuoi uscire ma non sai che energia vuoi",
        vibe: "Neon nightlife",
        description:
          "Posti per serate sociali, luci, drink e musica non troppo caotica.",
      },
      {
        title: "Soft nightlife",
        vibe: "Soft nightlife",
        description:
          "Locali e tappe serali per stare fuori senza sovraccaricarsi.",
      },
      {
        title: "Monti after dark",
        vibe: "Neon nightlife",
        description:
          "Una mini route serale tra luci, drink e conversazioni.",
      },
    ],
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
    posts: [
      {
        title: "Pomeriggi da galleria d’arte",
        vibe: "Art gallery mood",
        description:
          "Spazi belli, mostre intime e luoghi dove ritrovare ispirazione.",
      },
      {
        title: "Museum date",
        vibe: "Museum date",
        description:
          "Idee per appuntamenti calmi tra arte, architettura e conversazioni.",
      },
      {
        title: "In cerca di bellezza",
        vibe: "Minimal chic",
        description:
          "Luoghi puliti, eleganti e visivi per ricaricare la mente.",
      },
    ],
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
    posts: [
      {
        title: "Golden hour walk a Roma",
        vibe: "Golden hour walk",
        description:
          "Percorsi brevi da fare quando la luce rende tutto più morbido.",
      },
      {
        title: "Sunset walk",
        vibe: "Sunset walk",
        description:
          "Tappe panoramiche, silenziose e perfette per camminare piano.",
      },
      {
        title: "Rooftop sunset",
        vibe: "Rooftop sunset",
        description:
          "Posti con vista per chi vuole chiudere la giornata in alto.",
      },
    ],
  },
];

type PageProps = {
  params: {
    handle: string;
  };
};

export default function CreatorDetailPage({ params }: PageProps) {
  const creator = creators.find((item) => item.handle === params.handle);

  if (!creator) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5] px-5 py-6 text-[#111111]">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/creators"
          className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-[#111111] shadow-sm ring-1 ring-black/5"
        >
          ← Torna ai creator
        </Link>

        <section className="mt-5 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="flex items-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-[#111111] text-4xl text-white">
                {creator.avatar}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#7A7A73]">
                  {creator.username}
                </p>

                <h1 className="mt-1 text-3xl font-bold tracking-tight">
                  {creator.name}
                </h1>

                <p className="mt-1 text-sm font-semibold text-[#7A7A73]">
                  {creator.city} · {creator.vibe}
                </p>
              </div>
            </div>

            <p className="mt-6 text-base leading-7 text-[#55554F]">
              {creator.bio}
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
                <p className="text-2xl font-bold">{creator.followers}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                  follower
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
                <p className="text-2xl font-bold">{creator.lists}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                  liste
                </p>
              </div>

              <div className="rounded-[1.5rem] bg-[#F7F7F5] p-4">
                <p className="text-2xl font-bold">{creator.saves}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7A7A73]">
                  save
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <button className="rounded-full bg-[#111111] px-6 py-4 text-sm font-bold text-white">
                Segui creator
              </button>

              <Link
                href={`/feed?vibe=${encodeURIComponent(creator.vibe)}`}
                className="rounded-full bg-[#F1F1EE] px-6 py-4 text-center text-sm font-bold text-[#111111]"
              >
                Esplora questa vibe
              </Link>
            </div>
          </aside>

          <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5">
            <PlaceImage
              imageUrl={null}
              name={creator.featuredList}
              vibe={creator.vibe}
              className="min-h-[360px]"
            />

            <div className="p-3 pt-6">
              <p className="text-sm font-semibold text-[#7A7A73]">
                Lista in evidenza
              </p>

              <h2 className="mt-2 text-4xl font-bold leading-tight tracking-tight">
                {creator.featuredList}
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#55554F]">
                Una raccolta curata da {creator.name}, pensata per chi vuole
                vivere una vibe {creator.vibe}.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 pb-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Post e liste
            </h2>

            <Link
              href="/community"
              className="text-sm font-bold text-[#7A7A73]"
            >
              Community
            </Link>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {creator.posts.map((post) => (
              <Link
                key={post.title}
                href={`/feed?vibe=${encodeURIComponent(post.vibe)}`}
                className="group overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
              >
                <PlaceImage
                  imageUrl={null}
                  name={post.title}
                  vibe={post.vibe}
                  className="h-56"
                />

                <div className="p-2 pt-5">
                  <p className="text-sm font-semibold text-[#7A7A73]">
                    {post.vibe}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold tracking-tight">
                    {post.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#55554F]">
                    {post.description}
                  </p>

                  <p className="mt-5 text-sm font-bold text-[#111111]">
                    Apri vibe →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}