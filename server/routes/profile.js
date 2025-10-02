import express from 'express';
import { db } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get player profile
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = db.findOne('users', { id: req.user.userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get character count
    const characters = db.findMany('characters', { user_id: req.user.userId });
    const charactersOwned = characters.length;
    const fiveStarCharacters = characters.filter(c => c.rarity === 5).length;

    // Get story progress
    const storyProgress = db.findMany('story_progress', { user_id: req.user.userId, completed: true });
    const maxChapter = storyProgress.length > 0 ? Math.max(...storyProgress.map(s => s.chapter)) : 0;

    res.json({
      user: {
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
      },
      stats: {
        charactersOwned,
        fiveStarCharacters,
        storyProgress: {
          max_chapter: maxChapter,
          stages_cleared: storyProgress.length,
        },
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
    const gachaHistory = db.findMany('gacha_history', { user_id: req.user.userId });
    const total_pulls = gachaHistory.length;
    const five_star_pulls = gachaHistory.filter(h => h.rarity === 5).length;
    const four_star_pulls = gachaHistory.filter(h => h.rarity === 4).length;

    // Get achievements
    const achievements = db.findMany('achievements', { user_id: req.user.userId });
    const total = achievements.length;
    const completed = achievements.filter(a => a.completed).length;

    res.json({
      gacha: { total_pulls, five_star_pulls, four_star_pulls },
      achievements: { total, completed },
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

export default router;
