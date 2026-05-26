export function registerServiceWorker() {
  // Never register SW in dev — it caches JS modules and hides code changes
  if (import.meta.env.DEV) return

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing
            newWorker?.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New version available — could show an update banner here
              }
            })
          })
        })
        .catch((err) => console.error('[SW] Registration failed:', err))
    })
  }
}
