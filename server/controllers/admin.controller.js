import User from '../models/User.js'
import Order from '../models/Order.js'
import Product from '../models/Product.js'

export async function getDashboardStats(req, res, next) {
  try {
    const [totalUsers, totalOrders, totalProducts, recentOrders, revenue] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Order.countDocuments(),
      Product.countDocuments({ isActive: true }),
      Order.find().sort({ createdAt: -1 }).limit(5).populate('customer', 'fullName'),
      Order.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
      ]),
    ])

    res.json({
      data: {
        totalUsers,
        totalOrders,
        totalProducts,
        totalRevenue: revenue[0]?.total ?? 0,
        recentOrders,
      },
    })
  } catch (err) {
    next(err)
  }
}

export async function getAllUsers(req, res, next) {
  try {
    const { role, page = 1, limit = 20 } = req.query
    const pageNum = Math.max(1, parseInt(page))
    const query = {}
    if (role) query.role = role

    const [users, total] = await Promise.all([
      User.find(query)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * parseInt(limit))
        .limit(parseInt(limit))
        .select('-password -otp -otpExpire -refreshToken'),
      User.countDocuments(query),
    ])

    res.json({ data: users, total, page: pageNum })
  } catch (err) {
    next(err)
  }
}

export async function updateUserRole(req, res, next) {
  try {
    const { role } = req.body
    const allowed = ['admin', 'seller', 'delivery', 'user']
    if (!allowed.includes(role)) return res.status(400).json({ message: 'Invalid role' })

    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true })
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ data: user })
  } catch (err) {
    next(err)
  }
}

export async function deleteUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    if (user.role === 'admin') return res.status(403).json({ message: 'Cannot delete admin' })
    await user.deleteOne()
    res.json({ message: 'User deleted' })
  } catch (err) {
    next(err)
  }
}

export async function getLowStockProducts(req, res, next) {
  try {
    const threshold = parseInt(req.query.threshold ?? 5)
    const products = await Product.find({ stock: { $lte: threshold }, isActive: true })
      .sort({ stock: 1 })
      .select('name stock category images')
    res.json({ data: products })
  } catch (err) {
    next(err)
  }
}

export async function getRevenueByPeriod(req, res, next) {
  try {
    const { period = 'month' } = req.query
    const groupFormat =
      period === 'day' ? '%Y-%m-%d' : period === 'week' ? '%Y-%U' : '%Y-%m'

    const data = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      {
        $group: {
          _id: { $dateToString: { format: groupFormat, date: '$createdAt' } },
          revenue: { $sum: '$totalAmount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ])

    res.json({ data })
  } catch (err) {
    next(err)
  }
}
