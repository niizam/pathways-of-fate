import express from 'express';
import { pool } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user inventory
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM inventory WHERE user_id = $1 ORDER BY item_type, item_name',
      [req.user.userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get inventory error:', error);
    res.status(500).json({ error: 'Failed to get inventory' });
  }
});

// Use item from inventory
router.post('/use', authenticateToken, async (req, res) => {
  try {
    const { item_id, target_id } = req.body;

    // Get item
    const itemResult = await pool.query(
      'SELECT * FROM inventory WHERE id = $1 AND user_id = $2',
      [item_id, req.user.userId]
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const item = itemResult.rows[0];

    if (item.quantity < 1) {
      return res.status(400).json({ error: 'Item out of stock' });
    }

    // Process item use (simplified)
    let result = {};

    switch (item.item_type) {
      case 'exp_material':
        // Add EXP to character
        if (!target_id) {
          return res.status(400).json({ error: 'Target character required' });
        }
        result = { message: `Used ${item.item_name} on character`, exp: 1000 };
        break;

      case 'consumable':
        result = { message: `Used ${item.item_name}` };
        break;

      default:
        return res.status(400).json({ error: 'Cannot use this item type' });
    }

    // Decrease quantity
    if (item.quantity === 1) {
      await pool.query('DELETE FROM inventory WHERE id = $1', [item_id]);
    } else {
      await pool.query(
        'UPDATE inventory SET quantity = quantity - 1 WHERE id = $1',
        [item_id]
      );
    }

    res.json(result);
  } catch (error) {
    console.error('Use item error:', error);
    res.status(500).json({ error: 'Failed to use item' });
  }
});

export default router;
