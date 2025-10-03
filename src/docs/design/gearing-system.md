# Gearing System

[← Back to Index](README.md) | [← Previous: Weapons](weapons.md) | [Next: Storage →](storage.md)

## Overview

The Gearing System in Pathways of Fate provides additional customization and stat optimization for characters. Unlike weapons which are pathway-specific, gear pieces can be mixed and matched across characters, allowing for diverse build strategies. Gear sets provide powerful bonuses when multiple pieces are equipped together.

---

## 1. Gear Slots

Each character has **4 gear slots**:

| Slot | Type | Primary Function | Visual |
|------|------|------------------|--------|
| **Helmet** | Head protection | HP%, DEF%, RES% | Hats, crowns, masks |
| **Armor** | Body protection | ATK%, HP%, DEF% | Coats, robes, vests |
| **Accessory** | Mystical item | Effect%, CRIT%, SPD | Rings, necklaces, brooches |
| **Boots** | Footwear | SPD, HP%, ATK% | Shoes, boots, greaves |

**Total Equipment:**
- 1 Weapon (pathway-specific, see [Weapons](weapons.md))
- 4 Gear pieces (universal across characters)
- **Combined**: 5 total equipment slots per character

---

## 2. Gear Rarity & Stats

### 2.1 Rarity Tiers

| Rarity | Main Stat | Sub Stats | Max Level | Drop Rate | Power Level |
|--------|-----------|-----------|-----------|-----------|-------------|
| 3★ | 1 primary stat | 2-3 sub stats | 12 | 85% | Base |
| 4★ | 1 primary stat | 3-4 sub stats | 16 | 14% | +50% |
| 5★ | 1 primary stat | 4 sub stats | 20 | 1% | +150% |

### 2.2 Main Stat Options by Slot

**Helmet (HP/DEF/RES Focus):**
- HP +40-55% (most common)
- DEF +35-50%
- RES +35-50%
- Effect Resistance +25-40%

**Armor (Balanced Stats):**
- ATK +35-48% (DPS choice)
- HP +40-55% (Tank choice)
- DEF +35-50%
- Healing Bonus +30-45% (Healer choice)

**Accessory (Offensive/Utility):**
- Effect Hit Rate +30-42%
- CRIT Rate +18-26%
- CRIT DMG +42-62%
- ATK +35-48%
- Energy Regeneration +15-25%

**Boots (Speed/Utility):**
- SPD +15-30 (flat value, most sought after)
- HP +40-55%
- ATK +35-48%
- DEF +35-50%

### 2.3 Sub Stat Options

Sub stats provide additional bonuses. Each gear piece has 2-4 sub stats depending on rarity.

**Percentage-Based:**
- ATK +5-12%
- HP +8-15%
- DEF +8-15%
- RES +8-15%
- Effect Hit Rate +5-10%
- Effect Resistance +5-10%
- CRIT Rate +3-6%
- CRIT DMG +8-15%

**Flat Values:**
- ATK +15-40
- HP +150-400
- DEF +15-40
- RES +15-40
- SPD +3-8
- Energy Regen +2-5%

### 2.4 Stat Growth

Gear gains stats as it levels up:

**Growth Formula:**
```
Stat at Level X = Base Stat × (1 + (X / Max Level) × 0.8)
```

**Example: 5★ Helmet with HP% Main Stat**
- Level 0: +30% HP
- Level 5: +39% HP
- Level 10: +48% HP
- Level 15: +54% HP
- Level 20: +55% HP (Max)

**Enhancement Cost:**
- Levels 0-4: 5,000 gold per level
- Levels 5-9: 10,000 gold per level
- Levels 10-14: 20,000 gold per level
- Levels 15-19: 40,000 gold per level
- Level 20: 80,000 gold

**Total to Max (5★):** ~400,000 gold

---

## 3. Gear Sets

### 3.1 Set Bonus System

Gear pieces belong to themed sets. Equipping multiple pieces from the same set grants powerful bonuses.

**Set Bonus Tiers:**
- **2-Piece Bonus**: Basic stat increase
- **4-Piece Bonus**: Unique powerful effect

