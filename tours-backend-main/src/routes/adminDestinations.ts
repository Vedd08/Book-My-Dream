import { Router, Request, Response } from 'express'
import { requireAuth } from '../middleware/auth'
import Destination, { IDestination } from '../models/Destination'

const router = Router()
router.use(requireAuth)

// GET /api/admin/destinations
router.get('/', async (_req: Request, res: Response) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    console.error('[adminDestinations] GET / failed:', err);
    res.status(500).json({ error: 'Failed to fetch destinations' });
  }
})

// POST /api/admin/destinations
router.post('/', async (req: Request, res: Response) => {
  const body = req.body as Partial<IDestination>
  if (!body.name || !body.slug) {
    return res.status(400).json({ error: 'Name and slug are required' })
  }
  
  try {
    const existing = await Destination.findOne({ slug: body.slug });
    if (existing) {
      return res.status(409).json({ error: 'Slug already exists' })
    }

    const newDest = new Destination({
      slug: body.slug,
      name: body.name,
      country: body.country ?? 'India',
      state: body.state ?? '',
      region: body.region ?? 'Domestic',
      description: body.description ?? '',
      image: body.image || '/images/placeholder.jpg',
      bestTime: body.bestTime ?? 'Anytime',
      attractions: body.attractions ?? [],
      tips: body.tips ?? []
    });

    await newDest.save();
    res.status(201).json(newDest)
  } catch (err) {
    console.error('[adminDestinations] POST / failed:', err);
    res.status(500).json({ error: 'Failed to create destination' });
  }
})

// PUT /api/admin/destinations/:slug
router.put('/:slug', async (req: Request, res: Response) => {
  try {
    const dest = await Destination.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: req.body },
      { new: true }
    );
    if (!dest) return res.status(404).json({ error: 'Destination not found' })
    res.json(dest)
  } catch (err) {
    console.error('[adminDestinations] PUT /:slug failed:', err);
    res.status(500).json({ error: 'Failed to update destination' });
  }
})

// DELETE /api/admin/destinations/:slug
router.delete('/:slug', async (req: Request, res: Response) => {
  try {
    const removed = await Destination.findOneAndDelete({ slug: req.params.slug });
    if (!removed) return res.status(404).json({ error: 'Destination not found' })
    res.json({ success: true, removed })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete destination' });
  }
})

export default router
