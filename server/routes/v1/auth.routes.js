import { Router } from 'express'
import {
  register, verifyOtp, resendOtp, login, refreshToken,
  logout, forgotPassword, resetPassword, getMe, updateFcmToken,
} from '../../controllers/auth.controller.js'
import { protect } from '../../middlewares/auth.middleware.js'
import { authRateLimiter } from '../../middlewares/rateLimiter.middleware.js'

const router = Router()

router.post('/register', authRateLimiter, register)
router.post('/verify-otp', authRateLimiter, verifyOtp)
router.post('/resend-otp', authRateLimiter, resendOtp)
router.post('/login', authRateLimiter, login)
router.post('/refresh', refreshToken)
router.post('/logout', protect, logout)
router.post('/forgot-password', authRateLimiter, forgotPassword)
router.post('/reset-password', authRateLimiter, resetPassword)
router.get('/me', protect, getMe)
router.post('/fcm-token', protect, updateFcmToken)

export default router