**Example Set Bonus Progression:**
- 1 piece: No bonus
- 2 pieces: +15% ATK
- 3 pieces: +15% ATK (2-piece only)
- 4 pieces: +15% ATK + When character uses ultimate, gain "Fury" for 2 turns (+30% CRIT)

### 3.2 Gear Set Catalog

#### Nighthawk Set
**Theme:** Vigilance and night watch (Fool, Door, Error pathways)  
**Set Pieces:** Nighthawk's Mask (Helmet), Nighthawk's Coat (Armor), Tingen Badge (Accessory), Silent Steps (Boots)

**2-Piece Bonus:**
- +12% Effect Hit Rate
- +8% SPD

**4-Piece Bonus:**
- When character dodges an attack, gain "Shadow Step" buff for 1 turn
- Shadow Step: +30% ATK, next attack cannot miss
- Cooldown: 3 turns

**Best For:** Support/Utility characters (Klein, Seer pathway)

---

#### Crimson Scholar Set
**Theme:** Knowledge and mystical research (Spectator, Apprentice, Reader)  
**Set Pieces:** Scholar's Crown (Helmet), Academic Robes (Armor), Research Notes (Accessory), Study Boots (Boots)

**2-Piece Bonus:**
- +15% Effect Hit Rate
- +10% RES

**4-Piece Bonus:**
- Debuffs applied by character last +1 turn
- Skills that apply debuffs deal +25% damage
- Character's debuffs cannot be cleansed by enemies (ignores cleanse once per battle)

**Best For:** Debuffers (Audrey Hall, Visionary pathway)

---

#### Storm Herald Set
**Theme:** Lightning and tempests (Tyrant pathway)  
**Set Pieces:** Storm Crown (Helmet), Thunder Mantle (Armor), Lightning Core (Accessory), Storm Treads (Boots)

**2-Piece Bonus:**
- +18% ATK
- +5% CRIT Rate

**4-Piece Bonus:**
- Basic attacks have 40% chance to trigger "Chain Lightning"
- Chain Lightning: Deal 80% ATK damage to target and 2 adjacent enemies
- Character gains +2 SPD per enemy hit (max +10, lasts 2 turns)

**Best For:** AOE DPS characters (Tyrant, Sailor pathways)

---

#### Solar Radiance Set
**Theme:** Light and purification (Sun pathway)  
**Set Pieces:** Solar Halo (Helmet), Sun Priest Vestments (Armor), Holy Symbol (Accessory), Radiant Sandals (Boots)

**2-Piece Bonus:**
- +20% Healing Bonus
- +12% HP

**4-Piece Bonus:**
- All healing also deals 30% of healing amount as light damage to all enemies
- Allies healed gain "Blessing of Light" for 2 turns (+10% ATK, +10% RES)
- Passive: Character gains +15% Effect Resistance

**Best For:** Healers (Derrick Berg, Sun pathway)

---

#### Iron Fortress Set
**Theme:** Unyielding defense (Warrior, Justiciar pathways)  
**Set Pieces:** Fortress Helm (Helmet), Bulwark Armor (Armor), Guardian's Emblem (Accessory), Immovable Greaves (Boots)

**2-Piece Bonus:**
- +18% DEF
- +15% HP

**4-Piece Bonus:**
- When character is hit, gain 1 stack of "Fortification" (max 5 stacks)
- Each stack: +5% DEF, +3% damage reduction
- At 5 stacks, character becomes immune to CRIT hits
- Stacks last until end of battle

**Best For:** Tanks (Warrior, Sailor, Justiciar pathways)

---

#### Hunter's Focus Set
**Theme:** Precision and tracking (Hunter, Darkness pathways)  
**Set Pieces:** Marksman's Cap (Helmet), Hunter's Leather (Armor), Tracker's Compass (Accessory), Silent Stalker Boots (Boots)

**2-Piece Bonus:**
- +12% CRIT Rate
- +24% CRIT DMG

**4-Piece Bonus:**
- Single-target attacks deal +35% damage
- After using a single-target skill, character gains "Hunter's Mark" for 2 turns
- Hunter's Mark: Next single-target attack deals +50% damage and cannot miss
- Passive: +15% damage to enemies below 30% HP

