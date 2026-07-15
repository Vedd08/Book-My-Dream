import { Router, Request, Response } from 'express'
import { requireAuth } from '../middleware/auth'
import { getDestinations, saveDestinations, Destination } from '../data'

const router = Router()
router.use(requireAuth)

// GET /api/admin/destinations
router.get('/', (_req: Request, res: Response) => {
  res.json(getDestinations())
})

// POST /api/admin/destinations
router.post('/', (req: Request, res: Response) => {
  const body = req.body as Partial<Destination>
  if (!body.name || !body.slug) {
    return res.status(400).json({ error: 'Name and slug are required' })
  }
  
  const dests = getDestinations()
  if (dests.find(d => d.slug === body.slug)) {
    return res.status(409).json({ error: 'Slug already exists' })
  }

  const newDest: Destination = {
    slug: body.slug,
    name: body.name,
    country: body.country ?? 'India',
    state: body.state ?? '',
    region: body.region ?? 'Domestic',
    description: body.description ?? '',
    image: body.image ?? '/images/placeholder.jpg',
    bestTime: body.bestTime ?? 'Anytime',
    attractions: body.attractions ?? [],
    tips: body.tips ?? []
  }

  dests.unshift(newDest)
  saveDestinations(dests)
  res.status(201).json(newDest)
})

// PUT /api/admin/destinations/:slug
router.put('/:slug', (req: Request, res: Response) => {
  const dests = getDestinations()
  const idx = dests.findIndex(d => d.slug === req.params.slug)
  if (idx === -1) return res.status(404).json({ error: 'Destination not found' })

  dests[idx] = { ...dests[idx], ...req.body, slug: req.params.slug }
  saveDestinations(dests)
  res.json(dests[idx])
})

// DELETE /api/admin/destinations/:slug
router.delete('/:slug', (req: Request, res: Response) => {
  const dests = getDestinations()
  const idx = dests.findIndex(d => d.slug === req.params.slug)
  if (idx === -1) return res.status(404).json({ error: 'Destination not found' })

  const [removed] = dests.splice(idx, 1)
  saveDestinations(dests)
  res.json({ success: true, removed })
})

export default router
