import Redis from 'ioredis'

let redis

export async function connectRedis() {
  const url = process.env.REDIS_URL
  if (!url) { console.warn('[REDIS] REDIS_URL not set — cache disabled'); return }

  redis = new Redis(url, { lazyConnect: true, maxRetriesPerRequest: 3 })
  await redis.connect()
  console.log('[REDIS] Connected')
}

export function getRedis() {
  return redis
}