**Best For:** Single-target DPS (Hunter, Darkness pathways)

---

#### Death's Embrace Set
**Theme:** Spirits and the undead (Death, Corpse Collector pathways)  
**Set Pieces:** Death's Veil (Helmet), Shroud of Shadows (Armor), Spirit Anchor (Accessory), Phantom Steps (Boots)

**2-Piece Bonus:**
- +15% ATK
- +10% Effect Hit Rate

**4-Piece Bonus:**
- When an enemy dies, character gains 2 energy and heals for 15% max HP
- Character's summons deal +40% damage
- Passive: Character gains +20% damage vs undead enemies
- When character defeats an enemy, 30% chance to summon a temporary spirit for 2 turns

**Best For:** Summoners (Death, Corpse Collector pathways)

---

#### Plague Bringer Set
**Theme:** Disease and affliction (Demoness, Chained pathways)  
**Set Pieces:** Plague Mask (Helmet), Infected Robes (Armor), Cursed Talisman (Accessory), Contaminated Boots (Boots)

**2-Piece Bonus:**
- +15% ATK
- +12% Effect Hit Rate

**4-Piece Bonus:**
- Damage-over-time (DOT) effects deal +50% damage
- DOT effects spread to 1 adjacent enemy when applied (50% potency)
- When character applies a debuff, they gain "Plague Stack" (max 3)
- At 3 stacks, character's next skill deals +60% damage and applies "Plague" (heavy DOT) to all enemies

**Best For:** DOT specialists (Demoness, Chained pathways)

---

#### Generalist Set
**Theme:** Balanced for all characters  
**Set Pieces:** Traveler's Hat (Helmet), Adventurer's Coat (Armor), Lucky Charm (Accessory), Wanderer's Boots (Boots)

**2-Piece Bonus:**
- +10% ATK
- +10% HP
- +5% SPD

**4-Piece Bonus:**
- Character gains +10% to all stats (ATK, HP, DEF, RES, SPD)
- At battle start, gain 1 random buff for 3 turns:
  - +20% ATK OR +20% DEF OR +15 SPD
- Character gains +5% damage to all enemy types

**Best For:** Budget option, works on anyone, good for early game

---

## 4. Gear Enhancement

### 4.1 Leveling Gear

**Enhancement Materials:**
- **Basic Gear Crystals**: 1,000 EXP each (farmable)
- **Advanced Gear Crystals**: 5,000 EXP each (daily instances)
- **Superior Gear Crystals**: 20,000 EXP each (rare drops, events)

**EXP Requirements:**

| Level Range | Total EXP Needed | Gold Cost |
|-------------|------------------|-----------|
| 0-5 (3★) | 10,000 | 25,000 |
| 6-12 (3★ max) | 25,000 | 45,000 |
| 0-8 (4★) | 35,000 | 50,000 |
| 9-16 (4★ max) | 80,000 | 110,000 |
| 0-10 (5★) | 80,000 | 100,000 |
| 11-20 (5★ max) | 200,000 | 300,000 |

**Enhancement Sources:**
- Daily gear dungeons (rotating by day)
- Story stage drops (Chapter 3+)
- Event shops
- Battle pass rewards
- Use other gear as fodder (risky, loses gear)

### 4.2 Sub Stat Enhancement

Every 4 levels (levels 4, 8, 12, 16, 20), one random sub stat gets upgraded:

**Upgrade Amount:**
- +3-8% for percentage stats
- +10-25 for flat stats

**RNG Factor:**
- Which stat gets upgraded is random
- Amount of upgrade varies
- Creating perfect gear requires luck

**Strategy:**
- Level gear to +4, check sub stats
- If bad sub stat rolls, consider using as fodder
- Only invest fully in gear with good sub stats

### 4.3 Gear Reforging (Advanced)

**Reforge System** (Unlocks at Account Level 40):
- Allows rerolling ONE sub stat on max-level gear
- Cost: 200,000 gold + 5 Reforge Stones (rare)
- Preserves other sub stats and main stat
- Can be done multiple times until desired stat

**Reforge Stone Sources:**
- Weekly boss drops (1-2 per week)
- Event shops (5 per event)
- PvP arena rewards (3 per season)
- Monthly shop (limited stock: 10 per month)

