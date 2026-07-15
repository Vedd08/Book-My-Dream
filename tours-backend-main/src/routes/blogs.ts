import { Router } from 'express'
import { getBlogs } from '../data'

const router = Router()

// GET all blogs
router.get('/', (_req, res) => {
  res.json(getBlogs())
})

// GET single blog by slug
router.get('/:slug', (req, res) => {
  const blogs = getBlogs()
  const blog = blogs.find(b => b.slug === req.params.slug)
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' })
  }
  res.json(blog)
})

export default router
