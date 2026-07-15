import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

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
import { getBlogs, getInquiries, getPackages, getDestinations } from './data'

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 5000

import path from 'path'

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

// Newsletter subscribers store
const subscribers: { email: string; createdAt: Date }[] = []

app.post('/api/newsletter/subscribe', (req, res) => {
  const { email } = req.body
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' })
  }
  if (subscribers.find(s => s.email === email)) {
    return res.json({ success: true, message: 'Already subscribed' })
  }
  subscribers.push({ email, createdAt: new Date() })
  console.log('[Newsletter] New subscriber:', email)
  res.status(201).json({ success: true, message: 'Subscribed successfully!' })
})

// Admin: get all subscribers
app.get('/api/admin/subscribers', requireAuth, (_req, res) => {
  res.json([...subscribers].reverse())
})

// Admin: dashboard stats
app.get('/api/admin/stats', requireAuth, (_req, res) => {
  const inquiries = getInquiries()
  const newInquiries = inquiries.filter(i => i.status === 'new').length
  res.json({
    totalPackages: getPackages().length,
    totalDestinations: getDestinations().length,
    totalInquiries: inquiries.length,
    newInquiries,
    totalSubscribers: subscribers.length,
    totalBlogs: getBlogs().length,
  })
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
  console.log(`🔐 Admin credentials → username: admin  /  password: admin123`)
})

export default app
