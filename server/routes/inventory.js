import express from 'express';
import { db } from '../index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user inventory
router.get('/', authenticateToken, async (req, res) => {
  try {
    const inventory = db.findMany('inventory', { user_id: req.user.userId });
    
    // Sort by item_type, then item_name
    inventory.sort((a, b) => {
      if (a.item_type !== b.item_type) {
        return a.item_type.localeCompare(b.item_type);
      }
      return a.item_name.localeCompare(b.item_name);
    });

    res.json(inventory);
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
    const item = db.findOne('inventory', { id: item_id, user_id: req.user.userId });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

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
      db.delete('inventory', { id: item_id });
    } else {
      db.update('inventory', { id: item_id }, { quantity: item.quantity - 1 });
    }

    res.json(result);
  } catch (error) {
    console.error('Use item error:', error);
    res.status(500).json({ error: 'Failed to use item' });
  }
});

export default router;
