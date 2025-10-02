# Economy & Balance

[← Back to Index](README.md) | [← Previous: Technical](technical.md) | [Next: Roadmap →](roadmap.md)

## 1. Game Balance

### 1.1 Stamina Economy

**Daily Natural Resources:**
- Natural regen: ~240 stamina
- Daily missions: ~60 stamina worth of rewards
- Idle rewards: ~50-100 stamina worth
- **Total: 350-400 stamina/day**

**Average Stage Cost:** 15 stamina  
**Daily Farming Potential:** 23-26 stages

### 1.2 Gacha Economy (F2P)

**Monthly Income:**
- Daily sources: ~50 tokens × 30 = 1,500
- Weekly sources: ~300 tokens × 4 = 1,200
- Monthly events/achievements: ~500
- **Total: ~2,000-3,000 Fate Tokens/month**

**Pull Conversion:** 2,000 tokens = 12.5 pulls

**Pity Timeline:**
- Soft pity: 74 pulls = ~6 months
- Hard pity: 90 pulls = ~7-8 months
- Guaranteed featured (worst case): ~14-16 months

### 1.3 Power Curve

**Recommended Power Levels:**

| Content | Team Avg Level | Power Rating | Rarity |
|---------|----------------|--------------|--------|
| Story Ch 1-3 | 20-30 | 5,000 | 3-4★ |
| Story Ch 4-6 | 40-50 | 8,000 | 4★+ |
| Story Ch 7-10 | 60-70 | 12,000 | 5★ or invested 4★ |
| Abyss 1-4 | 50+ | 10,000 | 4-5★ |
| Abyss 5-8 | 60+ | 15,000 | 5★ with Eidolons |
| Abyss 9-12 | 70-80 | 20,000+ | Multiple 5★, optimal gear |
| Nightmare Story | 80 | 25,000+ | Endgame builds |
| Raid (Easy) | 60+ | 12,000 | Coordinated team |
| Raid (Hard) | 70+ | 18,000 | Meta compositions |
| Raid (Mythic) | 80 | 30,000+ | Perfect optimization |

### 1.4 Catch-up Mechanics

**New Player Advantages:**
- Beginner banner: Discounted 20 pulls with guaranteed 5★
- Login rewards: Free 4★ character after 7 days
- Story rewards: Enough resources to build one full team by Chapter 5
- Event catch-up: Old event characters rotate in shop

**Memory Fragments:**
- F2P path to Eidolons
- ~3-4 months per Eidolon unlock
- Prevents extreme power gap between whales and F2P

---

## 2. Monetization (Ethical F2P Model)

### 2.1 Philosophy

**Core Principles:**
- **Never mandatory:** All content clearable F2P
- **No FOMO tactics:** Limited characters return eventually
- **Transparent rates:** All gacha rates published and auditable
- **No pay-to-win:** Skill and strategy matter more than money

### 2.2 Premium Currency Purchases

**Optional Purchases:**
- $0.99: 60 Fate Tokens
- $4.99: 330 Fate Tokens (first-time 2x)
- $9.99: 680 Fate Tokens (first-time 2x)
- $19.99: 1,400 Fate Tokens (first-time 2x)
- $49.99: 3,600 Fate Tokens (first-time 2x)
- $99.99: 7,500 Fate Tokens (first-time 2x)

### 2.3 Monthly Pass ($5-10)

**Benefits:**
- 90 Fate Tokens immediately
- 90 Fate Tokens over 30 days (3/day login)
- **Total: 180 tokens = 11.25 pulls**
- Extra daily instance run
- +50% idle rewards
- Battle pass XP boost

**Value:** Best ROI for consistent players

### 2.4 Battle Pass (Seasonal, ~$10)

**Free Track:**
- Fate Tokens: 300
- Materials: Medium quantity
- Skip tickets: 50
- Gold: 100,000

**Premium Track (+$10):**
- Fate Tokens: 900 total (600 additional)
- Materials: High quantity
- Skip tickets: 150 total
- Gold: 500,000 total
- 4★ character selector
- Exclusive cosmetics
- Profile customization

**Duration:** 6 weeks per season

### 2.5 Cosmetic Shop

**Available Items:**
- Character skins/alternate art: $5-15
- UI themes: $3-10
- Battle animations: $5
- Profile borders: $2-5
- Emotes: $1-3

**Important:** Purely cosmetic, **no stat benefits**

### 2.6 Direct Character Purchase

**Mechanic:**
- Purchase specific 5★ character directly
- Price: ~$30-50 per character
- Guarantees character (skip gacha RNG)
- Limited availability (not all characters)

**Purpose:**
- Alternative for players who dislike gacha
- Whales can collect without gambling
- Still encourages some gacha participation (Eidolons)

### 2.7 No Pay-to-Win Elements

**Explicitly Forbidden:**
- Cannot buy power directly (no stat boosts for money)
- No exclusive pay-only characters with better stats
- No limited items that provide competitive advantage
- PvP matchmaking considers spending brackets

**Fair Play:**
- Whales face other whales in high-tier arena
- All content designed to be clearable F2P
- Skill matters more than money in endgame

---

## 3. Anti-Cheat & Fair Play

### 3.1 Server-Side Validation

- All critical calculations happen on server
- Battle results verified against inputs
- Gacha results generated server-side with logged seeds
- Impossible stats/damage rejected

### 3.2 Gacha Integrity

**Transparency:**
- RNG seed-based, logged for each player
- Pull history preserved permanently
- Rates auditable by players
- Independent audits (community can verify)

**Guarantees:**
- Pity counters never reset unintentionally
- Guaranteed characters delivered as promised
- Pull history never deleted

### 3.3 Bot Policy

**Bots Explicitly Allowed:**
- Automation via API is legal
- Separate "Bot-Assisted" arena bracket
- Rate limiting prevents server abuse
- **No bans for API usage**

**Why Allow Bots:**
- Promotes community tools
- Accessibility for disabled players
- Experimentation and fun
- Transparency (API-first design)

**Bot Bracket:**
- Players who use automation in arena flagged
- Compete against other bot users
- Separate rankings and rewards
- Honest players unaffected

### 3.4 Account Security

**Features:**
- 2FA optional (TOTP)
- Email verification required
- Login history visible
- Account recovery process

**Protection:**
- Session timeout after inactivity
- Suspicious login alerts
- Can revoke all sessions
- Password strength requirements

---

## 4. Economy Tuning

### 4.1 Monitoring Metrics

**Key Indicators:**
- Average pulls per month (F2P vs paid)
- 5★ acquisition rate
- Abyss clear rates
- Arena tier distribution
- Player retention (D1, D7, D30)

### 4.2 Balancing Adjustments

**When to Buff:**
- Character usage <5% (underperforming)
- Content clear rate <30% (too hard)
- F2P progression stalled (need more resources)

**When to Nerf:**
- Character usage >50% (too dominant)
- Content clear rate >90% (too easy)
- Game mode ignored (redesign needed)

**Nerf Philosophy:**
- Avoid nerfs to paid characters (trust issue)
- Buff alternatives instead
- If must nerf, compensate players

### 4.3 Future Adjustments

**Planned Improvements:**
- Increased Fate Token rewards as game ages
- More free characters in later chapters
- Better catch-up mechanics for late joiners
- QoL improvements based on feedback

---

[← Previous: Technical](technical.md) | [Next: Roadmap →](roadmap.md) | [↑ Back to Index](README.md)
