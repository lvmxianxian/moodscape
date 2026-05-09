export const places = [
  {
    slug: "giardino-aranci",
    name: "Giardino degli Aranci",
    city: "Roma",
    area: "Aventino",
    mood: "Romantico",
    vibe: "Dolce vita",
    description:
      "Una terrazza silenziosa con vista su Roma, perfetta per camminare piano e sentirsi dentro un film italiano.",
    longDescription:
      "Il Giardino degli Aranci è una tappa perfetta per chi cerca una pausa morbida, romantica e cinematografica. È pensato per momenti lenti, passeggiate al tramonto e conversazioni senza fretta.",
    price: "Gratis",
    time: "45 min",
    address: "Piazza Pietro D'Illiria, Roma",
    socialLevel: "Tranquillo",
    position: [41.8844, 12.4787] as [number, number],
  },
  {
    slug: "biblioteca-angelica",
    name: "Biblioteca Angelica",
    city: "Roma",
    area: "Centro storico",
    mood: "Curioso",
    vibe: "Dark academia",
    description:
      "Scaffali antichi, luce morbida e atmosfera da studio segreto. Ideale per una giornata introspettiva.",
    longDescription:
      "Una location ideale per chi vuole sentirsi dentro un immaginario dark academia: libri, silenzio, architettura storica e un senso di scoperta lenta.",
    price: "Gratis",
    time: "60 min",
    address: "Piazza di Sant'Agostino, Roma",
    socialLevel: "Silenzioso",
    position: [41.9008, 12.4749] as [number, number],
  },
  {
    slug: "bar-neon",
    name: "Neon Bar",
    city: "Roma",
    area: "Monti",
    mood: "Energico",
    vibe: "Neon nightlife",
    description:
      "Un locale serale con luci colorate, musica e drink scenografici per una vibe più sociale e notturna.",
    longDescription:
      "Un posto pensato per quando vuoi energia, luci, musica e una serata più dinamica. Perfetto da salvare in una lista nightlife.",
    price: "€€",
    time: "90 min",
    address: "Zona centro, Roma",
    socialLevel: "Sociale",
    position: [41.8955, 12.4926] as [number, number],
  },
  {
    slug: "colosseo",
    name: "Colosseo",
    city: "Roma",
    area: "Centro storico",
    mood: "Curioso",
    vibe: "Romantic ruins",
    description:
      "Rovine monumentali, pietra calda e atmosfera epica per una passeggiata dentro la storia.",
    longDescription:
      "Una tappa iconica per chi cerca un immaginario romano potente, storico e fotografabile. Perfetta per una route tra rovine, tramonto e centro storico.",
    price: "€€",
    time: "75 min",
    address: "Piazza del Colosseo, Roma",
    socialLevel: "Affollato",
    position: [41.8902, 12.4922] as [number, number],
  },
] as const;

export const vibeLists = [
  {
    title: "Roma Dolce Vita",
    vibe: "Dolce vita",
    city: "Roma",
    places: 8,
    description:
      "Terrazze, passeggiate lente, caffè storici e scorci cinematografici per sentirsi dentro un film italiano.",
  },
  {
    title: "Dark Academia Weekend",
    vibe: "Dark academia",
    city: "Roma",
    places: 6,
    description:
      "Biblioteche, cortili nascosti, musei silenziosi e luoghi perfetti per una giornata introspettiva.",
  },
  {
    title: "Neon Night Out",
    vibe: "Neon nightlife",
    city: "Roma",
    places: 5,
    description:
      "Bar, luci colorate, musica e tappe serali per una vibe energica, sociale e notturna.",
  },
] as const;