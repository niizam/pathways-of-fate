import express from 'express';
import { pool } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';
import { GAME_CONFIG } from '../config/game-config.js';

const router = express.Router();

// Get all user characters
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.*, p.name as pathway_name, p.theme, p.combat_role
       FROM characters c
       JOIN pathways p ON c.pathway_id = p.id
       WHERE c.user_id = $1
       ORDER BY c.rarity DESC, c.level DESC`,
      [req.user.userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get characters error:', error);
    res.status(500).json({ error: 'Failed to get characters' });
  }
});

// Get specific character
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.*, p.name as pathway_name, p.theme, p.combat_role, p.description
       FROM characters c
       JOIN pathways p ON c.pathway_id = p.id
       WHERE c.id = $1 AND c.user_id = $2`,
      [req.params.id, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get character error:', error);
    res.status(500).json({ error: 'Failed to get character' });
  }
});

// Level up character
router.put('/:id/level', authenticateToken, async (req, res) => {
  try {
    const { targetLevel } = req.body;

    // Get character and check ownership
    const charResult = await pool.query(
      'SELECT * FROM characters WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.userId]
    );

    if (charResult.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }

    const character = charResult.rows[0];
    const maxLevel = GAME_CONFIG.character.ascensionCaps[character.ascension];

    if (targetLevel > maxLevel) {
      return res.status(400).json({ error: `Cannot level past ${maxLevel}. Ascend character first.` });
    }

    if (targetLevel <= character.level) {
      return res.status(400).json({ error: 'Target level must be higher than current level' });
    }

    // Calculate cost (simplified - should check materials)
    const goldCost = (targetLevel - character.level) * 1000;

    const userResult = await pool.query('SELECT gold FROM users WHERE id = $1', [req.user.userId]);
    if (userResult.rows[0].gold < goldCost) {
      return res.status(400).json({ error: 'Insufficient gold' });
    }

    // Update character level and stats
    const levelBonus = 1 + (targetLevel * GAME_CONFIG.character.levelScaling);
    const baseStats = GAME_CONFIG.character.baseStats[character.rarity];

    const newStats = {
      hp: Math.floor(baseStats.hp * levelBonus),
      atk: Math.floor(baseStats.atk * levelBonus),
      def: Math.floor(baseStats.def * levelBonus),
      res: Math.floor(baseStats.res * levelBonus),
      spd: baseStats.spd,
    };

    await pool.query(
      `UPDATE characters 
       SET level = $1, hp = $2, atk = $3, def = $4, res = $5
       WHERE id = $6`,
      [targetLevel, newStats.hp, newStats.atk, newStats.def, newStats.res, req.params.id]
    );

    // Deduct gold
    await pool.query('UPDATE users SET gold = gold - $1 WHERE id = $2', [goldCost, req.user.userId]);

    res.json({
      message: 'Character leveled up successfully',
      newLevel: targetLevel,
      newStats,
      goldSpent: goldCost,
    });
  } catch (error) {
    console.error('Level up error:', error);
    res.status(500).json({ error: 'Failed to level up character' });
  }
});

// Ascend character
router.put('/:id/ascend', authenticateToken, async (req, res) => {
  try {
    const charResult = await pool.query(
      'SELECT * FROM characters WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.userId]
    );

    if (charResult.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }

    const character = charResult.rows[0];

    if (character.ascension >= 6) {
      return res.status(400).json({ error: 'Character is already at max ascension' });
    }

    // Check if at level cap
    const currentCap = GAME_CONFIG.character.ascensionCaps[character.ascension];
    if (character.level < currentCap) {
      return res.status(400).json({ error: `Character must be level ${currentCap} to ascend` });
    }

    // Simplified cost check
    const goldCost = 20000 * (character.ascension + 1);
    const userResult = await pool.query('SELECT gold FROM users WHERE id = $1', [req.user.userId]);
    
    if (userResult.rows[0].gold < goldCost) {
      return res.status(400).json({ error: 'Insufficient gold' });
    }

    // Perform ascension
    const newAscension = character.ascension + 1;
    await pool.query(
      'UPDATE characters SET ascension = $1 WHERE id = $2',
      [newAscension, req.params.id]
    );

    await pool.query('UPDATE users SET gold = gold - $1 WHERE id = $2', [goldCost, req.user.userId]);

    const newLevelCap = GAME_CONFIG.character.ascensionCaps[newAscension];

    res.json({
      message: 'Character ascended successfully',
      newAscension,
      newLevelCap,
      goldSpent: goldCost,
    });
  } catch (error) {
    console.error('Ascension error:', error);
    res.status(500).json({ error: 'Failed to ascend character' });
  }
});

export default router;