---

## 5. Gear Acquisition

### 5.1 Story Drops

**Drop Rates by Stage:**
- Normal stages: 3★ gear (30% drop rate)
- Hard stages: 3-4★ gear (50% drop rate for 3★, 10% for 4★)
- Nightmare stages: 4-5★ gear (40% for 4★, 5% for 5★)

**First Clear Bonuses:**
- Chapter 3 completion: 1 random 4★ gear piece
- Chapter 5 completion: 1 random 4★ gear set selector
- Chapter 7 completion: 1 random 5★ gear piece
- Chapter 10 completion: 1 complete 5★ gear set (player choice)

### 5.2 Daily Gear Domains

**Rotating Schedule:**
- Monday: Helmet domain
- Tuesday: Armor domain
- Wednesday: Accessory domain
- Thursday: Boots domain
- Friday: Mixed (all slots)
- Saturday/Sunday: Mixed + bonus drop rates

**Domain Rewards:**
- 20 stamina per run
- Guaranteed 1-2 gear pieces per run
- Difficulty tiers unlock better rarities
- 3 runs per day limit (can increase with premium currency)

### 5.3 Crafting

**Craftable Gear:**
- Requires blueprints (obtained from story, events)
- Materials: Gear Fragments (farmable), Gold
- Can craft specific sets
- Crafted gear starts at level 0

**Crafting Costs:**
- 3★ gear: 50 fragments + 50,000 gold
- 4★ gear: 100 fragments + 150,000 gold
- 5★ gear: 250 fragments + 500,000 gold

**Fragment Sources:**
- Breaking down unwanted gear
- Daily domain completion bonuses
- Weekly missions
- Event shops

### 5.4 Gear Gacha (Optional)

**Separate Gear Banner:**
- Cost: 100 Fate Tokens per pull
- 1000 Fate Tokens for 10-pull
- Guaranteed 4★+ every 10 pulls
- Guaranteed 5★ after 80 pulls (pity)

**Rates:**
- 3★: 85%
- 4★: 14%
- 5★: 1%

**Featured Gear Sets:**
- Rotating featured set every 2 weeks
- Increased drop rate for featured set pieces
- 50/50 system similar to character gacha

---

## 6. Gear Optimization Strategies

### 6.1 Build Guides

**DPS Build:**
- Helmet: CRIT Rate or ATK%
- Armor: ATK% (main stat)
- Accessory: CRIT Rate or CRIT DMG (main stat)
- Boots: SPD (flat) or ATK%
- Sub Stats Priority: CRIT Rate > CRIT DMG > ATK% > SPD
- Recommended Sets: Hunter's Focus, Storm Herald

**Tank Build:**
- Helmet: HP% or DEF%
- Armor: DEF% or HP%
- Accessory: Effect Resistance or HP%
- Boots: SPD (flat) or HP%
- Sub Stats Priority: HP% > DEF% > Effect Resistance > SPD
- Recommended Set: Iron Fortress

**Healer Build:**
- Helmet: HP% or Effect Resistance
- Armor: Healing Bonus or HP%
- Accessory: Effect Hit Rate or SPD
- Boots: SPD (flat) or HP%
- Sub Stats Priority: HP% > Effect Hit Rate > SPD > RES
- Recommended Set: Solar Radiance

**Debuffer Build:**
- Helmet: Effect Hit Rate or HP%
- Armor: Effect Hit Rate or ATK%
- Accessory: Effect Hit Rate (main stat)
- Boots: SPD (flat) or Effect Hit Rate
- Sub Stats Priority: Effect Hit Rate > SPD > ATK% > HP%
- Recommended Sets: Crimson Scholar, Plague Bringer

### 6.2 Set Mixing Strategy

**Mixed Sets (Hybrid Builds):**
- 2-piece Set A + 2-piece Set B
- Example: 2-piece Storm Herald (+18% ATK) + 2-piece Hunter's Focus (+12% CRIT Rate)
- Sacrifices 4-piece bonus for balanced stats
- Good for characters who don't need specific 4-piece effects

