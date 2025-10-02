import express from 'express';
import { db, cache } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';
import { GAME_CONFIG } from '../config/game-config.js';

const router = express.Router();

// Start battle
router.post('/start', authenticateToken, async (req, res) => {
  try {
    const { stage_id, team } = req.body;

    if (!Array.isArray(team) || team.length !== 4) {
      return res.status(400).json({ error: 'Team must have exactly 4 characters' });
    }

    // Get characters
    const allCharacters = db.findMany('characters', { user_id: req.user.userId });
    const characters = allCharacters.filter(c => team.includes(c.id));

    if (characters.length !== 4) {
      return res.status(400).json({ error: 'Invalid team composition' });
    }

    // Add pathway names
    const charactersWithPathways = characters.map(c => {
      const pathway = db.findOne('pathways', { id: c.pathway_id });
      return { ...c, pathway_name: pathway?.name };
    });

    // Initialize battle state
    const battleState = {
      battleId: `battle_${Date.now()}_${req.user.userId}`,
      userId: req.user.userId,
      stageId: stage_id,
      team: charactersWithPathways.map(c => ({
        ...c,
        currentHp: c.hp,
        energy: GAME_CONFIG.battle.startingEnergy,
        buffs: [],
        debuffs: [],
      })),
      enemies: generateEnemies(stage_id),
      turn: 1,
      phase: 'player_turn',
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    // Store in cache for quick access (expires in 1 hour)
    cache.set(`battle:${battleState.battleId}`, battleState, 3600);

    res.json({
      battleId: battleState.battleId,
      team: battleState.team,
      enemies: battleState.enemies,
      turn: battleState.turn,
    });
  } catch (error) {
    console.error('Battle start error:', error);
    res.status(500).json({ error: 'Failed to start battle' });
  }
});

// Perform battle action
router.post('/action', authenticateToken, async (req, res) => {
  try {
    const { battle_id, action } = req.body;

    // Get battle state from cache
    const battleState = cache.get(`battle:${battle_id}`);
    if (!battleState) {
      return res.status(404).json({ error: 'Battle not found or expired' });
    }

    if (battleState.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Not your battle' });
    }

    if (battleState.status !== 'active') {
      return res.status(400).json({ error: 'Battle is not active' });
    }

    // Process action (simplified)
    const { characterId, actionType, targetId } = action;

    const character = battleState.team.find(c => c.id === characterId);
    if (!character) {
      return res.status(400).json({ error: 'Character not in team' });
    }

    let actionResult = {};

    switch (actionType) {
      case 'basic_attack':
        character.energy = Math.min(character.energy + 1, GAME_CONFIG.battle.maxEnergy);
        actionResult = processAttack(character, targetId, battleState.enemies, 0.8);
        break;
      
      case 'skill':
        if (character.energy < 2) {
          return res.status(400).json({ error: 'Insufficient energy' });
        }
        character.energy -= 2;
        actionResult = processAttack(character, targetId, battleState.enemies, 1.5);
        break;
      
      case 'ultimate':
        if (character.energy < 4) {
          return res.status(400).json({ error: 'Insufficient energy' });
        }
        character.energy -= 4;
        actionResult = processAttack(character, targetId, battleState.enemies, 2.5);
        break;
      
      case 'defend':
        character.energy = Math.min(character.energy + 1, GAME_CONFIG.battle.maxEnergy);
        actionResult = { message: `${character.character_name} defends`, defenseBuff: true };
        break;
      
      default:
        return res.status(400).json({ error: 'Invalid action type' });
    }

    // Check if enemies defeated
    battleState.enemies = battleState.enemies.filter(e => e.currentHp > 0);

    if (battleState.enemies.length === 0) {
      battleState.status = 'victory';
      await completeBattle(battleState, true);
    }

    // Check if party wiped
    const aliveAllies = battleState.team.filter(c => c.currentHp > 0).length;
    if (aliveAllies === 0) {
      battleState.status = 'defeat';
      await completeBattle(battleState, false);
    }

    // Simple enemy AI turn
    if (battleState.status === 'active' && battleState.enemies.length > 0) {
      for (const enemy of battleState.enemies) {
        const target = battleState.team[Math.floor(Math.random() * battleState.team.length)];
        const damage = Math.floor(enemy.atk * 0.8);
        target.currentHp = Math.max(0, target.currentHp - damage);
      }
    }

    battleState.turn++;

    // Update battle state
    cache.set(`battle:${battle_id}`, battleState, 3600);

    res.json({
      actionResult,
      battleState: {
        team: battleState.team,
        enemies: battleState.enemies,
        turn: battleState.turn,
        status: battleState.status,
      },
    });
  } catch (error) {
    console.error('Battle action error:', error);
    res.status(500).json({ error: 'Failed to process battle action' });
  }
});

// Get battle result
router.get('/result/:battle_id', authenticateToken, async (req, res) => {
  try {
    const battleState = cache.get(`battle:${req.params.battle_id}`);
    if (!battleState) {
      return res.status(404).json({ error: 'Battle not found' });
    }

    if (battleState.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Not your battle' });
    }

    res.json({
      status: battleState.status,
      turns: battleState.turn,
      rewards: battleState.rewards || {},
    });
  } catch (error) {
    console.error('Battle result error:', error);
    res.status(500).json({ error: 'Failed to get battle result' });
  }
});

// Helper functions
function generateEnemies(stageId) {
  const { ENEMY_TYPES, STAGE_CONFIG } = require('../config/game-config.js');
  
  const stageConfig = STAGE_CONFIG[stageId] || {
    chapter: Math.floor(stageId / 5) + 1,
    enemies: ['Shadow Wraith', 'Corrupted Soldier'],
    boss: null,
    theme: 'Unknown'
  };
  
  const enemies = [];
  const levelMultiplier = Math.floor(stageId / 5) + 1;
  const baseLevel = stageId * 2;
  
  // Add regular enemies
  const enemyTypes = stageConfig.enemies;
  const numRegularEnemies = Math.min(2 + Math.floor(stageId / 10), 3);
  
  for (let i = 0; i < numRegularEnemies; i++) {
    const enemyType = enemyTypes[i % enemyTypes.length];
    const enemyData = ENEMY_TYPES[enemyType] || ENEMY_TYPES['Shadow Wraith'];
    
    const hp = Math.floor(enemyData.baseHp * levelMultiplier * enemyData.difficulty);
    
    enemies.push({
      id: `enemy_${i}`,
      name: enemyType,
      type: enemyData.type,
      element: enemyData.element,
      level: baseLevel,
      hp: hp,
      currentHp: hp,
      atk: Math.floor(enemyData.baseAtk * levelMultiplier * enemyData.difficulty),
      def: Math.floor(enemyData.baseDef * levelMultiplier * enemyData.difficulty),
    });
  }
  
  // Add boss if this is a boss stage
  if (stageConfig.boss) {
    const bossData = ENEMY_TYPES[stageConfig.boss];
    if (bossData) {
      const bossHp = Math.floor(bossData.baseHp * levelMultiplier * bossData.difficulty);
      
      enemies.push({
        id: 'boss',
        name: stageConfig.boss,
        type: bossData.type,
        element: bossData.element,
        level: baseLevel + 5,
        hp: bossHp,
        currentHp: bossHp,
        atk: Math.floor(bossData.baseAtk * levelMultiplier * bossData.difficulty),
        def: Math.floor(bossData.baseDef * levelMultiplier * bossData.difficulty),
        isBoss: true,
      });
    }
  }

  return enemies;
}

function processAttack(attacker, targetId, enemies, multiplier) {
  const target = enemies.find(e => e.id === targetId);
  if (!target) {
    return { error: 'Target not found' };
  }

  const baseDamage = attacker.atk * multiplier;
  const damageReduction = target.def / (target.def + 200 + 10 * attacker.level);
  const finalDamage = Math.floor(baseDamage * (1 - damageReduction));

  target.currentHp = Math.max(0, target.currentHp - finalDamage);

  return {
    attacker: attacker.character_name,
    target: target.name,
    damage: finalDamage,
    targetRemaining: target.currentHp,
    defeated: target.currentHp === 0,
  };
}

async function completeBattle(battleState, victory) {
  if (victory) {
    // Award rewards
    const goldReward = 100 + (battleState.stageId * 50);
    const expReward = 50 + (battleState.stageId * 25);

    const user = db.findOne('users', { id: battleState.userId });
    db.update('users', { id: battleState.userId }, {
      gold: user.gold + goldReward,
      experience: user.experience + expReward,
    });

    // Update story progress
    const chapter = Math.floor(battleState.stageId / 10);
    const stage = battleState.stageId % 10;
    const existingProgress = db.findOne('story_progress', {
      user_id: battleState.userId,
      chapter,
      stage,
      difficulty: 'normal',
    });

    if (existingProgress) {
      db.update('story_progress', { id: existingProgress.id }, {
        stars: Math.max(existingProgress.stars, 3),
        completed: true,
      });
    } else {
      db.insert('story_progress', {
        user_id: battleState.userId,
        chapter,
        stage,
        difficulty: 'normal',
        stars: 3,
        completed: true,
        first_clear_bonus_claimed: false,
      });
    }

    battleState.rewards = { gold: goldReward, exp: expReward };
  }
}

export default router;
