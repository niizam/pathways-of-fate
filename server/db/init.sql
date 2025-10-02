-- Pathways of Fate Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    account_level INTEGER DEFAULT 1,
    world_level INTEGER DEFAULT 0,
    experience INTEGER DEFAULT 0,
    stamina INTEGER DEFAULT 120,
    last_stamina_regen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fate_tokens INTEGER DEFAULT 800,
    gold INTEGER DEFAULT 10000,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pathways reference table
CREATE TABLE IF NOT EXISTS pathways (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    theme VARCHAR(100) NOT NULL,
    combat_role VARCHAR(50) NOT NULL,
    description TEXT
);

-- Characters table (owned by users)
CREATE TABLE IF NOT EXISTS characters (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    character_name VARCHAR(100) NOT NULL,
    pathway_id INTEGER REFERENCES pathways(id),
    sequence INTEGER DEFAULT 9,
    rarity INTEGER DEFAULT 3,
    level INTEGER DEFAULT 1,
    ascension INTEGER DEFAULT 0,
    acting_progress INTEGER DEFAULT 0,
    eidolon INTEGER DEFAULT 0,
    hp INTEGER NOT NULL,
    atk INTEGER NOT NULL,
    def INTEGER NOT NULL,
    res INTEGER NOT NULL,
    spd INTEGER NOT NULL,
    crit_rate INTEGER DEFAULT 5,
    crit_dmg INTEGER DEFAULT 150,
    effect INTEGER DEFAULT 0,
    effectres INTEGER DEFAULT 0,
    is_locked BOOLEAN DEFAULT FALSE,
    obtained_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Weapons table (owned by users)
CREATE TABLE IF NOT EXISTS weapons (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    weapon_name VARCHAR(100) NOT NULL,
    weapon_type VARCHAR(50) NOT NULL,
    rarity INTEGER DEFAULT 3,
    level INTEGER DEFAULT 1,
    refinement INTEGER DEFAULT 1,
    main_stat_type VARCHAR(20) NOT NULL,
    main_stat_value INTEGER NOT NULL,
    equipped_character_id INTEGER REFERENCES characters(id) ON DELETE SET NULL,
    is_locked BOOLEAN DEFAULT FALSE,
    obtained_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory table (materials, items, etc.)
CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    item_type VARCHAR(50) NOT NULL,
    item_name VARCHAR(100) NOT NULL,
    quantity INTEGER DEFAULT 1,
    UNIQUE(user_id, item_type, item_name)
);

-- Story progress table
CREATE TABLE IF NOT EXISTS story_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    chapter INTEGER NOT NULL,
    stage INTEGER NOT NULL,
    difficulty VARCHAR(20) DEFAULT 'normal',
    stars INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    first_clear_bonus_claimed BOOLEAN DEFAULT FALSE,
    UNIQUE(user_id, chapter, stage, difficulty)
);

-- Gacha history table
CREATE TABLE IF NOT EXISTS gacha_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    banner_type VARCHAR(50) NOT NULL,
    item_type VARCHAR(20) NOT NULL,
    item_name VARCHAR(100) NOT NULL,
    rarity INTEGER NOT NULL,
    pity_count INTEGER NOT NULL,
    pulled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gacha pity tracking
CREATE TABLE IF NOT EXISTS gacha_pity (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    banner_type VARCHAR(50) NOT NULL,
    pity_count INTEGER DEFAULT 0,
    is_guaranteed BOOLEAN DEFAULT FALSE,
    UNIQUE(user_id, banner_type)
);

-- Daily missions table
CREATE TABLE IF NOT EXISTS daily_missions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    mission_type VARCHAR(50) NOT NULL,
    progress INTEGER DEFAULT 0,
    target INTEGER NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    claimed BOOLEAN DEFAULT FALSE,
    date DATE DEFAULT CURRENT_DATE,
    UNIQUE(user_id, mission_type, date)
);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    achievement_name VARCHAR(100) NOT NULL,
    progress INTEGER DEFAULT 0,
    target INTEGER NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    claimed BOOLEAN DEFAULT FALSE,
    UNIQUE(user_id, achievement_name)
);

-- Insert initial pathways data
INSERT INTO pathways (name, theme, combat_role, description) VALUES
('Fool', 'Deception, Grafting', 'Support, Utility', 'Master of deception and fate manipulation'),
('Door', 'Teleportation, Travel', 'Mobility, DPS', 'Spatial manipulation and traversal'),
('Error', 'Manipulation, Theft', 'Debuffer, Support', 'Ability theft and manipulation'),
('Seer', 'Divination, Luck', 'Support, Amplifier', 'Foresight and probability control'),
('Apprentice', 'Knowledge, Recording', 'Sub-DPS, Utility', 'Knowledge and recording abilities'),
('Marauder', 'Theft, Copying', 'DPS, Debuffer', 'Stealing and copying abilities'),
('Spectator', 'Mind Reading, Manipulation', 'Debuffer, Support', 'Mental manipulation and analysis'),
('Visionary', 'Dreams, Illusions', 'Debuffer, Crowd Control', 'Dream and illusion creation'),
('Tyrant', 'Lightning, Weather', 'DPS, AOE', 'Storm and lightning control'),
('Sailor', 'Water, Luck', 'Tank, Support', 'Water manipulation and fortune'),
('Sun', 'Purification, Restraint', 'Healer, Support', 'Light and purification'),
('Reader', 'Knowledge, Teaching', 'Amplifier, Support', 'Knowledge sharing and enhancement'),
('Warrior', 'Strength, Combat', 'Tank, DPS', 'Physical prowess and combat'),
('Hunter', 'Tracking, Assassination', 'DPS, Single-Target', 'Precision and tracking'),
('Corpse Collector', 'Death, Spirits', 'Summoner, Support', 'Spirit manipulation'),
('Death', 'Darkness, Spirits', 'DPS, Summoner', 'Death and darkness'),
('Demoness', 'Affliction, Disease', 'Debuffer, DOT DPS', 'Disease and affliction'),
('Mother', 'Harvest, Life', 'Healer, Summoner', 'Life and harvest'),
('Moon', 'Transformation, Curses', 'DPS, Debuffer', 'Transformation and curses'),
('Darkness', 'Concealment, Shadows', 'Stealth DPS, Utility', 'Shadow and stealth'),
('Chained', 'Binding, Plague', 'Debuffer, DOT', 'Binding and plague'),
('Justiciar', 'Law, Order', 'Tank, Support', 'Order and protection')
ON CONFLICT (name) DO NOTHING;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_characters_user ON characters(user_id);
CREATE INDEX IF NOT EXISTS idx_weapons_user ON weapons(user_id);
CREATE INDEX IF NOT EXISTS idx_inventory_user ON inventory(user_id);
CREATE INDEX IF NOT EXISTS idx_gacha_history_user ON gacha_history(user_id);
CREATE INDEX IF NOT EXISTS idx_story_progress_user ON story_progress(user_id);
