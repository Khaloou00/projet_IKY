import Notification from '../models/Notification.js'
import User from '../models/User.js'
import { sendPush } from '../services/push.service.js'

// Runs daily — notifies users who have items in cart but no order in 24h.
// Since cart state lives on the frontend (Redux), this job works via a
// dedicated endpoint that clients POST to when they go offline with items.
export async function runAbandonedCartJob() {
  try {
    // Fetch users flagged as having an abandoned cart (set via POST /api/v1/cart/abandon)
    const users = await User.find({ 'meta.abandonedCartAt': { $exists: true } }).select(
      'fullName fcmTokens meta'
    )

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

    for (const user of users) {
      if (user.meta?.abandonedCartAt < twentyFourHoursAgo) continue

      await Notification.create({
        recipient: user._id,
        title: 'You left something behind!',
        body: 'You have items in your cart. Complete your order before they sell out.',
        type: 'PROMO',
      })

      if (user.fcmTokens?.length) {
        await sendPush({
          tokens: user.fcmTokens,
          title: 'You left something behind!',
          body: 'Complete your order before items sell out.',
          data: { action: 'open_cart' },
        }).catch(() => {})
      }
    }

    console.log(`[AbandonedCart] Processed ${users.length} users`)
  } catch (err) {
    console.error('[AbandonedCart] Job failed:', err.message)
  }
}
