import mongoose, { Schema, Document } from 'mongoose';

export interface IInquiry extends Document {
  subject: string;
  name: string;
  email: string;
  phone: string;
  travelers: number;
  date: string;
  message: string;
  status: 'new' | 'read' | 'resolved';
}

const InquirySchema: Schema = new Schema({
  subject: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  travelers: { type: Number, required: true },
  date: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'resolved'], default: 'new' }
}, { timestamps: true });

export default mongoose.model<IInquiry>('Inquiry', InquirySchema);
