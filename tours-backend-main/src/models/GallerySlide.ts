import mongoose, { Schema, Document } from 'mongoose';

export interface IGallerySlide extends Document {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cardSubtitle: string;
  cardTitle: string;
}

const GallerySlideSchema: Schema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  cardSubtitle: { type: String, required: true },
  cardTitle: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IGallerySlide>('GallerySlide', GallerySlideSchema);
