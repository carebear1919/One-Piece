export interface EpisodeRange {
  start: number;
  end: number;
}

export interface Arc {
  id: string;
  name: string;
  episodes: EpisodeRange;
  type: 'Main Story' | 'Filler' | 'Special';
  recommendation?: 'Skip' | 'Optional' | 'Watch It';
  note?: string;
}

export interface Saga {
  id: string;
  name: string;
  episodes: EpisodeRange;
  arcs: Arc[];
}

export interface Movie {
  id: number;
  title: string;
  watchAfter: number;
  canonStatus: 'Non-Canon' | 'Mostly Canon';
  description: string;
  isBest?: boolean;
  isRemake?: boolean;
}

export const SAGAS: Saga[] = [
  {
    id: 'east-blue',
    name: 'East Blue Saga',
    episodes: { start: 1, end: 61 },
    arcs: [
      { id: 'romance-dawn', name: 'Romance Dawn', episodes: { start: 1, end: 3 }, type: 'Main Story' },
      { id: 'orange-town', name: 'Orange Town', episodes: { start: 4, end: 8 }, type: 'Main Story' },
      { id: 'syrup-village', name: 'Syrup Village', episodes: { start: 9, end: 18 }, type: 'Main Story' },
      { id: 'baratie', name: 'Baratie', episodes: { start: 19, end: 30 }, type: 'Main Story' },
      { id: 'arlong-park', name: 'Arlong Park', episodes: { start: 31, end: 44 }, type: 'Main Story' },
      { id: 'loguetown', name: 'Loguetown', episodes: { start: 45, end: 53 }, type: 'Main Story' },
      { id: 'buggy-crew', name: "Buggy's Crew Chronicles", episodes: { start: 46, end: 47 }, type: 'Filler', recommendation: 'Optional' },
      { id: 'warship-island', name: 'Warship Island', episodes: { start: 54, end: 61 }, type: 'Filler', recommendation: 'Optional' },
    ]
  },
  {
    id: 'arabasta',
    name: 'Arabasta Saga',
    episodes: { start: 62, end: 135 },
    arcs: [
      { id: 'reverse-mountain', name: 'Reverse Mountain', episodes: { start: 62, end: 63 }, type: 'Main Story' },
      { id: 'whiskey-peak', name: 'Whiskey Peak', episodes: { start: 64, end: 67 }, type: 'Main Story' },
      { id: 'koby-meppo', name: 'Diary of Koby-Meppo', episodes: { start: 68, end: 69 }, type: 'Main Story' },
      { id: 'little-garden', name: 'Little Garden', episodes: { start: 70, end: 77 }, type: 'Main Story' },
      { id: 'drum-island', name: 'Drum Island', episodes: { start: 78, end: 91 }, type: 'Main Story' },
      { id: 'arabasta-arc', name: 'Arabasta Arc', episodes: { start: 92, end: 130 }, type: 'Main Story' },
      { id: 'post-arabasta', name: 'Post-Arabasta', episodes: { start: 131, end: 135 }, type: 'Filler', recommendation: 'Skip' },
    ]
  },
  {
    id: 'sky-island',
    name: 'Sky Island Saga',
    episodes: { start: 136, end: 206 },
    arcs: [
      { id: 'goat-island', name: 'Goat Island', episodes: { start: 136, end: 138 }, type: 'Filler', recommendation: 'Skip' },
      { id: 'ruluka-island', name: 'Ruluka Island', episodes: { start: 139, end: 143 }, type: 'Filler', recommendation: 'Skip' },
      { id: 'jaya', name: 'Jaya', episodes: { start: 144, end: 152 }, type: 'Main Story' },
      { id: 'skypiea', name: 'Skypiea', episodes: { start: 153, end: 195 }, type: 'Main Story' },
      { id: 'g-8', name: 'G-8', episodes: { start: 196, end: 206 }, type: 'Filler', recommendation: 'Watch It', note: 'Highly Recommended!' },
    ]
  },
  {
    id: 'water-7',
    name: 'Water 7 Saga',
    episodes: { start: 207, end: 325 },
    arcs: [
      { id: 'long-ring', name: 'Long Ring Long Land', episodes: { start: 207, end: 219 }, type: 'Main Story' },
      { id: 'ocean-dream', name: "Ocean's Dream", episodes: { start: 220, end: 224 }, type: 'Filler', recommendation: 'Skip' },
      { id: 'foxy-return', name: "Foxy's Return", episodes: { start: 225, end: 228 }, type: 'Filler', recommendation: 'Skip' },
      { id: 'water-7-arc', name: 'Water 7', episodes: { start: 229, end: 263 }, type: 'Main Story' },
      { id: 'enies-lobby', name: 'Enies Lobby', episodes: { start: 264, end: 312 }, type: 'Main Story' },
      { id: 'post-enies', name: 'Post-Enies Lobby', episodes: { start: 313, end: 325 }, type: 'Main Story' },
    ]
  },
  {
    id: 'thriller-bark',
    name: 'Thriller Bark Saga',
    episodes: { start: 326, end: 384 },
    arcs: [
      { id: 'ice-hunter', name: 'Ice Hunter', episodes: { start: 326, end: 335 }, type: 'Filler', recommendation: 'Skip' },
      { id: 'thriller-bark-arc', name: 'Thriller Bark', episodes: { start: 337, end: 381 }, type: 'Main Story' },
      { id: 'spa-island', name: 'Spa Island', episodes: { start: 382, end: 384 }, type: 'Filler', recommendation: 'Skip' },
    ]
  },
  {
    id: 'summit-war',
    name: 'Summit War Saga',
    episodes: { start: 385, end: 516 },
    arcs: [
      { id: 'sabaody', name: 'Sabaody Archipelago', episodes: { start: 385, end: 405 }, type: 'Main Story' },
      { id: 'amazon-lily', name: 'Amazon Lily', episodes: { start: 408, end: 417 }, type: 'Main Story' },
      { id: 'separation', name: 'Straw Hat Separation', episodes: { start: 418, end: 456 }, type: 'Main Story' },
      { id: 'impel-down', name: 'Impel Down', episodes: { start: 422, end: 452 }, type: 'Main Story' },
      { id: 'little-east-blue', name: 'Little East Blue', episodes: { start: 426, end: 429 }, type: 'Filler', recommendation: 'Optional' },
      { id: 'marineford', name: 'Marineford', episodes: { start: 457, end: 489 }, type: 'Main Story' },
      { id: 'post-war', name: 'Post-War', episodes: { start: 490, end: 516 }, type: 'Main Story' },
    ]
  },
  {
    id: 'fish-man-island',
    name: 'Fish-Man Island Saga',
    episodes: { start: 517, end: 574 },
    arcs: [
      { id: 'return-sabaody', name: 'Return to Sabaody', episodes: { start: 517, end: 522 }, type: 'Main Story' },
      { id: 'fish-man-island-arc', name: 'Fish-Man Island', episodes: { start: 523, end: 574 }, type: 'Main Story' },
    ]
  },
  {
    id: 'dressrosa',
    name: 'Dressrosa Saga',
    episodes: { start: 575, end: 746 },
    arcs: [
      { id: 'z-ambition', name: "Z's Ambition", episodes: { start: 575, end: 578 }, type: 'Filler', recommendation: 'Skip' },
      { id: 'punk-hazard', name: 'Punk Hazard', episodes: { start: 579, end: 625 }, type: 'Main Story' },
      { id: 'caesar-retrieval', name: 'Caesar Retrieval', episodes: { start: 626, end: 628 }, type: 'Filler', recommendation: 'Skip' },
      { id: 'dressrosa-arc', name: 'Dressrosa', episodes: { start: 629, end: 746 }, type: 'Main Story' },
    ]
  },
  {
    id: 'whole-cake',
    name: 'Whole Cake Island Saga',
    episodes: { start: 747, end: 889 },
    arcs: [
      { id: 'silver-mine', name: 'Silver Mine', episodes: { start: 747, end: 750 }, type: 'Filler', recommendation: 'Skip' },
      { id: 'zou', name: 'Zou', episodes: { start: 751, end: 779 }, type: 'Main Story' },
      { id: 'marine-rookie', name: 'Marine Rookie', episodes: { start: 780, end: 782 }, type: 'Filler', recommendation: 'Skip' },
      { id: 'whole-cake-arc', name: 'Whole Cake Island', episodes: { start: 783, end: 877 }, type: 'Main Story' },
      { id: 'levely', name: 'Levely', episodes: { start: 878, end: 889 }, type: 'Main Story' },
    ]
  },
  {
    id: 'wano',
    name: 'Wano Saga',
    episodes: { start: 890, end: 1088 },
    arcs: [
      { id: 'wano-1-2', name: 'Wano Part 1 & 2', episodes: { start: 890, end: 1028 }, type: 'Main Story' },
      { id: 'cidre-guild', name: 'Cidre Guild', episodes: { start: 895, end: 896 }, type: 'Filler', recommendation: 'Skip' },
      { id: 'uta-past', name: "Uta's Past", episodes: { start: 1029, end: 1030 }, type: 'Filler', recommendation: 'Optional' },
      { id: 'wano-3', name: 'Wano Part 3', episodes: { start: 1031, end: 1088 }, type: 'Main Story' },
    ]
  },
  {
    id: 'final-saga',
    name: 'Final Saga',
    episodes: { start: 1089, end: 1122 }, // Using 1122 as per prompt
    arcs: [
      { id: 'egghead', name: 'Egghead Arc', episodes: { start: 1089, end: 1122 }, type: 'Main Story' },
    ]
  }
];

