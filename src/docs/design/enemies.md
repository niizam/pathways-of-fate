# Enemy System

[← Back to Index](README.md) | [← Previous: Combat](combat.md) | [Next: Game Modes →](game-modes.md)

## Overview

Enemies in Pathways of Fate range from corrupted civilians to god-like beings, each with unique mechanics and challenges.

---

## 1. Enemy Types & Categories

### 1.1 Common Enemies

**Corrupted Civilians**
- **HP:** Low (500-1,500)
- **Threat:** Minimal, swarm tactics
- **Abilities:** Basic attacks, occasional weak debuffs
- **Strategy:** AOE damage clears quickly
- **Drops:** Common materials, small gold

**Wild Beyonders**
- **HP:** Moderate (1,500-3,000)
- **Threat:** Medium, use basic pathway abilities
- **Abilities:** 1-2 pathway skills, basic attack
- **Strategy:** Focus fire, interrupt dangerous skills
- **Drops:** Pathway essence, materials

**Mystical Creatures**
- **HP:** Moderate (2,000-4,000)
- **Threat:** Medium, elemental affinities
- **Abilities:** Elemental attacks, self-buffs
- **Strategy:** Exploit elemental weaknesses
- **Drops:** Elemental materials, crafting resources

**Secret Organization Members**
- **HP:** High (3,000-6,000)
- **Threat:** High, full skill kits
- **Abilities:** Complete pathway abilities (2-3 skills)
- **Strategy:** Treat as mini-bosses, use crowd control
- **Drops:** Rare materials, Beyonder Characteristics (low chance)

### 1.2 Elite Enemies

**Pathway Beyonders (Seq 7-5)**
- **HP:** Very High (8,000-15,000)
- **Threat:** Severe, mid-boss encounters
- **Abilities:** Full skill rotation, ultimate ability
- **Special:** Break gauge system
- **Strategy:** Coordinate breaks, save ultimates
- **Drops:** Beyonder Characteristics, rare materials, weapons

**Corrupted Monsters**
- **HP:** Massive (10,000-20,000)
- **Threat:** Severe, high damage output
- **Abilities:** Powerful attacks, self-regeneration
- **Special:** Enrage timers, phase transitions
- **Strategy:** Burst damage, healing negation
- **Drops:** Epic materials, equipment

**Demigods (Seq 4-1)**
- **HP:** Extreme (20,000-50,000)
- **Threat:** Extreme, endgame challenge
- **Abilities:** Multiple ultimates, passive auras
- **Special:** Multi-phase, summon minions
- **Strategy:** Perfect team composition required
- **Drops:** Legendary materials, 5★ weapons (rare)

### 1.3 Boss Enemies

**Named Characters (Story Bosses)**
- **HP:** 30,000-100,000
- **Threat:** Maximum, unique mechanics
- **Abilities:** Scripted attack patterns, phase abilities
- **Special:** Dialogue, cutscenes, special conditions
- **Strategy:** Learn patterns, prepare counters
- **Drops:** Story rewards, guaranteed 4★+ items

**True Gods (Seq 0)**
- **HP:** 100,000-500,000
- **Threat:** Ultimate, raid-level
- **Abilities:** Reality-warping powers
- **Special:** Requires specific team compositions
- **Strategy:** Coordinated teams, perfect execution
- **Drops:** Best rewards, exclusive materials

**Outer Deities (Raid Bosses)**
- **HP:** 1,000,000+
- **Threat:** Requires 4-player cooperation
- **Abilities:** Area-wide effects, instant-kill mechanics
- **Special:** Role requirements (tank/healer mandatory)
- **Strategy:** Team coordination, assigned roles
- **Drops:** Raid-exclusive gear, titles

---

## 2. Enemy Mechanics

### 2.1 Break Gauge System

**Break Mechanics:**
- Elite+ enemies have visible toughness bars
- Depleting break gauge stuns enemy for 1 turn
- Refills over time or after being broken

**Break Damage:**
- Regular attacks: 10-20 break damage
- Super effective: 2x break damage
- Critical hits: +50% break damage

**Break Window:**
- Enemy stunned: Cannot act, takes +30% damage
- Team coordinated burst opportunity
- Some bosses immune to break (shown as locked gauge)

### 2.2 Enrage Timers

**Enrage Mechanics:**
- After X turns, boss enters enraged state
- **Effects:**
  - +50% ATK
  - +30% SPD
  - May unlock new abilities
  - More aggressive AI

**Managing Enrage:**
- DPS check: Defeat before enrage
- Survival after enrage: Requires tank/healer
- Some abilities can dispel enrage (rare)

