# Combat System

[← Back to Index](README.md) | [← Previous: Weapons](weapons.md) | [Next: Enemies →](enemies.md)

## Overview

The Combat System in Pathways of Fate is turn-based with strategic depth through energy management, status effects, and team synergies.

---

## 1. Turn-Based Mechanics

### 1.1 Turn Order System

**Speed-Based Priority:**
- Turn order determined by SPD stat (highest goes first)
- Recalculated each round
- Ties broken by RNG
- Buffs/debuffs can modify SPD mid-battle

**Turn Order Display:**
```
Turn Order: Klein(95) → Audrey(90) → Enemy1(85) → Derrick(80) → Enemy2(75) → Emlyn(70)
```

**Speed Manipulation:**
- SPD Up buff: +10-30 SPD
- SPD Down debuff: -10-30 SPD
- Some skills grant immediate turn (acts again)
- Some debuffs skip turns (stun, freeze)

### 1.2 Action Types

Each character can perform one action per turn:

| Action | Description | Energy Cost | Availability |
|--------|-------------|-------------|--------------|
| **Basic Attack** | Standard attack, generates energy | 0 (Gains 1) | Always |
| **Use Skill** | Character's signature ability | 1-2 | If energy available |
| **Use Ultimate** | Powerful finishing move | 3-4 | If energy available |
| **Defend** | Increase DEF/RES, gain energy | 0 (Gains 1) | Always |
| **Switch** | Swap with bench character | 0 | Once per character/round |
| **Use Item** | Consumable (potion, revive) | 0 | Limited per battle |

### 1.3 Energy System

**Energy Mechanics:**
- Each character has independent energy pool
- Maximum: 4 energy per character
- Starting energy: 1 energy per character

**Energy Generation:**
- Basic attack: +1 energy
- Defend action: +1 energy
- Taking damage: +1 energy (once per turn)
- Acting (any action): +1 energy
- Some passives: Generate extra energy

**Energy Costs:**
- Skills: 1-2 energy
- Ultimates: 3-4 energy
- Some Eidolons reduce costs (e.g., E2 typically -1 ultimate cost)

**Strategic Considerations:**
- Banking energy for ultimates
- Using basic attacks to generate energy
- Defending to survive + generate energy
- Energy manipulation effects (rare)

---

## 2. Damage Calculation

### 2.1 Damage Formula

**Base Damage Calculation:**
```
Base Damage = ATK × Skill Multiplier
```

**Physical Damage:**
```
Physical Damage = Base Damage × (1 - DEF / (DEF + 200 + 10 × Attacker_Level))
```

**Mystical Damage:**
```
Mystical Damage = Base Damage × (1 - RES / (RES + 200 + 10 × Attacker_Level))
```

**Critical Hit:**
```
Critical Damage = Normal Damage × (1 + CRIT_DMG)
Default CRIT_DMG = 150% (deals 2.5x normal damage)
```

**Final Damage:**
```
Final Damage = Damage × (1 + Sum of Buffs - Sum of Debuffs) × Type_Effectiveness × Random(0.95-1.05)
```

### 2.2 Damage Type Effectiveness

