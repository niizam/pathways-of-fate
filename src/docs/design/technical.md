# Technical Architecture

[← Back to Index](README.md) | [← Previous: Quality of Life](quality-of-life.md) | [Next: Economy →](economy.md)

## 1. Client (Frontend)

### 1.1 Technology Stack

**Framework:** React or Vue.js  
**Styling:** Tailwind CSS (responsive design)  
**State Management:** Redux/Vuex  
**Animations:** CSS transitions, minimal JS animations  
**Text-based UI:** Menu-driven interface

### 1.2 Responsive Design

**Breakpoints:**
- Mobile-first approach (320px+)
- Tablet optimization (768px+)
- Desktop layout (1024px+)
- Flexbox/Grid for dynamic layouts

### 1.3 UI Structure

```
├─ Main Menu
│  ├─ Story Campaign
│  ├─ Mystic Labyrinth (Roguelite)
│  ├─ Daily Instances
│  ├─ Abyss
│  ├─ Boss Rush
│  ├─ PvP Arena
│  ├─ Raid
│  └─ Events
├─ Character Menu
│  ├─ Roster
│  ├─ Enhance
│  ├─ Ascension
│  ├─ Sequence Advancement
│  └─ Eidolons
├─ Weapon Menu
│  ├─ Inventory
│  ├─ Enhancement
│  └─ Refinement
├─ Gacha Menu
│  ├─ Character Banners
│  ├─ Weapon Banners
│  └─ History
├─ Shop
├─ Profile
│  ├─ Stats
│  ├─ Achievements
│  └─ Settings
└─ Friends
```

### 1.4 Combat UI (Text-Based Example)

```
=== BATTLE: Chapter 3-5 ===
Turn 4 | Energy: Klein [3] Audrey [2] Derrick [4] Emlyn [2]

Enemies:
[Elite] Corrupted Beyonder HP: 2340/4500 [=====>----------]
[Common] Shadow Wraith HP: 450/800 [======>------]
[Common] Shadow Wraith HP: 800/800 [============]

Your Team:
[Klein Moretti] HP: 1850/2400 [========>---] Seq 6 (Fool)
[Audrey Hall] HP: 1600/1600 [============] Seq 7 (Spectator)
[Derrick Berg] HP: 2800/3200 [===========>] Seq 7 (Sun)
[Emlyn White] HP: 1200/2000 [=======>----] Seq 6 (Moon)

[Klein's Turn]
> 1. Basic Attack (Gain 1 Energy)
> 2. Flame Jump (2 Energy, Deal damage + Mark)
> 3. Historical Void Projection (4 Energy, Summon)
> 4. Defend
> 5. Item
> 6. Switch

Select action: _
```

---

## 2. Server (Backend)

### 2.1 Technology Stack

**Framework:** Node.js (Express)  
**Database:** JSON files (simplified KISS approach)  
**Caching:** In-memory Map (for battle states)  
**Authentication:** JWT tokens  
**File Storage:** Local filesystem

**Note:** *The original design specified PostgreSQL + Redis. The current implementation uses a JSON-based database following the KISS (Keep It Simple, Stupid) principle. See [implementation-status.md](implementation-status.md) for details on this architectural decision.*

### 2.2 Self-Hosting Requirements

**Minimum:**
- Node.js 18+
- 2GB RAM
- 5GB storage
- Docker (optional, for containerized deployment)

**Recommended:**
- 4GB RAM
- 10GB storage
- Regular backups of `server/db/data/` directory

**Note:** *No database server required! The JSON-based system stores all data in simple files, making self-hosting significantly easier.*

### 2.3 Easy Setup

```bash
# Clone repository
git clone [repo]
cd pathways-of-fate

# Install dependencies
npm run install:all

# Start development servers
npm run dev

# Server: http://localhost:5000
# Client: http://localhost:5173
```

**Production Docker Compose:**
```bash
docker-compose up -d
# Access at http://localhost:3000
```

---

## 3. REST API

### 3.1 Core Endpoints

