import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8, select: false },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    role: {
      type: String,
      enum: ['admin', 'seller', 'delivery', 'user'],
      default: 'user',
    },
    isEmailVerified: { type: Boolean, default: false },
    otp: { type: String, select: false },
    otpExpire: { type: Date, select: false },
    fcmTokens: [String],
    refreshToken: { type: String, select: false },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password)
}

export default mongoose.model('User', userSchema)
