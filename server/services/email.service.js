import { Resend } from 'resend'

const apiKey = process.env.RESEND_API_KEY
const resend = apiKey ? new Resend(apiKey) : null
const FROM = process.env.EMAIL_FROM || 'noreply@superbe.store'

if (!apiKey) console.warn('[Email] RESEND_API_KEY not set — emails will be skipped in dev')

async function send(payload) {
  if (!resend) return { id: 'dev-no-send' }
  return resend.emails.send(payload)
}

export async function sendOtpEmail({ to, fullName, otp }) {
  return send({
    from: FROM,
    to,
    subject: `${otp} — Votre code de vérification SuperBe`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto">
        <h2 style="color:#14532d">Bonjour ${fullName},</h2>
        <p>Votre code de vérification est :</p>
        <div style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#d97706;margin:24px 0">${otp}</div>
        <p style="color:#6b7280">Ce code expire dans <strong>10 minutes</strong>.</p>
        <hr style="border-color:#e5e7eb;margin:24px 0"/>
        <p style="color:#9ca3af;font-size:12px">Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>
      </div>
    `,
  })
}

export async function sendWelcomeEmail({ to, fullName }) {
  return send({
    from: FROM,
    to,
    subject: 'Bienvenue sur SuperBe 🎉',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto">
        <h2 style="color:#14532d">Bienvenue, ${fullName} !</h2>
        <p>Votre compte a été vérifié avec succès. Vous pouvez maintenant accéder à toute la plateforme SuperBe.</p>
      </div>
    `,
  })
}

export async function sendOrderConfirmationEmail({ to, fullName, orderId, totalAmount }) {
  return send({
    from: FROM,
    to,
    subject: `Commande #${orderId} confirmée ✅`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto">
        <h2 style="color:#14532d">Commande reçue, ${fullName} !</h2>
        <p>Votre commande <strong>#${orderId}</strong> d'un montant de <strong>${totalAmount?.toLocaleString('fr-FR')} FCFA</strong> a été enregistrée.</p>
        <p>Vous recevrez une notification dès qu'elle sera expédiée.</p>
      </div>
    `,
  })
}
