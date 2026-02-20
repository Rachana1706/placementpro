import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock, GraduationCap, Eye, EyeOff, Sparkles } from 'lucide-react'
import { useApp } from '../context/AppContext'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, DEMO_USERS } = useApp()
  
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState('student')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const from = location.state?.from?.pathname || getDefaultPath(role)

  function getDefaultPath(userRole) {
    switch (userRole) {
      case 'admin': return '/dashboard'
      case 'student': return '/student-portal'
      case 'alumni': return '/alumni-portal'
      default: return '/dashboard'
    }
  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('placementPro_loggedIn')
    const userRole = localStorage.getItem('placementPro_role')
    
    if (isLoggedIn === 'true' && userRole) {
      navigate(getDefaultPath(userRole), { replace: true })
    }
  }, [navigate])

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    setTimeout(() => {
      const result = login(email, password, role)
      
      if (!result.success) {
        setError(result.message)
        setIsLoading(false)
        return
      }
      
      const redirectPath = getDefaultPath(result.user.role)
      navigate(redirectPath, { replace: true })
      setIsLoading(false)
    }, 1000)
  }

  const roles = [
    { value: 'admin', label: 'Admin', path: '/dashboard' },
    { value: 'student', label: 'Student', path: '/student-portal' },
    { value: 'alumni', label: 'Alumni', path: '/alumni-portal' },
  ]

  // Get demo credentials list
  const credentialsList = Object.entries(DEMO_USERS).map(([email, user]) => ({
    email,
    password: user.password,
    role: user.role,
    name: user.name
  }))

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-purple-50 to-pink-100">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Glass Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="p-2.5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg shadow-primary-500/30">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              PlacementPro
            </span>
          </div>

          {/* Glass Card */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-500 mb-8">Sign in to continue to your dashboard</p>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/80 outline-none transition-all duration-200 backdrop-blur-sm"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-14 py-3.5 bg-white/50 border border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white/80 outline-none transition-all duration-200 backdrop-blur-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Role Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Role
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {roles.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setRole(r.value)}
                      className={`py-3 px-4 rounded-2xl font-medium transition-all duration-300 ${
                        role === r.value
                          ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-lg shadow-primary-500/30 scale-105'
                          : 'bg-white/50 border border-gray-200/50 text-gray-600 hover:bg-white/80 hover:border-primary-200 backdrop-blur-sm'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full py-4 bg-gradient-to-r from-primary-500 to-purple-500 text-white font-semibold rounded-2xl hover:from-primary-600 hover:to-purple-600 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-50/50 rounded-xl">
              <p className="text-xs font-medium text-gray-500 mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-xs text-gray-600">
                {credentialsList.map((cred) => (
                  <p key={cred.email}>
                    <span className="font-medium capitalize">{cred.role}:</span> {cred.email} / {cred.password}
                  </p>
                ))}
              </div>
            </div>

            <p className="mt-8 text-center text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Glassmorphism Illustration */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-12 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
        
        {/* Glass Card */}
        <div className="relative max-w-md p-10 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
          
          <div className="relative">
            <div className="w-28 h-28 mx-auto mb-6 bg-gradient-to-br from-primary-500/30 to-purple-500/30 rounded-3xl flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-2xl">
              <GraduationCap className="w-14 h-14 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-white text-center mb-4">
              Campus Placement Made Easy
            </h2>
            <p className="text-white/80 text-center leading-relaxed mb-8">
              Connect students with top companies, manage applications, and track placements all in one powerful platform.
            </p>

            <div className="space-y-4">
              {[
                'Smart Job Matching',
                'Real-time Applications',
                'Company Dashboard',
                'Placement Analytics'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-purple-400 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
