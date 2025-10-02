import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';
import { GAME_CONFIG, CHARACTER_DATA } from '../config/game-config.js';

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Validation
    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Email, username, and password are required' });
    }

    // Check if user exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const result = await pool.query(
      `INSERT INTO users (email, username, password_hash, fate_tokens, gold) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id, email, username, account_level, fate_tokens, gold`,
      [email, username, passwordHash, GAME_CONFIG.starter.fateTokens, GAME_CONFIG.starter.gold]
    );

    const newUser = result.rows[0];

    // Give starter characters
    for (const charName of GAME_CONFIG.starter.characters) {
      const charData = CHARACTER_DATA[charName];
      await pool.query(
        `INSERT INTO characters 
         (user_id, character_name, pathway_id, sequence, rarity, hp, atk, def, res, spd)
         VALUES ($1, $2, (SELECT id FROM pathways WHERE name = $3), $4, $5, $6, $7, $8, $9, $10)`,
        [
          newUser.id,
          charName,
          charData.pathway,
          charData.sequence,
          charData.rarity,
          charData.baseStats.hp,
          charData.baseStats.atk,
          charData.baseStats.def,
          charData.baseStats.res,
          charData.baseStats.spd,
        ]
      );
    }

    // Initialize gacha pity
    await pool.query(
      `INSERT INTO gacha_pity (user_id, banner_type, pity_count, is_guaranteed)
       VALUES ($1, 'standard', 0, false), ($1, 'limited', 0, false)`,
      [newUser.id]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser,
      starterRewards: {
        characters: GAME_CONFIG.starter.characters,
        fateTokens: GAME_CONFIG.starter.fateTokens,
        gold: GAME_CONFIG.starter.gold,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const result = await pool.query(
      'SELECT id, email, username, password_hash, account_level, world_level, fate_tokens, gold FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await pool.query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: process.env.JWT_EXPIRATION || '24h' }
    );

    delete user.password_hash;

    res.json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get profile (authenticated)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, email, username, account_level, world_level, experience, 
              stamina, last_stamina_regen, fate_tokens, gold, created_at, last_login
       FROM users WHERE id = $1`,
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

export default router;
