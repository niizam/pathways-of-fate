// Game balance configuration
export const GAME_CONFIG = {
  // Stamina system
  stamina: {
    baseMax: 120,
    regenMinutes: parseInt(process.env.STAMINA_REGEN_MINUTES) || 6,
    perLevel: 2,
  },

  // Gacha rates
  gacha: {
    rates: {
      5: parseFloat(process.env.GACHA_5_STAR_RATE) || 0.006, // 0.6%
      4: parseFloat(process.env.GACHA_4_STAR_RATE) || 0.051, // 5.1%
      3: parseFloat(process.env.GACHA_3_STAR_RATE) || 0.943, // 94.3%
    },
    pity: {
      soft: 74,
      hard: 90,
      fourStar: 10,
    },
    cost: {
      single: 160,
      ten: 1600,
    }
  },

  // Character progression
  character: {
    maxLevel: 80,
    ascensionCaps: [20, 30, 40, 50, 60, 70, 80],
    baseStats: {
      3: { hp: 400, atk: 80, def: 50, res: 50, spd: 85 },
      4: { hp: 550, atk: 110, def: 70, res: 70, spd: 90 },
      5: { hp: 750, atk: 150, def: 95, res: 95, spd: 95 },
    },
    levelScaling: 0.02, // 2% per level
  },

  // Battle system
  battle: {
    maxEnergy: 4,
    startingEnergy: 1,
    partySize: 4,
    benchSize: 2,
  },

  // Daily missions
  daily: {
    fateTokenReward: 50,
    missions: [
      { type: 'login', target: 1, reward: 50 },
      { type: 'battle', target: 5, reward: 20 },
      { type: 'daily_instance', target: 1, reward: 30 },
    ],
  },

  // Starter rewards
  starter: {
    fateTokens: 800,
    gold: 10000,
    characters: ['Klein Moretti', 'Benson Moretti'],
  },
};

// Character data
export const CHARACTER_DATA = {
  'Klein Moretti': {
    pathway: 'Fool',
    sequence: 6,
    rarity: 4,
    archetype: 'Support/Utility',
    baseStats: { hp: 720, atk: 140, def: 100, res: 110, spd: 95 },
    skills: [
      { name: 'Air Bullet', type: 'basic', cost: 0, multiplier: 0.8 },
      { name: 'Flame Jump', type: 'skill', cost: 2, multiplier: 1.5, cooldown: 3 },
      { name: 'Historical Void Projection', type: 'ultimate', cost: 4, multiplier: 2.0 },
    ],
  },
  'Benson Moretti': {
    pathway: 'Seer',
    sequence: 9,
    rarity: 3,
    archetype: 'Support',
    baseStats: { hp: 400, atk: 80, def: 50, res: 50, spd: 85 },
    skills: [
      { name: 'Divination Strike', type: 'basic', cost: 0, multiplier: 0.7 },
      { name: 'Luck Boost', type: 'skill', cost: 2, multiplier: 0, effect: 'buff' },
      { name: 'Fate Reading', type: 'ultimate', cost: 3, multiplier: 0, effect: 'team_buff' },
    ],
  },
  'Audrey Hall': {
    pathway: 'Spectator',
    sequence: 7,
    rarity: 5,
    archetype: 'Debuffer/Support',
    baseStats: { hp: 680, atk: 130, def: 85, res: 100, spd: 92 },
    skills: [
      { name: 'Mind Probe', type: 'basic', cost: 0, multiplier: 0.75 },
      { name: 'Psychological Attack', type: 'skill', cost: 2, multiplier: 1.4, effect: 'debuff' },
      { name: 'Mass Hypnosis', type: 'ultimate', cost: 4, multiplier: 1.8, effect: 'aoe_debuff' },
    ],
  },
  'Derrick Berg': {
    pathway: 'Sun',
    sequence: 7,
    rarity: 4,
    archetype: 'Healer/Support',
    baseStats: { hp: 800, atk: 100, def: 75, res: 95, spd: 80 },
    skills: [
      { name: 'Light Strike', type: 'basic', cost: 0, multiplier: 0.7 },
      { name: 'Purifying Light', type: 'skill', cost: 2, multiplier: 0, effect: 'heal' },
      { name: 'Eternal Radiance', type: 'ultimate', cost: 4, multiplier: 2.0, effect: 'aoe_heal' },
    ],
  },
};

// Gacha character pool
export const GACHA_POOL = {
  standard: {
    5: ['Audrey Hall', 'Alger Wilson', 'Emlyn White', 'Fors Wall'],
    4: ['Klein Moretti', 'Derrick Berg', 'Leonard Mitchell', 'Xio Derecha'],
    3: ['Benson Moretti', 'Melissa Moretti', 'Old Neil', 'Dunn Smith'],
  },
  limited: {
    featured: 'Amon', // Current featured 5-star
    5: ['Amon', 'Adam'],
    4: ['Klein Moretti', 'Derrick Berg', 'Leonard Mitchell'],
    3: ['Benson Moretti', 'Melissa Moretti', 'Old Neil'],
  },
};
