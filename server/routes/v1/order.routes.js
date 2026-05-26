import { Router } from 'express'
import {
  createOrder, getMyOrders, getOrderById,
  getAllOrders, updateOrderStatus, assignDelivery,
} from '../../controllers/order.controller.js'
import { protect, adminOnly, deliveryOrAdmin } from '../../middlewares/auth.middleware.js'

const router = Router()

router.use(protect)

router.post('/', createOrder)
router.get('/my', getMyOrders)
router.get('/:id', getOrderById)

router.get('/', deliveryOrAdmin, getAllOrders)
router.patch('/:id/status', deliveryOrAdmin, updateOrderStatus)
router.patch('/:id/assign', adminOnly, assignDelivery)

export default router
