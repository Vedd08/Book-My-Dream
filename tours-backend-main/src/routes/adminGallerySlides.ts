import express from 'express'
import { requireAuth } from '../middleware/auth'
import GallerySlide from '../models/GallerySlide'

const router = express.Router()

// PUBLIC: Get all gallery slides
export const publicGallerySlidesHandler = async (req: express.Request, res: express.Response) => {
  try {
    const slides = await GallerySlide.find();
    res.json(slides)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch gallery slides' });
  }
}

// Admin: Get all gallery slides
router.get('/', requireAuth, async (req, res) => {
  try {
    const slides = await GallerySlide.find();
    res.json(slides)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch gallery slides' });
  }
})

// Admin: Add new slide
router.post('/', requireAuth, async (req, res) => {
  const { title, subtitle, description, image, cardSubtitle, cardTitle } = req.body
  if (!title || !image) {
    return res.status(400).json({ error: 'Title and image are required' })
  }

  try {
    const newSlide = new GallerySlide({
      title, subtitle: subtitle || '', description: description || '',
      image, cardSubtitle: cardSubtitle || '', cardTitle: cardTitle || ''
    });
    
    await newSlide.save();
    res.status(201).json(newSlide)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create gallery slide' });
  }
})

// Admin: Delete slide
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const removed = await GallerySlide.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Slide not found' })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete gallery slide' });
  }
})

export default router
