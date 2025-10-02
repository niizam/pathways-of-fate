# Pathways of Fate

A turn-based RPG with gacha and roguelite elements, inspired by Beyonder pathways.

## Quick Start with Docker

The easiest way to run Pathways of Fate is using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/niizam/pathways-of-fate.git
cd pathways-of-fate

# Start all services (server, client)
docker-compose up -d

# Access the game at http://localhost:3000
```

That's it! The game is now running locally.

## Manual Installation

If you prefer to run without Docker:

### Prerequisites

- Node.js 18+ 

**Note:** This project uses a simple JSON file-based database following the KISS principle. No external database or cache servers required!

### Setup

1. **Install dependencies:**
```bash
npm run install:all
```

2. **Set up environment variables (optional):**
```bash
cp .env.example .env
# Edit .env with your configuration (mainly for JWT secret)
```

3. **Start the development servers:**
```bash
npm run dev
```

The client will run on http://localhost:5173 and the server on http://localhost:5000.

Game data is automatically stored in `server/db/data/` as JSON files.

## Project Structure

```
pathways-of-fate/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── utils/       # Utility functions
│   │   ├── contexts/    # React contexts
│   │   └── styles/      # Global styles
│   └── package.json
├── server/              # Express backend
│   ├── routes/          # API route definitions
│   ├── db/              # JSON database system
│   │   ├── json-db.js   # Database abstraction layer
│   │   └── data/        # JSON data files (auto-created)
│   ├── middleware/      # Express middleware
│   ├── config/          # Configuration files
│   └── package.json
├── src/docs/design/     # Game design documentation
├── docker-compose.yml   # Docker orchestration
└── package.json         # Root package file

```

## Game Documentation

Complete game design documentation is available in `/src/docs/design/`:

- [Design Documentation Index](src/docs/design/README.md)
- [Overview & Gameplay](src/docs/design/overview.md)
- [Power System](src/docs/design/power-system.md)
- [Characters](src/docs/design/characters.md)
- [Combat System](src/docs/design/combat.md)
- And more...

## Development

### Running Tests

```bash
# Run all tests
npm test

# Run client tests
cd client && npm test

# Run server tests
cd server && npm test
```

### Building for Production

```bash
npm run build
```

### API Documentation

API documentation is available at http://localhost:5000/api/docs when running the server.

## Features

- ✅ Turn-based RPG combat system
- ✅ 22 unique Pathways with thematic abilities
- ✅ Gacha system with pity mechanics
- ✅ Roguelite dungeon (Mystic Labyrinth)
- ✅ Character progression (leveling, ascension, sequence advancement)
- ✅ Multiple game modes (Story, Arena, Abyss, Raids)
- ✅ Ethical F2P model (no pay-to-win)
- ✅ Bot-friendly API
- ✅ Self-hostable and open-source
- ✅ Simple JSON-based database (KISS principle - no SQL required!)

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Community

- Discord: [Coming Soon]
- Wiki: [Coming Soon]
- Subreddit: [Coming Soon]

## Credits

Inspired by Lord of the Mysteries by Cuttlefish That Loves Diving.