**Authentication:**
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/profile
```

**Characters:**
```
GET /api/characters
GET /api/characters/:id
PUT /api/characters/:id/level
PUT /api/characters/:id/ascend
PUT /api/characters/:id/sequence
```

**Gacha:**
```
POST /api/gacha/pull (body: { banner_id, count: 1|10 })
GET /api/gacha/history
```

**Battle:**
```
POST /api/battle/start (body: { stage_id, team })
POST /api/battle/action (body: { battle_id, action })
POST /api/battle/auto (body: { stage_id, team, auto: true })
GET /api/battle/result/:battle_id
```

**Roguelite:**
```
POST /api/labyrinth/start
POST /api/labyrinth/choose-node
POST /api/labyrinth/battle-action
GET /api/labyrinth/status
```

**Shop:**
```
GET /api/shop/general
POST /api/shop/purchase (body: { item_id, quantity })
```

**Inventory:**
```
GET /api/inventory
POST /api/inventory/use (body: { item_id, target_id })
```

**Daily/Events:**
```
GET /api/dailies
POST /api/dailies/claim/:id
GET /api/events
```

**Arena:**
```
GET /api/arena/ranks
POST /api/arena/battle
GET /api/arena/history
```

**Friends:**
```
GET /api/friends
POST /api/friends/add/:user_id
GET /api/friends/supports
```

### 3.2 Bot-Friendly Features

- Rate limiting: Generous (100 req/min per account)
- Detailed error messages
- Auto-battle API returns full results
- Swagger/OpenAPI documentation
- Webhook support for stamina refills, banner changes
- Batch operations where possible

---

## 4. Performance Optimization

### 4.1 Client-Side

**Optimizations:**
- Text-based UI (minimal rendering)
- Lazy loading for images
- Code splitting
- Service workers for offline capability

**Target Performance:**
- Load time: <3 seconds on 3G
- Bundle size: <500KB initial
- Playable on low-end devices

### 4.2 Server-Side

**Caching:**
- Redis for session data
- Game data cached in memory
- Static assets CDN

**Database:**
- Indexed queries
- Connection pooling
- Read replicas for scaling

---

## 5. Security

### 5.1 Server-Side Validation

- All critical calculations server-side
- Battle results verified against inputs
- Impossible damage/actions rejected
- Gacha results generated server-side only

### 5.2 Authentication

- JWT tokens with expiration
- Refresh token rotation
- 2FA optional
- Rate limiting on auth endpoints

### 5.3 Data Protection

- HTTPS only
- Password hashing (bcrypt)
- Input sanitization
- SQL injection prevention
- XSS protection

---

## 6. Deployment

### 6.1 Docker Compose Setup

```yaml
version: '3.8'
services:
  server:
    build: ./server
    ports:
      - "5000:5000"
    volumes:
      - ./server/db/data:/app/db/data
    environment:
      - NODE_ENV=production
      - JWT_SECRET=your_jwt_secret
      - JWT_EXPIRATION=24h
    restart: unless-stopped

  client:
    build: ./client
    ports:
      - "3000:80"
    depends_on:
      - server
    restart: unless-stopped
```

**Note:** *PostgreSQL and Redis are no longer required. Data is stored in JSON files mounted from the host.*

### 6.2 Environment Variables

```
# JWT Authentication
JWT_SECRET=your_secret_key
JWT_EXPIRATION=24h

# Game Settings
STAMINA_REGEN_MINUTES=6
GACHA_5_STAR_RATE=0.006
GACHA_4_STAR_RATE=0.051
GACHA_3_STAR_RATE=0.943

# Optional: Port Configuration
PORT=5000
```

**Data Backup:**
```bash
# Backup game data
cp -r server/db/data/ backup-$(date +%Y%m%d)/

# Restore from backup
cp -r backup-20251002/ server/db/data/
```

---

## 7. Monitoring & Analytics

### 7.1 Logging

- Application logs (info, warn, error)
- Battle logs (for debugging)
- Gacha pull logs (transparency)
- API request logs

### 7.2 Metrics

- Active users (daily, weekly, monthly)
- Gacha conversion rates
- Popular game modes
- Average session length
- Retention rates (D1, D7, D30)

### 7.3 Privacy-First

- No third-party analytics
- Opt-in only for telemetry
- Anonymized data
- User can export/delete all data

---

[← Previous: Quality of Life](quality-of-life.md) | [Next: Economy →](economy.md) | [↑ Back to Index](README.md)
