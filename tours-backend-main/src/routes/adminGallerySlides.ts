import express from 'express'
import { requireAuth } from '../middleware/auth'
import { getGallerySlides, saveGallerySlides, GallerySlide } from '../data'

const router = express.Router()

// PUBLIC: Get all gallery slides
export const publicGallerySlidesHandler = (req: express.Request, res: express.Response) => {
  const slides = getGallerySlides()
  res.json(slides)
}

// Admin: Get all gallery slides
router.get('/', requireAuth, (req, res) => {
  res.json(getGallerySlides())
})

// Admin: Add new slide
router.post('/', requireAuth, (req, res) => {
  const { title, subtitle, description, image, cardSubtitle, cardTitle } = req.body
  if (!title || !image) {
    return res.status(400).json({ error: 'Title and image are required' })
  }

  const slides = getGallerySlides()
  const newSlide: GallerySlide = {
    id: Date.now().toString(),
    title, subtitle: subtitle || '', description: description || '',
    image, cardSubtitle: cardSubtitle || '', cardTitle: cardTitle || ''
  }
  slides.push(newSlide)
  saveGallerySlides(slides)
  res.status(201).json(newSlide)
})

// Admin: Delete slide
router.delete('/:id', requireAuth, (req, res) => {
  const slides = getGallerySlides()
  const idx = slides.findIndex(s => s.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Slide not found' })

  slides.splice(idx, 1)
  saveGallerySlides(slides)
  res.json({ success: true })
})

export default router
