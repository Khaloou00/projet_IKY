import { Router } from 'express'
import {
  getMyNotifications, markAsRead, markAllAsRead,
  deleteNotification, sendBroadcast,
} from '../../controllers/notification.controller.js'
import { protect, adminOnly } from '../../middlewares/auth.middleware.js'

const router = Router()

router.use(protect)

router.get('/', getMyNotifications)
router.patch('/read-all', markAllAsRead)
router.patch('/:id/read', markAsRead)
router.delete('/:id', deleteNotification)

router.post('/broadcast', adminOnly, sendBroadcast)

export default router
