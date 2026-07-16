import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryImage extends Document {
  src: string;
  title: string;
  category: string;
}

const GalleryImageSchema: Schema = new Schema({
  src: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);
