import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, lowercase: true },
    shortDescription: { type: String, required: true, trim: true },
    longDescription: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    images: [{ type: String }],
    category: {
      type: String,
      required: true,
      enum: ['bijoux', 'soin & sante', 'outils informatiques'],
    },
    subCategory: { type: String, required: true, trim: true, lowercase: true },
    subCategoryLevel2: { type: String, required: true, trim: true, lowercase: true },
    stock: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ratings: { average: { type: Number, default: 0 }, count: { type: Number, default: 0 } },
  },
  { timestamps: true }
)

productSchema.index({ name: 'text', shortDescription: 'text' })
productSchema.index({ category: 1, isActive: 1 })

export default mongoose.model('Product', productSchema)
