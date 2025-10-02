# Character System

[← Back to Index](README.md) | [← Previous: Power System](power-system.md) | [Next: Weapons →](weapons.md)

## Overview

The Character System in Pathways of Fate provides deep customization and progression mechanics. Each character is unique, with their own pathway, sequence, skills, and personality reflected through the acting system.

---

## 1. Character Archetypes

Characters can fulfill one or multiple roles in combat, defined by their archetype(s).

### 1.1 Primary Archetypes

| Archetype | Role Description | Key Stats | Typical Pathways |
|-----------|------------------|-----------|------------------|
| **DPS** | Primary damage dealer, eliminates enemies quickly | ATK, CRIT, CRIT DMG, SPD | Tyrant, Hunter, Death, Moon |
| **Sub-DPS** | Secondary damage, provides utility alongside damage | ATK, HP, Effect, SPD | Apprentice, Marauder, Darkness |
| **Tank** | Absorbs damage, protects allies, generates aggro | HP, DEF, RES | Warrior, Sailor, Justiciar |
| **Healer** | Restores HP, cleanses debuffs, sustains team | HP, Effect, SPD, RES | Sun, Mother |
| **Amplifier** | Buffs allies, enhances team performance | Effect, SPD, HP | Seer, Reader, Spectator |
| **Debuffer** | Weakens enemies, applies crowd control | Effect, ACC, SPD | Demoness, Chained, Visionary |
| **Summoner** | Deploys entities, sacrificial strategies | HP, ATK, Effect | Corpse Collector, Death, Mother |
| **Utility** | Unique mechanics, situational advantages | Varies by character | Fool, Door, Error |

### 1.2 Multi-Archetype Characters

Many characters excel in multiple roles, offering flexibility:

**Example Combinations:**
- **Tank/DPS** (Warrior Pathway)
  - Can absorb damage while dealing respectable damage
  - Example: Muscular tank that punches hard
  
- **Healer/Amplifier** (Sun Pathway)
  - Restores HP while buffing allies
  - Example: Solar priest providing light blessings
  
- **Summoner/DPS** (Death Pathway)
  - Summons spirits that deal damage
  - Example: Necromancer with offensive summons
  
- **Debuffer/Sub-DPS** (Demoness Pathway)
  - Applies damage-over-time while weakening enemies
  - Example: Disease spreader dealing poison damage

### 1.3 Team Composition Strategy

**Recommended Team Compositions:**

1. **Balanced Team** (Story/General Content)
   - 1 Tank + 1 Healer + 2 DPS
   - Example: Warrior + Sun + Tyrant + Hunter

2. **Aggressive Team** (Speed Clear)
   - 1 Amplifier + 3 DPS
   - Example: Reader + Tyrant + Hunter + Marauder

3. **Survival Team** (Boss Fights)
   - 1 Tank + 2 Healers + 1 DPS
   - Example: Sailor + Sun + Mother + Death

4. **Control Team** (Hard Content)
   - 1 Tank + 1 Healer + 2 Debuffers
   - Example: Justiciar + Sun + Demoness + Chained

---

## 2. Character Rarity & Base Stats

### 2.1 Stat Definitions

| Stat | Full Name | Description | Impact |
|------|-----------|-------------|--------|
| **HP** | Health Points | Character's health pool | Determines survivability |
| **ATK** | Attack | Physical and mystical damage power | Scales all damage abilities |
| **DEF** | Defense | Physical damage reduction | Reduces physical damage taken |
| **RES** | Resistance | Mystical damage reduction | Reduces mystical damage taken |
| **SPD** | Speed | Turn order priority | Higher SPD acts first |
| **ACC** | Accuracy | Hit chance | Reduces chance to miss |
| **EVA** | Evasion | Dodge chance | Chance to avoid attacks |
| **CRIT** | Critical Rate | Critical hit chance | Probability of critical hit |
| **CDMG** | Critical Damage | Critical hit multiplier | Bonus damage on crits (default 150%) |
| **Effect** | Effect Hit Rate | Status effect application chance | Improves debuff/buff success |
| **Effectres** | Effect Resistance | Status effect resistance | Reduces incoming debuff chance |

### 2.2 Rarity Tiers

| Rarity | Sequence Range | Base Stats Multiplier | Growth Rate | Max Level (Base) |
|--------|----------------|----------------------|-------------|------------------|
| 3★ | Seq 9-8 | 100% | 1.8% per level | 40 |
| 4★ | Seq 7-6 | 130% | 2.0% per level | 60 |
| 5★ | Seq 5-4 | 165% | 2.2% per level | 70 |
| 6★ | Seq 3-2 | 210% | 2.4% per level | 80 |
| 7★ | Seq 1-0 | 280% | 2.6% per level | 80 |

