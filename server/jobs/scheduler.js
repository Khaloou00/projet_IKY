import cron from 'node-cron'
import { runAbandonedCartJob } from './abandonedCart.job.js'
import { runPromotionsJob } from './promotions.job.js'

export function startScheduler() {
  // Every day at 10:00 AM
  cron.schedule('0 10 * * *', () => {
    console.log('[Scheduler] Running abandonedCart job')
    runAbandonedCartJob()
  })

  // Every Monday at 9:00 AM
  cron.schedule('0 9 * * 1', () => {
    console.log('[Scheduler] Running promotions job')
    runPromotionsJob()
  })

  console.log('[Scheduler] All cron jobs registered')
}
