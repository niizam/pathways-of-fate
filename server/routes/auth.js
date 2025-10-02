import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../index.js';
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
    const existingUser = db.findOne('users', { email }) || db.findOne('users', { username });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const newUser = db.insert('users', {
      email,
      username,
      password_hash: passwordHash,
      account_level: 1,
      world_level: 0,
      experience: 0,
      stamina: 120,
      last_stamina_regen: new Date().toISOString(),
      fate_tokens: GAME_CONFIG.starter.fateTokens,
      gold: GAME_CONFIG.starter.gold,
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString(),
    });

    // Give starter characters
    for (const charName of GAME_CONFIG.starter.characters) {
      const charData = CHARACTER_DATA[charName];
      const pathway = db.findOne('pathways', { name: charData.pathway });
      
      db.insert('characters', {
        user_id: newUser.id,
        character_name: charName,
        pathway_id: pathway.id,
        sequence: charData.sequence,
        rarity: charData.rarity,
        level: 1,
        ascension: 0,
        acting_progress: 0,
        eidolon: 0,
        hp: charData.baseStats.hp,
        atk: charData.baseStats.atk,
        def: charData.baseStats.def,
        res: charData.baseStats.res,
        spd: charData.baseStats.spd,
        crit_rate: 5,
        crit_dmg: 150,
        effect: 0,
        effectres: 0,
        is_locked: false,
        obtained_at: new Date().toISOString(),
      });
    }

    // Initialize gacha pity
    db.insert('gacha_pity', {
      user_id: newUser.id,
      banner_type: 'standard',
      pity_count: 0,
      is_guaranteed: false,
    });
    
    db.insert('gacha_pity', {
      user_id: newUser.id,
      banner_type: 'limited',
      pity_count: 0,
      is_guaranteed: false,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        account_level: newUser.account_level,
        fate_tokens: newUser.fate_tokens,
        gold: newUser.gold,
      },
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
    const user = db.findOne('users', { email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    db.update('users', { id: user.id }, { last_login: new Date().toISOString() });

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: process.env.JWT_EXPIRATION || '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        account_level: user.account_level,
        world_level: user.world_level,
        fate_tokens: user.fate_tokens,
        gold: user.gold,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get profile (authenticated)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = db.findOne('users', { id: req.user.userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      account_level: user.account_level,
      world_level: user.world_level,
      experience: user.experience,
      stamina: user.stamina,
      last_stamina_regen: user.last_stamina_regen,
      fate_tokens: user.fate_tokens,
      gold: user.gold,
      created_at: user.created_at,
      last_login: user.last_login,
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

export default router;
