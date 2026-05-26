import admin from 'firebase-admin'

let initialized = false

export function initFirebase() {
  if (initialized) return
  const { FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL } = process.env
  if (!FIREBASE_PROJECT_ID) { console.warn('[FCM] Firebase credentials missing — push disabled'); return }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      privateKey: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: FIREBASE_CLIENT_EMAIL,
    }),
  })
  initialized = true
  console.log('[FCM] Firebase Admin initialized')
}

export { admin }
