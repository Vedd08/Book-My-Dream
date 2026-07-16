import mongoose, { Schema, Document } from 'mongoose';

export interface IDestination extends Document {
  slug: string;
  name: string;
  country: string;
  state: string;
  region: 'Domestic' | 'International' | 'Honeymoon';
  description: string;
  image: string;
  bestTime: string;
  attractions: string[];
  tips: string[];
}

const DestinationSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  region: { type: String, enum: ['Domestic', 'International', 'Honeymoon'], required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  bestTime: { type: String, required: true },
  attractions: [{ type: String }],
  tips: [{ type: String }]
}, { timestamps: true });

export default mongoose.model<IDestination>('Destination', DestinationSchema);
