import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import Package from '../models/Package';
import Destination from '../models/Destination';
import Inquiry from '../models/Inquiry';
import BlogPost from '../models/BlogPost';
import GalleryImage from '../models/GalleryImage';
import GallerySlide from '../models/GallerySlide';

dotenv.config();

const loadData = (filename: string) => {
  try {
    const dataPath = path.join(process.cwd(), 'data', filename);
    if (!fs.existsSync(dataPath)) return [];
    const raw = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return [];
  }
};

const migrate = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-agency';
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB for migration');

    console.log('Clearing existing data...');
    await Promise.all([
      Package.deleteMany({}),
      Destination.deleteMany({}),
      Inquiry.deleteMany({}),
      BlogPost.deleteMany({}),
      GalleryImage.deleteMany({}),
      GallerySlide.deleteMany({})
    ]);

    console.log('Loading JSON data...');
    const packages = loadData('packages.json').map((p: any) => ({ ...p, image: p.image || '/images/placeholder.jpg' }));
    const destinations = loadData('destinations.json').map((d: any) => ({ ...d, image: d.image || '/images/placeholder.jpg' }));
    const inquiries = loadData('inquiries.json').map((i: any) => ({
      ...i,
      date: i.date || 'TBD',
      message: i.message || 'No message'
    }));
    const blogs = loadData('blogs.json').map((b: any) => ({ ...b, image: b.image || '/images/placeholder.jpg' }));
    const gallery = loadData('gallery.json');
    const gallerySlides = loadData('gallerySlides.json').map((s: any) => ({ ...s, image: s.image || '/images/placeholder.jpg' }));

    console.log('Inserting into MongoDB...');
    if (packages.length) await Package.insertMany(packages);
    if (destinations.length) await Destination.insertMany(destinations);
    if (inquiries.length) await Inquiry.insertMany(inquiries);
    if (blogs.length) await BlogPost.insertMany(blogs);
    if (gallery.length) await GalleryImage.insertMany(gallery);
    if (gallerySlides.length) await GallerySlide.insertMany(gallerySlides);

    console.log('✅ Migration completed successfully!');
  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

migrate();
