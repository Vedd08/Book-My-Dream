import mongoose, { Schema, Document } from 'mongoose';

export interface IPackage extends Document {
  slug: string;
  name: string;
  type: string;
  region: 'Domestic' | 'International';
  destination: string;
  country: string;
  duration: string;
  price: number;
  discountPrice: number;
  foreignCurrency?: string;
  foreignPrice?: number;
  foreignDiscountPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: number; title: string; description: string }[];
  faqs: { q: string; a: string }[];
  featured?: boolean;
}

const PackageSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  region: { type: String, enum: ['Domestic', 'International'], required: true },
  destination: { type: String, required: true },
  country: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  foreignCurrency: { type: String },
  foreignPrice: { type: Number },
  foreignDiscountPrice: { type: Number },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  image: { type: String, required: true },
  highlights: [{ type: String }],
  inclusions: [{ type: String }],
  exclusions: [{ type: String }],
  itinerary: [{
    day: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
  }],
  faqs: [{
    q: { type: String, required: true },
    a: { type: String, required: true }
  }],
  featured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<IPackage>('Package', PackageSchema);