### 2.3 Stat Scaling Examples

**Klein Moretti (Fool Pathway) Progression:**

| Level | Sequence | Rarity | HP | ATK | DEF | RES | SPD |
|-------|----------|--------|-----|-----|-----|-----|-----|
| 1 | 9 | 3★ | 400 | 80 | 50 | 50 | 85 |
| 20 | 9 | 3★ | 552 | 110 | 69 | 69 | 85 |
| 1 | 7 | 4★ | 550 | 110 | 70 | 70 | 90 |
| 40 | 7 | 4★ | 935 | 187 | 119 | 119 | 90 |
| 1 | 6 | 4★ | 720 | 140 | 100 | 110 | 95 |
| 60 | 6 | 4★ | 1440 | 280 | 200 | 220 | 95 |
| 1 | 5 | 5★ | 960 | 185 | 135 | 145 | 100 |
| 70 | 5 | 5★ | 2208 | 425 | 310 | 333 | 100 |
| 80 | 5 | 5★ | 2496 | 481 | 351 | 377 | 100 |

---

## 3. Character Skills

Each character has a unique skill set that defines their combat role and playstyle.

### 3.1 Skill Types

| Skill Type | Energy Cost | Cooldown | Description |
|------------|-------------|----------|-------------|
| **Basic Attack** | 0 (Gains 1) | None | Always available, generates energy |
| **Skill** | 1-2 | 1-5 turns | Core ability, defines character role |
| **Ultimate** | 3-4 | None | Powerful finisher, high impact |
| **Passive 1** | N/A | N/A | Always active, fundamental trait |
| **Passive 2** | N/A | N/A | Unlocked at Ascension 4, advanced trait |

### 3.2 Skill Attributes

**Common Skill Modifiers:**
- **Damage Multiplier**: ATK% (e.g., 150% ATK)
- **Healing Multiplier**: HP% or ATK% (e.g., 80% HP)
- **Status Effect**: Type, potency, duration
- **AOE vs Single-Target**: Hit 1, 2, 3, or all enemies
- **Special Effects**: Unique mechanics per character

### 3.3 Example Character: Klein Moretti (Fool Pathway, Seq 6)

**Archetype:** Support/Utility  
**Sequence:** 6 "Faceless"  
**Rarity:** 4★  
**Role:** Team utility, deception, summon support

**Base Stats (Level 1, Seq 6):**
- HP: 720 | ATK: 140 | DEF: 100 | RES: 110 | SPD: 95
- CRIT: 5% | CRIT DMG: 150% | Effect: 15% | Effectres: 10%

**Skill Set:**

1. **Basic: Air Bullet**
   - Cost: 0 Energy (Gains 1)
   - Cooldown: None
   - Effect: Deal 80% ATK as mystical damage to single target
   - Secondary: Gain 1 energy
   
2. **Skill: Flame Jump** (Signature Ability)
   - Cost: 2 Energy
   - Cooldown: 3 turns
   - Effect: Teleport behind target enemy, deal 150% ATK mystical damage
   - Secondary: Apply "Marked" debuff for 2 turns (+15% damage taken from all sources)
   - Animation: Klein disappears and reappears behind enemy in flames
   
