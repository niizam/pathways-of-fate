import express from 'express';
import { db } from '../index.js';
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
    const user = db.findOne('users', { id: req.user.userId });

    if (user.fate_tokens < cost) {
      return res.status(400).json({ error: 'Insufficient Fate Tokens' });
    }

    // Get pity info
    const pityInfo = db.findOne('gacha_pity', { user_id: req.user.userId, banner_type: banner_id });

    let pityCount = pityInfo?.pity_count || 0;
    let isGuaranteed = pityInfo?.is_guaranteed || false;

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
      const existingChar = db.findOne('characters', { user_id: req.user.userId, character_name: characterName });

      let result;
      if (existingChar) {
        // Duplicate - increase eidolon
        const newEidolon = Math.min(existingChar.eidolon + 1, 6);
        
        db.update('characters', { id: existingChar.id }, { eidolon: newEidolon });

        result = {
          type: 'duplicate',
          character: characterName,
          rarity,
          eidolon: newEidolon,
          pityCount,
        };
      } else {
        // New character
        const pathway = db.findOne('pathways', { name: charData.pathway });
        
        db.insert('characters', {
          user_id: req.user.userId,
          character_name: characterName,
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

        result = {
          type: 'new',
          character: characterName,
          rarity,
          pathway: charData.pathway,
          pityCount,
        };
      }

      // Record in gacha history
      db.insert('gacha_history', {
        user_id: req.user.userId,
        banner_type: banner_id,
        item_type: 'character',
        item_name: characterName,
        rarity,
        pity_count: pityCount,
        pulled_at: new Date().toISOString(),
      });

      results.push(result);
    }

    // Update pity counter
    if (pityInfo) {
      db.update('gacha_pity', { id: pityInfo.id }, { pity_count: pityCount, is_guaranteed: isGuaranteed });
    } else {
      db.insert('gacha_pity', {
        user_id: req.user.userId,
        banner_type: banner_id,
        pity_count: pityCount,
        is_guaranteed: isGuaranteed,
      });
    }

    // Deduct fate tokens
    db.update('users', { id: req.user.userId }, { fate_tokens: user.fate_tokens - cost });

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
    const history = db.findMany('gacha_history', { user_id: req.user.userId }, { limit: 100 });
    
    // Sort by pulled_at DESC
    history.sort((a, b) => new Date(b.pulled_at) - new Date(a.pulled_at));

    res.json(history);
  } catch (error) {
    console.error('Gacha history error:', error);
    res.status(500).json({ error: 'Failed to get gacha history' });
  }
});

export default router;
