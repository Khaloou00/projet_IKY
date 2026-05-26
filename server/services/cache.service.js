import { getRedis } from '../config/redis.js'

export async function cacheGet(key) {
  const redis = getRedis()
  if (!redis) return null
  const val = await redis.get(key)
  return val ? JSON.parse(val) : null
}

export async function cacheSet(key, data, ttlSeconds = 300) {
  const redis = getRedis()
  if (!redis) return
  await redis.setex(key, ttlSeconds, JSON.stringify(data))
}

export async function cacheDelete(pattern) {
  const redis = getRedis()
  if (!redis) return
  const keys = await redis.keys(pattern)
  if (keys.length) await redis.del(...keys)
}

export const CACHE_KEYS = {
  productsList: (page = 1) => `products:list:page:${page}`,
  productById: (id) => `products:id:${id}`,
  categories: 'categories:all',
  featuredProducts: 'products:featured',
}

export const CACHE_TTL = {
  productsList: 5 * 60,    // 5 min
  productById: 10 * 60,    // 10 min
  categories: 30 * 60,     // 30 min
  featuredProducts: 15 * 60, // 15 min
}