3. **Ultimate: Historical Void Projection**
   - Cost: 4 Energy
   - Cooldown: None
   - Effect: Summon projection of a fallen ally for 3 turns (50% of original stats)
   - Secondary: Projection acts immediately after Klein
   - Notes: If no ally has fallen, summons a generic spirit (30% of Klein's stats)
   
4. **Passive 1: Fool's Veil**
   - Effect: When targeted by enemy ultimate, 30% chance to become untargetable (dodges completely)
   - Limitation: Once per battle
   - Triggers: Automatically when conditions met
   
5. **Passive 2: Grafting** (Unlocks at Ascension 4)
   - Effect: Every 5 turns, copy a random positive buff from an ally for 2 turns
   - Secondary: Klein gains the buff without removing it from ally
   - Priority: Copies strongest buff available

**Eidolon Enhancements (E1-E6):**
- **E1**: Flame Jump damage increased to 180% ATK
- **E2**: Ultimate costs 3 energy instead of 4
- **E3**: +3 skill levels to Flame Jump and Ultimate
- **E4**: +15% Effect and Effectres
- **E5**: +5 skill levels to Flame Jump and Ultimate
- **E6**: Historical Void Projection summons 2 projections instead of 1

### 3.4 Example Character: Derrick Berg (Sun Pathway, Seq 7)

**Archetype:** Healer/Support  
**Sequence:** 7 "Solar High Priest"  
**Rarity:** 4★  
**Role:** Team sustain, purification, anti-undead

**Base Stats (Level 1, Seq 7):**
- HP: 800 | ATK: 100 | DEF: 75 | RES: 95 | SPD: 80
- CRIT: 5% | CRIT DMG: 150% | Effect: 20% | Effectres: 15%

**Skill Set:**

1. **Basic: Light Strike**
   - Cost: 0 Energy (Gains 1)
   - Effect: Deal 70% ATK as light damage to single target
   - Bonus: +50% damage vs Death/Corpse Collector pathways
   
2. **Skill: Purifying Light**
   - Cost: 2 Energy
   - Cooldown: 2 turns
   - Effect: Heal target ally for 60% of Derrick's max HP
   - Secondary: Cleanse 2 debuffs from target
   - AOE: Also heals adjacent allies for 30%
   
3. **Ultimate: Eternal Radiance**
   - Cost: 4 Energy
   - Effect: Heal all allies for 80% of Derrick's max HP
   - Secondary: Grant "Radiant Blessing" buff for 3 turns (immune to debuffs)
   - Bonus: Deal 200% ATK light damage to all enemies
   
4. **Passive 1: Sun's Protection**
   - Effect: All allies have +10% RES
   - Bonus: +20% RES vs Death, Moon, Corpse Collector pathways
   
5. **Passive 2: Morning Glory** (Unlocks at Ascension 4)
   - Effect: At start of battle, all allies heal for 20% HP
   - Trigger: Activates once per battle

---

## 4. Character Progression

### 4.1 Leveling System

**Level Cap Progression:**
- Base: Level 20 (Ascension 0)
- Maximum: Level 80 (Ascension 6)

**Experience Requirements:**
- Early levels (1-20): 1,000-5,000 EXP per level
- Mid levels (21-50): 5,000-15,000 EXP per level
- Late levels (51-80): 15,000-50,000 EXP per level

**EXP Sources:**
- Battle rewards: 50-200 EXP per stage
- EXP materials: 1,000-20,000 EXP per item
- Daily EXP dungeon: 10,000-30,000 total per day
- Idle rewards: Accumulates passively

**Stat Growth Per Level:**
- Each level: +2-2.6% of base stats (varies by rarity)
- Consistent linear growth
- No level breakpoints (smooth curve)

### 4.2 Ascension System

Ascension breaks level caps and unlocks character potential.

**Ascension Tiers:**

| Ascension | Level Cap | Materials Required | Cost (Gold) | Benefits |
|-----------|-----------|-------------------|-------------|----------|
| 0 (Base) | 20 | None | 0 | Starting state |
| 1 | 30 | Pathway Essence x5, Common Mat x10 | 20,000 | +5% stats |
| 2 | 40 | Pathway Essence x10, Common Mat x20 | 40,000 | +10% stats |
| 3 | 50 | Pathway Essence x15, Rare Mat x10 | 80,000 | +15% stats |
| 4 | 60 | Pathway Essence x20, Rare Mat x15 | 150,000 | **Unlock Passive 2** |
| 5 | 70 | Pathway Essence x30, Epic Mat x10 | 300,000 | +25% stats |
| 6 | 80 | Pathway Essence x50, Epic Mat x15 | 500,000 | +30% stats, max power |

**Material Examples:**
- **Fool Pathway Essence**: Dropped from Fool pathway enemies
- **Common Materials**: Shadow Fragments, Spirit Residue
- **Rare Materials**: Beyonder Crystals, Mystical Cores
- **Epic Materials**: Ancient Relics, Godly Traces

**Ascension Stat Bonuses:**
- Cumulative: All previous bonuses stack
- Example: Ascension 6 = +5% +10% +15% +0% +25% +30% = +85% total

### 4.3 Sequence Advancement

See [Power System - Sequence System](power-system.md#2-sequence-system) for detailed sequence mechanics.

**Quick Summary:**
- Requires 100% Acting Progress
- Requires Beyonder Characteristic
- Increases character rarity
- Major stat boost (+20-30%)
- May unlock new abilities
- Visual evolution (new character art)

### 4.4 Skill Leveling

**Skill Level System:**
- Each skill can be leveled: 1-10
- Increases skill effectiveness (damage, healing, duration)
- Costs skill books (generic or pathway-specific)

**Level Benefits:**

| Skill Level | Damage/Healing Multiplier | Effect Duration | Cooldown |
|-------------|---------------------------|-----------------|----------|
| 1 (Base) | 100% | 100% | Base |
| 2 | 105% | 100% | Base |
| 3 | 110% | 110% | Base |
| 4 | 115% | 110% | Base |
| 5 | 120% | 120% | Base |
| 6 | 125% | 120% | -1 turn |
| 7 | 130% | 130% | -1 turn |
| 8 | 135% | 130% | -1 turn |
| 9 | 140% | 140% | -1 turn |
| 10 (Max) | 150% | 150% | -2 turns |

**Skill Book Types:**
- **Common Skill Book**: +1 level to basic attack
- **Rare Skill Book**: +1 level to skill or ultimate
- **Pathway Skill Book**: +2 levels to specific pathway skills

### 4.5 Total Power Formula

**Character Power Rating:**
```
Power = (Base Stats × Level Multiplier × Ascension Bonus × Sequence Bonus) 
        + (Skill Levels × 100) 
        + (Eidolons × 500) 
        + (Weapon Power) 
        + (Acting Progress × 10)
```

**Example: Fully Invested Klein (Endgame)**
- Level 80, Ascension 6
- Sequence 5 (5★)
- All skills level 10
- E6 (max Eidolons)
- 5★ weapon level 80
- 100% Acting Progress
- **Total Power: ~12,000-15,000**

---

## 5. Duplicate System (Eidolons)

### 5.1 Eidolon Tiers

Obtaining duplicate characters grants Eidolons (constellation system):

| Eidolon | Effect | Typical Value |
|---------|--------|---------------|
| **E1** | Skill damage increase | +10% skill/ultimate damage |
| **E2** | Energy cost reduction | -1 energy cost on ultimate |
| **E3** | Skill level boost | +3 levels to skill and ultimate |
| **E4** | Stat increase | +15% Effect and Effectres |
| **E5** | Skill level boost | +5 levels to skill and ultimate |
| **E6** | Unique ability | Character-specific game-changer |

### 5.2 Eidolon Impact

**Power Increase:**
- E0 (Base): 100% power
- E1: 110% power
- E2: 120% power (+energy efficiency)
- E3: 135% power (+skill levels)
- E4: 145% power (+stats)
- E5: 160% power (+more skill levels)
- E6: 180-200% power (+unique ability)

**Investment Priority:**
- E1: Good value for DPS characters
- E2: Essential for ultimate-reliant characters
- E3: Major power spike (skill levels)
- E4: Minor upgrade
- E5: Another major spike
- E6: Transforms character (but expensive)

### 5.3 E6 Examples

**Klein Moretti E6: "Master of History"**
- Historical Void Projection summons 2 projections instead of 1
- Projections have 75% original stats (up from 50%)

**Derrick Berg E6: "Solar Incarnation"**
- Eternal Radiance grants "Immortal Light" for 1 turn (allies cannot die, minimum 1 HP)
- After Immortal Light ends, heal all allies for 100% HP

**Audrey Hall E6: "Mind Master"**
- Mind Control can now target 2 enemies simultaneously
- Controlled enemies deal +50% damage

### 5.4 Memory Fragments (F2P Path)

**Alternative to Duplicates:**
- Collect Memory Fragments from various sources
- Exchange 100 fragments for 1 Eidolon unlock
- Character-specific (Klein Fragments → Klein Eidolon)

**Sources:**
- Arena shop: 5 fragments/week
- Event rewards: 10-20 fragments
- Abyss rewards: 5 fragments per full clear
- Battle pass: 30 fragments/season
- **F2P Rate**: ~3-4 months per Eidolon

---

## 6. Character Acquisition

### 6.1 Gacha (Primary Method)

See [Progression Systems - Gacha](progression.md#4-gacha-system) for full details.

**Summary:**
- Standard banner: All 3-5★ characters
- Limited banner: Rate-up for featured 5★
- Pity system: Guaranteed 5★ at 90 pulls

### 6.2 Story Rewards

**Free Characters:**
- Klein Moretti (Tutorial)
- Benson Moretti (Chapter 1)
- Derrick Berg (Chapter 3)
- Old Neil (Chapter 5)
- Choice of 1 free 4★ (Chapter 7)

### 6.3 Event Rewards

**Temporary Events:**
- Major events: 1 free 4★ character
- Minor events: Character fragments
- Login events: Random 3★ character

### 6.4 Shop Exchange

**Monthly Refresh:**
- Select 4★ characters available
- Cost: 500 arena currency or special event tokens
- Limit: 1 character per month

---

[← Previous: Power System](power-system.md) | [Next: Weapons →](weapons.md) | [↑ Back to Index](README.md)