**Off-Set Pieces:**
- Using individual pieces with perfect stats > completing bad set
- One "off-set" piece with amazing sub stats can be worth it
- Typically: Accessory or Boots are flex slots

### 6.3 Investment Priority

**Early Game (Levels 1-30):**
- Focus on 3-4★ gear with correct main stats
- Don't over-invest in low rarity gear
- Level gear to +8 at most
- Complete one 2-piece set bonus

**Mid Game (Levels 31-60):**
- Acquire complete 4★ sets
- Level important pieces to +12
- Start farming 5★ pieces
- Begin optimizing sub stats

**Late Game (Levels 61-80):**
- Full 5★ gear equipped
- Level all gear to +16 minimum
- Max out (+20) best pieces
- Min-max sub stats, use reforging
- Perfect set bonuses for all characters

---

## 7. Gear Economy

### 7.1 Gear Breakdown

**Salvage System:**
- Unwanted gear can be broken down into fragments
- Returns a portion of enhancement materials
- Higher rarity = more fragments

**Breakdown Returns:**
- 3★ gear: 10-20 fragments
- 4★ gear: 30-50 fragments
- 5★ gear: 80-120 fragments
- Enhanced gear: Returns some enhancement materials

### 7.2 Gear Inventory Management

**Storage Capacity:**
- Base: 300 gear pieces
- Expandable: +50 slots per 100 Fate Tokens (max 1000 total)

**Auto-Salvage Settings:**
- Can set auto-salvage rules (e.g., all 3★ gear with bad main stats)
- Lock system to prevent accidental salvage
- Batch operations for efficiency

### 7.3 Gear Trading (Future Feature)

**Potential Trading System (Post-Launch):**
- Trade gear with friends (limited trades per week)
- Guild gear bank (donate/borrow)
- Player marketplace (auction house)
- Gear rental system for difficult content

---

## 8. Gear Meta

### 8.1 Best-in-Slot (BiS) Recommendations

**Universal BiS Main Stats:**
- Helmet: HP% (tanks/healers) or Effect Hit% (supports)
- Armor: ATK% (DPS) or HP% (tanks) or Healing% (healers)
- Accessory: CRIT Rate (DPS) or Effect Hit% (supports) or CRIT DMG (hyper carries)
- Boots: SPD (nearly everyone) > situational percentage stats

**SPD Boots Discussion:**
- SPD is king in turn-based games
- Acting first = huge advantage
- Most characters want SPD boots
- Exception: Slow but powerful tanks/bruisers

### 8.2 Set Tier List (PvE)

**S Tier (Must Farm):**
- Solar Radiance (best healer set)
- Hunter's Focus (best single-target DPS)
- Iron Fortress (best tank set)

**A Tier (Very Good):**
- Storm Herald (strong AOE DPS)
- Crimson Scholar (top debuffer set)
- Death's Embrace (best summoner set)

**B Tier (Situational):**
- Nighthawk (good support, but niche)
- Plague Bringer (DOT specialists only)

**C Tier (Budget/Early Game):**
- Generalist (good starter set, outclassed later)

### 8.3 Future-Proofing

**Investment Advice:**
- Focus on sets with 4-piece bonuses that scale
- Avoid sets with fixed damage numbers (won't scale in endgame)
- Prioritize sets that work on multiple characters
- Save reforge stones for 5★ gear only

---

## 9. Advanced Mechanics

### 9.1 Gear Resonance (Future Feature)

**Concept:**
- Equipping full set + matching weapon = "Resonance"
- Resonance: Additional bonus beyond 4-piece
- Example: Full Solar Radiance + Sun pathway weapon = All healing +15%, team gains shield

**Requirements:**
- Full 4-piece gear set
- Weapon from matching pathway/theme
- All gear at +16 or higher

### 9.2 Gear Transcendence (Endgame)

**Ultra Endgame Feature:**
- Max level 5★ gear can be "transcended"
- Transcendence levels: +1 to +5
- Each level: +10% to all stats on gear
- Cost: Rare materials, massive gold investment
- Only for hardcore players

---

[← Previous: Weapons](weapons.md) | [Next: Storage →](storage.md) | [↑ Back to Index](README.md)
