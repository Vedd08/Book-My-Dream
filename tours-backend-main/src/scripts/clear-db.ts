import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import Package from '../models/Package';
import Destination from '../models/Destination';
import Inquiry from '../models/Inquiry';
import BlogPost from '../models/BlogPost';
import GalleryImage from '../models/GalleryImage';
import GallerySlide from '../models/GallerySlide';
import Subscriber from '../models/Subscriber';

async function clearDb() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in .env');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected.');

    console.log('Clearing database collections...');
    
    await Package.deleteMany({});
    console.log('- Cleared Packages');
    
    await Destination.deleteMany({});
    console.log('- Cleared Destinations');
    
    await Inquiry.deleteMany({});
    console.log('- Cleared Inquiries');
    
    await BlogPost.deleteMany({});
    console.log('- Cleared BlogPosts');
    
    await GalleryImage.deleteMany({});
    console.log('- Cleared GalleryImages');
    
    await GallerySlide.deleteMany({});
    console.log('- Cleared GallerySlides');
    
    await Subscriber.deleteMany({});
    console.log('- Cleared Subscribers');

    console.log('Successfully cleared all data! Your database is now completely empty.');
  } catch (err) {
    console.error('Error clearing database:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

clearDb();