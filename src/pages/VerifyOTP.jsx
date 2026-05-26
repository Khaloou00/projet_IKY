import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { useVerifyOtpMutation, useResendOtpMutation } from '../services/api/authApi'
import { setCredentials } from '../features/auth/authSlice'
import AuthLayout from '../components/Shared/AuthLayout'

const DIGITS = 6
const RESEND_DELAY = 60

const VerifyOTP = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const { userId, email } = location.state || {}

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation()
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation()

  const [digits, setDigits] = useState(Array(DIGITS).fill(''))
  const [countdown, setCountdown] = useState(RESEND_DELAY)
  const inputs = useRef([])

  // Redirect if accessed directly without userId
  useEffect(() => {
    if (!userId) navigate('/register', { replace: true })
  }, [userId, navigate])

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  const handleChange = (index, value) => {
    const char = value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = char
    setDigits(next)
    if (char && index < DIGITS - 1) inputs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, DIGITS)
    const next = [...digits]
    pasted.split('').forEach((char, i) => { next[i] = char })
    setDigits(next)
    inputs.current[Math.min(pasted.length, DIGITS - 1)]?.focus()
  }

  const otp = digits.join('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (otp.length < DIGITS) {
      toast.error('Entrez le code complet à 6 chiffres')
      return
    }
    try {
      const data = await verifyOtp({ userId, otp }).unwrap()
      dispatch(setCredentials({ accessToken: data.accessToken, user: data.user }))
      toast.success('Email vérifié ! Bienvenue 🎉')
      navigate('/', { replace: true })
    } catch (err) {
      toast.error(err?.data?.message || 'Code incorrect ou expiré')
      setDigits(Array(DIGITS).fill(''))
      inputs.current[0]?.focus()
    }
  }

  const handleResend = async () => {
    if (countdown > 0 || isResending) return
    try {
      await resendOtp({ userId }).unwrap()
      toast.success('Nouveau code envoyé !')
      setCountdown(RESEND_DELAY)
      setDigits(Array(DIGITS).fill(''))
      inputs.current[0]?.focus()
    } catch (err) {
      toast.error(err?.data?.message || "Erreur lors de l'envoi")
    }
  }

  return (
    <AuthLayout
      title="Vérifiez votre email"
      subtitle={email ? `Code envoyé à ${email}` : 'Entrez le code reçu par email'}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP boxes */}
        <div className="flex justify-center gap-3">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={i === 0 ? handlePaste : undefined}
              className="w-12 h-14 text-center text-xl font-bold border-2 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition"
              style={{ borderColor: digit ? '#7c3aed' : '#e5e7eb' }}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={isVerifying || otp.length < DIGITS}
          className="w-full py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition text-sm"
        >
          {isVerifying ? 'Vérification…' : 'Confirmer'}
        </button>
      </form>

      <div className="mt-5 text-center">
        {countdown > 0 ? (
          <p className="text-sm text-gray-400">
            Renvoyer le code dans <span className="font-semibold text-gray-600">{countdown}s</span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            disabled={isResending}
            className="text-sm text-violet-600 hover:underline font-medium disabled:opacity-50"
          >
            {isResending ? 'Envoi…' : 'Renvoyer le code'}
          </button>
        )}
      </div>
    </AuthLayout>
  )
}

export default VerifyOTP
