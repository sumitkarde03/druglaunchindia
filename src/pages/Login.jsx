import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Mail, Lock, Eye, EyeOff, AlertCircle, Info, UserPlus, CheckCircle } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)
  
  const { signIn, resetPassword, isConfigured } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await signIn(email, password)
    
    if (error) {
      // Provide more helpful error messages
      if (error.message.includes('Invalid login credentials') || error.message.includes('invalid_credentials')) {
        setError('The email or password you entered is incorrect. Please check your credentials and try again.')
      } else if (error.message.includes('Email not confirmed')) {
        setError('Please check your email and click the confirmation link before signing in.')
      } else if (error.message.includes('Too many requests')) {
        setError('Too many login attempts. Please wait a few minutes before trying again.')
      } else {
        setError(error.message)
      }
    } else {
      navigate(from, { replace: true })
    }
    
    setLoading(false)
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    if (!email) {
      setError('Please enter your email address first.')
      return
    }

    setResetLoading(true)
    setError('')
    
    const { error } = await resetPassword(email)
    
    if (error) {
      setError(error.message)
    } else {
      setResetSuccess(true)
    }
    
    setResetLoading(false)
  }

  // Show configuration warning if Supabase is not set up
  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-6">
            <div className="flex">
              <Info className="h-5 w-5 text-blue-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Supabase Configuration Required
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p className="mb-2">To enable authentication, please:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Click the "Connect to Supabase" button in the top right</li>
                    <li>Set up your Supabase project</li>
                    <li>The environment variables will be configured automatically</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link
              to="/"
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">DLI</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            {showForgotPassword ? 'Reset your password' : 'Sign in to your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {showForgotPassword ? (
              <button
                onClick={() => {
                  setShowForgotPassword(false)
                  setResetSuccess(false)
                  setError('')
                }}
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                ← Back to sign in
              </button>
            ) : (
              <>
                Or{' '}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  create a new account
                </Link>
              </>
            )}
          </p>
        </div>
        
        {resetSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-md p-6">
            <div className="flex">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Password reset email sent!
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    We've sent a password reset link to <strong>{email}</strong>. 
                    Please check your email and follow the instructions to reset your password.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => {
                  setShowForgotPassword(false)
                  setResetSuccess(false)
                  setError('')
                }}
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                ← Back to sign in
              </button>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={showForgotPassword ? handleForgotPassword : handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                    {error.includes('email or password you entered is incorrect') && !showForgotPassword && (
                      <div className="mt-3 space-y-2">
                        <Link
                          to="/signup"
                          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
                        >
                          <UserPlus className="h-4 w-4 mr-1" />
                          Don't have an account? Sign up here
                        </Link>
                        <div>
                          <button
                            type="button"
                            onClick={() => setShowForgotPassword(true)}
                            className="text-sm font-medium text-primary-600 hover:text-primary-500"
                          >
                            Forgot your password?
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              {!showForgotPassword && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none relative block w-full pl-10 pr-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || resetLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading || resetLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : showForgotPassword ? (
                  'Send reset email'
                ) : (
                  'Sign in'
                )}
              </button>
            </div>

            {!showForgotPassword && (
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-primary-600 hover:text-primary-500"
                >
                  Forgot your password?
                </button>
                <Link
                  to="/signup"
                  className="text-sm text-primary-600 hover:text-primary-500"
                >
                  Create account
                </Link>
              </div>
            )}

            {!showForgotPassword && (
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  New to our platform?{' '}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Create an account to get started
                  </Link>
                </p>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

export default Login