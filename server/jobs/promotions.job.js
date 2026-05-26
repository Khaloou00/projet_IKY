import Product from '../models/Product.js'
import Notification from '../models/Notification.js'
import User from '../models/User.js'
import { sendPush } from '../services/push.service.js'

// Runs weekly — broadcasts new product announcements to all users.
export async function runPromotionsJob() {
  try {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const newProducts = await Product.find({
      isActive: true,
      createdAt: { $gte: oneWeekAgo },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name images category')

    if (!newProducts.length) {
      console.log('[Promotions] No new products this week, skipping')
      return
    }

    const productNames = newProducts.map((p) => p.name).join(', ')
    const title = 'New arrivals this week!'
    const body = `Check out: ${productNames}`

    const users = await User.find({ isEmailVerified: true }).select('_id fcmTokens')
    const notifications = users.map((u) => ({
      recipient: u._id,
      title,
      body,
      type: 'NEW_PRODUCT',
      data: { productIds: newProducts.map((p) => String(p._id)) },
    }))

    await Notification.insertMany(notifications)

    const allTokens = users.flatMap((u) => u.fcmTokens ?? []).filter(Boolean)
    if (allTokens.length) {
      const BATCH_SIZE = 500
      for (let i = 0; i < allTokens.length; i += BATCH_SIZE) {
        const batch = allTokens.slice(i, i + BATCH_SIZE)
        await sendPush({ tokens: batch, title, body, data: {} }).catch(() => {})
      }
    }

    console.log(`[Promotions] Sent to ${users.length} users`)
  } catch (err) {
    console.error('[Promotions] Job failed:', err.message)
  }
}