export const MOVIES: Movie[] = [
  { id: 1, title: 'One Piece: The Movie', watchAfter: 18, canonStatus: 'Non-Canon', description: 'The Straw Hats encounter El Drago, a pirate seeking legendary gold.' },
  { id: 2, title: 'Clockwork Island Adventure', watchAfter: 52, canonStatus: 'Non-Canon', description: 'The crew must rescue Nami and their ship from the Trump Pirates.' },
  { id: 3, title: "Chopper's Kingdom", watchAfter: 102, canonStatus: 'Non-Canon', description: 'Chopper is crowned king of an island inhabited by strange animals.' },
  { id: 4, title: 'Dead End Adventure', watchAfter: 130, canonStatus: 'Non-Canon', description: 'The crew joins a secret pirate race for a huge cash prize.' },
  { id: 5, title: 'The Cursed Holy Sword', watchAfter: 143, canonStatus: 'Non-Canon', description: 'Zoro goes missing and seems to be working for an old friend.' },
  { id: 6, title: 'Baron Omatsuri', watchAfter: 224, canonStatus: 'Non-Canon', description: 'A dark and psychological adventure on a mysterious resort island.', isBest: true },
  { id: 7, title: 'Giant Mechanical Soldier', watchAfter: 228, canonStatus: 'Non-Canon', description: 'The crew searches for a legendary treasure on Mecha Island.' },
  { id: 8, title: 'Episode of Arabasta', watchAfter: 130, canonStatus: 'Non-Canon', description: 'A remake of the Arabasta Saga.', isRemake: true },
  { id: 9, title: 'Episode of Chopper Plus', watchAfter: 325, canonStatus: 'Non-Canon', description: 'A remake of the Drum Island arc with new characters.', isRemake: true },
  { id: 10, title: 'Strong World', watchAfter: 381, canonStatus: 'Mostly Canon', description: 'The crew faces Shiki the Golden Lion, a legendary pirate from the past.', isBest: true },
  { id: 11, title: 'Straw Hat Chase', watchAfter: 381, canonStatus: 'Non-Canon', description: 'A short 3D adventure where Luffy chases his hat.' },
  { id: 12, title: 'Film: Z', watchAfter: 573, canonStatus: 'Non-Canon', description: 'The crew faces Zephyr, a former Marine Admiral who wants to end piracy.', isBest: true },
  { id: 13, title: 'Film: Gold', watchAfter: 750, canonStatus: 'Non-Canon', description: 'A high-stakes adventure in the massive entertainment city, Gran Tesoro.', isBest: true },
  { id: 14, title: 'Stampede', watchAfter: 896, canonStatus: 'Non-Canon', description: 'A massive pirate festival turns into a battle against Douglas Bullet.', isBest: true },
  { id: 15, title: 'Film: RED', watchAfter: 1030, canonStatus: 'Non-Canon', description: 'The crew meets Uta, a world-famous singer and daughter of Shanks.', isBest: true },
];
