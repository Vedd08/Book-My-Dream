import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
}

const BlogPostSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  readTime: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
