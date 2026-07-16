import { Router, Request, Response } from 'express'
import { requireAuth } from '../middleware/auth'

import Package, { IPackage } from '../models/Package'

const router = Router()
router.use(requireAuth)   // all admin package routes require auth

// GET /api/admin/packages
router.get('/', async (_req: Request, res: Response) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch packages' });
  }
})

// GET /api/admin/packages/:slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const pkg = await Package.findOne({ slug: req.params.slug });
    if (!pkg) return res.status(404).json({ error: 'Not found' })
    res.json(pkg)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch package' });
  }
})

// POST /api/admin/packages  — create
router.post('/', async (req: Request, res: Response) => {
  const body = req.body as Partial<IPackage>
  if (!body.name || !body.slug || !body.destination) {
    return res.status(400).json({ error: 'name, slug and destination are required' })
  }
  
  try {
    const existing = await Package.findOne({ slug: body.slug });
    if (existing) {
      return res.status(409).json({ error: 'Slug already exists' })
    }
    
    const pkg = new Package({
      slug: body.slug,
      name: body.name,
      type: body.type ?? 'Group',
      region: body.region ?? 'Domestic',
      destination: body.destination,
      country: body.country ?? 'India',
      duration: body.duration ?? '3 Days / 2 Nights',
      price: body.price ?? 0,
      discountPrice: body.discountPrice ?? 0,
      rating: body.rating ?? 4.5,
      reviews: body.reviews ?? 0,
      image: body.image ?? '/images/placeholder.jpg',
      highlights: body.highlights ?? [],
      inclusions: body.inclusions ?? [],
      exclusions: body.exclusions ?? [],
      itinerary: body.itinerary ?? [],
      faqs: body.faqs ?? [],
      featured: body.featured ?? false,
    });
    
    await pkg.save();
    res.status(201).json(pkg)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create package' });
  }
})

// PUT /api/admin/packages/:slug  — update
router.put('/:slug', async (req: Request, res: Response) => {
  try {
    const pkg = await Package.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: req.body },
      { new: true }
    );
    if (!pkg) return res.status(404).json({ error: 'Not found' })
    res.json(pkg)
  } catch (err) {
    res.status(500).json({ error: 'Failed to update package' });
  }
})

// DELETE /api/admin/packages/:slug
router.delete('/:slug', async (req: Request, res: Response) => {
  try {
    const removed = await Package.findOneAndDelete({ slug: req.params.slug });
    if (!removed) return res.status(404).json({ error: 'Not found' })
    res.json({ success: true, removed })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete package' });
  }
})

export default router
