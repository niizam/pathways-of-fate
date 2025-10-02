import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database directory
const DB_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initialize database files
const DB_FILES = {
  users: path.join(DB_DIR, 'users.json'),
  characters: path.join(DB_DIR, 'characters.json'),
  weapons: path.join(DB_DIR, 'weapons.json'),
  inventory: path.join(DB_DIR, 'inventory.json'),
  story_progress: path.join(DB_DIR, 'story_progress.json'),
  gacha_history: path.join(DB_DIR, 'gacha_history.json'),
  gacha_pity: path.join(DB_DIR, 'gacha_pity.json'),
  daily_missions: path.join(DB_DIR, 'daily_missions.json'),
  achievements: path.join(DB_DIR, 'achievements.json'),
  pathways: path.join(DB_DIR, 'pathways.json'),
  battles: path.join(DB_DIR, 'battles.json'),
};

// Initialize empty collections
for (const [key, filepath] of Object.entries(DB_FILES)) {
  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, JSON.stringify([]), 'utf8');
  }
}

// Initialize pathways data
const PATHWAYS_DATA = [
  { id: 1, name: 'Fool', theme: 'Deception, Grafting', combat_role: 'Support, Utility', description: 'Master of deception and fate manipulation' },
  { id: 2, name: 'Door', theme: 'Teleportation, Travel', combat_role: 'Mobility, DPS', description: 'Spatial manipulation and traversal' },
  { id: 3, name: 'Error', theme: 'Manipulation, Theft', combat_role: 'Debuffer, Support', description: 'Ability theft and manipulation' },
  { id: 4, name: 'Seer', theme: 'Divination, Luck', combat_role: 'Support, Amplifier', description: 'Foresight and probability control' },
  { id: 5, name: 'Apprentice', theme: 'Knowledge, Recording', combat_role: 'Sub-DPS, Utility', description: 'Knowledge and recording abilities' },
  { id: 6, name: 'Marauder', theme: 'Theft, Copying', combat_role: 'DPS, Debuffer', description: 'Stealing and copying abilities' },
  { id: 7, name: 'Spectator', theme: 'Mind Reading, Manipulation', combat_role: 'Debuffer, Support', description: 'Mental manipulation and analysis' },
  { id: 8, name: 'Visionary', theme: 'Dreams, Illusions', combat_role: 'Debuffer, Crowd Control', description: 'Dream and illusion creation' },
  { id: 9, name: 'Tyrant', theme: 'Lightning, Weather', combat_role: 'DPS, AOE', description: 'Storm and lightning control' },
  { id: 10, name: 'Sailor', theme: 'Water, Luck', combat_role: 'Tank, Support', description: 'Water manipulation and fortune' },
  { id: 11, name: 'Sun', theme: 'Purification, Restraint', combat_role: 'Healer, Support', description: 'Light and purification' },
  { id: 12, name: 'Reader', theme: 'Knowledge, Teaching', combat_role: 'Amplifier, Support', description: 'Knowledge sharing and enhancement' },
  { id: 13, name: 'Warrior', theme: 'Strength, Combat', combat_role: 'Tank, DPS', description: 'Physical prowess and combat' },
  { id: 14, name: 'Hunter', theme: 'Tracking, Assassination', combat_role: 'DPS, Single-Target', description: 'Precision and tracking' },
  { id: 15, name: 'Corpse Collector', theme: 'Death, Spirits', combat_role: 'Summoner, Support', description: 'Spirit manipulation' },
  { id: 16, name: 'Death', theme: 'Darkness, Spirits', combat_role: 'DPS, Summoner', description: 'Death and darkness' },
  { id: 17, name: 'Demoness', theme: 'Affliction, Disease', combat_role: 'Debuffer, DOT DPS', description: 'Disease and affliction' },
  { id: 18, name: 'Mother', theme: 'Harvest, Life', combat_role: 'Healer, Summoner', description: 'Life and harvest' },
  { id: 19, name: 'Moon', theme: 'Transformation, Curses', combat_role: 'DPS, Debuffer', description: 'Transformation and curses' },
  { id: 20, name: 'Darkness', theme: 'Concealment, Shadows', combat_role: 'Stealth DPS, Utility', description: 'Shadow and stealth' },
  { id: 21, name: 'Chained', theme: 'Binding, Plague', combat_role: 'Debuffer, DOT', description: 'Binding and plague' },
  { id: 22, name: 'Justiciar', theme: 'Law, Order', combat_role: 'Tank, Support', description: 'Order and protection' },
];

const pathwaysFile = DB_FILES.pathways;
if (fs.existsSync(pathwaysFile)) {
  const existing = JSON.parse(fs.readFileSync(pathwaysFile, 'utf8'));
  if (existing.length === 0) {
    fs.writeFileSync(pathwaysFile, JSON.stringify(PATHWAYS_DATA, null, 2), 'utf8');
  }
} else {
  fs.writeFileSync(pathwaysFile, JSON.stringify(PATHWAYS_DATA, null, 2), 'utf8');
}

