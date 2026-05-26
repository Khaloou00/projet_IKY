import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { HiArrowLeft } from 'react-icons/hi'
import { useForgotPasswordMutation } from '../services/api/authApi'
import AuthLayout from '../components/Shared/AuthLayout'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) { toast.error('Entrez votre email'); return }
    try {
      const data = await forgotPassword({ email }).unwrap()
      toast.success('Si cet email existe, un code a été envoyé')
      navigate('/reset-password', { state: { userId: data.userId, email } })
    } catch (err) {
      toast.error(err?.data?.message || 'Erreur lors de la demande')
    }
  }

  return (
    <AuthLayout
      title="Mot de passe oublié"
      subtitle="Entrez votre email pour recevoir un code de réinitialisation"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@exemple.com"
            autoComplete="email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent text-sm transition"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition text-sm"
        >
          {isLoading ? 'Envoi…' : 'Envoyer le code'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-violet-600 transition">
          <HiArrowLeft size={16} /> Retour à la connexion
        </Link>
      </div>
    </AuthLayout>
  )
}

export default ForgotPassword
