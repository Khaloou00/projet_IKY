import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import hpp from 'hpp'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import { connectRedis } from './config/redis.js'
import { globalRateLimiter } from './middlewares/rateLimiter.middleware.js'

// Route imports
import authRoutes from './routes/v1/auth.routes.js'
import productRoutes from './routes/v1/product.routes.js'
import orderRoutes from './routes/v1/order.routes.js'
import notificationRoutes from './routes/v1/notification.routes.js'
import adminRoutes from './routes/v1/admin.routes.js'

const app = express()
const PORT = process.env.PORT || 8000
const API = `/api/${process.env.API_VERSION || 'v1'}`

// ─── Trust proxy (Render / Railway behind load balancer) ───────
app.set('trust proxy', 1)

// ─── Security middleware ───────────────────────────────────────
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(
  cors({
    origin: (origin, cb) => {
      const allowed = [process.env.FRONTEND_URL, 'http://localhost:5174']
      if (!origin || allowed.includes(origin)) cb(null, true)
      else cb(new Error('Not allowed by CORS'))
    },
    credentials: true,
  })
)
app.use(globalRateLimiter)

// ─── Body parsers ─────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

// ─── Routes ───────────────────────────────────────────────────
app.use(`${API}/auth`, authRoutes)
app.use(`${API}/products`, productRoutes)
app.use(`${API}/orders`, orderRoutes)
app.use(`${API}/notifications`, notificationRoutes)
app.use(`${API}/admin`, adminRoutes)

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', env: process.env.NODE_ENV }))

// ─── 404 ──────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }))

// ─── Global error handler ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[ERROR]', err)
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  })
})

// ─── Boot ─────────────────────────────────────────────────────
async function boot() {
  await connectDB()
  await connectRedis()

  // Start scheduled jobs after DB + cache are ready
  const { startScheduler } = await import('./jobs/scheduler.js')
  startScheduler()

  app.listen(PORT, () =>
    console.log(`[SERVER] Running on port ${PORT} — ${process.env.NODE_ENV}`)
  )
}

boot().catch((err) => {
  console.error('[BOOT FAILED]', err)
  process.exit(1)
})
