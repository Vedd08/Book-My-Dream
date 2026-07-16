import { Router, Request, Response } from 'express'
import { requireAuth } from '../middleware/auth'
import GalleryImage from '../models/GalleryImage'

const router = Router()

// Public route to get gallery
export const publicGalleryHandler = async (_req: Request, res: Response) => {
  try {
    const gallery = await GalleryImage.find().sort({ createdAt: -1 });
    res.json(gallery)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
}

// ── Admin routes ────────────────────────────────────────────
router.use(requireAuth)

// GET /api/admin/gallery
router.get('/', async (_req, res) => {
  try {
    const gallery = await GalleryImage.find().sort({ createdAt: -1 });
    res.json(gallery)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
})

// POST /api/admin/gallery
router.post('/', async (req: Request, res: Response) => {
  const { src, title, category } = req.body
  if (!src) {
    return res.status(400).json({ error: 'src is required' })
  }
  
  try {
    const image = new GalleryImage({
      src,
      title: title || '',
      category: category || 'Uncategorized',
    });
    
    await image.save();
    res.status(201).json(image)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create gallery image' });
  }
})

// DELETE /api/admin/gallery/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const removed = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Not found' })
    res.json({ success: true, removed })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete gallery image' });
  }
})

export default router