**Pathway Advantages (1.3x multiplier):**
See [Power System - Pathway Advantages](power-system.md#13-pathway-advantages)

**Element Interactions:**
- Some characters have elemental affinities
- Fire > Ice > Water > Fire (1.25x)
- Light > Dark (1.3x)
- Dark > Light (0.7x)

### 2.3 Damage Example

**Scenario:** Klein (ATK 1000) uses Flame Jump (150% multiplier) against enemy (DEF 200, Level 50)

1. Base Damage: 1000 × 1.5 = 1,500
2. Defense Reduction: 1,500 × (1 - 200/(200 + 200 + 500)) = 1,500 × 0.778 = 1,167
3. Buffs Applied: Klein has +30% ATK buff: 1,167 × 1.3 = 1,517
4. Critical Hit: Rolled 15% crit chance → Success! 1,517 × 2.5 = 3,793
5. Type Advantage: Fool vs Error enemy: 3,793 × 1.3 = 4,931
6. Random Variance: 4,931 × 1.02 = **5,029 Final Damage**

---

## 3. Status Effects

### 3.1 Buffs (Positive Effects)

| Buff | Effect | Typical Values | Duration | Stackable |
|------|--------|----------------|----------|-----------|
| **ATK Up** | Increase attack | +20-50% | 2-3 turns | Yes |
| **DEF Up** | Increase defense | +30-50% | 2-3 turns | Yes |
| **RES Up** | Increase resistance | +30-50% | 2-3 turns | Yes |
| **SPD Up** | Increase speed | +20-40 | 2-3 turns | Yes |
| **Shield** | Absorb damage | 20-50% max HP | Until broken | No |
| **Regeneration** | Heal per turn | 5-10% max HP | 3-5 turns | No |
| **Immunity** | Cannot receive debuffs | N/A | 1-2 turns | No |
| **Stealth** | Cannot be single-targeted | N/A | 1-2 turns | No |
| **CRIT Up** | Increase crit rate | +15-30% | 2-3 turns | Yes |
| **Damage Up** | Increase all damage | +20-40% | 2-3 turns | Yes |

### 3.2 Debuffs (Negative Effects)

| Debuff | Effect | Typical Values | Duration | Stackable |
|--------|--------|----------------|----------|-----------|
| **ATK Down** | Decrease attack | -20-40% | 2-3 turns | Yes |
| **DEF Down** | Armor break | -30-50% | 2-3 turns | Yes |
| **RES Down** | Reduce resistance | -30-50% | 2-3 turns | Yes |
| **SPD Down** | Slow | -20-40 | 2-3 turns | Yes |
| **Stun** | Cannot act | Skip 1 turn | 1 turn | No |
| **Freeze** | Cannot act, take +50% DMG | Skip turn, +50% vulnerability | 1 turn | No |
| **Burn** | Fire DOT | 5-10% ATK per turn | 3-5 turns | Yes (intensity) |
| **Bleed** | Physical DOT | 5-10% ATK per turn | 3-5 turns | Yes (intensity) |
| **Poison** | % HP DOT | 3-8% max HP per turn | 3-5 turns | Yes (intensity) |
| **Curse** | Reduce healing | -50% healing received | 2-4 turns | No |
| **Marked** | Increase damage taken | +15-30% | 2-3 turns | Yes |
| **Taunt** | Force targeting | Must target taunter | 1-2 turns | No |
| **Blind** | Reduce accuracy | -30-50% hit chance | 2-3 turns | No |

### 3.3 Status Effect Mechanics

**Effect Hit Rate:**
```
Success Chance = Base Rate × (1 + Caster_Effect - Target_Effectres)
Minimum Success: 15%
Maximum Success: 95%
```

**Example:**
- Audrey uses mind control (base 80% success)
- Audrey has 40% Effect
- Enemy has 20% Effectres
- Success: 80% × (1 + 0.4 - 0.2) = 80% × 1.2 = 96% → Capped at 95%

**Stack Mechanics:**

*Refreshing Stacks (Most Debuffs):*
- Applying same debuff refreshes duration
- Intensity doesn't stack (strongest takes effect)
- Example: 30% ATK Down → 20% ATK Down = stays 30% but duration refreshes

*Additive Stacks (DOT Effects):*
- Multiple applications increase damage
- Each maintains own duration
- Example: Burn (5% ATK) + Burn (5% ATK) = 10% ATK per turn

### 3.4 Cleansing & Dispelling

**Cleanse (Remove Debuffs from Allies):**
- Healer abilities: "Cleanse 1-3 debuffs"
- Priority: Removes most recent or most dangerous first
- Some abilities cleanse specific types only

**Dispel (Remove Buffs from Enemies):**
- Debuffer abilities: "Dispel 1-2 buffs"
- Priority: Removes strongest buffs first
- Rare effect (valuable in boss fights)

**Immunity & Prevention:**
- Immunity buffs: Prevent new debuffs (doesn't remove existing)
- Effectres stat: Reduces debuff success chance
- Some passives: "Cannot be stunned", "Cannot be controlled"

---

## 4. Team Composition

### 4.1 Party Structure

**Active Party:**
- 4 characters in battle at once
- Positioned: Front (slots 1-2), Back (slots 3-4)

**Bench:**
- 2 reserve characters
- Can be switched in during battle
- Retain HP and energy when benched

**Positioning Effects:**
- Front row: More likely to be targeted by enemies
- Back row: Safer, but some AOE skills hit all
- Some skills target specific positions

### 4.2 Optimal Team Archetypes

**Standard Balanced Team:**
- 1 Tank (Front)
- 1 Healer (Back)
- 2 DPS (1 Front, 1 Back)

**Aggressive Speed Clear:**
- 1 Buffer (Back)
- 3 DPS (Mixed positioning)

**Defensive Survival:**
- 1 Tank (Front)
- 2 Healers (Back)
- 1 DPS (Front)

**Control/Debuff Team:**
- 1 Tank (Front)
- 1 Healer (Back)
- 2 Debuffers (Back)

**Summon Swarm:**
- 2-3 Summoners
- 1 Buffer/Healer
- Overwhelm with numbers

### 4.3 Synergy Bonuses

**Pathway Synergies:**
See [Power System - Pathway Synergies](power-system.md#14-pathway-synergies)

**Archetype Synergies:**

| Composition | Bonus | Description |
|-------------|-------|-------------|
| 2 DPS | +10% CRIT | Aggressive momentum |
| 3 DPS | +15% CRIT DMG | Full offense |
| Tank + Healer | +20% Tank HP | Classic duo |
| 2 Healers | +15% Healing | Extra sustain |
| 2 Debuffers | +10% Effect | Better crowd control |
| Summoner + Buffer | +30% Summon Stats | Enhanced minions |
| 4 Different Pathways | +10% All Stats | Diversity bonus |

---

## 5. Combat UI & Controls

### 5.1 Battle Screen Layout

**Text-Based Display:**
```
=== BATTLE: Chapter 3-5 "Shadow Invasion" ===
Turn 7 | Energy: Klein[3] Audrey[2] Derrick[4] Emlyn[2]

=== ENEMIES ===
[Elite] Corrupted Beyonder      HP: 2340/4500 [=========>-----]
  Buffs: ATK Up +30% (2 turns)
  
[Common] Shadow Wraith          HP: 450/800 [======>---------]
  Debuffs: Marked +15% (1 turn)
  
[Common] Shadow Wraith          HP: 800/800 [===============]

=== YOUR TEAM ===
[Klein Moretti] Fool Seq 6      HP: 1850/2400 [===========>---]
  Buffs: SPD Up +20 (3 turns)
  
[Audrey Hall] Spectator Seq 7   HP: 1600/1600 [===============]
  Buffs: None
  
[Derrick Berg] Sun Seq 7        HP: 2800/3200 [==============>]
  Buffs: Regeneration 5% (4 turns)
  
[Emlyn White] Moon Seq 6        HP: 1200/2000 [==========>----]
  Debuffs: Burn 8% ATK (2 turns)

=== [Klein's Turn] ===
> 1. Basic: Air Bullet (Gain 1 Energy → 4 total)
> 2. Skill: Flame Jump (2 Energy → 1 remain, 3 turn CD)
> 3. Ultimate: Historical Void Projection (4 Energy → 0 remain)
> 4. Defend (Gain 1 Energy → 4 total, +50% DEF/RES)
> 5. Item (3 Health Potions, 1 Revive available)
> 6. Switch (Bench: Fors Wall, Old Neil)

Select action: _
```

### 5.2 Speed Options

**Battle Speed:**
- 1x: Normal, full animations
- 2x: Fast, reduced animations
- 4x: Ultra fast, minimal display

**Auto-Battle:**
- AI controls team
- Settings: Priority (DPS/Survival), Ultimate usage (Always/Save), Target priority (Weakest/Strongest)

### 5.3 Battle Log

**Detailed Combat History:**
```
Turn 6 Summary:
- Klein used Flame Jump on Corrupted Beyonder
  → Dealt 2,147 damage (Critical!)
  → Applied Marked +15% for 2 turns
- Audrey used Mind Probe on Shadow Wraith #1
  → Dealt 892 damage
  → Applied ATK Down -30% for 3 turns
- Corrupted Beyonder used Dark Blast
  → Hit all allies for 450-650 damage
  → Klein dodged (Fool's Veil passive)
- ...
```

---

## 6. Advanced Combat Mechanics

### 6.1 Break System

**Break Gauge:**
- Elite and Boss enemies have toughness bars
- Depleting break gauge stuns enemy for 1 turn
- Refills after being broken

**Breaking Mechanics:**
- Each attack depletes break gauge
- Strong against weakness: 2x break damage
- Weak against resistance: 0.5x break damage

**Strategic Use:**
- Coordinate team to break before enemy ultimate
- Some characters specialize in break damage

### 6.2 Chain Attacks

**Combo System:**
- Some abilities trigger follow-up attacks
- Example: "When ally crits, attack same target for 50% damage"

**Team Combos:**
- Specific character pairs have combo abilities
- Example: Klein + Audrey = "Deception + Mind Reading" bonus damage

### 6.3 Counter & Reflect

**Counter Attacks:**
- Some tanks have "When hit, counter for X% damage"
- Triggers automatically, doesn't use turn

**Damage Reflection:**
- Some abilities reflect % of damage taken
- Returns damage to attacker
- Example: "Reflect 30% of damage taken for 2 turns"

### 6.4 Lifesteal & Drain

**HP Recovery on Damage:**
- Lifesteal: Heal for X% of damage dealt
- HP Drain: Convert damage to HP (rare)
- Caps at max HP (no overheal)

---

## 7. Battle Modifiers

### 7.1 Environmental Effects

Some battles have special conditions:

| Environment | Effect |
|-------------|--------|
| **Night** | Moon pathway +20% damage, Sun pathway -10% damage |
| **Fog** | All characters -20% ACC |
| **Storm** | Tyrant pathway +20% damage, random lightning strikes |
| **Corrupted Zone** | All characters gain corruption +5 per turn |
| **Blessed Ground** | All allies regen 3% HP per turn |

### 7.2 Challenge Modifiers

**Endgame Content Modifiers:**
- Enemies have +50% HP
- Enemies have +30% ATK
- Energy generation reduced by 50%
- Healing effectiveness -50%
- Starting energy: 0

**Reward Multipliers:**
- More modifiers = better rewards
- Player chooses difficulty in some modes

---

## 8. Combat Tips & Strategy

### 8.1 General Tips

1. **Energy Management**
   - Don't waste ultimates on weak enemies
   - Bank energy for crucial moments
   - Coordinate ultimate timing

2. **Target Priority**
   - Kill healers first
   - Break dangerous enemies before they act
   - Focus fire to reduce incoming damage

3. **Buff/Debuff Timing**
   - Apply debuffs before big attacks
   - Buff before ultimate rotations
   - Cleanse dangerous debuffs immediately

4. **Positioning Awareness**
   - Keep fragile DPS in back row
   - Tanks upfront to absorb single-target attacks
   - Switch out low HP characters before they die

### 8.2 Boss Fight Strategy

**Phase Management:**
- Learn phase transitions (often at 75%, 50%, 25% HP)
- Save ultimates for dangerous phases
- Break boss before ultimate cast

**Survival Tactics:**
- Maintain healer HP above 50%
- Keep defensive buffs active
- Use items when needed (don't hoard)

**Speed vs Safety:**
- Fast clear: Aggressive, risk death
- Safe clear: Defensive, takes longer but reliable

---

[← Previous: Weapons](weapons.md) | [Next: Enemies →](enemies.md) | [↑ Back to Index](README.md)
