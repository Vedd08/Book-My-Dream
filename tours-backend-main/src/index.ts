import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Load env vars before importing routes that might use them
dotenv.config()

import mongoose from 'mongoose'
import path from 'path'

import authRouter from './routes/auth'
import packagesRouter from './routes/packages'
import destinationsRouter from './routes/destinations'
import newsletterRouter from './routes/newsletter'
import blogsRouter from './routes/blogs'
import adminPackagesRouter from './routes/adminPackages'
import adminInquiriesRouter, { publicInquiryHandler } from './routes/adminInquiries'
import adminBlogsRouter from './routes/adminBlogs'
import adminDestinationsRouter from './routes/adminDestinations'
import adminGalleryRouter, { publicGalleryHandler } from './routes/adminGallery'
import adminGallerySlidesRouter, { publicGallerySlidesHandler } from './routes/adminGallerySlides'
import uploadRouter from './routes/upload'
import { requireAuth } from './middleware/auth'

import Package from './models/Package'
import Destination from './models/Destination'
import Inquiry from './models/Inquiry'
import BlogPost from './models/BlogPost'
import Subscriber from './models/Subscriber'

const app = express()
const PORT = process.env.PORT ?? 5000

// ── Database Connection ────────────────────────────────────────────────────
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-agency')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err))

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors({ origin: true }))
app.use(express.json())
app.use(express.static(path.join(process.cwd(), 'public')))

// ── Request logger ─────────────────────────────────────────────────────────
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// ── Public routes ──────────────────────────────────────────────────────────
app.use('/api/auth', authRouter)
app.use('/api/packages', packagesRouter)
app.use('/api/destinations', destinationsRouter)
app.use('/api/newsletter', newsletterRouter)
app.use('/api/blogs', blogsRouter)
app.post('/api/inquiries', publicInquiryHandler)   // public inquiry form submission
app.get('/api/gallery', publicGalleryHandler)      // public gallery images
app.get('/api/gallery-slides', publicGallerySlidesHandler) // public gallery slides

// ── Admin-only routes ──────────────────────────────────────────────────────
app.use('/api/admin/packages',     adminPackagesRouter)
app.use('/api/admin/destinations', adminDestinationsRouter)
app.use('/api/admin/inquiries',    adminInquiriesRouter)
app.use('/api/admin/blogs',        adminBlogsRouter)
app.use('/api/admin/gallery',      adminGalleryRouter)
app.use('/api/admin/gallery-slides', adminGallerySlidesRouter)
app.use('/api/admin/upload',       uploadRouter)

// ── Newsletter ─────────────────────────────────────────────────────────────
app.post('/api/newsletter/subscribe', async (req, res) => {
  const { email } = req.body
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' })
  }
  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.json({ success: true, message: 'Already subscribed' })
    }
    const sub = new Subscriber({ email });
    await sub.save();
    console.log('[Newsletter] New subscriber:', email)
    res.status(201).json({ success: true, message: 'Subscribed successfully!' })
  } catch (err) {
    res.status(500).json({ error: 'Subscription failed' })
  }
})

// Admin: get all subscribers
app.get('/api/admin/subscribers', requireAuth, async (_req, res) => {
  try {
    const subs = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subs)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subscribers' })
  }
})

// Admin: dashboard stats
app.get('/api/admin/stats', requireAuth, async (_req, res) => {
  try {
    const [
      totalPackages,
      totalDestinations,
      totalInquiries,
      newInquiries,
      totalSubscribers,
      totalBlogs
    ] = await Promise.all([
      Package.countDocuments(),
      Destination.countDocuments(),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'new' }),
      Subscriber.countDocuments(),
      BlogPost.countDocuments()
    ]);

    res.json({
      totalPackages,
      totalDestinations,
      totalInquiries,
      newInquiries,
      totalSubscribers,
      totalBlogs
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
})

// ── Health check ───────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date() }))

// ── 404 handler ────────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: 'Route not found' }))

// ── Error handler ──────────────────────────────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`✅ Express server running at http://localhost:${PORT}`)
})

export default app
