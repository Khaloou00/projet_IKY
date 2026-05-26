import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema(
  {
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    body: { type: String, required: true },
    type: {
      type: String,
      enum: [
        'ORDER_PLACED', 'PAYMENT_CONFIRMED', 'ORDER_STATUS_CHANGED',
        'ORDER_DELIVERED', 'NEW_PRODUCT', 'OTP_CODE',
        'ACCOUNT_VERIFIED', 'LOW_STOCK_ALERT', 'NEW_REVIEW',
        'PROMO', 'SYSTEM',
      ],
      default: 'SYSTEM',
    },
    data: { type: mongoose.Schema.Types.Mixed },
    isRead: { type: Boolean, default: false },
    deliveryStatus: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  },
  { timestamps: true }
)

notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 })

export default mongoose.model('Notification', notificationSchema)
