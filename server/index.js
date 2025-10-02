import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from 'redis';
import pg from 'pg';

// Import routes
import authRoutes from './routes/auth.js';
import charactersRoutes from './routes/characters.js';
import gachaRoutes from './routes/gacha.js';
import battleRoutes from './routes/battle.js';
import inventoryRoutes from './routes/inventory.js';
import profileRoutes from './routes/profile.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const { Pool } = pg;
export const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'pathways_of_fate',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres_password',
});

// Redis connection
export const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  }
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
await redisClient.connect();

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('✓ Database connected successfully');
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/characters', charactersRoutes);
app.use('/api/gacha', gachaRoutes);
app.use('/api/battle', battleRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/profile', profileRoutes);

// API documentation endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    message: 'Pathways of Fate API',
    version: '1.0.0',
    endpoints: {
      auth: {
        'POST /api/auth/register': 'Register new user',
        'POST /api/auth/login': 'Login user',
        'GET /api/auth/profile': 'Get user profile (requires auth)'
      },
      characters: {
        'GET /api/characters': 'Get all user characters',
        'GET /api/characters/:id': 'Get specific character',
        'PUT /api/characters/:id/level': 'Level up character',
        'PUT /api/characters/:id/ascend': 'Ascend character'
      },
      gacha: {
        'POST /api/gacha/pull': 'Perform gacha pull',
        'GET /api/gacha/history': 'Get gacha history'
      },
      battle: {
        'POST /api/battle/start': 'Start battle',
        'POST /api/battle/action': 'Perform battle action',
        'GET /api/battle/result/:id': 'Get battle result'
      },
      inventory: {
        'GET /api/inventory': 'Get user inventory',
        'POST /api/inventory/use': 'Use item from inventory'
      },
      profile: {
        'GET /api/profile': 'Get player profile',
        'GET /api/profile/stats': 'Get player statistics'
      }
    },
    gameFeatures: [
      'Turn-based combat system',
      '22 unique Pathways',
      'Gacha with pity system',
      'Character progression (leveling, ascension, sequence advancement)',
      'Multiple game modes',
      'Ethical F2P model'
    ]
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`🎮 Pathways of Fate server running on port ${PORT}`);
  console.log(`📚 API documentation available at http://localhost:${PORT}/api/docs`);
});
