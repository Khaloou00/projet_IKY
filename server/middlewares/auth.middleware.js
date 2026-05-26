import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not authorized — no token' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    if (!req.user) return res.status(401).json({ success: false, message: 'User not found' })
    next()
  } catch {
    return res.status(401).json({ success: false, message: 'Token expired or invalid' })
  }
}

export const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return res.status(403).json({ success: false, message: `Requires role: ${roles.join(' or ')}` })
  }
  next()
}

export const adminOnly = requireRole('admin')
export const sellerOrAdmin = requireRole('admin', 'seller')
export const deliveryOrAdmin = requireRole('admin', 'delivery')
