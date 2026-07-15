import { Router, Request, Response } from 'express'
import { requireAuth } from '../middleware/auth'
import { getGallery, saveGallery, GalleryImage } from '../data'

const router = Router()

// Public route to get gallery
export const publicGalleryHandler = (_req: Request, res: Response) => {
  const gallery = getGallery()
  res.json(gallery)
}

// ── Admin routes ────────────────────────────────────────────
router.use(requireAuth)

// GET /api/admin/gallery
router.get('/', (_req, res) => {
  const gallery = getGallery()
  res.json([...gallery].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
})

// POST /api/admin/gallery
router.post('/', (req: Request, res: Response) => {
  const { src, title, category } = req.body
  if (!src) {
    return res.status(400).json({ error: 'src is required' })
  }
  
  const gallery = getGallery()
  const image: GalleryImage = {
    id: Date.now().toString(),
    src,
    title: title || '',
    category: category || 'Uncategorized',
    createdAt: new Date().toISOString(),
  }
  
  gallery.push(image)
  saveGallery(gallery)
  res.status(201).json(image)
})

// DELETE /api/admin/gallery/:id
router.delete('/:id', (req: Request, res: Response) => {
  const gallery = getGallery()
  const idx = gallery.findIndex(i => i.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
    
  const [removed] = gallery.splice(idx, 1)
  saveGallery(gallery)
  res.json({ success: true, removed })
})

export default router
