import { Router } from 'express'
import { getDestinations } from '../data'

const router = Router()

// GET /api/destinations
router.get('/', (req, res) => {
  const { region } = req.query as Record<string, string>
  let result = [...getDestinations()]
  if (region) result = result.filter(d => d.region === region)
  res.json(result)
})

// GET /api/destinations/:slug
router.get('/:slug', (req, res) => {
  const dest = getDestinations().find(d => d.slug === req.params.slug)
  if (!dest) return res.status(404).json({ error: 'Destination not found' })
  res.json(dest)
})

export default router
