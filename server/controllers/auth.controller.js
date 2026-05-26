import User from '../models/User.js'
import { generateOtp, otpExpiresAt } from '../services/otp.service.js'
import { sendOtpEmail, sendWelcomeEmail } from '../services/email.service.js'
import jwt from 'jsonwebtoken'

const signAccess = (id) =>
  jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15d' })

const signRefresh = (id) =>
  jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })

const setRefreshCookie = (res, token) =>
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })

export async function register(req, res, next) {
  try {
    const { fullName, email, password, phone } = req.body
    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ message: 'Email already registered' })

    const otp = generateOtp()
    const user = await User.create({
      fullName,
      email,
      password,
      phone,
      otp,
      otpExpire: otpExpiresAt(10),
    })

    await sendOtpEmail({ to: email, fullName, otp })
    res.status(201).json({ message: 'OTP sent to email', userId: user._id })
  } catch (err) {
    next(err)
  }
}

export async function verifyOtp(req, res, next) {
  try {
    const { userId, otp } = req.body
    const user = await User.findById(userId).select('+otp +otpExpire')
    if (!user) return res.status(404).json({ message: 'User not found' })
    if (user.otp !== otp || user.otpExpire < Date.now())
      return res.status(400).json({ message: 'Invalid or expired OTP' })

    user.isEmailVerified = true
    user.otp = undefined
    user.otpExpire = undefined
    const refreshToken = signRefresh(user._id)
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    await sendWelcomeEmail({ to: user.email, fullName: user.fullName })

    setRefreshCookie(res, refreshToken)
    res.json({
      accessToken: signAccess(user._id),
      user: { _id: user._id, fullName: user.fullName, email: user.email, role: user.role },
    })
  } catch (err) {
    next(err)
  }
}

export async function resendOtp(req, res, next) {
  try {
    const { userId } = req.body
    const user = await User.findById(userId).select('+otp +otpExpire')
    if (!user) return res.status(404).json({ message: 'User not found' })
    if (user.isEmailVerified) return res.status(400).json({ message: 'Already verified' })

    const otp = generateOtp()
    user.otp = otp
    user.otpExpire = otpExpiresAt(10)
    await user.save({ validateBeforeSave: false })

    await sendOtpEmail({ to: user.email, fullName: user.fullName, otp })
    res.json({ message: 'OTP resent' })
  } catch (err) {
    next(err)
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password +refreshToken')
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' })
    if (!user.isEmailVerified)
      return res.status(403).json({ message: 'Email not verified' })

    const refreshToken = signRefresh(user._id)
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    setRefreshCookie(res, refreshToken)
    res.json({
      accessToken: signAccess(user._id),
      user: { _id: user._id, fullName: user.fullName, email: user.email, role: user.role },
    })
  } catch (err) {
    next(err)
  }
}

export async function refreshToken(req, res, next) {
  try {
    const token = req.cookies?.refreshToken
    if (!token) return res.status(401).json({ message: 'No refresh token' })

    let payload
    try {
      payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    } catch {
      return res.status(401).json({ message: 'Invalid refresh token' })
    }

    const user = await User.findById(payload.id).select('+refreshToken')
    if (!user || user.refreshToken !== token)
      return res.status(401).json({ message: 'Token revoked' })

    const newRefresh = signRefresh(user._id)
    user.refreshToken = newRefresh
    await user.save({ validateBeforeSave: false })

    setRefreshCookie(res, newRefresh)
    res.json({
      accessToken: signAccess(user._id),
      user: { _id: user._id, fullName: user.fullName, email: user.email, role: user.role },
    })
  } catch (err) {
    next(err)
  }
}

export async function logout(req, res, next) {
  try {
    if (req.user) {
      const user = await User.findById(req.user._id).select('+refreshToken')
      if (user) {
        user.refreshToken = undefined
        await user.save({ validateBeforeSave: false })
      }
    }
    res.clearCookie('refreshToken')
    res.json({ message: 'Logged out' })
  } catch (err) {
    next(err)
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.json({ message: 'If that email exists, an OTP was sent' })

    const otp = generateOtp()
    user.otp = otp
    user.otpExpire = otpExpiresAt(10)
    await user.save({ validateBeforeSave: false })

    await sendOtpEmail({ to: email, fullName: user.fullName, otp })
    res.json({ message: 'If that email exists, an OTP was sent', userId: user._id })
  } catch (err) {
    next(err)
  }
}

export async function resetPassword(req, res, next) {
  try {
    const { userId, otp, newPassword } = req.body
    const user = await User.findById(userId).select('+otp +otpExpire +password')
    if (!user) return res.status(404).json({ message: 'User not found' })
    if (user.otp !== otp || user.otpExpire < Date.now())
      return res.status(400).json({ message: 'Invalid or expired OTP' })

    user.password = newPassword
    user.otp = undefined
    user.otpExpire = undefined
    await user.save()

    res.json({ message: 'Password reset successful' })
  } catch (err) {
    next(err)
  }
}

export async function getMe(req, res) {
  res.json({ user: req.user })
}

export async function updateFcmToken(req, res, next) {
  try {
    const { token } = req.body
    if (!token) return res.status(400).json({ message: 'Token required' })
    await User.findByIdAndUpdate(req.user._id, { $addToSet: { fcmTokens: token } })
    res.json({ message: 'FCM token registered' })
  } catch (err) {
    next(err)
  }
}
