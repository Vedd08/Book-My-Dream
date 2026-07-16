import { Router } from 'express'
import BlogPost from '../models/BlogPost'
import { requireAuth } from '../middleware/auth'

const router = Router()

// GET all blogs
router.get('/', requireAuth, async (_req, res) => {
  try {
    const blogs = await BlogPost.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
})

// CREATE a new blog
router.post('/', requireAuth, async (req, res) => {
  const { title, excerpt, category, date, readTime, image, author } = req.body
  
  if (!title || !excerpt || !category) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

  try {
    const existing = await BlogPost.findOne({ slug });
    if (existing) {
      return res.status(409).json({ error: 'Slug already exists' })
    }

    const newBlog = new BlogPost({
      slug,
      title,
      excerpt,
      category,
      date: date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: readTime || '5 min read',
      image: image || '/images/default-blog.jpg',
      author: author || 'Team BMDT'
    });

    await newBlog.save();
    res.status(201).json(newBlog)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create blog' });
  }
})

// UPDATE a blog
router.put('/:slug', requireAuth, async (req, res) => {
  try {
    const blog = await BlogPost.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: req.body },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    res.json(blog)
  } catch (err) {
    res.status(500).json({ error: 'Failed to update blog' });
  }
})

// DELETE a blog
router.delete('/:slug', requireAuth, async (req, res) => {
  try {
    const removed = await BlogPost.findOneAndDelete({ slug: req.params.slug });
    if (!removed) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete blog' });
  }
})

export default router
