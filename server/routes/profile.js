import express from 'express';
import { pool } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get player profile
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userResult = await pool.query(
      `SELECT id, email, username, account_level, world_level, experience, 
              stamina, last_stamina_regen, fate_tokens, gold, created_at, last_login
       FROM users WHERE id = $1`,
      [req.user.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userResult.rows[0];

    // Get character count
    const charCount = await pool.query(
      'SELECT COUNT(*) as total, rarity, COUNT(CASE WHEN rarity = 5 THEN 1 END) as five_star FROM characters WHERE user_id = $1 GROUP BY rarity',
      [req.user.userId]
    );

    // Get story progress
    const storyProgress = await pool.query(
      'SELECT MAX(chapter) as max_chapter, COUNT(*) as stages_cleared FROM story_progress WHERE user_id = $1 AND completed = true',
      [req.user.userId]
    );

    res.json({
      user,
      stats: {
        charactersOwned: charCount.rows.reduce((sum, r) => sum + parseInt(r.total), 0),
        fiveStarCharacters: charCount.rows.find(r => r.rarity === 5)?.five_star || 0,
        storyProgress: storyProgress.rows[0],
      },
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

// Get player statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    // Get gacha statistics
    const gachaStats = await pool.query(
      `SELECT 
        COUNT(*) as total_pulls,
        COUNT(CASE WHEN rarity = 5 THEN 1 END) as five_star_pulls,
        COUNT(CASE WHEN rarity = 4 THEN 1 END) as four_star_pulls
       FROM gacha_history WHERE user_id = $1`,
      [req.user.userId]
    );

    // Get achievements
    const achievements = await pool.query(
      `SELECT COUNT(*) as total, COUNT(CASE WHEN completed = true THEN 1 END) as completed
       FROM achievements WHERE user_id = $1`,
      [req.user.userId]
    );

    res.json({
      gacha: gachaStats.rows[0],
      achievements: achievements.rows[0],
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

export default router;
