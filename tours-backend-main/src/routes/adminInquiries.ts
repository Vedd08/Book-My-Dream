import { Router, Request, Response } from 'express'
import { requireAuth } from '../middleware/auth'
import Inquiry from '../models/Inquiry'

const router = Router()

// Public POST route (no auth) — used by the inquiry form
export const publicInquiryHandler = async (req: Request, res: Response) => {
  const { name, email, phone, travelers, date, message, subject } = req.body
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'name, email and phone are required' })
  }
  
  try {
    const inquiry = new Inquiry({
      subject: subject ?? 'General Inquiry',
      name, email, phone,
      travelers: parseInt(travelers) || 2,
      date: date ?? '',
      message: message ?? '',
      status: 'new'
    });
    
    await inquiry.save();
    
    console.log('[Inquiry received]', inquiry)
    res.status(201).json({ success: true, message: 'Inquiry received. We will contact you within 24 hours.' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to create inquiry' });
  }
}

// ── Admin routes (require auth) ────────────────────────────────────────────
router.use(requireAuth)

// GET /api/admin/inquiries
router.get('/', async (_req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
})

// PATCH /api/admin/inquiries/:id/status
router.patch('/:id/status', async (req: Request, res: Response) => {
  const { status } = req.body
  if (!['new', 'read', 'resolved'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }
  
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!inquiry) return res.status(404).json({ error: 'Not found' })
    res.json(inquiry)
  } catch (err) {
    res.status(500).json({ error: 'Failed to update inquiry' });
  }
})

// DELETE /api/admin/inquiries/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const removed = await Inquiry.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Not found' })
    res.json({ success: true, removed })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete inquiry' });
  }
})

export default router
