import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isConfigured, setIsConfigured] = useState(false)

  useEffect(() => {
    // Check if Supabase is properly configured
    const configured = isSupabaseConfigured()
    setIsConfigured(configured)

    if (!configured) {
      console.warn('Supabase is not properly configured. Please set up your environment variables.')
      setLoading(false)
      return
    }

    // Get initial session
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error getting session:', error)
        } else {
          setUser(session?.user ?? null)
        }
      } catch (error) {
        console.error('Error in getSession:', error)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email, password) => {
    if (!isConfigured) {
      return { 
        data: null, 
        error: { message: 'Supabase is not configured. Please set up your environment variables.' } 
      }
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin
        }
      })
      
      if (error) {
        console.error('Signup error:', error)
      } else {
        console.log('Signup successful:', data)
      }
      
      return { data, error }
    } catch (error) {
      console.error('Signup exception:', error)
      return { data: null, error: { message: error.message } }
    }
  }

  const signIn = async (email, password) => {
    if (!isConfigured) {
      return { 
        data: null, 
        error: { message: 'Supabase is not configured. Please set up your environment variables.' } 
      }
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        console.error('Signin error:', error)
      } else {
        console.log('Signin successful:', data)
      }
      
      return { data, error }
    } catch (error) {
      console.error('Signin exception:', error)
      return { data: null, error: { message: error.message } }
    }
  }

  const signOut = async () => {
    if (!isConfigured) {
      return { error: { message: 'Supabase is not configured.' } }
    }

    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Signout error:', error)
      } else {
        console.log('Signout successful')
        setUser(null)
      }
      
      return { error }
    } catch (error) {
      console.error('Signout exception:', error)
      return { error: { message: error.message } }
    }
  }

  const resetPassword = async (email) => {
    if (!isConfigured) {
      return { 
        data: null, 
        error: { message: 'Supabase is not configured. Please set up your environment variables.' } 
      }
    }

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      
      if (error) {
        console.error('Password reset error:', error)
      } else {
        console.log('Password reset email sent:', data)
      }
      
      return { data, error }
    } catch (error) {
      console.error('Password reset exception:', error)
      return { data: null, error: { message: error.message } }
    }
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    isConfigured
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}