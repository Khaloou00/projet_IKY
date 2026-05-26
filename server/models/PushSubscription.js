import mongoose from 'mongoose'

const pushSubscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fcmToken: { type: String, required: true },
    device: { type: String, enum: ['web', 'android', 'ios'], default: 'web' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

pushSubscriptionSchema.index({ user: 1, fcmToken: 1 }, { unique: true })

export default mongoose.model('PushSubscription', pushSubscriptionSchema)
