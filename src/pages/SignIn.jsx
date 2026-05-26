import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { useLoginMutation } from '../services/api/authApi'
import { setCredentials } from '../features/auth/authSlice'
import AuthLayout from '../components/shared/AuthLayout'

const SignIn = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  const from = location.state?.from?.pathname || '/'

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      toast.error('Remplissez tous les champs')
      return
    }
    try {
      const data = await login(form).unwrap()
      dispatch(setCredentials({ accessToken: data.accessToken, user: data.user }))
      toast.success(`Bienvenue, ${data.user.fullName.split(' ')[0]} !`)
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err?.data?.message || 'Identifiants incorrects')
    }
  }

  return (
    <AuthLayout title="Bon retour !" subtitle="Connectez-vous à votre compte SuperBe">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="vous@exemple.com"
            autoComplete="email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent text-sm transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
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
          <div className="text-right mt-1.5">
            <Link to="/forgot-password" className="text-xs text-violet-600 hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition text-sm"
        >
          {isLoading ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Pas encore de compte ?{' '}
        <Link to="/register" className="text-violet-600 font-medium hover:underline">
          Créer un compte
        </Link>
      </p>
    </AuthLayout>
  )
}

export default SignIn
