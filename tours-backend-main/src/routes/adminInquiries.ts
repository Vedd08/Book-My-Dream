import { Router, Request, Response } from 'express'
import { requireAuth } from '../middleware/auth'
import { getInquiries, saveInquiries, Inquiry } from '../data'

const router = Router()

// Public POST route (no auth) — used by the inquiry form
export const publicInquiryHandler = (req: Request, res: Response) => {
  const { name, email, phone, travelers, date, message, subject } = req.body
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'name, email and phone are required' })
  }
  
  const inquiries = getInquiries()
  const inquiry: Inquiry = {
    id: Date.now().toString(),
    subject: subject ?? 'General Inquiry',
    name, email, phone,
    travelers: parseInt(travelers) || 2,
    date: date ?? '',
    message: message ?? '',
    status: 'new',
    createdAt: new Date().toISOString(),
  }
  
  inquiries.push(inquiry)
  saveInquiries(inquiries)
  
  console.log('[Inquiry received]', inquiry)
  res.status(201).json({ success: true, message: 'Inquiry received. We will contact you within 24 hours.' })
}

// ── Admin routes (require auth) ────────────────────────────────────────────
router.use(requireAuth)

// GET /api/admin/inquiries
router.get('/', (_req, res) => {
  const inquiries = getInquiries()
  res.json([...inquiries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
})

// PATCH /api/admin/inquiries/:id/status
router.patch('/:id/status', (req: Request, res: Response) => {
  const inquiries = getInquiries()
  const inquiry = inquiries.find(i => i.id === req.params.id)
  if (!inquiry) return res.status(404).json({ error: 'Not found' })
    
  const { status } = req.body
  if (!['new', 'read', 'resolved'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }
  
  inquiry.status = status
  saveInquiries(inquiries)
  res.json(inquiry)
})

// DELETE /api/admin/inquiries/:id
router.delete('/:id', (req: Request, res: Response) => {
  const inquiries = getInquiries()
  const idx = inquiries.findIndex(i => i.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Not found' })
    
  const [removed] = inquiries.splice(idx, 1)
  saveInquiries(inquiries)
  res.json({ success: true, removed })
})

export default router
