import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import toast from 'react-hot-toast'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { useResetPasswordMutation } from '../services/api/authApi'
import AuthLayout from '../components/shared/AuthLayout'

const DIGITS = 6

const UpdatePassword = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const { userId, email } = location.state || {}

  const [digits, setDigits] = useState(Array(DIGITS).fill(''))
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const inputs = useRef([])

  useEffect(() => {
    if (!userId) navigate('/forgot-password', { replace: true })
  }, [userId, navigate])

  const handleDigitChange = (index, value) => {
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
    if (otp.length < DIGITS) { toast.error('Entrez le code complet'); return }
    if (newPassword.length < 8) { toast.error('Minimum 8 caractères'); return }
    if (newPassword !== confirmPassword) { toast.error('Les mots de passe ne correspondent pas'); return }

    try {
      await resetPassword({ userId, otp, newPassword }).unwrap()
      toast.success('Mot de passe réinitialisé ! Connectez-vous.')
      navigate('/login', { replace: true })
    } catch (err) {
      toast.error(err?.data?.message || 'Code incorrect ou expiré')
      setDigits(Array(DIGITS).fill(''))
      inputs.current[0]?.focus()
    }
  }

  return (
    <AuthLayout
      title="Nouveau mot de passe"
      subtitle={email ? `Code envoyé à ${email}` : 'Entrez le code reçu et votre nouveau mot de passe'}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* OTP */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Code de vérification</label>
          <div className="flex justify-center gap-2">
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={i === 0 ? handlePaste : undefined}
                className="w-11 h-12 text-center text-lg font-bold border-2 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition"
                style={{ borderColor: digit ? '#7c3aed' : '#e5e7eb' }}
              />
            ))}
          </div>
        </div>

        {/* New password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Nouveau mot de passe</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="8 caractères minimum"
              autoComplete="new-password"
              className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent text-sm transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirmer le mot de passe</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Répétez le mot de passe"
            autoComplete="new-password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent text-sm transition"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition text-sm"
        >
          {isLoading ? 'Réinitialisation…' : 'Réinitialiser le mot de passe'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link to="/login" className="text-sm text-gray-500 hover:text-violet-600 transition">
          Retour à la connexion
        </Link>
      </div>
    </AuthLayout>
  )
}

export default UpdatePassword
