import express from 'express';
import { db } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Admin authentication middleware
const isAdmin = async (req, res, next) => {
  try {
    // Check if user is admin (simple check - in production use role-based access)
    const user = db.findOne('users', { id: req.user.userId });
    
    if (!user) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // For demo purposes, admins are users with emails ending in @admin.com
    // In production, use a proper role system
    if (!user.email.endsWith('@admin.com')) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Get overall analytics
router.get('/analytics', authenticateToken, isAdmin, async (req, res) => {
  try {
    // User statistics
    const allUsers = db.findMany('users', {});
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    
    const total_users = allUsers.length;
    const active_daily = allUsers.filter(u => new Date(u.last_login).getTime() > now - oneDay).length;
    const active_weekly = allUsers.filter(u => new Date(u.last_login).getTime() > now - oneWeek).length;
    const avg_level = db.avg('users', 'account_level');
    const total_fate_tokens = db.sum('users', 'fate_tokens');
    const total_gold = db.sum('users', 'gold');

    // Character statistics
    const allCharacters = db.findMany('characters', {});
    const uniqueUserIds = [...new Set(allCharacters.map(c => c.user_id))];
    const avgCharLevel = db.avg('characters', 'level');
    
    const charByRarity = {};
    allCharacters.forEach(c => {
      if (!charByRarity[c.rarity]) charByRarity[c.rarity] = 0;
      charByRarity[c.rarity]++;
    });

    // Gacha statistics
    const allGacha = db.findMany('gacha_history', {});
    const gachaByBanner = {};
    allGacha.forEach(g => {
      if (!gachaByBanner[g.banner_type]) {
        gachaByBanner[g.banner_type] = { total: 0, five_star: 0, four_star: 0, three_star: 0 };
      }
      gachaByBanner[g.banner_type].total++;
      if (g.rarity === 5) gachaByBanner[g.banner_type].five_star++;
      if (g.rarity === 4) gachaByBanner[g.banner_type].four_star++;
      if (g.rarity === 3) gachaByBanner[g.banner_type].three_star++;
    });

    // Battle statistics
    const storyProgress = db.findMany('story_progress', { completed: true });
    const battleStats = {};
    storyProgress.forEach(s => {
      const key = `${s.chapter}-${s.stage}`;
      if (!battleStats[key]) {
        battleStats[key] = { chapter: s.chapter, stage: s.stage, completions: 0, total_stars: 0 };
      }
      battleStats[key].completions++;
      battleStats[key].total_stars += s.stars;
    });
    
    const battleStatsArray = Object.values(battleStats).map(b => ({
      ...b,
      avg_stars: b.total_stars / b.completions,
    })).slice(0, 20);

    res.json({
      users: {
        total_users,
        active_daily,
        active_weekly,
        avg_level,
        total_fate_tokens,
        total_gold,
      },
      characters: {
        total: allCharacters.length,
        users_with_characters: uniqueUserIds.length,
        avgLevel: avgCharLevel,
        byRarity: Object.entries(charByRarity).map(([rarity, count]) => ({ rarity: parseInt(rarity), count })),
      },
      gacha: {
        total: allGacha.length,
        byBanner: Object.entries(gachaByBanner).map(([banner, stats]) => ({ banner_type: banner, ...stats })),
        totalFiveStar: allGacha.filter(g => g.rarity === 5).length,
      },
      battles: battleStatsArray,
      trends: {
        daily: [], // Simplified - could compute daily trends if needed
      },
      revenue: {
        total_users,
        avg_tokens_per_user: total_fate_tokens / total_users || 0,
        median_tokens: 0, // Simplified
        max_tokens: db.max('users', 'fate_tokens'),
      },
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Get all users (paginated)
router.get('/users', authenticateToken, isAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const allUsers = db.findMany('users', {});
    
    // Sort by created_at DESC
    allUsers.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    // Paginate
    const paginatedUsers = allUsers.slice(offset, offset + limit);
    
    const users = paginatedUsers.map(u => ({
      id: u.id,
      email: u.email,
      username: u.username,
      account_level: u.account_level,
      world_level: u.world_level,
      fate_tokens: u.fate_tokens,
      gold: u.gold,
      created_at: u.created_at,
      last_login: u.last_login,
    }));

    res.json({
      users,
      pagination: {
        page,
        limit,
        total: allUsers.length,
        pages: Math.ceil(allUsers.length / limit),
      },
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get specific user details
router.get('/users/:userId', authenticateToken, isAdmin, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    // User info
    const user = db.findOne('users', { id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Characters
    const characters = db.findMany('characters', { user_id: userId });
    const charactersWithPathways = characters.map(c => {
      const pathway = db.findOne('pathways', { id: c.pathway_id });
      return { ...c, pathway_name: pathway?.name };
    });

    // Gacha history
    const gachaHistory = db.findMany('gacha_history', { user_id: userId });
    gachaHistory.sort((a, b) => new Date(b.pulled_at) - new Date(a.pulled_at));
    const limitedGachaHistory = gachaHistory.slice(0, 50);

    // Story progress
    const storyProgress = db.findMany('story_progress', { user_id: userId });
    storyProgress.sort((a, b) => {
      if (a.chapter !== b.chapter) return a.chapter - b.chapter;
      return a.stage - b.stage;
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        account_level: user.account_level,
        world_level: user.world_level,
        experience: user.experience,
        stamina: user.stamina,
        fate_tokens: user.fate_tokens,
        gold: user.gold,
        created_at: user.created_at,
        last_login: user.last_login,
      },
      characters: charactersWithPathways,
      gachaHistory: limitedGachaHistory,
      storyProgress,
    });
  } catch (error) {
    console.error('Get user details error:', error);
    res.status(500).json({ error: 'Failed to fetch user details' });
  }
});

// Update user (admin powers)
router.put('/users/:userId', authenticateToken, isAdmin, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { fate_tokens, gold, account_level } = req.body;

    const updates = {};

    if (fate_tokens !== undefined) {
      updates.fate_tokens = fate_tokens;
    }
    if (gold !== undefined) {
      updates.gold = gold;
    }
    if (account_level !== undefined) {
      updates.account_level = account_level;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No updates provided' });
    }

    db.update('users', { id: userId }, updates);

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Get system stats
router.get('/system', authenticateToken, isAdmin, async (req, res) => {
  try {
    // Database stats
    const dbStats = {
      users: db.count('users'),
      characters: db.count('characters'),
      weapons: db.count('weapons'),
      gacha_pulls: db.count('gacha_history'),
      story_progress: db.count('story_progress'),
    };

    // Top players by level
    const allUsers = db.findMany('users', {});
    allUsers.sort((a, b) => {
      if (b.account_level !== a.account_level) return b.account_level - a.account_level;
      return b.experience - a.experience;
    });
    const topPlayers = allUsers.slice(0, 10).map(u => ({
      username: u.username,
      account_level: u.account_level,
      world_level: u.world_level,
      fate_tokens: u.fate_tokens,
      gold: u.gold,
    }));

    // Most popular characters
    const allCharacters = db.findMany('characters', {});
    const charCounts = {};
    allCharacters.forEach(c => {
      charCounts[c.character_name] = (charCounts[c.character_name] || 0) + 1;
    });
    const popularCharacters = Object.entries(charCounts)
      .map(([character_name, count]) => ({ character_name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Recent activity
    const allGacha = db.findMany('gacha_history', {}).filter(g => g.rarity >= 4);
    allGacha.sort((a, b) => new Date(b.pulled_at) - new Date(a.pulled_at));
    const recentActivity = allGacha.slice(0, 20).map(g => {
      const user = db.findOne('users', { id: g.user_id });
      return {
        username: user?.username,
        item_name: g.item_name,
        rarity: g.rarity,
        pulled_at: g.pulled_at,
      };
    });

    res.json({
      database: dbStats,
      topPlayers,
      popularCharacters,
      recentActivity,
    });
  } catch (error) {
    console.error('System stats error:', error);
    res.status(500).json({ error: 'Failed to fetch system stats' });
  }
});

// Ban/unban user
router.post('/users/:userId/ban', authenticateToken, isAdmin, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { reason } = req.body;

    // In a real system, you'd add a 'banned' column
    // For now, we'll just set their tokens to 0 as a demo
    db.update('users', { id: userId }, { fate_tokens: 0, gold: 0 });

    res.json({ message: 'User banned successfully', reason });
  } catch (error) {
    console.error('Ban user error:', error);
    res.status(500).json({ error: 'Failed to ban user' });
  }
});

export default router;
