import express from 'express';
import { pool } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Admin authentication middleware
const isAdmin = async (req, res, next) => {
  try {
    // Check if user is admin (simple check - in production use role-based access)
    const result = await pool.query(
      'SELECT email FROM users WHERE id = $1',
      [req.user.userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // For demo purposes, admins are users with emails ending in @admin.com
    // In production, use a proper role system
    const user = result.rows[0];
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
    const userStats = await pool.query(`
      SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN last_login > NOW() - INTERVAL '24 hours' THEN 1 END) as active_daily,
        COUNT(CASE WHEN last_login > NOW() - INTERVAL '7 days' THEN 1 END) as active_weekly,
        AVG(account_level) as avg_level,
        SUM(fate_tokens) as total_fate_tokens,
        SUM(gold) as total_gold
      FROM users
    `);

    // Character statistics
    const charStats = await pool.query(`
      SELECT 
        COUNT(*) as total_characters,
        COUNT(DISTINCT user_id) as users_with_characters,
        AVG(level) as avg_character_level,
        rarity,
        COUNT(*) as count_by_rarity
      FROM characters
      GROUP BY rarity
    `);

    // Gacha statistics
    const gachaStats = await pool.query(`
      SELECT 
        COUNT(*) as total_pulls,
        COUNT(CASE WHEN rarity = 5 THEN 1 END) as five_star_pulls,
        COUNT(CASE WHEN rarity = 4 THEN 1 END) as four_star_pulls,
        COUNT(CASE WHEN rarity = 3 THEN 1 END) as three_star_pulls,
        banner_type,
        COUNT(*) as pulls_by_banner
      FROM gacha_history
      GROUP BY banner_type
    `);

    // Battle statistics
    const battleStats = await pool.query(`
      SELECT 
        chapter,
        stage,
        COUNT(*) as completions,
        AVG(stars) as avg_stars
      FROM story_progress
      WHERE completed = true
      GROUP BY chapter, stage
      ORDER BY chapter, stage
      LIMIT 20
    `);

    // Daily active users trend (last 7 days)
    const dailyTrend = await pool.query(`
      SELECT 
        DATE(last_login) as date,
        COUNT(DISTINCT id) as active_users
      FROM users
      WHERE last_login > NOW() - INTERVAL '7 days'
      GROUP BY DATE(last_login)
      ORDER BY date DESC
    `);

    // Revenue analytics (simplified - based on fate token purchases)
    const revenueStats = await pool.query(`
      SELECT 
        COUNT(*) as total_users,
        AVG(fate_tokens) as avg_tokens_per_user,
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY fate_tokens) as median_tokens,
        MAX(fate_tokens) as max_tokens
      FROM users
    `);

    res.json({
      users: userStats.rows[0],
      characters: {
        total: charStats.rows.reduce((sum, r) => sum + parseInt(r.count_by_rarity), 0),
        byRarity: charStats.rows,
        avgLevel: charStats.rows[0]?.avg_character_level || 0,
      },
      gacha: {
        total: gachaStats.rows.reduce((sum, r) => sum + parseInt(r.pulls_by_banner), 0),
        byBanner: gachaStats.rows,
        totalFiveStar: gachaStats.rows.reduce((sum, r) => sum + parseInt(r.five_star_pulls || 0), 0),
      },
      battles: battleStats.rows,
      trends: {
        daily: dailyTrend.rows,
      },
      revenue: revenueStats.rows[0],
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

    const result = await pool.query(
      `SELECT id, email, username, account_level, world_level, 
              fate_tokens, gold, created_at, last_login
       FROM users
       ORDER BY created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const countResult = await pool.query('SELECT COUNT(*) FROM users');

    res.json({
      users: result.rows,
      pagination: {
        page,
        limit,
        total: parseInt(countResult.rows[0].count),
        pages: Math.ceil(countResult.rows[0].count / limit),
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
    const { userId } = req.params;

    // User info
    const userResult = await pool.query(
      `SELECT id, email, username, account_level, world_level, experience,
              stamina, fate_tokens, gold, created_at, last_login
       FROM users WHERE id = $1`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Characters
    const charactersResult = await pool.query(
      `SELECT c.*, p.name as pathway_name
       FROM characters c
       JOIN pathways p ON c.pathway_id = p.id
       WHERE c.user_id = $1`,
      [userId]
    );

    // Gacha history
    const gachaResult = await pool.query(
      `SELECT * FROM gacha_history
       WHERE user_id = $1
       ORDER BY pulled_at DESC
       LIMIT 50`,
      [userId]
    );

    // Story progress
    const progressResult = await pool.query(
      `SELECT * FROM story_progress
       WHERE user_id = $1
       ORDER BY chapter, stage`,
      [userId]
    );

    res.json({
      user: userResult.rows[0],
      characters: charactersResult.rows,
      gachaHistory: gachaResult.rows,
      storyProgress: progressResult.rows,
    });
  } catch (error) {
    console.error('Get user details error:', error);
    res.status(500).json({ error: 'Failed to fetch user details' });
  }
});

// Update user (admin powers)
router.put('/users/:userId', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { fate_tokens, gold, account_level } = req.body;

    const updates = [];
    const values = [];
    let paramCount = 1;

    if (fate_tokens !== undefined) {
      updates.push(`fate_tokens = $${paramCount++}`);
      values.push(fate_tokens);
    }
    if (gold !== undefined) {
      updates.push(`gold = $${paramCount++}`);
      values.push(gold);
    }
    if (account_level !== undefined) {
      updates.push(`account_level = $${paramCount++}`);
      values.push(account_level);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No updates provided' });
    }

    values.push(userId);

    await pool.query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramCount}`,
      values
    );

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
    const dbStats = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM users) as users,
        (SELECT COUNT(*) FROM characters) as characters,
        (SELECT COUNT(*) FROM weapons) as weapons,
        (SELECT COUNT(*) FROM gacha_history) as gacha_pulls,
        (SELECT COUNT(*) FROM story_progress) as story_progress
    `);

    // Top players by level
    const topPlayers = await pool.query(`
      SELECT username, account_level, world_level, fate_tokens, gold
      FROM users
      ORDER BY account_level DESC, experience DESC
      LIMIT 10
    `);

    // Most popular characters
    const popularChars = await pool.query(`
      SELECT character_name, COUNT(*) as count
      FROM characters
      GROUP BY character_name
      ORDER BY count DESC
      LIMIT 10
    `);

    // Recent activity
    const recentActivity = await pool.query(`
      SELECT u.username, gh.item_name, gh.rarity, gh.pulled_at
      FROM gacha_history gh
      JOIN users u ON gh.user_id = u.id
      WHERE gh.rarity >= 4
      ORDER BY gh.pulled_at DESC
      LIMIT 20
    `);

    res.json({
      database: dbStats.rows[0],
      topPlayers: topPlayers.rows,
      popularCharacters: popularChars.rows,
      recentActivity: recentActivity.rows,
    });
  } catch (error) {
    console.error('System stats error:', error);
    res.status(500).json({ error: 'Failed to fetch system stats' });
  }
});

// Ban/unban user
router.post('/users/:userId/ban', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;

    // In a real system, you'd add a 'banned' column
    // For now, we'll just set their tokens to 0 as a demo
    await pool.query(
      'UPDATE users SET fate_tokens = 0, gold = 0 WHERE id = $1',
      [userId]
    );

    res.json({ message: 'User banned successfully', reason });
  } catch (error) {
    console.error('Ban user error:', error);
    res.status(500).json({ error: 'Failed to ban user' });
  }
});

export default router;
