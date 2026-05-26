import { Link } from 'react-router'

const AuthLayout = ({ title, subtitle, children }) => (
  <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-amber-50 flex items-center justify-center p-4">
    <div className="w-full max-w-md">
      {/* Brand */}
      <div className="text-center mb-8">
        <Link to="/" className="inline-block">
          <span className="text-3xl font-bold tracking-tight text-violet-700">Super</span>
          <span className="text-3xl font-bold tracking-tight text-amber-500">Be</span>
        </Link>
        <h1 className="mt-4 text-xl font-semibold text-gray-800">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {children}
      </div>
    </div>
  </div>
)

export default AuthLayout
