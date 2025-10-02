import express from 'express';
import { pool } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';
import { GAME_CONFIG, GACHA_POOL, CHARACTER_DATA } from '../config/game-config.js';

const router = express.Router();

// Perform gacha pull
router.post('/pull', authenticateToken, async (req, res) => {
  try {
    const { banner_id, count } = req.body;

    if (!['standard', 'limited'].includes(banner_id)) {
      return res.status(400).json({ error: 'Invalid banner type' });
    }

    if (![1, 10].includes(count)) {
      return res.status(400).json({ error: 'Can only pull 1 or 10 times' });
    }

    const cost = count === 1 ? GAME_CONFIG.gacha.cost.single : GAME_CONFIG.gacha.cost.ten;

    // Check if user has enough fate tokens
    const userResult = await pool.query(
      'SELECT fate_tokens FROM users WHERE id = $1',
      [req.user.userId]
    );

    if (userResult.rows[0].fate_tokens < cost) {
      return res.status(400).json({ error: 'Insufficient Fate Tokens' });
    }

    // Get pity info
    const pityResult = await pool.query(
      'SELECT pity_count, is_guaranteed FROM gacha_pity WHERE user_id = $1 AND banner_type = $2',
      [req.user.userId, banner_id]
    );

    let pityCount = pityResult.rows[0]?.pity_count || 0;
    let isGuaranteed = pityResult.rows[0]?.is_guaranteed || false;

    const results = [];

    // Perform pulls
    for (let i = 0; i < count; i++) {
      pityCount++;

      // Determine rarity
      let rarity;
      const pool = GACHA_POOL[banner_id];

      // Hard pity
      if (pityCount >= GAME_CONFIG.gacha.pity.hard) {
        rarity = 5;
        pityCount = 0;
      }
      // Soft pity (increased rates)
      else if (pityCount >= GAME_CONFIG.gacha.pity.soft) {
        const softPityBonus = (pityCount - GAME_CONFIG.gacha.pity.soft) * 0.06;
        const adjustedRate = GAME_CONFIG.gacha.rates[5] + softPityBonus;
        const roll = Math.random();
        
        if (roll < adjustedRate) {
          rarity = 5;
          pityCount = 0;
        } else if (roll < adjustedRate + GAME_CONFIG.gacha.rates[4]) {
          rarity = 4;
        } else {
          rarity = 3;
        }
      }
      // Normal rates
      else {
        const roll = Math.random();
        if (roll < GAME_CONFIG.gacha.rates[5]) {
          rarity = 5;
          pityCount = 0;
        } else if (roll < GAME_CONFIG.gacha.rates[5] + GAME_CONFIG.gacha.rates[4]) {
          rarity = 4;
        } else {
          rarity = 3;
        }
      }

      // Select character from pool
      let characterName;
      const rarityPool = pool[rarity];

      if (rarity === 5 && banner_id === 'limited') {
        // 50/50 system for limited banner
        if (isGuaranteed || Math.random() < 0.5) {
          characterName = pool.featured;
          isGuaranteed = false;
        } else {
          // Lost 50/50
          const standardPool = GACHA_POOL.standard[5];
          characterName = standardPool[Math.floor(Math.random() * standardPool.length)];
          isGuaranteed = true;
        }
      } else {
        characterName = rarityPool[Math.floor(Math.random() * rarityPool.length)];
      }

      // Get character data
      const charData = CHARACTER_DATA[characterName] || {
        pathway: 'Seer',
        sequence: 9,
        rarity: 3,
        baseStats: { hp: 400, atk: 80, def: 50, res: 50, spd: 85 },
      };

      // Add character to user's roster (or convert to eidolon if duplicate)
      const existingChar = await pool.query(
        `SELECT id, eidolon FROM characters 
         WHERE user_id = $1 AND character_name = $2`,
        [req.user.userId, characterName]
      );

      let result;
      if (existingChar.rows.length > 0) {
        // Duplicate - increase eidolon
        const char = existingChar.rows[0];
        const newEidolon = Math.min(char.eidolon + 1, 6);
        
        await pool.query(
          'UPDATE characters SET eidolon = $1 WHERE id = $2',
          [newEidolon, char.id]
        );

        result = {
          type: 'duplicate',
          character: characterName,
          rarity,
          eidolon: newEidolon,
          pityCount,
        };
      } else {
        // New character
        await pool.query(
          `INSERT INTO characters 
           (user_id, character_name, pathway_id, sequence, rarity, hp, atk, def, res, spd)
           VALUES ($1, $2, (SELECT id FROM pathways WHERE name = $3), $4, $5, $6, $7, $8, $9, $10)`,
          [
            req.user.userId,
            characterName,
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

        result = {
          type: 'new',
          character: characterName,
          rarity,
          pathway: charData.pathway,
          pityCount,
        };
      }

      // Record in gacha history
      await pool.query(
        `INSERT INTO gacha_history (user_id, banner_type, item_type, item_name, rarity, pity_count)
         VALUES ($1, $2, 'character', $3, $4, $5)`,
        [req.user.userId, banner_id, characterName, rarity, pityCount]
      );

      results.push(result);
    }

    // Update pity counter
    await pool.query(
      `INSERT INTO gacha_pity (user_id, banner_type, pity_count, is_guaranteed)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, banner_type) 
       DO UPDATE SET pity_count = $3, is_guaranteed = $4`,
      [req.user.userId, banner_id, pityCount, isGuaranteed]
    );

    // Deduct fate tokens
    await pool.query(
      'UPDATE users SET fate_tokens = fate_tokens - $1 WHERE id = $2',
      [cost, req.user.userId]
    );

    res.json({
      results,
      cost,
      remainingPity: pityCount,
      isGuaranteed,
    });
  } catch (error) {
    console.error('Gacha pull error:', error);
    res.status(500).json({ error: 'Failed to perform gacha pull' });
  }
});

// Get gacha history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM gacha_history 
       WHERE user_id = $1 
       ORDER BY pulled_at DESC 
       LIMIT 100`,
      [req.user.userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Gacha history error:', error);
    res.status(500).json({ error: 'Failed to get gacha history' });
  }
});

export default router;
