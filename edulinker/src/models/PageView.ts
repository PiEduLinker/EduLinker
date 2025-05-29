import mongoose, { Schema, Document } from 'mongoose';

export interface IPageView extends Document {
  slug: string;
  userAgent: string;
  createdAt: Date;
}

const PageViewSchema = new Schema<IPageView>({
  slug:      { type: String, required: true, index: true },
  userAgent: { type: String, default: '' },
  createdAt: { type: Date, default: () => new Date(), index: true },
});

export default mongoose.models.PageView ||
  mongoose.model<IPageView>('PageView', PageViewSchema);
