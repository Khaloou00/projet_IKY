import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  price: Number,
  quantity: { type: Number, required: true, min: 1 },
  image: String,
})

const orderSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['processing', 'shipped', 'delivered', 'cancelled'],
      default: 'processing',
    },
    deliveryAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deliveryAddress: {
      city: String,
      area: String,
      details: String,
    },
    deliveryFee: { type: Number, default: 1500 },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

orderSchema.index({ customer: 1, createdAt: -1 })
orderSchema.index({ status: 1 })

export default mongoose.model('Order', orderSchema)
