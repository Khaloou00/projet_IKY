import { admin } from '../config/firebase.js'

function messaging() {
  try { return admin.messaging() } catch { return null }
}

export async function sendPush({ token, title, body, data = {} }) {
  const m = messaging()
  if (!m || !token) return null
  return m.send({
    token,
    notification: { title, body },
    data: Object.fromEntries(Object.entries(data).map(([k, v]) => [k, String(v)])),
    webpush: { fcmOptions: { link: data?.url || '/' } },
  })
}

export async function sendMulticast({ tokens, title, body, data = {} }) {
  const m = messaging()
  if (!m || !tokens?.length) return null
  return m.sendEachForMulticast({
    tokens,
    notification: { title, body },
    data: Object.fromEntries(Object.entries(data).map(([k, v]) => [k, String(v)])),
  })
}