// Helper functions
function readCollection(collectionName) {
  const filepath = DB_FILES[collectionName];
  if (!filepath) {
    throw new Error(`Collection ${collectionName} does not exist`);
  }
  try {
    const data = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${collectionName}:`, error);
    return [];
  }
}

function writeCollection(collectionName, data) {
  const filepath = DB_FILES[collectionName];
  if (!filepath) {
    throw new Error(`Collection ${collectionName} does not exist`);
  }
  try {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error(`Error writing ${collectionName}:`, error);
    throw error;
  }
}

function getNextId(collectionName) {
  const collection = readCollection(collectionName);
  if (collection.length === 0) return 1;
  return Math.max(...collection.map(item => item.id || 0)) + 1;
}

// Database operations
export const db = {
  // Generic operations
  findOne(collectionName, filter) {
    const collection = readCollection(collectionName);
    return collection.find(item => {
      for (const [key, value] of Object.entries(filter)) {
        if (item[key] !== value) return false;
      }
      return true;
    });
  },

  findMany(collectionName, filter = {}, options = {}) {
    let collection = readCollection(collectionName);
    
    // Apply filter
    if (Object.keys(filter).length > 0) {
      collection = collection.filter(item => {
        for (const [key, value] of Object.entries(filter)) {
          if (item[key] !== value) return false;
        }
        return true;
      });
    }

    // Apply sorting
    if (options.orderBy) {
      const { field, order = 'ASC' } = options.orderBy;
      collection.sort((a, b) => {
        if (order === 'ASC') {
          return a[field] > b[field] ? 1 : -1;
        } else {
          return a[field] < b[field] ? 1 : -1;
        }
      });
    }

    // Apply limit
    if (options.limit) {
      collection = collection.slice(0, options.limit);
    }

    return collection;
  },

  insert(collectionName, data) {
    const collection = readCollection(collectionName);
    const newItem = { ...data, id: getNextId(collectionName) };
    collection.push(newItem);
    writeCollection(collectionName, collection);
    return newItem;
  },

  update(collectionName, filter, updates) {
    const collection = readCollection(collectionName);
    let updated = null;
    
    for (let i = 0; i < collection.length; i++) {
      let matches = true;
      for (const [key, value] of Object.entries(filter)) {
        if (collection[i][key] !== value) {
          matches = false;
          break;
        }
      }
      
      if (matches) {
        collection[i] = { ...collection[i], ...updates };
        updated = collection[i];
        break;
      }
    }
    
    if (updated) {
      writeCollection(collectionName, collection);
    }
    
    return updated;
  },

  delete(collectionName, filter) {
    const collection = readCollection(collectionName);
    const initialLength = collection.length;
    
    const filtered = collection.filter(item => {
      for (const [key, value] of Object.entries(filter)) {
        if (item[key] === value) return false;
      }
      return true;
    });
    
    writeCollection(collectionName, filtered);
    return initialLength - filtered.length;
  },

  deleteMany(collectionName, filter) {
    return this.delete(collectionName, filter);
  },

  // Aggregate operations
  count(collectionName, filter = {}) {
    return this.findMany(collectionName, filter).length;
  },

  sum(collectionName, field, filter = {}) {
    const items = this.findMany(collectionName, filter);
    return items.reduce((sum, item) => sum + (item[field] || 0), 0);
  },

  avg(collectionName, field, filter = {}) {
    const items = this.findMany(collectionName, filter);
    if (items.length === 0) return 0;
    return this.sum(collectionName, field, filter) / items.length;
  },

  max(collectionName, field, filter = {}) {
    const items = this.findMany(collectionName, filter);
    if (items.length === 0) return null;
    return Math.max(...items.map(item => item[field] || 0));
  },

  // Join operation (simplified)
  join(collectionName, joinCollection, joinField, joinKey) {
    const collection = readCollection(collectionName);
    const joinData = readCollection(joinCollection);
    
    return collection.map(item => {
      const joined = joinData.find(j => j.id === item[joinField]);
      if (joined) {
        return { ...item, [joinKey]: joined };
      }
      return item;
    });
  },
};

// Memory cache for battles (replaces Redis)
const battleCache = new Map();

export const cache = {
  get(key) {
    const item = battleCache.get(key);
    if (!item) return null;
    
    // Check if expired
    if (item.expiresAt && item.expiresAt < Date.now()) {
      battleCache.delete(key);
      return null;
    }
    
    return item.value;
  },

  set(key, value, ttlSeconds = 3600) {
    battleCache.set(key, {
      value,
      expiresAt: Date.now() + (ttlSeconds * 1000),
    });
  },

  delete(key) {
    battleCache.delete(key);
  },
};

console.log('✓ JSON Database initialized');
