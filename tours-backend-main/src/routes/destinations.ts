import { Router } from 'express'
import Destination from '../models/Destination'

const router = Router()

// GET /api/destinations
router.get('/', async (req, res) => {
  try {
    const { region } = req.query as Record<string, string>
    const query = region ? { region } : {};
    const result = await Destination.find(query);
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch destinations' });
  }
})

// GET /api/destinations/:slug
router.get('/:slug', async (req, res) => {
  try {
    const dest = await Destination.findOne({ slug: req.params.slug });
    if (!dest) return res.status(404).json({ error: 'Destination not found' })
    res.json(dest)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch destination' });
  }
})

export default router
