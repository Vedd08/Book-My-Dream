import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import { requireAuth } from '../middleware/auth'

const router = Router()

import fs from 'fs'

// Configure multer to save files in the backend's public/uploads directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    // Make filename unique
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    cb(null, 'upload-' + uniqueSuffix + ext)
  }
})

const upload = multer({ storage })

router.post('/', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }

  // The URL path that the client can use to fetch the image
  const imageUrl = `/uploads/${req.file.filename}`
  res.json({ url: imageUrl })
})

export default router
