import { Router } from 'express'
import {
  getDashboardStats, getAllUsers, updateUserRole,
  deleteUser, getLowStockProducts, getRevenueByPeriod,
} from '../../controllers/admin.controller.js'
import { protect, adminOnly } from '../../middlewares/auth.middleware.js'

const router = Router()

router.use(protect, adminOnly)

router.get('/dashboard', getDashboardStats)
router.get('/users', getAllUsers)
router.patch('/users/:id/role', updateUserRole)
router.delete('/users/:id', deleteUser)
router.get('/products/low-stock', getLowStockProducts)
router.get('/revenue', getRevenueByPeriod)

export default router
