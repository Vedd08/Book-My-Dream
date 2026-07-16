import { Router } from 'express'
import BlogPost from '../models/BlogPost'

const router = Router()

// GET all blogs
router.get('/', async (_req, res) => {
  try {
    const blogs = await BlogPost.find().sort({ createdAt: -1 });
    res.json(blogs)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
})

// GET single blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await BlogPost.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    res.json(blog)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
})

export default router
