import { getRedis } from '../config/redis.js'

export const cacheMiddleware = (ttlSeconds) => async (req, res, next) => {
  const redis = getRedis()
  if (!redis) return next() // gracefully skip if Redis is not available

  const key = `cache:${req.originalUrl}`
  const cached = await redis.get(key)
  if (cached) return res.json(JSON.parse(cached))

  const originalJson = res.json.bind(res)
  res.json = (data) => {
    redis.setex(key, ttlSeconds, JSON.stringify(data)).catch(() => {})
    return originalJson(data)
  }
  next()
}

export async function invalidateCache(pattern) {
  const redis = getRedis()
  if (!redis) return
  const keys = await redis.keys(pattern)
  if (keys.length) await redis.del(...keys)
}
