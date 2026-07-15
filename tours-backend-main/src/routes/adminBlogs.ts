import { Router } from 'express'
import { getBlogs, saveBlogs } from '../data'
import { requireAuth } from '../middleware/auth'

const router = Router()

// GET all blogs
router.get('/', requireAuth, (_req, res) => {
  res.json(getBlogs())
})

// CREATE a new blog
router.post('/', requireAuth, (req, res) => {
  const { title, excerpt, category, date, readTime, image, author } = req.body
  
  if (!title || !excerpt || !category) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

  const newBlog = {
    slug,
    title,
    excerpt,
    category,
    date: date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: readTime || '5 min read',
    image: image || '/images/default-blog.jpg',
    author: author || 'Team BMDT'
  }

  const blogs = getBlogs()
  blogs.unshift(newBlog)
  saveBlogs(blogs)
  
  res.status(201).json(newBlog)
})

// UPDATE a blog
router.put('/:slug', requireAuth, (req, res) => {
  const { slug } = req.params
  const blogs = getBlogs()
  const index = blogs.findIndex(b => b.slug === slug)
  
  if (index === -1) {
    return res.status(404).json({ error: 'Blog not found' })
  }

  blogs[index] = { ...blogs[index], ...req.body }
  saveBlogs(blogs)
  res.json(blogs[index])
})

// DELETE a blog
router.delete('/:slug', requireAuth, (req, res) => {
  const { slug } = req.params
  const blogs = getBlogs()
  const index = blogs.findIndex(b => b.slug === slug)
  
  if (index === -1) {
    return res.status(404).json({ error: 'Blog not found' })
  }

  blogs.splice(index, 1)
  saveBlogs(blogs)
  res.json({ success: true })
})

export default router