**Example:**
```
Turn 10: Boss Enrages!
"Corrupted Beyonder is filled with rage!"
ATK: 800 → 1,200
SPD: 85 → 110
New Ability Unlocked: Dark Frenzy (AOE Ultimate)
```

### 2.3 Phase Transitions

**Phase System:**
- Bosses change tactics at HP thresholds
- Common thresholds: 75%, 50%, 25% HP

**Phase Mechanics:**

**Phase 1 (100-75% HP):**
- Basic attack patterns
- Normal difficulty

**Phase 2 (75-50% HP):**
- Unlocks special abilities
- May summon minions
- Increased aggression

**Phase 3 (50-25% HP):**
- Uses ultimate more frequently
- Desperate tactics (self-buffs, high damage)
- May have invulnerable periods

**Phase 4 (25-0% HP):**
- Final stand, most dangerous
- All abilities available
- May have last-stand mechanics (revive once, enrage permanently)

**Example Phase Transition:**
```
Corrupted Beyonder HP: 50% → Phase 2!
"The darkness consumes him further!"
Actions:
- Summons 2 Shadow Wraiths
- Gains "Dark Aura" buff (+30% Mystical DMG)
- Unlocks "Shadow Barrage" ability (AOE skill)
```

### 2.4 Minion Summoning

**Summoning Mechanics:**
- Some enemies call reinforcements
- Minions: Weaker versions of common enemies
- Max summons: Usually 2-4 at once

**Strategic Considerations:**
- Kill minions first (prevent overwhelming)
- Ignore minions (focus boss)
- AOE damage handles minions naturally

**Summon Types:**
- **Adds:** Permanent until killed
- **Temporary:** Despawn after X turns
- **Phase-Specific:** Only appear during certain phases

### 2.5 Special Conditions

**Objective-Based Fights:**

**"Protect the Objective"**
- Keep NPC/object alive
- Failure = mission failed
- Strategy: Dedicated defender or taunt

**"Destroy All Totems"**
- Must eliminate side objectives
- Totems buff enemies or heal boss
- Strategy: Split attention, AOE coverage

**"Survive X Turns"**
- Endurance challenge
- Focus on survival, not damage
- Strategy: Defensive team, healing priority

**"Time Limit"**
- DPS check, defeat within X turns
- Strategy: Aggressive buffs, ultimates early

**"No Deaths Allowed"**
- Perfect run requirement
- Higher rewards if achieved
- Strategy: Over-leveled team or excellent play

---

## 3. Corruption System

### 3.1 Corruption Mechanics

**Corruption Accumulation:**
- Characters gain corruption 0-100 during battle
- Sources:
  - Hit by high-sequence enemy attacks: +5-10 per hit
  - Specific enemy abilities: +15-30
  - Environmental effects: +5 per turn
  - Some weapons/abilities: Self-corruption

**Corruption Effects by Threshold:**

| Corruption % | Effect |
|--------------|--------|
| 0-25% | No effect |
| 26-50% | -10% Effectres |
| 51-75% | -10% Effectres, -20% Effect |
| 76-99% | -20% Effectres, -30% Effect, -10% all stats |
| 100% | **Corrupted State** (see below) |

### 3.2 Corrupted State

**At 100 Corruption:**
- Character becomes "Corrupted" for remainder of battle
- **Effects:**
  - +30% ATK and SPD (berserker)
  - Randomly attacks allies OR enemies (50/50 each turn)
  - Cannot be controlled by player
  - Cannot use items on corrupted character

**Preventing Corruption:**
- High Effectres stat
- Sun pathway abilities (purification)
- Specific items (Corruption Cleansing Potion)
- Defeat enemies quickly

**Cleansing Corruption:**
- Sun pathway skills: Reduce corruption by 20-50
- Cleansing items: Reduce by 30-50
- End of battle: All corruption resets to 0

### 3.3 Strategic Corruption

**Intentional Corruption:**
- Some builds utilize corruption
- Example: Emlyn (Moon) has trait "When corrupted, +60% ATK, 70% chance to still target enemies"
- High-risk, high-reward playstyle

---

## 4. Enemy AI Behavior

### 4.1 AI Patterns

**Common Enemy AI:**
- Random targeting
- Prefers using skills over basic attacks
- Basic threat assessment (targets low HP allies)

**Elite Enemy AI:**
- Prioritizes vulnerable targets (low DEF/HP)
- Uses skills strategically
- Saves ultimate for optimal moment (multiple targets, low HP allies)

**Boss Enemy AI:**
- Intelligent targeting (focus healers, exploit weaknesses)
- Scripted attack patterns
- Reads team composition (counters strategy)
- May target characters based on role

### 4.2 Targeting Priority

**Enemy Targeting Logic:**

