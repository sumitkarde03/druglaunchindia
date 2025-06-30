import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { isGeminiConfigured } from '../lib/gemini'
import SponsorBanner from './SponsorBanner'
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Home, 
  FileText, 
  Database, 
  Shield, 
  Phone, 
  Info,
  HelpCircle,
  Lock,
  Accessibility,
  Brain,
  ChevronDown,
  Bell,
  Search,
  Settings,
  Star,
  Zap
} from 'lucide-react'

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  // Handle scroll effect for floating navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus when route changes
  useEffect(() => {
    setIsMenuOpen(false)
    setIsUserMenuOpen(false)
  }, [location.pathname])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
    setIsUserMenuOpen(false)
  }

  const navigation = [
    { name: 'Home', href: '/', icon: Home, color: 'from-blue-500 to-cyan-500' },
    { name: 'AI Search', href: '/search', icon: Search, color: 'from-purple-500 to-pink-500', featured: true },
    { name: 'Drug Directory', href: '/drugs', icon: Database, color: 'from-green-500 to-emerald-500' },
    { name: 'Regulations', href: '/regulations', icon: FileText, color: 'from-orange-500 to-red-500' },
    { name: 'About', href: '/about', icon: Info, color: 'from-indigo-500 to-purple-500' },
    { name: 'Contact', href: '/contact', icon: Phone, color: 'from-teal-500 to-cyan-500' },
  ]

  const footerLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Use', href: '/terms' },
    { name: 'Accessibility', href: '/accessibility' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sponsor Banner */}
      <SponsorBanner />

      {/* Floating Header */}
      <header className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-2' 
          : 'py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-500 ${
            scrolled
              ? 'bg-white/95 backdrop-blur-xl shadow-2xl border border-white/20'
              : 'bg-white/80 backdrop-blur-lg shadow-lg border border-white/30'
          } rounded-2xl`}>
            <div className="flex justify-between items-center h-16 px-6">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className={`transition-all duration-300 ${
                    scrolled ? 'w-10 h-10' : 'w-12 h-12'
                  } bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105`}>
                    <span className="text-white font-bold text-sm">DLI</span>
                  </div>
                  {isGeminiConfigured() && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                      <Brain className="w-2 h-2 text-white" />
                    </div>
                  )}
                </div>
                <div className="hidden sm:block">
                  <span className={`font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 ${
                    scrolled ? 'text-lg' : 'text-xl'
                  }`}>
                    DrugLaunchIndia
                  </span>
                  {isGeminiConfigured() && (
                    <div className="flex items-center space-x-1 mt-0.5">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-purple-600 font-medium">AI Powered</span>
                    </div>
                  )}
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden xl:flex items-center space-x-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group ${
                        isActive
                          ? 'text-white shadow-lg transform scale-105'
                          : 'text-slate-600 hover:text-white hover:shadow-md hover:scale-105'
                      }`}
                      style={isActive || undefined ? {
                        background: `linear-gradient(135deg, ${item.color.split(' ')[0].replace('from-', '')}, ${item.color.split(' ')[1].replace('to-', '')})`
                      } : undefined}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.target.style.background = `linear-gradient(135deg, ${item.color.split(' ')[0].replace('from-', '')}, ${item.color.split(' ')[1].replace('to-', '')})`
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.target.style.background = 'transparent'
                        }
                      }}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                      {item.featured && (
                        <div className="absolute -top-1 -right-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current animate-pulse" />
                        </div>
                      )}
                    </Link>
                  )
                })}
              </nav>

              {/* Tablet Navigation */}
              <nav className="hidden lg:flex xl:hidden items-center space-x-1">
                {navigation.slice(0, 4).map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 group ${
                        isActive
                          ? 'text-white shadow-lg transform scale-105'
                          : 'text-slate-600 hover:text-white hover:shadow-md hover:scale-105'
                      }`}
                      style={isActive || undefined ? {
                        background: `linear-gradient(135deg, ${item.color.split(' ')[0].replace('from-', '')}, ${item.color.split(' ')[1].replace('to-', '')})`
                      } : undefined}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.target.style.background = `linear-gradient(135deg, ${item.color.split(' ')[0].replace('from-', '')}, ${item.color.split(' ')[1].replace('to-', '')})`
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.target.style.background = 'transparent'
                        }
                      }}
                      title={item.name}
                    >
                      <Icon className="w-5 h-5" />
                      {item.featured && (
                        <div className="absolute -top-1 -right-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current animate-pulse" />
                        </div>
                      )}
                    </Link>
                  )
                })}
              </nav>

              {/* Right side actions */}
              <div className="flex items-center space-x-3">
                {/* Quick Search Button - Desktop */}
                <Link
                  to="/search"
                  className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm font-medium"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden xl:block">AI Search</span>
                </Link>

                {/* Notifications */}
                {user && (
                  <Link
                    to="/notifications"
                    className="relative p-2.5 text-slate-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <Bell className="w-5 h-5" />
                    <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  </Link>
                )}

                {/* User Menu */}
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="hidden sm:block text-sm font-medium max-w-24 truncate">
                        {user.email.split('@')[0]}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2 z-50 animate-fade-in-scale">
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="text-sm font-semibold text-slate-900">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              <Zap className="w-3 h-3 text-yellow-500" />
                              <span className="text-xs text-slate-600">Premium Member</span>
                            </div>
                            {isGeminiConfigured() && (
                              <div className="flex items-center space-x-1">
                                <Brain className="w-3 h-3 text-purple-500" />
                                <span className="text-xs text-purple-600">AI Enabled</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="py-2">
                          <Link
                            to="/notifications"
                            className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                          >
                            <Bell className="w-4 h-4" />
                            <span>Notifications</span>
                          </Link>
                          <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                            <Settings className="w-4 h-4" />
                            <span>Account Settings</span>
                          </button>
                          <button
                            onClick={handleSignOut}
                            className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link
                      to="/login"
                      className="text-slate-600 hover:text-indigo-600 transition-colors text-sm font-medium px-3 py-2 rounded-xl hover:bg-white/60"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm font-medium"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2.5 text-slate-600 hover:text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-20 bg-black/20 backdrop-blur-sm z-40">
            <div className="max-w-md mx-auto mt-4 mx-4">
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden animate-fade-in-scale">
                <nav className="py-4">
                  {navigation.map((item, index) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center space-x-4 px-6 py-4 text-base font-medium transition-all duration-300 ${
                          isActive
                            ? 'text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isActive 
                            ? 'bg-white/20' 
                            : 'bg-gradient-to-br ' + item.color
                        }`}>
                          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white'}`} />
                        </div>
                        <div className="flex-1">
                          <span>{item.name}</span>
                          {item.featured && (
                            <div className="flex items-center space-x-1 mt-0.5">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs opacity-75">Featured</span>
                            </div>
                          )}
                        </div>
                      </Link>
                    )
                  })}
                </nav>
                
                {/* Mobile Quick Actions */}
                <div className="border-t border-slate-100 p-4">
                  <Link
                    to="/search"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  >
                    <Search className="w-5 h-5" />
                    <span>AI Medicine Search</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content with proper top padding */}
      <main className="pt-32">
        {children}
      </main>

      {/* Important Safety Information */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3 text-sm text-amber-800">
            <Shield className="w-5 h-5 flex-shrink-0 text-amber-600" />
            <span className="font-semibold">Important Safety Information:</span>
            <span className="hidden sm:block">All drug information is for investment analysis only. Consult healthcare professionals for medical advice.</span>
            <span className="sm:hidden">For investment analysis only. Consult healthcare professionals.</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">DLI</span>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    DrugLaunchIndia
                  </span>
                  {isGeminiConfigured() && (
                    <div className="flex items-center space-x-1 mt-1">
                      <Brain className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-purple-600 font-medium">AI Powered</span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed max-w-md">
                Empowering foreign investment decisions in India's pharmaceutical market through data-driven insights and AI-powered analysis.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-600 hover:text-indigo-600 text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Technology</h3>
              <div className="space-y-3 text-sm text-slate-600">
                <p>Powered by Open Government Data Platform India and WHO Global Health Observatory API</p>
                {isGeminiConfigured() && (
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4 text-purple-600" />
                    <span>AI insights by Google Gemini</span>
                  </div>
                )}
                <p className="text-xs text-slate-500 mt-4">
                  Built with Bolt.new
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-200/50">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-center text-sm text-slate-500">
                © 2025 DrugLaunchIndia. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="text-xs text-slate-400">Hackathon sponsors:</span>
                <a
                  href="/entri-redirect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                >
                  Entri
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout