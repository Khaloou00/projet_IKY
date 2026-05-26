const VAPID_PUBLIC_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY

export async function requestPushPermission() {
  if (!('Notification' in window)) return null
  const permission = await Notification.requestPermission()
  if (permission !== 'granted') return null
  return subscribeUserToPush()
}

async function subscribeUserToPush() {
  const reg = await navigator.serviceWorker.ready
  const existing = await reg.pushManager.getSubscription()
  if (existing) return existing

  const subscription = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  })
  return subscription
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)))
}

export async function unsubscribeFromPush() {
  const reg = await navigator.serviceWorker.ready
  const subscription = await reg.pushManager.getSubscription()
  if (subscription) await subscription.unsubscribe()
}