1. **Taunted:** Must attack taunter (100% priority)
2. **Aggro System:** Accumulate aggro points
   - Tank abilities: +High aggro
   - Healing allies: +Medium aggro
   - Dealing damage: +Low aggro
   - Low HP: +Bonus targeting chance
3. **AI Preference:** 
   - Bosses prefer healers and support
   - Brutes prefer front row
   - Assassins prefer back row

### 4.3 Skill Usage AI

**When to Use Skills:**
- Energy available: 70% chance to use skill vs basic
- Ultimate available: 80% chance to use if 3+ targets in range
- AOE skills: Only if hitting 2+ targets
- Buffs: Uses at battle start or when low HP
- Heals: Uses when self or ally below 50% HP

---

## 5. Enemy Scaling

### 5.1 Level Scaling

**Enemy Stats by Level:**
- Base stats increase 2.5% per level
- Level range: 1-80 (matches player)

**World Level Impact:**
- Every +1 World Level: Enemies +5 levels
- Example: World Level 5 → Story enemies are +25 levels

### 5.2 Difficulty Modifiers

**Story Difficulty:**

| Difficulty | Enemy HP | Enemy ATK | Rewards |
|------------|----------|-----------|---------|
| Normal | 100% | 100% | Base |
| Hard | 150% | 120% | +30% |
| Nightmare | 250% | 150% | +80% |

**Endgame Scaling:**
- Abyss: +10% stats per floor
- Arena: Matched to player power
- Raid: Fixed stats, very high

---

## 6. Enemy Roster Examples

### 6.1 Common Enemy: Shadow Wraith

**Type:** Common Undead  
**HP:** 800  
**ATK:** 120  
**Abilities:**
- Shadow Strike (Basic): 100% ATK single target
- Darkness Veil (Skill): +30% EVA to self for 2 turns

**Strategy:** Low priority, kill with AOE

---

### 6.2 Elite Enemy: Corrupted Beyonder (Death Pathway Seq 6)

**Type:** Elite Boss  
**HP:** 12,000  
**ATK:** 350  
**Break Gauge:** 500

**Abilities:**
1. Dark Strike (Basic): 120% ATK single target
2. Spirit Summon (Skill): Summon 2 shadow spirits (20% HP each)
3. Death's Grasp (Ultimate): 250% ATK AOE, apply Curse for 3 turns
4. **Passive:** When below 50% HP, +30% ATK

**Phase Transition (50% HP):**
- Summons 2 Shadow Wraiths
- Gains Dark Aura buff (+30% damage)

**Strategy:** 
- Kill spirits immediately
- Break before ultimate
- Cleanse curse or face low healing

---

### 6.3 Story Boss: Amon (Error Pathway Seq 1)

**Type:** Story Boss (Final Boss Chapter 10)  
**HP:** 150,000  
**ATK:** 600  
**Break Gauge:** Immune

**Abilities:**
1. Error Manipulation (Basic): 150% ATK, steal 1 buff
2. Time Loop (Skill): Rewind self 1 turn (heal 10% HP, reset cooldowns)
3. Parasitic Theft (Skill): Copy ally's ultimate, can use next turn
4. Reality Warp (Ultimate): 400% ATK AOE, apply random debuffs to all
5. **Passive 1:** Dodge first attack each turn (high EVA)
6. **Passive 2:** When hit by ultimate, counter with own ultimate (once per phase)

**Phases:**
- **Phase 1 (100-70%):** Basic pattern
- **Phase 2 (70-40%):** Uses Time Loop frequently, more aggressive
- **Phase 3 (40-0%):** Spams ultimates, copies player abilities

**Strategy:**
- Don't use ultimates carelessly (he'll copy)
- Burst damage in Phase 3
- Requires strong defensive team or overwhelming DPS

---

## 7. Enemy Drop Tables

### 7.1 Common Drops

**From Common Enemies:**
- Gold: 50-200
- Common materials: 1-3 items
- Pathway Essence: 5% chance

**From Elite Enemies:**
- Gold: 500-2,000
- Rare materials: 2-5 items
- Pathway Essence: 30% chance
- Beyonder Characteristic: 5% chance
- 3-4★ weapons: 1% chance

### 7.2 Boss Drops

**Story Bosses:**
- Guaranteed 4★ character or weapon (first clear)
- 500-1,000 Fate Tokens
- Epic materials: 5-10 items
- Guaranteed Beyonder Characteristic

**Raid Bosses:**
- Raid-exclusive weapons
- Legendary materials
- High gold rewards
- Titles and cosmetics

---

[← Previous: Combat](combat.md) | [Next: Game Modes →](game-modes.md) | [↑ Back to Index](README.md)
