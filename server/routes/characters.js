import express from 'express';
import { db } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';
import { GAME_CONFIG } from '../config/game-config.js';

const router = express.Router();

// Get all user characters
router.get('/', authenticateToken, async (req, res) => {
  try {
    const characters = db.findMany('characters', { user_id: req.user.userId });
    
    // Join with pathways data
    const charactersWithPathways = characters.map(char => {
      const pathway = db.findOne('pathways', { id: char.pathway_id });
      return {
        ...char,
        pathway_name: pathway?.name,
        theme: pathway?.theme,
        combat_role: pathway?.combat_role,
      };
    });

    // Sort by rarity DESC, then level DESC
    charactersWithPathways.sort((a, b) => {
      if (b.rarity !== a.rarity) return b.rarity - a.rarity;
      return b.level - a.level;
    });

    res.json(charactersWithPathways);
  } catch (error) {
    console.error('Get characters error:', error);
    res.status(500).json({ error: 'Failed to get characters' });
  }
});

// Get specific character
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const character = db.findOne('characters', { id: parseInt(req.params.id), user_id: req.user.userId });

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    const pathway = db.findOne('pathways', { id: character.pathway_id });

    res.json({
      ...character,
      pathway_name: pathway?.name,
      theme: pathway?.theme,
      combat_role: pathway?.combat_role,
      description: pathway?.description,
    });
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
    const character = db.findOne('characters', { id: parseInt(req.params.id), user_id: req.user.userId });

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

    const maxLevel = GAME_CONFIG.character.ascensionCaps[character.ascension];

    if (targetLevel > maxLevel) {
      return res.status(400).json({ error: `Cannot level past ${maxLevel}. Ascend character first.` });
    }

    if (targetLevel <= character.level) {
      return res.status(400).json({ error: 'Target level must be higher than current level' });
    }

    // Calculate cost (simplified - should check materials)
    const goldCost = (targetLevel - character.level) * 1000;

    const user = db.findOne('users', { id: req.user.userId });
    if (user.gold < goldCost) {
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

    db.update('characters', { id: character.id }, {
      level: targetLevel,
      hp: newStats.hp,
      atk: newStats.atk,
      def: newStats.def,
      res: newStats.res,
    });

    // Deduct gold
    db.update('users', { id: req.user.userId }, { gold: user.gold - goldCost });

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
    const character = db.findOne('characters', { id: parseInt(req.params.id), user_id: req.user.userId });

    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }

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
    const user = db.findOne('users', { id: req.user.userId });
    
    if (user.gold < goldCost) {
      return res.status(400).json({ error: 'Insufficient gold' });
    }

    // Perform ascension
    const newAscension = character.ascension + 1;
    db.update('characters', { id: character.id }, { ascension: newAscension });
    db.update('users', { id: req.user.userId }, { gold: user.gold - goldCost });

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
