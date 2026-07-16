import { Router } from 'express'
import Package from '../models/Package'

const router = Router()

// GET /api/packages — list all (supports ?region=Domestic|International&type=&q=)
router.get('/', async (req, res) => {
  try {
    const { region, type, q } = req.query as Record<string, string>;
    
    let query: any = {};
    if (region) query.region = region;
    if (type) query.type = type;
    if (q) {
      const lq = q.toLowerCase();
      // Using regex for simple text search. In production, a text index might be better.
      query.$or = [
        { name: { $regex: new RegExp(lq, 'i') } },
        { destination: { $regex: new RegExp(lq, 'i') } },
        { country: { $regex: new RegExp(lq, 'i') } }
      ];
    }
    
    const result = await Package.find(query);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch packages' });
  }
})

// GET /api/packages/featured
router.get('/featured', async (_req, res) => {
  try {
    const featured = await Package.find({ featured: true });
    res.json(featured);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch featured packages' });
  }
})

// GET /api/packages/:slug
router.get('/:slug', async (req, res) => {
  try {
    const pkg = await Package.findOne({ slug: req.params.slug });
    if (!pkg) return res.status(404).json({ error: 'Package not found' })
    res.json(pkg)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch package' });
  }
})

export default router
